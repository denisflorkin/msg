import { lt } from '../utils'

export const c = [
  {
    range: 4,
    name: "c",
    // beatPosition: 0,
    type: "half"
  },
  {
    range: 4,
    name: "d",
    // beatPosition: 1,
    type: "half"
  },
  {
    range: 4,
    name: "e",
    // beatPosition: 2,
    type: "half"
  },
  {
    range: 4,
    name: "f",
    // beatPosition: 3,
    type: "half"
  },
  {
    range: 4,
    name: "g",
    // beatPosition: 4,
    type: "half"
  },
  {
    range: 4,
    name: "a",
    // beatPosition: 5,
    type: "half"
  },
  {
    range: 4,
    name: "b",
    // beatPosition: 6,
    type: "half"
  },
  {
    range: 5,
    name: "c",
    // beatPosition: 7,
    type: "half"
  }
];

export const d = [
  {
    range: 4,
    name: "d",
    // beatPosition: lt(8, 1, 7, 1, 4),
    type: "half"
  },
  {
    range: 4,
    name: "e",
    // beatPosition: lt(9, 1, 7, 1, 4),
    type: "half"
  },
  {
    range: 4,
    name: "f",
    sharp: true,
    // beatPosition: lt(10, 1, 7, 1, 4),
    type: "half"
  },
  {
    range: 4,
    name: "g",
    // beatPosition: lt(11, 1, 7, 1, 4),
    type: "half"
  },
  {
    range: 4,
    name: "a",
    // beatPosition: lt(12, 1, 7, 1, 4),
    type: "half"
  },
  {
    range: 4,
    name: "b",
    // beatPosition: lt(13, 1, 7, 1, 4),
    type: "half"
  },
  {
    range: 5,
    name: "c",
    sharp: true,
    // beatPosition: lt(14, 1, 7, 1, 4),
    type: "half"
  },
  {
    range: 5,
    name: "d",
    // beatPosition: lt(15, 1, 7, 1, 4),
    type: "half"
  }
];

export const e = [
  {
    range: 4,
    name: "e",
    beatPosition: lt(16, 1, 7, 1, 4),
    type: "half"
  },
  {
    range: 4,
    name: "f",
    sharp: true,
    beatPosition: lt(17, 1, 7, 1, 4),
    type: "half"
  },
  {
    range: 4,
    name: "g",
    sharp: true,
    beatPosition: lt(18, 1, 7, 1, 4),
    type: "half"
  },
  {
    range: 4,
    name: "a",
    beatPosition: lt(19, 1, 7, 1, 4),
    type: "half"
  },
  {
    range: 4,
    name: "b",
    beatPosition: lt(20, 1, 7, 1, 4),
    type: "half"
  },
  {
    range: 5,
    name: "c",
    sharp: true,
    beatPosition: lt(21, 1, 7, 1, 4),
    type: "half"
  },
  {
    range: 5,
    name: "d",
    sharp: true,
    beatPosition: lt(22, 1, 7, 1, 4),
    type: "half"
  },
  {
    range: 5,
    name: "e",
    beatPosition: lt(23, 1, 7, 1, 4),
    type: "half"
  }
];


export default {
  c,
  d,
  e,
}
