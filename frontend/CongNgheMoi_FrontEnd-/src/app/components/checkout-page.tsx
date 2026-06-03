import { useEffect, useMemo, useState } from "react";
import { CreditCard, Building, Smartphone, Tag, X, Loader2 } from "lucide-react";
import { useLayoutContext } from "./layout";
import { useNavigate } from "react-router";
import { formatPrice, parsePrice } from "../../utils/price";
import { getImageUrl } from "../../utils/url";
import { orderService } from "../../services/orderService";
import type { CartItem } from "../../types";

interface AppliedCoupon {
  code: string;
  discountType: "percent" | "fixed";
  discountValue: number;
  savedAmount: number;
}

export function CheckoutPage() {
  const navigate = useNavigate();
  const { isLoggedIn, openLoginModal } = useLayoutContext();

  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [checkingOut, setCheckingOut] = useState(false);
  const [error, setError] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");

  // Coupon state
  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<AppliedCoupon | null>(null);
  const [couponError, setCouponError] = useState("");
  const [couponLoading, setCouponLoading] = useState(false);

  useEffect(() => {
    const loadCart = async () => {
      if (!isLoggedIn) {
        return;
      }
      try {
        setLoading(true);
        const cart = await orderService.getCart();
        setItems(cart.items || []);
      } catch {
        setError("Khong the tai du lieu gio hang.");
      } finally {
        setLoading(false);
      }
    };

    loadCart();
  }, [isLoggedIn]);

  const subtotal = useMemo(() => items.reduce((s, c) => s + parsePrice(c.priceSnapshot), 0), [items]);
  const discount = parsePrice(appliedCoupon?.savedAmount || 0);
  const total = Math.max(0, subtotal - discount);

  // Redirect if not logged in
  if (!isLoggedIn) {
    return (
      <div className="max-w-7xl mx-auto px-4 text-center py-16">
        <p className="text-gray-500 mb-2">Bạn cần đăng nhập để thanh toán</p>
        <p className="text-sm text-gray-400 mb-6">Vui lòng đăng nhập để tiếp tục</p>
        <button onClick={openLoginModal} className="bg-[#3dcbb1] text-white px-6 py-2.5 rounded-lg text-sm hover:bg-[#35b89f]" style={{ fontWeight: 600 }}>
          Đăng nhập
        </button>
      </div>
    );
  }

  const applyCoupon = () => {
    const code = couponInput.trim().toUpperCase();
    if (!code) { setCouponError("Vui lòng nhập mã giảm giá"); return; }
    if (appliedCoupon) { setCouponError("Bạn đã áp dụng mã giảm giá rồi"); return; }

    setCouponError("");
    setCouponLoading(true);

    // Coupon is validated by checkout API. Frontend keeps a temporary tag only.
    setAppliedCoupon({ code, discountType: "fixed", discountValue: 0, savedAmount: 0 });
    setCouponInput("");
    setCouponLoading(false);
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponError("");
  };

  if (!loading && items.length === 0) {
    return (
      <div className="max-w-lg mx-auto px-4 py-24 text-center">
        <p className="text-gray-400 mb-4">Không có sản phẩm nào để thanh toán.</p>
        <button onClick={() => navigate("/")} className="bg-[#3dcbb1] text-white px-6 py-2 rounded-lg text-sm">Về trang chủ</button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl mb-6" style={{ fontWeight: 700 }}>Thanh toán</h1>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3 space-y-6">
          <div>
            <h2 className="text-sm mb-3" style={{ fontWeight: 700 }}>Phương thức thanh toán</h2>
            <div className="space-y-2">
              {[
                { id: "card", label: "Thẻ tín dụng / ghi nợ", icon: CreditCard },
                { id: "bank", label: "Chuyển khoản ngân hàng", icon: Building },
                { id: "momo", label: "Ví MoMo / ZaloPay", icon: Smartphone },
              ].map((m) => (
                <label key={m.id} className={`flex items-center gap-3 border rounded-lg p-3 cursor-pointer ${paymentMethod === m.id ? "border-[#3dcbb1] bg-[#3dcbb1]/5" : ""}`}>
                  <input type="radio" name="payment" value={m.id} checked={paymentMethod === m.id} onChange={() => setPaymentMethod(m.id)} className="accent-[#3dcbb1]" />
                  <m.icon size={18} />
                  <span className="text-sm">{m.label}</span>
                </label>
              ))}
            </div>
          </div>

          {paymentMethod === "card" && (
            <div className="space-y-3">
              <input placeholder="Số thẻ" className="w-full border rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#3dcbb1]" />
              <div className="grid grid-cols-2 gap-3">
                <input placeholder="MM/YY" className="border rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#3dcbb1]" />
                <input placeholder="CVV" className="border rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#3dcbb1]" />
              </div>
              <input placeholder="Tên chủ thẻ" className="w-full border rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#3dcbb1]" />
            </div>
          )}

          {paymentMethod === "bank" && (
            <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600">
              <p style={{ fontWeight: 600 }}>Thông tin chuyển khoản:</p>
              <p>Ngân hàng: Vietcombank</p>
              <p>STK: 1234 5678 9012</p>
              <p>Chủ TK: MYCOURSE JSC</p>
              <p>Nội dung: THANHTOAN_{Date.now()}</p>
            </div>
          )}
        </div>

        <div className="lg:col-span-2">
          <div className="bg-gray-50 rounded-xl p-6 sticky top-20">
            <h3 className="text-sm mb-3" style={{ fontWeight: 700 }}>Đơn hàng ({items.length} khoá học)</h3>
            {error && <p className="text-sm text-amber-600 mb-3">{error}</p>}
            <div className="space-y-3 mb-4">
              {loading ? (
                <div className="text-sm text-gray-400">Dang tai don hang...</div>
              ) : items.map((c) => (
                <div key={c.id} className="flex gap-3 text-sm">
                  <div className="w-12 h-9 rounded bg-gray-100 overflow-hidden flex-shrink-0">
                    {c.thumbnailUrl ? (
                      <img
                        src={getImageUrl(c.thumbnailUrl)}
                        alt={c.titleSnapshot}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-400 text-[8px]">IMG</span>
                      </div>
                    )}
                  </div>
                  <span className="text-gray-600 line-clamp-1 flex-1">{c.titleSnapshot}</span>
                  <span style={{ fontWeight: 600 }}>{formatPrice(c.priceSnapshot)}</span>
                </div>
              ))}
            </div>

            {/* Coupon section */}
            <div className="border-t pt-4 mb-4">
              <div className="flex items-center gap-1.5 mb-2">
                <Tag size={14} className="text-[#3dcbb1]" />
                <span className="text-xs text-gray-500" style={{ fontWeight: 600 }}>Mã giảm giá</span>
              </div>

              {appliedCoupon ? (
                <div className="flex items-center justify-between bg-[#3dcbb1]/10 border border-[#3dcbb1]/30 rounded-lg px-3 py-2.5">
                  <div className="flex items-center gap-2">
                    <Tag size={14} className="text-[#3dcbb1]" />
                    <span className="text-sm text-[#3dcbb1] tracking-wider" style={{ fontWeight: 700 }}>{appliedCoupon.code}</span>
                    <span className="text-xs text-[#2ba88f]">
                      {appliedCoupon.discountType === "percent" ? `-${appliedCoupon.discountValue}%` : `-${formatPrice(appliedCoupon.discountValue)}`}
                    </span>
                  </div>
                  <button onClick={removeCoupon} className="text-gray-400 hover:text-red-500 transition">
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <div>
                  <div className="flex gap-2">
                    <input
                      value={couponInput}
                      onChange={(e) => { setCouponInput(e.target.value.toUpperCase()); setCouponError(""); }}
                      onKeyDown={(e) => e.key === "Enter" && applyCoupon()}
                      placeholder="Nhập mã giảm giá..."
                      className="flex-1 border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#3dcbb1]"
                      style={{ textTransform: "uppercase", letterSpacing: "0.05em" }}
                    />
                    <button
                      onClick={applyCoupon}
                      disabled={couponLoading}
                      className="bg-[#3dcbb1] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#35b89f] transition disabled:opacity-50 shrink-0 flex items-center gap-1.5"
                      style={{ fontWeight: 600 }}
                    >
                      {couponLoading ? <Loader2 size={14} className="animate-spin" /> : "Áp dụng"}
                    </button>
                  </div>
                  {couponError && (
                    <p className="text-xs text-red-500 mt-1.5">{couponError}</p>
                  )}
                </div>
              )}
            </div>

            {/* Price breakdown */}
            <div className="border-t pt-3 space-y-2">
              <div className="flex justify-between text-sm text-gray-500">
                <span>Tạm tính</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              {appliedCoupon && (
                <div className="flex justify-between text-sm text-[#3dcbb1]">
                  <span>Giảm giá ({appliedCoupon.code})</span>
                  <span>-{formatPrice(discount)}</span>
                </div>
              )}
              <div className="flex justify-between pt-2 border-t" style={{ fontWeight: 700 }}>
                <span>Tổng cộng</span>
                <span className="text-lg">{formatPrice(total)}</span>
              </div>
              {appliedCoupon && (
                <p className="text-xs text-[#3dcbb1] text-right">
                  Bạn tiết kiệm được {formatPrice(discount)}!
                </p>
              )}
            </div>
            <button
              onClick={async () => {
                const paymentProvider = paymentMethod === "card" ? "STRIPE" : paymentMethod === "momo" ? "MOMO" : "MOCK";
                const couponCourseId = items[0]?.courseId;

                try {
                  setCheckingOut(true);
                  setError("");
                  const result = await orderService.checkout({
                    couponCode: appliedCoupon?.code,
                    couponCourseId,
                    paymentProvider,
                  });

                  if (result.checkoutUrl) {
                    window.location.href = result.checkoutUrl;
                    return;
                  }

                  navigate(`/payment/success?paymentIntentId=${encodeURIComponent(result.paymentIntentId)}`);
                } catch {
                  setError("Thanh toan that bai. Vui long thu lai.");
                } finally {
                  setCheckingOut(false);
                }
              }}
              disabled={checkingOut || loading || items.length === 0}
              className="w-full bg-[#3dcbb1] text-white rounded-lg py-3 mt-4 text-sm hover:bg-[#35b89f] disabled:opacity-60"
              style={{ fontWeight: 600 }}
            >
              {checkingOut ? "Dang xu ly..." : "Xac nhan thanh toan"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}