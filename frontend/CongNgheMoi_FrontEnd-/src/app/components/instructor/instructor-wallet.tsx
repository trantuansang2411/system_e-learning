import { useEffect, useMemo, useState } from "react";
import { Loader2, Wallet } from "lucide-react";
import { walletService } from "../../../services/walletService";
import { formatPrice } from "../../../utils/price";
import type { Transaction } from "../../../types";

export function InstructorWallet() {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadWallet = async () => {
      try {
        setLoading(true);
        setError("");

        const [b, txs] = await Promise.all([
          walletService.getBalance(),
          walletService.getTransactions({ page: 1, limit: 100 }),
        ]);

        setBalance(b.balance || 0);
        setTransactions(txs.items || []);
      } catch {
        setError("Không thể tải dữ liệu ví giảng viên.");
      } finally {
        setLoading(false);
      }
    };

    void loadWallet();
  }, []);

  const outcome = useMemo(
    () => transactions.filter((t) => t.type === "DEBIT").reduce((sum, t) => sum + (t.amount || 0), 0),
    [transactions],
  );

  return (
    <div>
      <h1 className="mb-6 text-xl" style={{ fontWeight: 700 }}>Ví giảng viên</h1>

      <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Metric label="Số dư hiện tại" value={formatPrice(balance)} />
        <Metric label="Số tiền đã rút" value={formatPrice(outcome)} />
      </div>

      {loading ? (
        <div className="rounded-xl border bg-white py-16 text-center text-sm text-gray-500">
          <Loader2 className="mx-auto mb-2 h-5 w-5 animate-spin" />
          Đang tải giao dịch ví...
        </div>
      ) : error ? (
        <div className="rounded-xl border bg-white py-16 text-center text-sm text-amber-600">{error}</div>
      ) : transactions.length === 0 ? (
        <div className="rounded-xl border bg-white py-16 text-center text-sm text-gray-400">
          <Wallet size={28} className="mx-auto mb-2 opacity-40" />
          Chưa có giao dịch nào
        </div>
      ) : (
        <div className="rounded-xl border bg-white">
          <div className="border-b px-4 py-3 text-sm" style={{ fontWeight: 700 }}>Lịch sử giao dịch</div>
          <div className="divide-y">
            {transactions.map((tx) => (
              <div key={tx.id} className="px-4 py-3 text-sm">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p style={{ fontWeight: 600 }}>{tx.description || tx.refType || "Giao dịch"}</p>
                  <span className={tx.type === "CREDIT" ? "text-green-600" : "text-orange-600"} style={{ fontWeight: 700 }}>
                    {tx.type === "CREDIT" ? "+" : "-"}{formatPrice(tx.amount)}
                  </span>
                </div>
                <p className="mt-1 text-xs text-gray-500">{tx.refType || "N/A"}</p>
                <p className="mt-1 text-xs text-gray-400">{new Date(tx.createdAt).toLocaleString("vi-VN")}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border bg-white p-4">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="mt-1 text-2xl" style={{ fontWeight: 700 }}>{value}</p>
    </div>
  );
}
