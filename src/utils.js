// lt(5, 0, 10, 0, 100) // 50 : [0-5-10] => [0, 50, 100]
// [a-x-b] => [c, x, d]
export const lt = (x, a, b, c, d) => ((x - a) / (b - c)) * (d - c) + c;
