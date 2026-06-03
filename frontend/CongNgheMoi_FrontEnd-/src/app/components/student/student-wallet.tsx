import { useEffect, useMemo, useState } from "react";
import { Loader2, Wallet } from "lucide-react";
import { walletService } from "../../../services/walletService";
import { orderService } from "../../../services/orderService";
import { formatPrice, parsePrice } from "../../../utils/price";
import type { Order, Transaction } from "../../../types";

export function StudentWallet() {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError("");

        const [walletBalance, txs, myOrders] = await Promise.all([
          walletService.getBalance(),
          walletService.getTransactions({ page: 1, limit: 100 }),
          orderService.getOrders({ page: 1, limit: 100 }),
        ]);

        setBalance(walletBalance.balance || 0);
        setTransactions(txs.items || []);
        setOrders(myOrders.items || []);
      } catch {
        setError("Không thể tải dữ liệu ví lúc này.");
      } finally {
        setLoading(false);
      }
    };

    void loadData();
  }, []);

  const totalSpent = useMemo(
    () => orders.filter((item) => item.status === "PAID").reduce((sum, item) => sum + parsePrice(item.total), 0),
    [orders],
  );

  const totalDiscount = useMemo(
    () => orders.reduce((sum, item) => sum + parsePrice(item.discountAmount), 0),
    [orders],
  );

  return (
    <div>
      <h1 className="text-2xl mb-1" style={{ fontWeight: 700 }}>Ví và lịch sử giao dịch</h1>

      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Metric label="Số dư ví" value={formatPrice(balance)} />
        <Metric label="Tổng chi tiêu" value={formatPrice(totalSpent)} />
        <Metric label="Tổng tiết kiệm" value={formatPrice(totalDiscount)} />
      </div>

      {loading ? (
        <div className="rounded-xl border bg-white py-16 text-center text-sm text-gray-500">
          <Loader2 className="mx-auto mb-2 h-5 w-5 animate-spin" />
          Đang tải giao dịch...
        </div>
      ) : error ? (
        <div className="rounded-xl border bg-white py-16 text-center text-sm text-amber-600">{error}</div>
      ) : (
        <div className="space-y-6">
          <section className="rounded-xl border bg-white">
            <div className="border-b px-4 py-3">
              <p className="text-sm" style={{ fontWeight: 700 }}>Lịch sử đơn hàng</p>
            </div>
            {orders.length === 0 ? (
              <Empty text="Chưa có đơn hàng nào." />
            ) : (
              <div className="divide-y">
                {orders.map((order) => (
                  <div key={order.id} className="px-4 py-3 text-sm">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p style={{ fontWeight: 600 }}>Đơn #{order.id.slice(0, 8)}</p>
                      <span className={`rounded-full px-2.5 py-1 text-xs ${order.status === "PAID" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                        {order.status}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-gray-500">
                      {order.items.length} khóa học • Tổng {formatPrice(order.total)}
                    </p>
                    <p className="mt-1 text-xs text-gray-400">
                      {new Date(order.createdAt || order.paidAt || Date.now()).toLocaleString("vi-VN")}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className="rounded-xl border bg-white">
            <div className="border-b px-4 py-3">
              <p className="text-sm" style={{ fontWeight: 700 }}>Lịch sử ví</p>
            </div>
            {transactions.length === 0 ? (
              <Empty text="Chưa có giao dịch ví." />
            ) : (
              <div className="divide-y">
                {transactions.map((tx) => (
                  <div key={tx.id} className="px-4 py-3 text-sm">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p style={{ fontWeight: 600 }}>{tx.description || tx.refType || "Transaction"}</p>
                      <span className={tx.type === "CREDIT" ? "text-green-600" : "text-orange-600"} style={{ fontWeight: 700 }}>
                        {tx.type === "CREDIT" ? "+" : "-"}
                        {formatPrice(tx.amount)}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-gray-500">{tx.type} • {tx.refType || "N/A"}</p>
                    <p className="mt-1 text-xs text-gray-400">{new Date(tx.createdAt).toLocaleString("vi-VN")}</p>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      )}
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border bg-white p-4">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="mt-1 text-xl" style={{ fontWeight: 700 }}>{value}</p>
    </div>
  );
}

function Empty({ text }: { text: string }) {
  return (
    <div className="py-12 text-center text-sm text-gray-400">
      <Wallet size={28} className="mx-auto mb-2 opacity-40" />
      {text}
    </div>
  );
}
