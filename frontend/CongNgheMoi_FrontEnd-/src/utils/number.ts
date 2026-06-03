export type NumericLike = number | string | null | undefined;

export function toFiniteNumber(value: NumericLike, fallback = 0): number {
  const normalized = typeof value === "string" ? Number(value.trim()) : Number(value);
  return Number.isFinite(normalized) ? normalized : fallback;
}

export function toSafeInt(value: NumericLike, fallback = 0): number {
  return Math.max(0, Math.round(toFiniteNumber(value, fallback)));
}
