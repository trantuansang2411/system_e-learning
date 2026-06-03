import { Link } from "react-router";
import { Star } from "lucide-react";
import { formatPrice } from "../../utils/price";

interface CourseCardProps {
  course: {
    id: number | string;
    title: string;
    instructor: string;
    rating: number;
    reviews?: number;
    price: number;
    originalPrice: number;
    image: string;
    discount?: string;
  };
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <Link to={`/course/${course.id}`} className="block group h-full">
      <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col h-full">
        <div className="relative aspect-[16/10] overflow-hidden shrink-0">
          <img src={course.image} alt={course.title} loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
          {course.discount && (
            <span className="absolute top-2 left-2 bg-[#3dcbb1] text-white text-xs px-2 py-1 rounded-md font-semibold">
              Giảm {course.discount}
            </span>
          )}
        </div>
        <div className="p-3 flex flex-col flex-1">
          <h3 className="text-sm line-clamp-2 mb-1 min-h-[2.5rem] leading-5" style={{ fontWeight: 600 }}>{course.title}</h3>
          <p className="text-xs text-gray-400 mb-2 truncate">{course.instructor}</p>
          <div className="mt-auto">
            <div className="flex items-center gap-1 mb-1.5">
              <span className="text-xs font-bold text-gray-700">{course.rating.toFixed(1)}</span>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={11} className={s <= Math.round(course.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-200 fill-gray-200"} />
                ))}
              </div>
              <span className="text-xs text-gray-400">({(course.reviews ?? 0).toLocaleString()})</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-gray-900">{formatPrice(course.price)}</span>
              {course.originalPrice > course.price && (
                <span className="text-xs text-gray-400 line-through">{formatPrice(course.originalPrice)}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
