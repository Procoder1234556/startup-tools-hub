import type { CategoryId } from "@/lib/categories";
import type { MicroToolDef } from "../types";

type UnitDef = { label: string; toBase: (v: number) => number; fromBase: (v: number) => number };

function pairTools(
  group: string,
  units: Record<string, UnitDef>,
  category: CategoryId,
  iconColor: string
): MicroToolDef[] {
  const ids = Object.keys(units);
  const out: MicroToolDef[] = [];
  for (const fromId of ids) {
    for (const toId of ids) {
      if (fromId === toId) continue;
      const from = units[fromId];
      const to = units[toId];
      const slug = `convert-${group}-${fromId}-to-${toId}`.replace(/_/g, "-");
      out.push({
        slug,
        name: `${from.label} to ${to.label}`,
        description: `Convert ${from.label.toLowerCase()} to ${to.label.toLowerCase()} instantly in your browser.`,
        category,
        kind: "unit-convert",
        iconColor,
        unitConvert: {
          fromId,
          fromLabel: from.label,
          toId,
          toLabel: to.label,
          factor: 1,
          convert: (value) => to.fromBase(from.toBase(value)),
        },
      });
    }
  }
  return out;
}

const length: Record<string, UnitDef> = {
  meter: { label: "Meters", toBase: (v) => v, fromBase: (v) => v },
  kilometer: { label: "Kilometers", toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
  centimeter: { label: "Centimeters", toBase: (v) => v / 100, fromBase: (v) => v * 100 },
  millimeter: { label: "Millimeters", toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
  mile: { label: "Miles", toBase: (v) => v * 1609.344, fromBase: (v) => v / 1609.344 },
  yard: { label: "Yards", toBase: (v) => v * 0.9144, fromBase: (v) => v / 0.9144 },
  foot: { label: "Feet", toBase: (v) => v * 0.3048, fromBase: (v) => v / 0.3048 },
  inch: { label: "Inches", toBase: (v) => v * 0.0254, fromBase: (v) => v / 0.0254 },
  nautical_mile: { label: "Nautical miles", toBase: (v) => v * 1852, fromBase: (v) => v / 1852 },
};

const mass: Record<string, UnitDef> = {
  kilogram: { label: "Kilograms", toBase: (v) => v, fromBase: (v) => v },
  gram: { label: "Grams", toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
  milligram: { label: "Milligrams", toBase: (v) => v / 1e6, fromBase: (v) => v * 1e6 },
  pound: { label: "Pounds", toBase: (v) => v * 0.45359237, fromBase: (v) => v / 0.45359237 },
  ounce: { label: "Ounces", toBase: (v) => v * 0.028349523125, fromBase: (v) => v / 0.028349523125 },
  stone: { label: "Stone", toBase: (v) => v * 6.35029318, fromBase: (v) => v / 6.35029318 },
  ton_us: { label: "US tons", toBase: (v) => v * 907.18474, fromBase: (v) => v / 907.18474 },
  ton_metric: { label: "Metric tons", toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
};

const volume: Record<string, UnitDef> = {
  liter: { label: "Liters", toBase: (v) => v, fromBase: (v) => v },
  milliliter: { label: "Milliliters", toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
  gallon_us: { label: "US gallons", toBase: (v) => v * 3.785411784, fromBase: (v) => v / 3.785411784 },
  quart_us: { label: "US quarts", toBase: (v) => v * 0.946352946, fromBase: (v) => v / 0.946352946 },
  pint_us: { label: "US pints", toBase: (v) => v * 0.473176473, fromBase: (v) => v / 0.473176473 },
  cup_us: { label: "US cups", toBase: (v) => v * 0.2365882365, fromBase: (v) => v / 0.2365882365 },
  floz_us: { label: "US fluid ounces", toBase: (v) => v * 0.0295735295625, fromBase: (v) => v / 0.0295735295625 },
  cubic_meter: { label: "Cubic meters", toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
};

const area: Record<string, UnitDef> = {
  sq_meter: { label: "Square meters", toBase: (v) => v, fromBase: (v) => v },
  sq_kilometer: { label: "Square kilometers", toBase: (v) => v * 1e6, fromBase: (v) => v / 1e6 },
  sq_foot: { label: "Square feet", toBase: (v) => v * 0.09290304, fromBase: (v) => v / 0.09290304 },
  sq_inch: { label: "Square inches", toBase: (v) => v * 0.00064516, fromBase: (v) => v / 0.00064516 },
  acre: { label: "Acres", toBase: (v) => v * 4046.8564224, fromBase: (v) => v / 4046.8564224 },
  hectare: { label: "Hectares", toBase: (v) => v * 10000, fromBase: (v) => v / 10000 },
};

const speed: Record<string, UnitDef> = {
  mps: { label: "Meters per second", toBase: (v) => v, fromBase: (v) => v },
  kph: { label: "Kilometers per hour", toBase: (v) => v / 3.6, fromBase: (v) => v * 3.6 },
  mph: { label: "Miles per hour", toBase: (v) => v * 0.44704, fromBase: (v) => v / 0.44704 },
  knot: { label: "Knots", toBase: (v) => v * 0.514444, fromBase: (v) => v / 0.514444 },
  fps: { label: "Feet per second", toBase: (v) => v * 0.3048, fromBase: (v) => v / 0.3048 },
};

const time: Record<string, UnitDef> = {
  second: { label: "Seconds", toBase: (v) => v, fromBase: (v) => v },
  minute: { label: "Minutes", toBase: (v) => v * 60, fromBase: (v) => v / 60 },
  hour: { label: "Hours", toBase: (v) => v * 3600, fromBase: (v) => v / 3600 },
  day: { label: "Days", toBase: (v) => v * 86400, fromBase: (v) => v / 86400 },
  week: { label: "Weeks", toBase: (v) => v * 604800, fromBase: (v) => v / 604800 },
  month: { label: "Months (30d)", toBase: (v) => v * 2592000, fromBase: (v) => v / 2592000 },
  year: { label: "Years (365d)", toBase: (v) => v * 31536000, fromBase: (v) => v / 31536000 },
};

const dataDecimal: Record<string, UnitDef> = {
  byte: { label: "Bytes", toBase: (v) => v, fromBase: (v) => v },
  kilobyte: { label: "Kilobytes (KB)", toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
  megabyte: { label: "Megabytes (MB)", toBase: (v) => v * 1e6, fromBase: (v) => v / 1e6 },
  gigabyte: { label: "Gigabytes (GB)", toBase: (v) => v * 1e9, fromBase: (v) => v / 1e9 },
  terabyte: { label: "Terabytes (TB)", toBase: (v) => v * 1e12, fromBase: (v) => v / 1e12 },
  kibibyte: { label: "Kibibytes (KiB)", toBase: (v) => v * 1024, fromBase: (v) => v / 1024 },
  mebibyte: { label: "Mebibytes (MiB)", toBase: (v) => v * 1024 ** 2, fromBase: (v) => v / 1024 ** 2 },
  gibibyte: { label: "Gibibytes (GiB)", toBase: (v) => v * 1024 ** 3, fromBase: (v) => v / 1024 ** 3 },
};

const pressure: Record<string, UnitDef> = {
  pascal: { label: "Pascals", toBase: (v) => v, fromBase: (v) => v },
  kilopascal: { label: "Kilopascals", toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
  bar: { label: "Bar", toBase: (v) => v * 100000, fromBase: (v) => v / 100000 },
  psi: { label: "PSI", toBase: (v) => v * 6894.757293168, fromBase: (v) => v / 6894.757293168 },
  atm: { label: "Atmospheres", toBase: (v) => v * 101325, fromBase: (v) => v / 101325 },
};

const energy: Record<string, UnitDef> = {
  joule: { label: "Joules", toBase: (v) => v, fromBase: (v) => v },
  kilojoule: { label: "Kilojoules", toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
  calorie: { label: "Calories", toBase: (v) => v * 4.184, fromBase: (v) => v / 4.184 },
  kilocalorie: { label: "Kilocalories", toBase: (v) => v * 4184, fromBase: (v) => v / 4184 },
  watt_hour: { label: "Watt-hours", toBase: (v) => v * 3600, fromBase: (v) => v / 3600 },
  kilowatt_hour: { label: "Kilowatt-hours", toBase: (v) => v * 3.6e6, fromBase: (v) => v / 3.6e6 },
};

const angle: Record<string, UnitDef> = {
  degree: { label: "Degrees", toBase: (v) => v, fromBase: (v) => v },
  radian: { label: "Radians", toBase: (v) => (v * 180) / Math.PI, fromBase: (v) => (v * Math.PI) / 180 },
  gradian: { label: "Gradians", toBase: (v) => v * 0.9, fromBase: (v) => v / 0.9 },
};

const frequency: Record<string, UnitDef> = {
  hz: { label: "Hertz", toBase: (v) => v, fromBase: (v) => v },
  khz: { label: "Kilohertz", toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
  mhz: { label: "Megahertz", toBase: (v) => v * 1e6, fromBase: (v) => v / 1e6 },
  ghz: { label: "Gigahertz", toBase: (v) => v * 1e9, fromBase: (v) => v / 1e9 },
};

const force: Record<string, UnitDef> = {
  newton: { label: "Newtons", toBase: (v) => v, fromBase: (v) => v },
  kilonewton: { label: "Kilonewtons", toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
  lbf: { label: "Pounds-force", toBase: (v) => v * 4.4482216153, fromBase: (v) => v / 4.4482216153 },
  kgf: { label: "Kilogram-force", toBase: (v) => v * 9.80665, fromBase: (v) => v / 9.80665 },
};

const power: Record<string, UnitDef> = {
  watt: { label: "Watts", toBase: (v) => v, fromBase: (v) => v },
  kilowatt: { label: "Kilowatts", toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
  megawatt: { label: "Megawatts", toBase: (v) => v * 1e6, fromBase: (v) => v / 1e6 },
  horsepower: { label: "Horsepower", toBase: (v) => v * 745.699872, fromBase: (v) => v / 745.699872 },
};

function temperatureTools(): MicroToolDef[] {
  const scales: Record<string, { label: string; toC: (v: number) => number; fromC: (v: number) => number }> = {
    celsius: { label: "Celsius", toC: (v) => v, fromC: (v) => v },
    fahrenheit: { label: "Fahrenheit", toC: (v) => (v - 32) * (5 / 9), fromC: (v) => v * (9 / 5) + 32 },
    kelvin: { label: "Kelvin", toC: (v) => v - 273.15, fromC: (v) => v + 273.15 },
  };
  const ids = Object.keys(scales);
  const out: MicroToolDef[] = [];
  for (const fromId of ids) {
    for (const toId of ids) {
      if (fromId === toId) continue;
      const from = scales[fromId];
      const to = scales[toId];
      out.push({
        slug: `convert-temp-${fromId}-to-${toId}`,
        name: `${from.label} to ${to.label}`,
        description: `Convert ${from.label.toLowerCase()} to ${to.label.toLowerCase()} with precise formulas.`,
        category: "calc",
        kind: "unit-convert",
        iconColor: "text-indigo-600",
        unitConvert: {
          fromId,
          fromLabel: from.label,
          toId,
          toLabel: to.label,
          factor: 1,
          convert: (value) => to.fromC(from.toC(value)),
        },
      });
    }
  }
  return out;
}

export function generateUnitMicroTools(): MicroToolDef[] {
  return [
    ...pairTools("length", length, "calc", "text-indigo-600"),
    ...pairTools("mass", mass, "calc", "text-indigo-600"),
    ...pairTools("volume", volume, "calc", "text-indigo-600"),
    ...pairTools("area", area, "calc", "text-indigo-600"),
    ...pairTools("speed", speed, "calc", "text-indigo-600"),
    ...pairTools("time", time, "calc", "text-indigo-600"),
    ...pairTools("data", dataDecimal, "calc", "text-indigo-600"),
    ...pairTools("pressure", pressure, "calc", "text-indigo-600"),
    ...pairTools("energy", energy, "calc", "text-indigo-600"),
    ...pairTools("angle", angle, "calc", "text-indigo-600"),
    ...pairTools("frequency", frequency, "calc", "text-indigo-600"),
    ...pairTools("force", force, "calc", "text-indigo-600"),
    ...pairTools("power", power, "calc", "text-indigo-600"),
    ...temperatureTools(),
  ];
}
