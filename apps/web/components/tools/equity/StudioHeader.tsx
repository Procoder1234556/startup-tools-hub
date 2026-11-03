"use client";

import type { EquityMode } from "@/lib/finance/equity/types";

import { ModeSwitch } from "./ModeSwitch";

interface StudioHeaderProps {
  mode: EquityMode;
  onModeChange: (mode: EquityMode) => void;
}

export function StudioHeader({ mode, onModeChange }: StudioHeaderProps) {
  return (
    <header className="studio-header">
      <div className="brand-lockup">
        <span>
          <strong>Employee equity</strong>
          <small>Startup Tools Hub · OSS port</small>
        </span>
      </div>
      <div className="studio-header-actions">
        <ModeSwitch value={mode} onChange={onModeChange} />
      </div>
    </header>
  );
}
