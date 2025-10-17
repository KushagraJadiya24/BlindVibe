"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Heart, Sparkles, ArrowRight } from "lucide-react";
import { Group, QuestionnaireInput } from "../../types";
import Badge from "../../components/Badge";
import Progress from "../../components/Progress";
import SliderField from "../../components/SliderField";

const inputBase =
  "block w-full rounded-lg border border-white/10 bg-white/5 backdrop-blur-md px-4 py-2.5 text-sm text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:bg-white/10 transition-all";
const labelBase = "text-sm font-medium text-white/80 mb-1.5 block";
const sectionCard =
  "rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-7 shadow-2xl shadow-rose-500/5";
const buttonBase =
  "inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-rose-600 to-pink-600 text-white px-6 py-3 text-sm font-medium hover:shadow-lg hover:shadow-rose-500/40 transition-all duration-300";

export default function Questionnaire() {
  const [form, setForm] = useState<QuestionnaireInput>({
    name: "",
    gender: "male",
    age: 25,
    intent: "open to dating",
    openness: 3,
    humor: 3,
    empathy: 3,
    seriousness: 3,
    adventure: 3,
    extroversion: 3,
    conscientiousness: 3,
    instagram: "",
    location: "",
  });
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setLoading(false);
    router.push(`/results?userId=${encodeURIComponent(data.user.id)}`);
  }

  return (
    <div className="relative min-h-[calc(100vh-56px)] overflow-hidden bg-slate-900">
      {/* Background elements */}
      <div className="absolute inset-0 bg-slate-900" />

      {/* Ambient lighting */}
      <div
        className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-rose-600/10 blur-3xl animate-pulse"
        style={{ animationDuration: "6s" }}
      />
      <div
        className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-pink-700/10 blur-3xl animate-pulse"
        style={{ animationDuration: "8s", animationDelay: "1s" }}
      />

      {/* Floating hearts background */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute pointer-events-none animate-pulse"
          style={{
            left: Math.random() * 100 + "%",
            top: Math.random() * 100 + "%",
            animationDuration: Math.random() * 4 + 4 + "s",
            animationDelay: Math.random() * 2 + "s",
            opacity: Math.random() * 0.15 + 0.05,
          }}
        ></div>
      ))}

      {/* Subtle particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/5 animate-pulse"
            style={{
              width: Math.random() * 3 + "px",
              height: Math.random() * 3 + "px",
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
              animationDuration: Math.random() * 3 + 2 + "s",
              animationDelay: Math.random() * 2 + "s",
            }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-2xl px-6 py-12">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Heart
              size={20}
              className="text-rose-500 animate-pulse"
              fill="currentColor"
            />
            <span className="text-xs tracking-[0.2em] uppercase text-rose-400/70 font-light">
              Tell us about yourself
            </span>
            <Heart
              size={20}
              className="text-rose-500 animate-pulse"
              fill="currentColor"
              style={{ animationDelay: "0.3s" }}
            />
          </div>
          <h1 className="text-4xl sm:text-5xl font-light text-white mb-2">
            Find Your Crew
          </h1>
          <p className="text-white/50 text-sm">
            Let's discover who you vibe with
          </p>
        </div>

        {/* Main form card */}
        <section className={sectionCard}>
          <div className="flex items-center gap-2 mb-6 pb-6 border-b border-white/10">
            <Sparkles size={18} className="text-rose-400" />
            <h2 className="text-lg font-light text-white">
              Step 1 · Questionnaire
            </h2>
          </div>

          <form className="grid grid-cols-1 gap-5" onSubmit={handleSubmit}>
            {/* Name */}
            <div>
              <label className={labelBase}>What's your name?</label>
              <input
                className={inputBase}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Enter your name"
                required
              />
            </div>

            {/* Gender & Age */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelBase}>Gender</label>
                <select
                  className={inputBase}
                  value={form.gender}
                  onChange={(e) =>
                    setForm({ ...form, gender: e.target.value as any })
                  }
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className={labelBase}>Age</label>
                <input
                  type="number"
                  min={18}
                  max={80}
                  className={inputBase}
                  value={form.age}
                  onChange={(e) =>
                    setForm({ ...form, age: Number(e.target.value) })
                  }
                />
              </div>
            </div>

            {/* Instagram & Location */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelBase}>Instagram</label>
                <input
                  className={inputBase}
                  placeholder="@handle"
                  value={form.instagram ?? ""}
                  onChange={(e) =>
                    setForm({ ...form, instagram: e.target.value })
                  }
                />
              </div>
              <div>
                <label className={labelBase}>Location</label>
                <input
                  className={inputBase}
                  placeholder="City"
                  value={form.location ?? ""}
                  onChange={(e) =>
                    setForm({ ...form, location: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Intent */}
            <div>
              <label className={labelBase}>What's your intent?</label>
              <select
                className={inputBase}
                value={form.intent}
                onChange={(e) =>
                  setForm({ ...form, intent: e.target.value as any })
                }
              >
                <option value="serious">Serious</option>
                <option value="open to dating">Open to dating</option>
                <option value="just exploring">Just exploring</option>
              </select>
            </div>

            {/* Personality Sliders */}
            <div className="pt-2">
              <div className="flex items-center gap-2 mb-4">
                <Heart
                  size={16}
                  className="text-rose-400"
                  fill="currentColor"
                />
                <label className="text-sm font-medium text-white/80">
                  Your Vibes
                </label>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <SliderField
                  label="Openness"
                  value={form.openness}
                  onChange={(v) => setForm({ ...form, openness: v })}
                />
                <SliderField
                  label="Humor"
                  value={form.humor}
                  onChange={(v) => setForm({ ...form, humor: v })}
                />
                <SliderField
                  label="Empathy"
                  value={form.empathy}
                  onChange={(v) => setForm({ ...form, empathy: v })}
                />
                <SliderField
                  label="Seriousness"
                  value={form.seriousness}
                  onChange={(v) => setForm({ ...form, seriousness: v })}
                />
                <SliderField
                  label="Adventure"
                  value={form.adventure}
                  onChange={(v) => setForm({ ...form, adventure: v })}
                />
                <SliderField
                  label="Extroversion"
                  value={form.extroversion}
                  onChange={(v) => setForm({ ...form, extroversion: v })}
                />
                <SliderField
                  label="Conscientiousness"
                  value={form.conscientiousness}
                  onChange={(v) => setForm({ ...form, conscientiousness: v })}
                />
              </div>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className={buttonBase + " mx-auto mt-4"}
              disabled={loading}
            >
              {loading ? (
                "Finding your crew..."
              ) : (
                <>
                  Group me
                  <ArrowRight size={16} />
                </>
              )}
            </button>

            <p className="text-xs text-white/40 text-center">
              We'll show you your best-matched crew next
            </p>
          </form>
        </section>

        {/* Decorative footer */}
        <div className="flex justify-center gap-2 mt-8">
          {[...Array(3)].map((_, i) => (
            <Heart
              key={i}
              size={12}
              className="text-rose-500/30 animate-pulse"
              fill="currentColor"
              style={{ animationDelay: i * 0.2 + "s" }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
