"use client";

import { useState, useMemo } from "react";
import { Copy, Check, Clock, Calendar, Sparkles, HelpCircle } from "lucide-react";

interface CronPreset {
  name: string;
  expression: string;
  description: string;
}

const PRESETS: CronPreset[] = [
  { name: "Every minute", expression: "* * * * *", description: "Runs every single minute" },
  { name: "Every 5 minutes", expression: "*/5 * * * *", description: "Runs at :00, :05, :10, :15, etc." },
  { name: "Every 15 minutes", expression: "*/15 * * * *", description: "Runs at :00, :15, :30, :45" },
  { name: "Every hour at :00", expression: "0 * * * *", description: "Runs at the top of every hour" },
  { name: "Every day at midnight", expression: "0 0 * * *", description: "Runs at 00:00 every day" },
  { name: "Every day at 9:00 AM", expression: "0 9 * * *", description: "Runs at 09:00 every day" },
  { name: "Weekdays at 9:00 AM", expression: "0 9 * * 1-5", description: "Runs Monday through Friday at 09:00" },
  { name: "Weekly on Sunday midnight", expression: "0 0 * * 0", description: "Runs every Sunday at 00:00" },
  { name: "Monthly on the 1st", expression: "0 0 1 * *", description: "Runs at 00:00 on the 1st of every month" },
];

export default function CronGeneratorPage() {
  const [minute, setMinute] = useState("*");
  const [hour, setHour] = useState("*");
  const [dayOfMonth, setDayOfMonth] = useState("*");
  const [month, setMonth] = useState("*");
  const [dayOfWeek, setDayOfWeek] = useState("*");
  const [copied, setCopied] = useState(false);

  const cronExpression = `${minute} ${hour} ${dayOfMonth} ${month} ${dayOfWeek}`.trim();

  const handleApplyPreset = (expr: string) => {
    const parts = expr.split(/\s+/);
    if (parts.length === 5) {
      setMinute(parts[0]);
      setHour(parts[1]);
      setDayOfMonth(parts[2]);
      setMonth(parts[3]);
      setDayOfWeek(parts[4]);
    }
  };

  const humanReadable = useMemo(() => {
    try {
      let desc = "Runs ";

      // Minute
      if (minute === "*") desc += "every minute";
      else if (minute.startsWith("*/")) desc += `every ${minute.replace("*/", "")} minutes`;
      else desc += `at minute ${minute}`;

      // Hour
      if (hour === "*") desc += ", every hour";
      else if (hour.startsWith("*/")) desc += `, every ${hour.replace("*/", "")} hours`;
      else desc += `, at ${hour.padStart(2, "0")}:00`;

      // Day of month
      if (dayOfMonth === "*") desc += ", every day of the month";
      else desc += `, on day ${dayOfMonth} of the month`;

      // Month
      if (month !== "*") desc += `, in month ${month}`;

      // Day of week
      if (dayOfWeek === "*") desc += ", every day of the week";
      else if (dayOfWeek === "1-5") desc += ", Monday through Friday";
      else if (dayOfWeek === "0,6" || dayOfWeek === "6,0") desc += ", on Saturday and Sunday";
      else {
        const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const num = parseInt(dayOfWeek);
        if (!isNaN(num) && days[num]) desc += `, on ${days[num]}`;
        else desc += `, on day-of-week ${dayOfWeek}`;
      }

      return desc + ".";
    } catch {
      return "Custom cron expression";
    }
  }, [minute, hour, dayOfMonth, month, dayOfWeek]);

  // Estimate next 5 run times based on current expression
  const nextRunTimes = useMemo(() => {
    const results: string[] = [];
    const now = new Date();
    let current = new Date(now.getTime() + 60000); // start next minute
    current.setSeconds(0, 0);

    const mVal = minute;
    const hVal = hour;
    const dowVal = dayOfWeek;

    for (let i = 0; i < 500 && results.length < 5; i++) {
      const curM = current.getMinutes();
      const curH = current.getHours();
      const curDOW = current.getDay();

      let matchM = mVal === "*";
      if (!matchM) {
        if (mVal.startsWith("*/")) matchM = curM % parseInt(mVal.slice(2)) === 0;
        else matchM = parseInt(mVal) === curM;
      }

      let matchH = hVal === "*";
      if (!matchH) {
        if (hVal.startsWith("*/")) matchH = curH % parseInt(hVal.slice(2)) === 0;
        else matchH = parseInt(hVal) === curH;
      }

      let matchDOW = dowVal === "*";
      if (!matchDOW) {
        if (dowVal === "1-5") matchDOW = curDOW >= 1 && curDOW <= 5;
        else if (dowVal === "0,6" || dowVal === "6,0") matchDOW = curDOW === 0 || curDOW === 6;
        else matchDOW = parseInt(dowVal) === curDOW;
      }

      if (matchM && matchH && matchDOW) {
        results.push(
          current.toLocaleString(undefined, {
            weekday: "short",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })
        );
      }

      current = new Date(current.getTime() + 60000);
    }

    return results;
  }, [minute, hour, dayOfWeek]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(cronExpression);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Crontab / Cron Expression Generator</h1>
        <p className="mt-3 text-gray-600">
          Build, inspect, and explain cron schedule expressions with human-readable descriptions and upcoming run times.
        </p>
      </div>

      {/* Main Display Card */}
      <div className="rounded-2xl border bg-white p-6 sm:p-8 shadow-sm border-gray-200">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-gray-900 text-white font-mono text-xl sm:text-2xl tracking-wider">
          <div className="flex items-center gap-3">
            <Clock className="w-6 h-6 text-emerald-400" />
            <span>{cronExpression}</span>
          </div>

          <button
            onClick={copyToClipboard}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-sans font-medium transition"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copy Expression
              </>
            )}
          </button>
        </div>

        {/* Human explanation */}
        <div className="mt-4 p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
          <div>
            <p className="text-xs font-semibold text-emerald-900 uppercase tracking-wider">Human Interpretation</p>
            <p className="text-sm font-medium text-emerald-800 mt-0.5">{humanReadable}</p>
          </div>
        </div>

        {/* 5 Field Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 mt-8">
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
              Minute (0-59)
            </label>
            <select
              value={minute}
              onChange={(e) => setMinute(e.target.value)}
              className="w-full rounded-xl border border-gray-300 p-2.5 text-sm focus:border-emerald-500 focus:outline-none"
            >
              <option value="*">* (every minute)</option>
              <option value="*/5">*/5 (every 5 min)</option>
              <option value="*/10">*/10 (every 10 min)</option>
              <option value="*/15">*/15 (every 15 min)</option>
              <option value="*/30">*/30 (every 30 min)</option>
              <option value="0">0 (at minute :00)</option>
              <option value="15">15 (at minute :15)</option>
              <option value="30">30 (at minute :30)</option>
              <option value="45">45 (at minute :45)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
              Hour (0-23)
            </label>
            <select
              value={hour}
              onChange={(e) => setHour(e.target.value)}
              className="w-full rounded-xl border border-gray-300 p-2.5 text-sm focus:border-emerald-500 focus:outline-none"
            >
              <option value="*">* (every hour)</option>
              <option value="*/2">*/2 (every 2 hours)</option>
              <option value="*/6">*/6 (every 6 hours)</option>
              <option value="*/12">*/12 (every 12 hours)</option>
              <option value="0">0 (midnight 00:00)</option>
              <option value="6">6 (06:00 AM)</option>
              <option value="9">9 (09:00 AM)</option>
              <option value="12">12 (12:00 PM)</option>
              <option value="18">18 (06:00 PM)</option>
              <option value="21">21 (09:00 PM)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
              Day of Month
            </label>
            <select
              value={dayOfMonth}
              onChange={(e) => setDayOfMonth(e.target.value)}
              className="w-full rounded-xl border border-gray-300 p-2.5 text-sm focus:border-emerald-500 focus:outline-none"
            >
              <option value="*">* (every day)</option>
              <option value="1">1 (1st of month)</option>
              <option value="15">15 (15th of month)</option>
              <option value="28">28 (28th of month)</option>
              <option value="*/2">*/2 (every 2 days)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
              Month (1-12)
            </label>
            <select
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="w-full rounded-xl border border-gray-300 p-2.5 text-sm focus:border-emerald-500 focus:outline-none"
            >
              <option value="*">* (every month)</option>
              <option value="*/3">*/3 (quarterly)</option>
              <option value="1">1 (January)</option>
              <option value="4">4 (April)</option>
              <option value="7">7 (July)</option>
              <option value="10">10 (October)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
              Day of Week
            </label>
            <select
              value={dayOfWeek}
              onChange={(e) => setDayOfWeek(e.target.value)}
              className="w-full rounded-xl border border-gray-300 p-2.5 text-sm focus:border-emerald-500 focus:outline-none"
            >
              <option value="*">* (every day)</option>
              <option value="1-5">1-5 (Mon - Fri)</option>
              <option value="0,6">0,6 (Sat &amp; Sun)</option>
              <option value="0">0 (Sunday)</option>
              <option value="1">1 (Monday)</option>
              <option value="5">5 (Friday)</option>
            </select>
          </div>
        </div>

        {/* Presets Grid */}
        <div className="mt-8 pt-6 border-t border-gray-100">
          <p className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-gray-500" />
            Common Startup &amp; Production Presets
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {PRESETS.map((p) => (
              <button
                key={p.name}
                onClick={() => handleApplyPreset(p.expression)}
                className={`text-left p-3 rounded-xl border transition ${
                  cronExpression === p.expression
                    ? "border-emerald-600 bg-emerald-50/50"
                    : "border-gray-200 hover:border-gray-300 bg-gray-50/50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-gray-900">{p.name}</span>
                  <code className="text-[11px] font-mono text-emerald-600">{p.expression}</code>
                </div>
                <p className="text-[11px] text-gray-500 mt-1">{p.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Next Run Times */}
        {nextRunTimes.length > 0 && (
          <div className="mt-8 pt-6 border-t border-gray-100">
            <p className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-emerald-600" />
              Upcoming Scheduled Runs (Next 5)
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
              {nextRunTimes.map((time, idx) => (
                <div key={idx} className="p-2.5 rounded-lg border border-gray-100 bg-gray-50 text-center">
                  <span className="text-[10px] text-gray-400 block font-mono">Run #{idx + 1}</span>
                  <span className="text-xs font-semibold text-gray-800 mt-0.5 block">{time}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
