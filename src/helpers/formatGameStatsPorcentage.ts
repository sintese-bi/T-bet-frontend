export function formatGameStats(value: string) {
  return `${value}%`;
}

export function formatGameRateStats(value: number) {
  return `${(value * 100).toFixed(1)}%`;
}
