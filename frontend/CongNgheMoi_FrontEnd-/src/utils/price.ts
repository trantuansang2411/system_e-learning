export function parsePrice(value: unknown): number {
    if (typeof value === "number") {
        return Number.isFinite(value) ? value : 0;
    }

    if (typeof value === "bigint") {
        return Number(value);
    }

    const raw = String(value ?? "").trim();
    if (!raw) {
        return 0;
    }

    const isNegative = raw.startsWith("-");
    const digitsOnly = raw.replace(/\D/g, "");
    if (!digitsOnly) {
        return 0;
    }

    const parsed = Number(digitsOnly);
    if (!Number.isFinite(parsed)) {
        return 0;
    }

    return isNegative ? -parsed : parsed;
}

export function formatPrice(price: unknown): string {
    return `${parsePrice(price).toLocaleString("vi-VN")}đ`;
}