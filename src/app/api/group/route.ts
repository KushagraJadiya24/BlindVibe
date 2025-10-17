import { NextRequest, NextResponse } from "next/server";
import { readUsers } from "../../../lib/store";
import { Group, Traits, User } from "../../../types";
import { similarityScore } from "../../../lib/matching";

type GeminiResponse = {
  venue?: string;
  dateTime?: string; // ISO
};

async function callGeminiForPlan(
  users: User[]
): Promise<GeminiResponse | null> {
  try {
    const apiKey = "AIzaSyDhg2Q4UMJHwmu3qpSUjDESSHleYbPePio";
    console.log("Gemini key present:", !!apiKey);

    if (!apiKey) return null;
    // Use simple REST to avoid extra client deps
    const prompt = `You are a social host. Given this group of six people (with genders, ages, locations) plan a casual venue and a date/time within the next 10 days that works for most.
Return strict JSON with keys venue and dateTime (ISO 8601). Group: ${JSON.stringify(
      users.map((u) => ({
        name: u.name,
        gender: u.gender,
        age: u.age,
        location: u.location,
      }))
    )}`;

    const resp = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" +
        apiKey,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
        // Note: Next 14 edge/runtime options omitted for simplicity
      }
    );
    if (!resp.ok) return null;
    const data = await resp.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
    const jsonStart = text.indexOf("{");
    const jsonEnd = text.lastIndexOf("}");
    if (jsonStart >= 0 && jsonEnd > jsonStart) {
      const parsed = JSON.parse(text.slice(jsonStart, jsonEnd + 1));
      return { venue: parsed.venue, dateTime: parsed.dateTime };
    }
  } catch {
    // ignore
  }
  return null;
}

export async function POST(req: NextRequest) {
  const { userId } = (await req.json().catch(() => ({}))) as {
    userId?: string;
  };
  const all = readUsers();
  let anchor: User | undefined = userId
    ? all.find((u) => u.id === userId)
    : undefined;
  if (!anchor) {
    // fallback: last created user if present
    anchor = all.slice(-1)[0];
  }
  if (!anchor) return NextResponse.json({ groups: [] });

  const candidates = all.filter((u) => u.id !== anchor!.id);
  const scored = candidates
    .map((u) => ({
      u,
      score: similarityScore(anchor!.traits as Traits, u.traits as Traits),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map((s) => s.u);

  const group: Group = {
    id: "top",
    users: [anchor, ...scored],
    compatibilityPercent: Math.round(
      (scored.reduce(
        (acc, u) => acc + similarityScore(anchor!.traits, u.traits),
        0
      ) /
        scored.length) *
        100
    ),
    reason: "Most similar to your vibe across key traits",
  };

  const plan = await callGeminiForPlan(group.users);
  if (plan?.venue) group.venue = plan.venue;
  if (plan?.dateTime) group.dateTime = plan.dateTime;

  return NextResponse.json({ groups: [group] });
}
