import type { MicroToolDef } from "../types";

type Formula = {
  id: string;
  name: string;
  description: string;
  inputs: { id: string; label: string; defaultValue?: number; unit?: string }[];
  compute: (v: Record<string, number>) => number;
  resultLabel: string;
  resultUnit?: string;
};

const formulas: Formula[] = [
  {
    id: "circle-area",
    name: "Circle area",
    description: "Compute area from radius (πr²).",
    inputs: [{ id: "r", label: "Radius", defaultValue: 1, unit: "m" }],
    compute: (v) => Math.PI * v.r ** 2,
    resultLabel: "Area",
    resultUnit: "m²",
  },
  {
    id: "circle-circumference",
    name: "Circle circumference",
    description: "Compute circumference from radius (2πr).",
    inputs: [{ id: "r", label: "Radius", defaultValue: 1, unit: "m" }],
    compute: (v) => 2 * Math.PI * v.r,
    resultLabel: "Circumference",
    resultUnit: "m",
  },
  {
    id: "sphere-volume",
    name: "Sphere volume",
    description: "Volume of a sphere from radius.",
    inputs: [{ id: "r", label: "Radius", defaultValue: 1, unit: "m" }],
    compute: (v) => (4 / 3) * Math.PI * v.r ** 3,
    resultLabel: "Volume",
    resultUnit: "m³",
  },
  {
    id: "sphere-surface",
    name: "Sphere surface area",
    description: "Surface area of a sphere (4πr²).",
    inputs: [{ id: "r", label: "Radius", defaultValue: 1, unit: "m" }],
    compute: (v) => 4 * Math.PI * v.r ** 2,
    resultLabel: "Surface area",
    resultUnit: "m²",
  },
  {
    id: "cylinder-volume",
    name: "Cylinder volume",
    description: "Volume πr²h.",
    inputs: [
      { id: "r", label: "Radius", defaultValue: 1, unit: "m" },
      { id: "h", label: "Height", defaultValue: 2, unit: "m" },
    ],
    compute: (v) => Math.PI * v.r ** 2 * v.h,
    resultLabel: "Volume",
    resultUnit: "m³",
  },
  {
    id: "rectangle-area",
    name: "Rectangle area",
    description: "Area from width and height.",
    inputs: [
      { id: "w", label: "Width", defaultValue: 4, unit: "m" },
      { id: "h", label: "Height", defaultValue: 3, unit: "m" },
    ],
    compute: (v) => v.w * v.h,
    resultLabel: "Area",
    resultUnit: "m²",
  },
  {
    id: "triangle-area",
    name: "Triangle area",
    description: "Area ½ × base × height.",
    inputs: [
      { id: "b", label: "Base", defaultValue: 6, unit: "m" },
      { id: "h", label: "Height", defaultValue: 4, unit: "m" },
    ],
    compute: (v) => 0.5 * v.b * v.h,
    resultLabel: "Area",
    resultUnit: "m²",
  },
  {
    id: "pythagorean",
    name: "Pythagorean theorem",
    description: "Hypotenuse c from legs a and b.",
    inputs: [
      { id: "a", label: "Leg a", defaultValue: 3 },
      { id: "b", label: "Leg b", defaultValue: 4 },
    ],
    compute: (v) => Math.sqrt(v.a ** 2 + v.b ** 2),
    resultLabel: "Hypotenuse c",
  },
  {
    id: "quadratic-discriminant",
    name: "Quadratic discriminant",
    description: "Discriminant b² − 4ac for ax² + bx + c.",
    inputs: [
      { id: "a", label: "a", defaultValue: 1 },
      { id: "b", label: "b", defaultValue: -3 },
      { id: "c", label: "c", defaultValue: 2 },
    ],
    compute: (v) => v.b ** 2 - 4 * v.a * v.c,
    resultLabel: "Discriminant",
  },
  {
    id: "compound-interest",
    name: "Compound interest",
    description: "Future value with compound interest.",
    inputs: [
      { id: "p", label: "Principal", defaultValue: 1000, unit: "$" },
      { id: "r", label: "Annual rate (%)", defaultValue: 5 },
      { id: "n", label: "Compounds / year", defaultValue: 12 },
      { id: "t", label: "Years", defaultValue: 10 },
    ],
    compute: (v) => v.p * (1 + v.r / 100 / v.n) ** (v.n * v.t),
    resultLabel: "Future value",
    resultUnit: "$",
  },
  {
    id: "simple-interest",
    name: "Simple interest",
    description: "Interest I = P × r × t.",
    inputs: [
      { id: "p", label: "Principal", defaultValue: 1000, unit: "$" },
      { id: "r", label: "Annual rate (%)", defaultValue: 5 },
      { id: "t", label: "Years", defaultValue: 3 },
    ],
    compute: (v) => v.p * (v.r / 100) * v.t,
    resultLabel: "Interest earned",
    resultUnit: "$",
  },
  {
    id: "loan-payment",
    name: "Loan payment",
    description: "Monthly payment for amortizing loan.",
    inputs: [
      { id: "p", label: "Loan amount", defaultValue: 200000, unit: "$" },
      { id: "r", label: "Annual rate (%)", defaultValue: 6 },
      { id: "n", label: "Months", defaultValue: 360 },
    ],
    compute: (v) => {
      const mr = v.r / 100 / 12;
      if (mr === 0) return v.p / v.n;
      return (v.p * mr * (1 + mr) ** v.n) / ((1 + mr) ** v.n - 1);
    },
    resultLabel: "Monthly payment",
    resultUnit: "$",
  },
  {
    id: "percent-change",
    name: "Percent change",
    description: "Percentage change from old to new value.",
    inputs: [
      { id: "old", label: "Old value", defaultValue: 100 },
      { id: "new", label: "New value", defaultValue: 125 },
    ],
    compute: (v) => (v.old === 0 ? 0 : ((v.new - v.old) / v.old) * 100),
    resultLabel: "Change",
    resultUnit: "%",
  },
  {
    id: "percent-of",
    name: "Percent of number",
    description: "What is X% of Y?",
    inputs: [
      { id: "pct", label: "Percent", defaultValue: 15, unit: "%" },
      { id: "num", label: "Number", defaultValue: 200 },
    ],
    compute: (v) => (v.pct / 100) * v.num,
    resultLabel: "Result",
  },
  {
    id: "markup",
    name: "Markup price",
    description: "Selling price after markup percent on cost.",
    inputs: [
      { id: "cost", label: "Cost", defaultValue: 50, unit: "$" },
      { id: "markup", label: "Markup %", defaultValue: 40, unit: "%" },
    ],
    compute: (v) => v.cost * (1 + v.markup / 100),
    resultLabel: "Price",
    resultUnit: "$",
  },
  {
    id: "margin",
    name: "Profit margin",
    description: "Margin % from revenue and cost.",
    inputs: [
      { id: "rev", label: "Revenue", defaultValue: 100, unit: "$" },
      { id: "cost", label: "Cost", defaultValue: 60, unit: "$" },
    ],
    compute: (v) => (v.rev === 0 ? 0 : ((v.rev - v.cost) / v.rev) * 100),
    resultLabel: "Margin",
    resultUnit: "%",
  },
  {
    id: "roi",
    name: "Return on investment",
    description: "ROI % from gain and cost.",
    inputs: [
      { id: "gain", label: "Gain", defaultValue: 1500, unit: "$" },
      { id: "cost", label: "Cost", defaultValue: 1000, unit: "$" },
    ],
    compute: (v) => (v.cost === 0 ? 0 : (v.gain / v.cost) * 100),
    resultLabel: "ROI",
    resultUnit: "%",
  },
  {
    id: "burn-multiple",
    name: "Burn multiple",
    description: "Net burn divided by net new ARR (startup metric).",
    inputs: [
      { id: "burn", label: "Net burn", defaultValue: 100000, unit: "$" },
      { id: "arr", label: "Net new ARR", defaultValue: 50000, unit: "$" },
    ],
    compute: (v) => (v.arr === 0 ? 0 : v.burn / v.arr),
    resultLabel: "Burn multiple",
  },
  {
    id: "cac-payback",
    name: "CAC payback months",
    description: "Months to recover CAC from gross margin per customer.",
    inputs: [
      { id: "cac", label: "CAC", defaultValue: 300, unit: "$" },
      { id: "gm", label: "Gross margin / mo", defaultValue: 50, unit: "$" },
    ],
    compute: (v) => (v.gm === 0 ? 0 : v.cac / v.gm),
    resultLabel: "Payback",
    resultUnit: "months",
  },
  {
    id: "rule-of-40",
    name: "Rule of 40",
    description: "Growth rate % + profit margin %.",
    inputs: [
      { id: "growth", label: "Growth %", defaultValue: 30, unit: "%" },
      { id: "margin", label: "Profit margin %", defaultValue: 5, unit: "%" },
    ],
    compute: (v) => v.growth + v.margin,
    resultLabel: "Rule of 40 score",
    resultUnit: "%",
  },
  {
    id: "log10",
    name: "Log base 10",
    description: "Common logarithm log₁₀(x).",
    inputs: [{ id: "x", label: "x", defaultValue: 100 }],
    compute: (v) => (v.x <= 0 ? NaN : Math.log10(v.x)),
    resultLabel: "log₁₀(x)",
  },
  {
    id: "ln",
    name: "Natural log",
    description: "Natural logarithm ln(x).",
    inputs: [{ id: "x", label: "x", defaultValue: 2.718 }],
    compute: (v) => (v.x <= 0 ? NaN : Math.log(v.x)),
    resultLabel: "ln(x)",
  },
  {
    id: "exp",
    name: "Exponential e^x",
    description: "Euler's number to the power x.",
    inputs: [{ id: "x", label: "x", defaultValue: 1 }],
    compute: (v) => Math.exp(v.x),
    resultLabel: "e^x",
  },
  {
    id: "power",
    name: "Power x^y",
    description: "Raise x to the power y.",
    inputs: [
      { id: "x", label: "Base x", defaultValue: 2 },
      { id: "y", label: "Exponent y", defaultValue: 10 },
    ],
    compute: (v) => v.x ** v.y,
    resultLabel: "x^y",
  },
  {
    id: "sqrt",
    name: "Square root",
    description: "Square root of x.",
    inputs: [{ id: "x", label: "x", defaultValue: 144 }],
    compute: (v) => (v.x < 0 ? NaN : Math.sqrt(v.x)),
    resultLabel: "√x",
  },
  {
    id: "factorial",
    name: "Factorial",
    description: "n! for non-negative integers up to 170.",
    inputs: [{ id: "n", label: "n", defaultValue: 5 }],
    compute: (v) => {
      const n = Math.floor(v.n);
      if (n < 0 || n > 170) return NaN;
      let r = 1;
      for (let i = 2; i <= n; i++) r *= i;
      return r;
    },
    resultLabel: "n!",
  },
  {
    id: "gcd",
    name: "Greatest common divisor",
    description: "GCD of two integers.",
    inputs: [
      { id: "a", label: "a", defaultValue: 48 },
      { id: "b", label: "b", defaultValue: 18 },
    ],
    compute: (v) => gcd(Math.abs(Math.floor(v.a)), Math.abs(Math.floor(v.b))),
    resultLabel: "GCD",
  },
  {
    id: "lcm",
    name: "Least common multiple",
    description: "LCM of two integers.",
    inputs: [
      { id: "a", label: "a", defaultValue: 12 },
      { id: "b", label: "b", defaultValue: 18 },
    ],
    compute: (v) => {
      const a = Math.abs(Math.floor(v.a));
      const b = Math.abs(Math.floor(v.b));
      if (a === 0 || b === 0) return 0;
      return (a * b) / gcd(a, b);
    },
    resultLabel: "LCM",
  },
  {
    id: "mod",
    name: "Modulo",
    description: "Remainder of a divided by b.",
    inputs: [
      { id: "a", label: "a", defaultValue: 17 },
      { id: "b", label: "b", defaultValue: 5 },
    ],
    compute: (v) => (v.b === 0 ? NaN : v.a % v.b),
    resultLabel: "a mod b",
  },
  {
    id: "average",
    name: "Average of two numbers",
    description: "Arithmetic mean of a and b.",
    inputs: [
      { id: "a", label: "a", defaultValue: 10 },
      { id: "b", label: "b", defaultValue: 20 },
    ],
    compute: (v) => (v.a + v.b) / 2,
    resultLabel: "Average",
  },
  {
    id: "distance-2d",
    name: "2D distance",
    description: "Distance between points (x1,y1) and (x2,y2).",
    inputs: [
      { id: "x1", label: "x1", defaultValue: 0 },
      { id: "y1", label: "y1", defaultValue: 0 },
      { id: "x2", label: "x2", defaultValue: 3 },
      { id: "y2", label: "y2", defaultValue: 4 },
    ],
    compute: (v) => Math.hypot(v.x2 - v.x1, v.y2 - v.y1),
    resultLabel: "Distance",
  },
  {
    id: "midpoint",
    name: "Midpoint",
    description: "Midpoint x-coordinate between x1 and x2.",
    inputs: [
      { id: "x1", label: "x1", defaultValue: 2 },
      { id: "x2", label: "x2", defaultValue: 8 },
    ],
    compute: (v) => (v.x1 + v.x2) / 2,
    resultLabel: "Midpoint x",
  },
  {
    id: "slope",
    name: "Line slope",
    description: "Slope m between two points.",
    inputs: [
      { id: "x1", label: "x1", defaultValue: 1 },
      { id: "y1", label: "y1", defaultValue: 2 },
      { id: "x2", label: "x2", defaultValue: 4 },
      { id: "y2", label: "y2", defaultValue: 8 },
    ],
    compute: (v) => (v.x2 - v.x1 === 0 ? NaN : (v.y2 - v.y1) / (v.x2 - v.x1)),
    resultLabel: "Slope m",
  },
];

function gcd(a: number, b: number): number {
  while (b) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a;
}

export function generateMathMicroTools(): MicroToolDef[] {
  return formulas.map((f) => ({
    slug: `math-${f.id}`,
    name: f.name,
    description: f.description,
    category: "calc" as const,
    kind: "math-formula" as const,
    iconColor: "text-indigo-600",
    mathFormula: {
      formulaId: f.id,
      inputs: f.inputs,
      compute: f.compute,
      resultLabel: f.resultLabel,
      resultUnit: f.resultUnit,
    },
  }));
}
