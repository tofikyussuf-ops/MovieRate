export default function average(arr) {
  const nums = (arr || [])
    .map((v) => Number(v))
    .filter((n) => !Number.isNaN(n));
  if (nums.length === 0) return 0;
  const sum = nums.reduce((a, b) => a + b, 0);
  return sum / nums.length;
}
