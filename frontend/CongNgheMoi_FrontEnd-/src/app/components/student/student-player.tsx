import { useEffect, useMemo, useState, useRef } from "react";
import { ArrowLeft, CheckCircle, Loader2, Pause, Play } from "lucide-react";
import { toast } from "sonner";
import { learningService } from "../../../services/learningService";
import type { CourseDetailResponse, LessonProgress } from "../../../types";

interface Props {
  onBack: () => void;
  courseId: string;
}

function extractYouTubeVideoId(rawUrl?: string): string | null {
  if (!rawUrl) {
    return null;
  }

  try {
    const url = new URL(rawUrl);
    const host = url.hostname.replace("www.", "").toLowerCase();

    if (host === "youtu.be") {
      const id = url.pathname.split("/").filter(Boolean)[0];
      return id || null;
    }

    if (host === "youtube.com" || host === "m.youtube.com") {
      if (url.pathname === "/watch") {
        return url.searchParams.get("v");
      }

      if (url.pathname.startsWith("/embed/")) {
        const id = url.pathname.split("/")[2];
        return id || null;
      }

      if (url.pathname.startsWith("/shorts/")) {
        const id = url.pathname.split("/")[2];
        return id || null;
      }
    }
  } catch {
    return null;
  }

  return null;
}

export function StudentPlayer({ onBack, courseId }: Props) {
  const [detail, setDetail] = useState<CourseDetailResponse | null>(null);
  const [progress, setProgress] = useState<LessonProgress[]>([]);
  const [currentLessonId, setCurrentLessonId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [expandedSectionIds, setExpandedSectionIds] = useState<Set<string>>(new Set());

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");

      const [courseDetail, learningProgress] = await Promise.all([
        learningService.getPlayerDetail(courseId),
        learningService.getProgress(courseId),
      ]);

      setDetail(courseDetail);
      setProgress(learningProgress || []);

      setExpandedSectionIds(new Set((courseDetail.sections || []).map((section) => section._id)));

      const initialLessonId = courseDetail.lessons
        .slice()
        .sort((a, b) => a.orderIndex - b.orderIndex)[0]?._id;
      setCurrentLessonId((prev) => prev || initialLessonId || null);
    } catch {
      setError("Không thể tải nội dung khóa học.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadData();
  }, [courseId]);

  const completionMap = useMemo(() => {
    const map = new Map<string, LessonProgress>();
    progress.forEach((item) => {
      map.set(item.lessonId, item);
    });
    return map;
  }, [progress]);

  const currentLesson = useMemo(() => {
    if (!detail || !currentLessonId) {
      return null;
    }
    return detail.lessons.find((lesson) => lesson._id === currentLessonId) || null;
  }, [detail, currentLessonId]);

  const currentVideoUrl = currentLesson?.videoUrl;
  const currentYouTubeId = useMemo(() => extractYouTubeVideoId(currentVideoUrl), [currentVideoUrl]);
  const shouldSendHeartbeat = Boolean(currentLessonId) && (Boolean(currentYouTubeId) || isPlaying);

  useEffect(() => {
    setIsPlaying(false);
  }, [currentLessonId]);

  useEffect(() => {
    if (!shouldSendHeartbeat || !currentLessonId) {
      return;
    }

    const timer = window.setInterval(() => {
      void learningService.sendHeartbeat(courseId, {
        lessonId: currentLessonId,
        deltaWatchSec: 30,
      });
    }, 30000);

    return () => {
      window.clearInterval(timer);
    };
  }, [courseId, currentLessonId, shouldSendHeartbeat]);

  const totalLessons = detail?.lessons.length || 0;
  const completedLessons = progress.filter((item) => item.completed).length;
  const progressPercent = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  const savedWatchTime = useMemo(() => {
    if (!currentLessonId) return 0;
    return completionMap.get(currentLessonId)?.watchTimeSec || 0;
  }, [currentLessonId, completionMap]);

  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleSection = (sectionId: string) => {
    setExpandedSectionIds((prev) => {
      const next = new Set(prev);
      if (next.has(sectionId)) {
        next.delete(sectionId);
      } else {
        next.add(sectionId);
      }
      return next;
    });
  };

  if (loading) {
    return (
      <div className="rounded-xl border bg-white py-16 text-center text-sm text-gray-500">
        <Loader2 className="mx-auto mb-2 h-5 w-5 animate-spin" />
        Đang tải...
      </div>
    );
  }

  if (!detail) {
    return <div className="rounded-xl border bg-white py-16 text-center text-sm text-amber-600">{error || "Không có dữ liệu khóa học"}</div>;
  }

  return (
    <div className="flex h-[calc(100vh-60px)] flex-col overflow-hidden bg-gray-900">
      <div className="flex items-center justify-between bg-gray-900 px-4 py-3 text-white shrink-0 z-30 shadow-md">
        <div className="flex min-w-0 items-center gap-3">
          <button onClick={onBack} className="hover:text-[#3dcbb1] transition-colors p-1" aria-label="Quay lại">
            <ArrowLeft size={20} />
          </button>
          <div className="min-w-0">
            <p className="truncate text-[15px] leading-tight" style={{ fontWeight: 700 }}>{detail.course.title}</p>
            <p className="truncate text-xs text-gray-400 mt-0.5">{currentLesson?.title || "Chưa chọn bài học"}</p>
          </div>
        </div>
        <span className="text-xs text-gray-300 font-medium bg-gray-800 px-3 py-1 rounded-full border border-gray-700">Tiến độ {progressPercent}%</span>
      </div>

      <div className="flex flex-1 overflow-hidden bg-black h-full w-full">
        {/* Video Area */}
        <div className="flex flex-1 flex-col h-full min-w-0 relative">
          <div className="relative flex flex-1 items-center justify-center bg-black w-full h-full">
            {currentYouTubeId ? (
              <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-black">
                <iframe
                  key={currentLesson?._id}
                  className="w-full h-full max-h-[100%]"
                  src={`https://www.youtube.com/embed/${currentYouTubeId}?rel=0&modestbranding=1&playsinline=1${savedWatchTime > 0 ? `&start=${savedWatchTime}` : ""}`}
                  title={currentLesson?.title || "YouTube video"}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            ) : currentVideoUrl ? (
              <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-black">
                <video
                  ref={videoRef}
                  key={currentLesson._id}
                  controls
                  className="w-full h-full object-contain"
                  src={currentVideoUrl}
                  onLoadedMetadata={(e) => {
                    const video = e.target as HTMLVideoElement;
                    if (savedWatchTime > 0 && !isNaN(video.duration)) {
                      video.currentTime = Math.min(savedWatchTime, Math.max(0, video.duration - 2));
                    }
                  }}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                />
              </div>
            ) : (
              <div className="text-center text-white/70 z-10">
                <button
                  onClick={() => setIsPlaying((prev) => !prev)}
                  className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                >
                  {isPlaying ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
                </button>
                <p className="text-sm font-medium">Bài học này không có video công khai.</p>
              </div>
            )}

            {/* Gradient Overlay for bottom text */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent pointer-events-none flex justify-between items-end pb-6 sm:pb-4 z-10">
              <span className="text-sm text-gray-200" style={{ textShadow: "0 1px 2px rgba(0,0,0,0.8)" }}>Đang xem: {currentLesson ? currentLesson.title : "Chưa chọn bài học"}</span>
              <span className="text-sm text-gray-200" style={{ textShadow: "0 1px 2px rgba(0,0,0,0.8)" }}>{completedLessons}/{totalLessons} bài</span>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="hidden w-[350px] shrink-0 flex-col bg-white border-l border-gray-200 md:flex overflow-hidden z-20">
          <div className="border-b px-5 py-4 text-[15px] bg-white sticky top-0 z-10 shrink-0 text-gray-900" style={{ fontWeight: 800 }}>Nội dung khóa học</div>
          <div className="flex-1 overflow-y-auto no-scrollbar pb-10">
            {detail.sections
              .slice()
              .sort((a, b) => a.orderIndex - b.orderIndex)
              .map((section) => {
                const lessons = detail.lessons
                  .filter((lesson) => lesson.sectionId === section._id)
                  .sort((a, b) => a.orderIndex - b.orderIndex);

                return (
                  <div key={section._id} className="border-b border-gray-100 last:border-0">
                    <button
                      type="button"
                      onClick={() => {
                        toggleSection(section._id);
                        if (lessons[0]?._id && !expandedSectionIds.has(section._id)) {
                          setCurrentLessonId(lessons[0]._id);
                        }
                      }}
                      className="w-full bg-gray-50/80 px-5 py-3 text-left text-[13.5px] text-gray-700 hover:bg-gray-100 transition-colors"
                      style={{ fontWeight: 700 }}
                    >
                      Chương {section.orderIndex + 1}: {section.title}
                    </button>
                    {expandedSectionIds.has(section._id) && (
                      <div className="py-1">
                        {lessons.map((lesson) => {
                          const done = completionMap.get(lesson._id)?.completed || false;
                          const isCurrent = currentLessonId === lesson._id;
                          return (
                            <button
                              key={lesson._id}
                              onClick={() => setCurrentLessonId(lesson._id)}
                              className={`group flex w-full items-center justify-between px-5 py-3 text-left transition-colors ${isCurrent ? "bg-[#ebf9f6] border-l-4 border-[#3dcbb1] pl-[16px]" : "hover:bg-gray-50 pl-5 border-l-4 border-transparent"
                                }`}
                            >
                              <span className={`min-w-0 pr-3 truncate text-[14px] ${isCurrent ? "text-[#2aa58f] font-semibold" : "text-gray-600 group-hover:text-gray-900"}`}>
                                {lesson.title}
                              </span>
                              <span className={`shrink-0 text-[11px] font-bold tracking-wider uppercase ${done ? "text-[#3dcbb1]" : "text-gray-300"}`}>
                                {done ? "Done" : "Todo"}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        </aside>
      </div>
    </div>
  );
}
