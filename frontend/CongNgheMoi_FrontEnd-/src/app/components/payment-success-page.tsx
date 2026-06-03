import { useEffect, useState } from "react";
import { CheckCircle2, CircleX, Loader2 } from "lucide-react";
import { Link, useSearchParams } from "react-router";
import { paymentService } from "../../services/paymentService";
import type { PaymentIntent } from "../../types";

type ViewState = "loading" | "success" | "failed";

const PAYMENT_POLL_INTERVAL_MS = 3000;
const PAYMENT_POLL_TIMEOUT_MS = 90000;

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

function decodeBase64Json(value: string): Record<string, unknown> | null {
  try {
    const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
    const padded = normalized + "=".repeat((4 - (normalized.length % 4)) % 4);
    const decoded = atob(padded);
    return JSON.parse(decoded) as Record<string, unknown>;
  } catch {
    return null;
  }
}

function getPaymentIntentId(searchParams: URLSearchParams): string | null {
  const directId = searchParams.get("payment_intent") || searchParams.get("paymentIntentId");
  if (directId) {
    return directId;
  }

  const extraData = searchParams.get("extraData");
  if (extraData) {
    const parsed = decodeBase64Json(extraData);
    const idFromExtraData = parsed?.paymentIntentId;
    if (typeof idFromExtraData === "string" && idFromExtraData.trim()) {
      return idFromExtraData;
    }
  }

  const orderId = searchParams.get("orderId");
  if (orderId) {
    const [idCandidate] = orderId.split("_");
    if (idCandidate) {
      return idCandidate;
    }
  }

  return null;
}

export function PaymentSuccessPage() {
  const [searchParams] = useSearchParams();
  const [state, setState] = useState<ViewState>("loading");
  const [payment, setPayment] = useState<PaymentIntent | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const resultCode = searchParams.get("resultCode");
    if (resultCode && resultCode !== "0") {
      const providerMessage = searchParams.get("message") || "Thanh toán chưa hoàn tất.";
      setError(providerMessage);
      setState("failed");
      return () => {
        cancelled = true;
      };
    }

    const paymentIntentId = getPaymentIntentId(searchParams);

    if (!paymentIntentId) {
      setError("Không tìm thấy mã giao dịch thanh toán.");
      setState("failed");
      return () => {
        cancelled = true;
      };
    }

    const loadPaymentStatus = async () => {
      try {
        const start = Date.now();

        while (!cancelled && Date.now() - start <= PAYMENT_POLL_TIMEOUT_MS) {
          const result = await paymentService.getPaymentStatus(paymentIntentId);
          if (cancelled) {
            return;
          }

          setPayment(result);

          const normalizedStatus = String(result.status || "").toUpperCase();
          if (normalizedStatus === "SUCCEEDED") {
            setState("success");
            return;
          }

          if (normalizedStatus === "FAILED") {
            setError("Giao dịch thanh toán thất bại. Vui lòng thử lại.");
            setState("failed");
            return;
          }

          await sleep(PAYMENT_POLL_INTERVAL_MS);
        }

        if (cancelled) {
          return;
        }

        setError("Giao dịch đang được đối soát. Vui lòng kiểm tra lại trong lịch sử đơn hàng sau ít phút.");
        setState("failed");
      } catch {
        if (cancelled) {
          return;
        }
        setError("Không thể kiểm tra trạng thái thanh toán lúc này.");
        setState("failed");
      }
    };

    void loadPaymentStatus();

    return () => {
      cancelled = true;
    };
  }, [searchParams]);

  if (state === "loading") {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <Loader2 className="mx-auto h-10 w-10 animate-spin text-[#3dcbb1]" />
        <h1 className="mt-4 text-xl" style={{ fontWeight: 700 }}>
          Đang xác nhận thanh toán
        </h1>
        <p className="mt-2 text-sm text-gray-500">Hệ thống đang đối soát với cổng thanh toán.</p>
      </div>
    );
  }

  if (state === "failed") {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <CircleX className="mx-auto h-14 w-14 text-red-500" />
        <h1 className="mt-4 text-2xl" style={{ fontWeight: 700 }}>
          Thanh toán chưa thành công
        </h1>
        <p className="mt-2 text-sm text-gray-500">{error}</p>
        <div className="mt-6 flex justify-center gap-3">
          <Link to="/checkout" className="rounded-lg bg-[#3dcbb1] px-5 py-2.5 text-sm text-white hover:bg-[#35b89f]" style={{ fontWeight: 600 }}>
            Quay lại thanh toán
          </Link>
          <Link to="/my-courses" className="rounded-lg border px-5 py-2.5 text-sm text-gray-700 hover:bg-gray-50" style={{ fontWeight: 600 }}>
            Kiểm tra khóa học
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-20 text-center">
      <CheckCircle2 className="mx-auto h-14 w-14 text-[#3dcbb1]" />
      <h1 className="mt-4 text-2xl" style={{ fontWeight: 700 }}>
        Thanh toán thành công
      </h1>
      <p className="mt-2 text-sm text-gray-500">Giao dịch của bạn đã được ghi nhận. Bạn có thể bắt đầu học ngay bây giờ.</p>
      {payment?.amount ? (
        <p className="mt-3 text-sm text-gray-600">
          Số tiền: <span style={{ fontWeight: 600 }}>{new Intl.NumberFormat("vi-VN").format(payment.amount)} VND</span>
        </p>
      ) : null}
      <div className="mt-6 flex justify-center gap-3">
        <Link to="/my-courses" className="rounded-lg bg-[#3dcbb1] px-5 py-2.5 text-sm text-white hover:bg-[#35b89f]" style={{ fontWeight: 600 }}>
          Đến khóa học của tôi
        </Link>
        <Link to="/" className="rounded-lg border px-5 py-2.5 text-sm text-gray-700 hover:bg-gray-50" style={{ fontWeight: 600 }}>
          Về trang chủ
        </Link>
      </div>
    </div>
  );
}
