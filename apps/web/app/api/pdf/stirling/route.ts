import { NextResponse } from "next/server";
import { checkStirlingStatus } from "@/lib/stirling";

export async function GET() {
  const status = await checkStirlingStatus();
  return NextResponse.json(status);
}
