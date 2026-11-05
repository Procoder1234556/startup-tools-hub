import type { CategoryId } from "@/lib/categories";

export type MicroToolKind =
  | "unit-convert"
  | "text-transform"
  | "math-formula"
  | "color-convert"
  | "number-base";

export type UnitConvertConfig = {
  fromId: string;
  fromLabel: string;
  toId: string;
  toLabel: string;
  /** Multiply input by this to get output (after optional pre/post hooks). */
  factor: number;
  /** For temperature etc. */
  convert?: (value: number) => number;
};

export type TextTransformConfig = {
  transformId: string;
  label: string;
};

export type MathFormulaConfig = {
  formulaId: string;
  inputs: { id: string; label: string; defaultValue?: number; unit?: string }[];
  compute: (values: Record<string, number>) => number;
  resultLabel: string;
  resultUnit?: string;
};

export type ColorConvertConfig = {
  mode: "hex-rgb" | "rgb-hex" | "hex-hsl" | "hsl-hex";
};

export type NumberBaseConfig = {
  fromBase: 2 | 8 | 10 | 16;
  toBase: 2 | 8 | 10 | 16;
};

export type MicroToolDef = {
  slug: string;
  name: string;
  description: string;
  category: CategoryId;
  kind: MicroToolKind;
  iconColor: string;
  unitConvert?: UnitConvertConfig;
  textTransform?: TextTransformConfig;
  mathFormula?: MathFormulaConfig;
  colorConvert?: ColorConvertConfig;
  numberBase?: NumberBaseConfig;
};
