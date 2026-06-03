import { useEffect, useMemo, useState } from "react";
import { Award, ExternalLink, Loader2, Search } from "lucide-react";
import { certificateService } from "../../../services/certificateService";
import { learningService } from "../../../services/learningService";
import type { Certificate, Enrollment } from "../../../types";

export function StudentCertificates() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError("");

        const [certs, learning] = await Promise.all([
          certificateService.getMyCertificates(),
          learningService.getMyCourses({ page: 1, limit: 100 }),
        ]);

        setCertificates(certs);
        setEnrollments(learning.items || []);
      } catch {
        setError("Không thể tải dữ liệu chứng chỉ lúc này.");
      } finally {
        setLoading(false);
      }
    };

    void loadData();
  }, []);

  const titleByCourseId = useMemo(() => {
    const map = new Map<string, string>();
    enrollments.forEach((item) => {
      map.set(item.courseId, item.titleSnapshot);
    });
    return map;
  }, [enrollments]);

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const filteredCertificates = certificates.filter((cert) => {
    if (!normalizedQuery) {
      return true;
    }

    const title = (titleByCourseId.get(cert.courseId) || cert.courseId).toLowerCase();
    return title.includes(normalizedQuery) || cert.certificateNo.toLowerCase().includes(normalizedQuery);
  });

  const inProgressCount = enrollments.filter((item) => item.status === "ACTIVE").length;
  const completedCount = enrollments.filter((item) => item.status === "COMPLETED").length;

  return (
    <div>
      <h1 className="text-2xl mb-1" style={{ fontWeight: 700 }}>Chứng chỉ của tôi</h1>
      <p className="text-sm text-gray-500 mb-6">Xem và xác minh chứng chỉ hoàn thành khóa học</p>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl border p-4">
          <p className="text-xs text-gray-500">Chứng chỉ đã cấp</p>
          <p className="text-2xl text-yellow-600" style={{ fontWeight: 700 }}>{certificates.length}</p>
        </div>
        <div className="bg-white rounded-xl border p-4">
          <p className="text-xs text-gray-500">Khóa học hoàn thành</p>
          <p className="text-2xl text-blue-600" style={{ fontWeight: 700 }}>{completedCount}</p>
        </div>
        <div className="bg-white rounded-xl border p-4 col-span-2 lg:col-span-1">
          <p className="text-xs text-gray-500">Đang học</p>
          <p className="text-2xl text-purple-600" style={{ fontWeight: 700 }}>{inProgressCount}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border p-4 mb-4">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm theo tên khóa học hoặc mã chứng chỉ"
            className="w-full pl-10 pr-4 py-2.5 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#3dcbb1]/30"
          />
        </div>
      </div>

      {loading ? (
        <div className="bg-white rounded-xl border py-16 text-center text-sm text-gray-500">
          <Loader2 className="mx-auto mb-2 h-5 w-5 animate-spin" />
          Đang tải chứng chỉ...
        </div>
      ) : error ? (
        <div className="bg-white rounded-xl border py-16 text-center text-sm text-amber-600">{error}</div>
      ) : filteredCertificates.length === 0 ? (
        <div className="bg-white rounded-xl border py-16 text-center text-sm text-gray-400">
          <Award size={36} className="mx-auto mb-3 opacity-40" />
          Chưa có chứng chỉ nào phù hợp
        </div>
      ) : (
        <div className="space-y-3">
          {filteredCertificates.map((cert) => {
            const title = titleByCourseId.get(cert.courseId) || cert.courseId;
            return (
              <div key={cert._id} className="bg-white rounded-xl border p-4 flex items-center gap-4">
                <div className="w-11 h-11 rounded-lg bg-yellow-50 text-yellow-600 flex items-center justify-center shrink-0">
                  <Award size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm truncate" style={{ fontWeight: 600 }}>{title}</p>
                  <p className="text-xs text-gray-500 mt-0.5">Mã: {cert.certificateNo}</p>
                  <p className="text-xs text-gray-400 mt-0.5">Cấp ngày: {new Date(cert.issuedAt).toLocaleDateString("vi-VN")}</p>
                </div>
                <a
                  href={cert.verificationUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-[#3dcbb1] hover:underline"
                  style={{ fontWeight: 600 }}
                >
                  Xác minh <ExternalLink size={14} />
                </a>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
