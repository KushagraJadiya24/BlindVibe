"use client";

import { useEffect, useMemo, useState } from "react";
import { Group } from "../../types";
import Badge from "../../components/Badge";
import Progress from "../../components/Progress";
import { Users, MapPin, Clock, Heart, Sparkles, ArrowLeft } from "lucide-react";

export default function ResultsPage() {
  const [groups, setGroups] = useState<Group[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const params = new URLSearchParams(window.location.search);
      const userId = params.get("userId");
      const res = await fetch("/api/group", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });
      const data = await res.json();
      setGroups(data.groups as Group[]);
      setLoading(false);
    }
    load();
  }, []);

  const topGroups = useMemo(() => {
    if (!loading && groups && groups.length > 0) {
      return [...groups]
        .sort((a, b) => b.compatibilityPercent - a.compatibilityPercent)
        .slice(0, 1);
    }
    return [] as Group[];
  }, [loading, groups]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-900">
      {/* Background */}
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
      <div
        className="pointer-events-none absolute top-1/2 right-1/3 h-80 w-80 rounded-full bg-rose-700/5 blur-3xl animate-pulse"
        style={{ animationDuration: "7s", animationDelay: "0.5s" }}
      />

      {/* Floating hearts background */}
      {[...Array(10)].map((_, i) => (
        <div
          key={i}
          className="absolute pointer-events-none animate-pulse"
          style={{
            left: Math.random() * 100 + "%",
            top: Math.random() * 100 + "%",
            animationDuration: Math.random() * 4 + 4 + "s",
            animationDelay: Math.random() * 2 + "s",
            opacity: Math.random() * 0.1 + 0.03,
          }}
        >
          <Heart
            size={Math.random() * 28 + 16}
            className="text-rose-500"
            fill="currentColor"
          />
        </div>
      ))}

      {/* Subtle particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
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

      <div className="relative max-w-5xl mx-auto px-6 sm:px-10 py-12 flex flex-col gap-8">
        {/* Header */}
        <header className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Heart
                size={20}
                className="text-rose-500 animate-pulse"
                fill="currentColor"
              />
              <span className="text-xs tracking-[0.2em] uppercase text-rose-400/70 font-light">
                Your Perfect Match
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-light text-white">
              Your Crew
            </h1>
          </div>
          <a
            href="/"
            className="flex items-center gap-2 text-sm text-white/60 hover:text-rose-400 transition-colors"
          >
            <ArrowLeft size={16} />
            Back
          </a>
        </header>

        {/* Loading state */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 mb-4">
                <Sparkles size={24} className="text-rose-400 animate-pulse" />
              </div>
              <p className="text-white/60 font-light">
                Finding your vibe groups…
              </p>
            </div>
          </div>
        )}

        {/* Empty state */}
        {!loading && groups && groups.length === 0 && (
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-8 text-center">
            <Heart size={32} className="mx-auto mb-4 text-rose-500/40" />
            <p className="text-white/60 font-light">
              Not enough users to form groups yet. Check back soon!
            </p>
          </div>
        )}

        {/* Groups Grid */}
        <div className="grid grid-cols-1 gap-6 max-w-4xl mx-auto w-full">
          {topGroups.map((g) => (
            <div
              key={g.id}
              className="group rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-7 shadow-2xl shadow-rose-500/5 hover:shadow-rose-500/20 hover:border-rose-500/30 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Header Row */}
              <div className="flex items-center justify-between mb-6 pb-5 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-rose-600/20 border border-rose-500/30">
                    <Users className="h-5 w-5 text-rose-400" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-[0.15em] text-rose-400/70 font-light">
                      Your Group
                    </div>
                    <div className="font-light text-white text-lg">
                      Crew #{g.id}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="text-sm">
                    <span className="text-xs text-white/50">Compatibility</span>
                    <div className="text-2xl font-light text-rose-400 mt-1">
                      {g.compatibilityPercent}%
                    </div>
                  </div>
                  <div className="w-24">
                    <Progress value={g.compatibilityPercent} />
                  </div>
                </div>
              </div>

              {/* Members */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Heart
                    size={16}
                    className="text-rose-400"
                    fill="currentColor"
                  />
                  <span className="text-xs uppercase tracking-[0.15em] text-white/60 font-light">
                    Your Squad
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {g.users.map((u) => (
                    <div
                      key={u.id}
                      className="rounded-xl border border-white/10 bg-gradient-to-br from-rose-600/10 to-pink-600/10 hover:from-rose-600/20 hover:to-pink-600/20 p-4 transition-all duration-300"
                    >
                      <div className="flex flex-col gap-2">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="font-medium text-white mb-1">
                              {u.name}
                            </div>
                            <div className="text-xs text-white/60">
                              {u.gender} · {u.age}
                            </div>
                          </div>
                          <Heart
                            size={14}
                            className="text-rose-400/50 flex-shrink-0 mt-0.5"
                            fill="currentColor"
                          />
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {u.location && (
                            <div className="text-xs rounded-full bg-rose-500/20 text-rose-200 px-2 py-1 flex items-center gap-1">
                              <MapPin size={12} />
                              {u.location}
                            </div>
                          )}
                          {u.instagram && (
                            <div className="text-xs rounded-full bg-pink-500/20 text-pink-200 px-2 py-1">
                              {u.instagram}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div className="my-4 border-t border-white/10" />

              {/* Reason */}
              <div className="mb-5 p-3 rounded-lg bg-rose-600/10 border border-rose-500/20">
                <div className="flex gap-2">
                  <Sparkles
                    size={16}
                    className="text-rose-400 flex-shrink-0 mt-0.5"
                  />
                  <div>
                    <div className="text-xs uppercase tracking-[0.15em] text-rose-400/70 font-light mb-1">
                      Why You Match
                    </div>
                    <p className="text-sm text-rose-100/80 font-light">
                      {g.reason}
                    </p>
                  </div>
                </div>
              </div>

              {/* Venue & Date */}
              {(g.venue || g.dateTime) && (
                <div className="space-y-2 text-sm">
                  {g.venue && (
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
                      <MapPin className="h-4 w-4 text-rose-400 flex-shrink-0" />
                      <div>
                        <div className="text-xs text-white/60">Venue</div>
                        <div className="text-white font-light">{g.venue}</div>
                      </div>
                    </div>
                  )}
                  {g.dateTime && (
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
                      <Clock className="h-4 w-4 text-rose-400 flex-shrink-0" />
                      <div>
                        <div className="text-xs text-white/60">Meet Time</div>
                        <div className="text-white font-light">
                          {new Date(g.dateTime).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer decoration */}
        <div className="flex justify-center gap-3 mt-8">
          {[...Array(3)].map((_, i) => (
            <Heart
              key={i}
              size={14}
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
