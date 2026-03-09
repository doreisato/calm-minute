"use client";

import { useMemo, useState } from "react";

type Energy = "low" | "medium" | "high";
type Social = "solo" | "pair" | "group";
type Place = "indoor" | "outdoor" | "either";

interface Adventure {
  title: string;
  duration: string;
  energy: Energy;
  social: Social | "any";
  place: Place;
  prompt: string;
}

const ADVENTURES: Adventure[] = [
  { title: "Photo Quest", duration: "20 min", energy: "low", social: "solo", place: "either", prompt: "Find and capture 5 textures that look beautiful in black-and-white." },
  { title: "Tiny Kindness Loop", duration: "15 min", energy: "low", social: "solo", place: "either", prompt: "Do one small kindness: thank a worker, leave a kind note, or text appreciation." },
  { title: "Sunset Micro-Walk", duration: "30 min", energy: "medium", social: "pair", place: "outdoor", prompt: "Take a short walk and each share one thing that felt meaningful this week." },
  { title: "Park Bench Reset", duration: "25 min", energy: "low", social: "solo", place: "outdoor", prompt: "Sit quietly, breathe deeply for 2 minutes, then journal 3 calming observations." },
  { title: "Curiosity Sprint", duration: "30 min", energy: "medium", social: "solo", place: "indoor", prompt: "Learn one surprising thing about a topic you love and explain it simply." },
  { title: "Neighborhood Treasure Hunt", duration: "45 min", energy: "high", social: "group", place: "outdoor", prompt: "Find 7 items of specific colors in your neighborhood and snap one group photo." },
  { title: "No-Phone Tea Break", duration: "20 min", energy: "low", social: "pair", place: "indoor", prompt: "Make tea or water, no phones, and ask each other one unexpectedly deep question." },
  { title: "Mood-Lift Playlist Walk", duration: "35 min", energy: "medium", social: "solo", place: "either", prompt: "Pick 3 songs that boost your mood and walk until all three finish." },
  { title: "Laugh Relay", duration: "15 min", energy: "medium", social: "group", place: "indoor", prompt: "Each person shares one funny memory; vote the best and recreate it in 1 photo." },
  { title: "Micro-Museum", duration: "25 min", energy: "low", social: "pair", place: "indoor", prompt: "Pick 5 ordinary objects, arrange an exhibit, and narrate each object’s backstory." },
  { title: "Cloud Story Sprint", duration: "10 min", energy: "low", social: "solo", place: "outdoor", prompt: "Look up, pick one cloud shape, and write a 3-line story about it." },
  { title: "2-Song Kitchen Dance", duration: "10 min", energy: "medium", social: "pair", place: "indoor", prompt: "Play two songs and dance like nobody is judging. Bonus: mirror each other for 30 seconds." },
  { title: "Compliment Ping", duration: "10 min", energy: "low", social: "solo", place: "either", prompt: "Send one sincere compliment text to someone you appreciate, no context needed." },
  { title: "Street Color Hunt", duration: "20 min", energy: "medium", social: "group", place: "outdoor", prompt: "As a team, find one object for each rainbow color and take one photo collage." },
  { title: "Mini Breath + Sketch", duration: "15 min", energy: "low", social: "solo", place: "indoor", prompt: "Breathe slowly for 60 seconds, then sketch the nearest object without lifting your pen." }
];

function pickThree(list: Adventure[]) {
  const copy = [...list];
  const out: Adventure[] = [];
  while (copy.length && out.length < 3) {
    const idx = Math.floor(Math.random() * copy.length);
    out.push(copy.splice(idx, 1)[0]);
  }
  return out;
}

export default function Home() {
  const [minutes, setMinutes] = useState(30);
  const [energy, setEnergy] = useState<Energy>("medium");
  const [social, setSocial] = useState<Social>("solo");
  const [place, setPlace] = useState<Place>("either");
  const [results, setResults] = useState<Adventure[]>([]);

  const filtered = useMemo(() => {
    return ADVENTURES.filter((a) => {
      const durationOk = parseInt(a.duration, 10) <= minutes;
      const energyOk = a.energy === energy || (energy === "medium" && a.energy !== "high");
      const socialOk = a.social === "any" || a.social === social;
      const placeOk = place === "either" || a.place === place || a.place === "either";
      return durationOk && energyOk && socialOk && placeOk;
    });
  }, [minutes, energy, social, place]);

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white flex flex-col">
      <div className="max-w-[760px] w-full mx-auto px-6 py-14 flex-1">
        <p className="text-[11px] uppercase tracking-[0.2em] text-neutral-500 mb-3">Joy Break Roulette</p>
        <h1 className="text-4xl font-semibold leading-tight mb-3">Get 3 tiny plans to lift your mood in minutes.</h1>
        <p className="text-neutral-400 mb-2">Pick your time, energy, and vibe. Spin short joy-break ideas you can actually do today.</p>
        <p className="text-neutral-500 text-sm mb-8">Free. No login. Works in one tap.</p>

        <section className="border border-neutral-800 rounded-2xl bg-neutral-950/70 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <label className="text-sm text-neutral-300">Minutes free
              <input type="range" min={10} max={90} step={5} value={minutes} onChange={(e) => setMinutes(Number(e.target.value))} className="w-full mt-2" />
              <span className="text-xs text-neutral-500">{minutes} minutes</span>
            </label>

            <label className="text-sm text-neutral-300">Energy
              <select value={energy} onChange={(e) => setEnergy(e.target.value as Energy)} className="w-full mt-2 bg-black border border-neutral-700 rounded-lg px-3 py-2">
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </label>

            <label className="text-sm text-neutral-300">Social
              <select value={social} onChange={(e) => setSocial(e.target.value as Social)} className="w-full mt-2 bg-black border border-neutral-700 rounded-lg px-3 py-2">
                <option value="solo">Solo</option>
                <option value="pair">With 1 person</option>
                <option value="group">Group</option>
              </select>
            </label>

            <label className="text-sm text-neutral-300">Place
              <select value={place} onChange={(e) => setPlace(e.target.value as Place)} className="w-full mt-2 bg-black border border-neutral-700 rounded-lg px-3 py-2">
                <option value="either">Either</option>
                <option value="indoor">Indoor</option>
                <option value="outdoor">Outdoor</option>
              </select>
            </label>
          </div>

          <div className="flex gap-3">
            <button onClick={() => setResults(pickThree(filtered.length ? filtered : ADVENTURES))} className="px-5 py-3 rounded-xl bg-white text-black text-sm font-semibold hover:bg-neutral-200">Spin 3 adventures</button>
            <button onClick={() => setResults([])} className="px-5 py-3 rounded-xl border border-neutral-700 text-sm text-neutral-300 hover:text-white">Reset</button>
          </div>
        </section>

        <section className="space-y-3">
          {results.length === 0 ? (
            <div className="border border-neutral-800 rounded-xl p-5 text-sm text-neutral-400">Press <span className="text-white">Spin 3 adventures</span> to get a quick joy break you can do right now.</div>
          ) : (
            results.map((r, i) => (
              <article key={`${r.title}-${i}`} className="border border-neutral-800 rounded-xl p-5 bg-neutral-950/70">
                <h2 className="text-lg font-medium">{r.title}</h2>
                <p className="text-xs uppercase tracking-[0.14em] text-neutral-500 mt-1">{r.duration} • {r.place}</p>
                <p className="text-sm text-neutral-300 mt-3">{r.prompt}</p>
              </article>
            ))
          )}
        </section>

        <p className="text-xs text-neutral-500 mt-8">For inspiration only. Verify local conditions and stay in safe public spaces.</p>
      </div>
    </main>
  );
}
