import { CircleX } from "lucide-react";
import { Link } from "react-router";

export function PaymentCancelPage() {
  return (
    <div className="max-w-xl mx-auto px-4 py-20 text-center">
      <CircleX className="mx-auto h-14 w-14 text-amber-500" />
      <h1 className="mt-4 text-2xl" style={{ fontWeight: 700 }}>
        Ban da huy thanh toan
      </h1>
      <p className="mt-2 text-sm text-gray-500">
        Don hang chua duoc thanh toan. Ban co the thu lai bat ky luc nao trong trang checkout.
      </p>
      <div className="mt-6 flex justify-center gap-3">
        <Link to="/checkout" className="rounded-lg bg-[#3dcbb1] px-5 py-2.5 text-sm text-white hover:bg-[#35b89f]" style={{ fontWeight: 600 }}>
          Thu thanh toan lai
        </Link>
        <Link to="/cart" className="rounded-lg border px-5 py-2.5 text-sm text-gray-700 hover:bg-gray-50" style={{ fontWeight: 600 }}>
          Ve gio hang
        </Link>
      </div>
    </div>
  );
}
