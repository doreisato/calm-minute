"use client";

import { useEffect, useMemo, useState } from "react";

const TOTAL_SECONDS = 60;

export default function Home() {
  const [running, setRunning] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(TOTAL_SECONDS);

  useEffect(() => {
    if (!running) return;
    const t = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          setRunning(false);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [running]);

  const phase = useMemo(() => {
    const elapsed = TOTAL_SECONDS - secondsLeft;
    const cycle = elapsed % 12;
    if (cycle < 4) return "Inhale";
    if (cycle < 8) return "Hold";
    return "Exhale";
  }, [secondsLeft]);

  const progress = ((TOTAL_SECONDS - secondsLeft) / TOTAL_SECONDS) * 100;

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white flex flex-col">
      <div className="max-w-[680px] w-full mx-auto px-6 py-14 flex-1 flex flex-col justify-center">
        <p className="text-[11px] uppercase tracking-[0.2em] text-neutral-500 mb-3">Calm Minute</p>
        <h1 className="text-4xl font-semibold leading-tight mb-3">Reset your stress in 60 seconds.</h1>
        <p className="text-neutral-400 mb-8">Follow one guided breathing cycle. No account, no tracking, no pressure.</p>

        <section className="border border-neutral-800 rounded-2xl bg-neutral-950/70 p-8 mb-6 text-center">
          <p className="text-xs uppercase tracking-[0.18em] text-neutral-500 mb-3">Current cue</p>
          <h2 className="text-4xl font-semibold mb-4">{running || secondsLeft === 0 ? phase : "Ready"}</h2>
          <p className="text-7xl font-semibold tabular-nums mb-5">{secondsLeft}s</p>
          <div className="w-full h-2 bg-neutral-900 rounded-full overflow-hidden mb-6">
            <div className="h-full bg-white transition-all duration-1000" style={{ width: `${progress}%` }} />
          </div>

          <div className="flex gap-3 justify-center">
            {!running ? (
              <button
                onClick={() => {
                  if (secondsLeft === 0) setSecondsLeft(TOTAL_SECONDS);
                  setRunning(true);
                }}
                className="px-6 py-3 rounded-xl bg-white text-black text-sm font-semibold hover:bg-neutral-200"
              >
                {secondsLeft === 0 ? "Run again" : "Start 60-second reset"}
              </button>
            ) : (
              <button onClick={() => setRunning(false)} className="px-6 py-3 rounded-xl border border-neutral-700 text-sm text-neutral-300 hover:text-white">
                Pause
              </button>
            )}
            <button
              onClick={() => {
                setRunning(false);
                setSecondsLeft(TOTAL_SECONDS);
              }}
              className="px-6 py-3 rounded-xl border border-neutral-700 text-sm text-neutral-300 hover:text-white"
            >
              Reset
            </button>
          </div>
        </section>

        <section className="border border-neutral-800 rounded-2xl bg-neutral-950/70 p-6">
          <h3 className="text-lg font-medium mb-2">How to use it</h3>
          <ol className="list-decimal pl-5 text-sm text-neutral-300 space-y-1">
            <li>Sit down and place both feet on the floor.</li>
            <li>Follow the cue: inhale, hold, exhale.</li>
            <li>Complete one minute before your next task.</li>
          </ol>
          <p className="text-xs text-neutral-500 mt-4">Educational wellness tool only. Not medical or mental health treatment.</p>
        </section>
      </div>

      <footer className="border-t border-neutral-900 py-6 text-center text-xs text-neutral-600">
        Built by <a href="https://infinite-machines-production.up.railway.app" className="text-neutral-500 hover:text-white">Infinite Machines</a>
      </footer>
    </main>
  );
}
