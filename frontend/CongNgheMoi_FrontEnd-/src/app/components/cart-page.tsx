import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { BookOpen, ShoppingCart, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { formatPrice, parsePrice } from "../../utils/price";
import { getThumbnailUrl } from "../../utils/url";
import { useLayoutContext } from "./layout";
import { orderService } from "../../services/orderService";
import type { CartItem } from "../../types";

export function CartPage() {
  const navigate = useNavigate();
  const { isLoggedIn, openLoginModal, setCartCount } = useLayoutContext();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const total = cartItems.reduce((sum, c) => sum + parsePrice(c.priceSnapshot), 0);

  useEffect(() => {
    const loadCart = async () => {
      if (!isLoggedIn) {
        setCartItems([]);
        setCartCount(0);
        return;
      }

      try {
        setLoading(true);
        setError("");
        const cart = await orderService.getCart();
        setCartItems(cart.items || []);
        setCartCount(cart.items?.length || 0);
      } catch {
        setError("Không thể tải giỏ hàng từ backend.");
      } finally {
        setLoading(false);
      }
    };

    loadCart();
  }, [isLoggedIn, setCartCount]);

  const removeItem = async (courseId: string) => {
    try {
      await orderService.removeFromCart(courseId);
      setCartItems((prev) => prev.filter((item) => item.courseId !== courseId));
      toast.success("Đã xóa khỏi giỏ hàng.");
    } catch {
      toast.error("Không thể xóa khỏi giỏ hàng.");
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl mb-6" style={{ fontWeight: 700 }}>Giỏ hàng</h1>
        <div className="text-center py-20">
          <div className="w-16 h-16 bg-[#e8f3ef] rounded-full flex items-center justify-center mx-auto mb-4">
            <ShoppingCart size={28} className="text-[#3dcbb1]" />
          </div>
          <p className="text-gray-600 mb-1" style={{ fontWeight: 600 }}>Bạn cần đăng nhập để sử dụng giỏ hàng</p>
          <p className="text-sm text-gray-400 mb-6">Đăng nhập để lưu khoá học yêu thích và thanh toán</p>
          <button onClick={openLoginModal} className="bg-[#3dcbb1] text-white px-6 py-2.5 rounded-lg text-sm hover:bg-[#35b89f] transition-colors cursor-pointer" style={{ fontWeight: 600 }}>
            Đăng nhập
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl mb-6" style={{ fontWeight: 700 }}>Giỏ hàng</h1>

      {loading ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex gap-4 border rounded-xl p-4 animate-pulse bg-white">
                <div className="w-36 h-24 rounded-lg bg-gray-200 shrink-0" />
                <div className="flex-1 space-y-2 py-1">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-3 bg-gray-200 rounded w-1/2" />
                  <div className="h-3 bg-gray-200 rounded w-1/4" />
                </div>
                <div className="shrink-0">
                  <div className="h-4 bg-gray-200 rounded w-16" />
                </div>
              </div>
            ))}
          </div>
          <div className="lg:col-span-1">
            <div className="border rounded-xl p-6 animate-pulse space-y-3">
              <div className="h-4 bg-gray-200 rounded w-1/2" />
              <div className="h-3 bg-gray-200 rounded" />
              <div className="h-3 bg-gray-200 rounded" />
              <div className="h-10 bg-gray-200 rounded-lg mt-4" />
            </div>
          </div>
        </div>
      ) : cartItems.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-16 h-16 bg-[#e8f3ef] rounded-full flex items-center justify-center mx-auto mb-4">
            <ShoppingCart size={28} className="text-[#3dcbb1]" />
          </div>
          <p className="text-gray-600 mb-1" style={{ fontWeight: 600 }}>Giỏ hàng của bạn đang trống</p>
          <p className="text-sm text-gray-400 mb-6">Hãy khám phá các khoá học và thêm vào giỏ hàng</p>
          <button onClick={() => navigate("/search")} className="bg-[#3dcbb1] text-white px-6 py-2.5 rounded-lg text-sm hover:bg-[#35b89f] transition-colors cursor-pointer" style={{ fontWeight: 600 }}>
            Khám phá khoá học
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-3">
            {error && <p className="text-sm text-amber-600 mb-2">{error}</p>}
            <p className="text-sm text-gray-500 mb-1">{cartItems.length} khoá học trong giỏ hàng</p>
            {cartItems.map((item) => (
              <div key={item.id} className="flex gap-4 border rounded-xl p-4 bg-white hover:shadow-sm transition-shadow">
                <Link to={`/course/${item.courseId}`} className="shrink-0">
                  <div className="w-36 h-24 rounded-lg overflow-hidden bg-gradient-to-br from-[#e8f3ef] to-[#d9ece5] flex items-center justify-center">
                    {item.thumbnailUrl ? (
                      <img
                        src={getThumbnailUrl(item.thumbnailUrl)}
                        alt={item.titleSnapshot}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <BookOpen size={24} className="text-[#3dcbb1]" />
                    )}
                  </div>
                </Link>

                <div className="flex-1 min-w-0 py-1">
                  <Link to={`/course/${item.courseId}`}>
                    <h3 className="text-sm text-[#17352e] mb-1.5 line-clamp-2 hover:text-[#176756] transition-colors" style={{ fontWeight: 600 }}>
                      {item.titleSnapshot}
                    </h3>
                  </Link>
                  <span className="inline-block text-xs text-[#3dcbb1] bg-[#e8f3ef] px-2 py-0.5 rounded-full" style={{ fontWeight: 500 }}>
                    Khoá học trực tuyến
                  </span>
                </div>

                <div className="shrink-0 flex flex-col items-end justify-between py-1">
                  <p className="text-base text-[#17352e]" style={{ fontWeight: 700 }}>{formatPrice(item.priceSnapshot)}</p>
                  <button
                    onClick={() => removeItem(item.courseId)}
                    className="text-gray-400 hover:text-red-500 transition-colors cursor-pointer p-1 rounded-lg hover:bg-red-50"
                    aria-label="Xóa khỏi giỏ hàng"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white border rounded-xl p-6 sticky top-20 shadow-sm">
              <h3 className="text-base mb-4 text-[#17352e]" style={{ fontWeight: 700 }}>Tổng đơn hàng</h3>
              <div className="space-y-2.5 text-sm">
                <div className="flex justify-between text-gray-500">
                  <span>{cartItems.length} khoá học</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <div className="border-t pt-2.5 flex justify-between text-base" style={{ fontWeight: 700 }}>
                  <span className="text-[#17352e]">Tổng cộng</span>
                  <span className="text-[#176756]">{formatPrice(total)}</span>
                </div>
              </div>
              <button
                onClick={() => navigate("/checkout")}
                className="w-full bg-[#3dcbb1] text-white rounded-lg py-3 mt-5 text-sm hover:bg-[#35b89f] transition-colors cursor-pointer"
                style={{ fontWeight: 600 }}
              >
                Thanh toán ngay
              </button>
              <button
                onClick={() => navigate("/search")}
                className="w-full text-[#176756] text-sm mt-2 py-2 hover:underline cursor-pointer"
              >
                Tiếp tục mua sắm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}