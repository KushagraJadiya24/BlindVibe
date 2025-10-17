import { Group, Intent, Traits, User } from "../types";

const TRAIT_KEYS: (keyof Traits)[] = [
  "openness",
  "humor",
  "empathy",
  "seriousness",
  "adventure",
  "extroversion",
  "conscientiousness",
];

export function isSeriousEnough(intent: Intent, seriousness: number): boolean {
  if (seriousness < 3) return false;
  if (intent === "just exploring") return false;
  return true;
}

export function similarityScore(a: Traits, b: Traits): number {
  let sum = 0;
  for (const key of TRAIT_KEYS) {
    const diff = Math.abs(a[key] - b[key]);
    sum += 1 - diff / 4; // Map difference 0..4 to similarity 1..0
  }
  return sum / TRAIT_KEYS.length;
}

export function averagePairwiseSimilarity(users: User[]): number {
  if (users.length < 2) return 0;
  let total = 0;
  let count = 0;
  for (let i = 0; i < users.length; i++) {
    for (let j = i + 1; j < users.length; j++) {
      total += similarityScore(users[i].traits, users[j].traits);
      count++;
    }
  }
  return total / count;
}

// 🧠 Improved summarization with more variety and human-like phrasing
export function summarizeReason(users: User[]): string {
  if (!users || users.length < 2)
    return "Not enough data to summarize this group.";

  const labels: Record<keyof Traits, string> = {
    openness: "openness",
    humor: "sense of humor",
    empathy: "empathy",
    seriousness: "seriousness",
    adventure: "adventurous spirit",
    extroversion: "extroversion",
    conscientiousness: "conscientiousness",
  };

  // Compute mean + variance for each trait
  const stats = TRAIT_KEYS.map((key) => {
    const values = users.map((u) => u.traits[key]);
    const mean = values.reduce((a, b) => a + b, 0) / values.length;
    const variance =
      values.reduce((a, v) => a + Math.pow(v - mean, 2), 0) / values.length;
    return { key, mean, variance };
  });

  // Traits with lowest variance = most similar across users
  const sortedByVar = [...stats].sort((a, b) => a.variance - b.variance);
  const primary = sortedByVar[0].key;
  const secondary = sortedByVar[1]?.key ?? sortedByVar[0].key;

  // Traits with highest average = group’s collective strength
  const sortedByMean = [...stats].sort((a, b) => b.mean - a.mean);
  const top = sortedByMean[0].key;
  const second = sortedByMean[1]?.key ?? sortedByMean[0].key;

  // Randomize phrasing for natural variation
  const templates = [
    `Shared ${labels[primary]} and ${labels[secondary]} make this group click.`,
    `Strong alignment in ${labels[primary]} and ${labels[secondary]} fuels easy chemistry.`,
    `Everyone connects through similar ${labels[primary]} and ${labels[secondary]}.`,
    `Mutual ${labels[primary]} and ${labels[secondary]} values build this smooth vibe.`,
    `This group stands out for high ${labels[top]} and ${labels[second]}.`,
    `You all vibe on shared ${labels[top]} and ${labels[primary]} energy.`,
    `A natural match built on ${labels[primary]} and ${labels[secondary]}.`,
    `Distinct chemistry from shared ${labels[primary]} and ${labels[top]}.`,
  ];

  return templates[Math.floor(Math.random() * templates.length)];
}

export function groupUsers(users: User[]): Group[] {
  // 1️⃣ Filter unserious users
  const serious = users.filter((u) =>
    isSeriousEnough(u.intent, u.traits.seriousness)
  );

  // 2️⃣ Split by gender to ensure balanced mix
  const males = serious.filter((u) => u.gender === "male");
  const females = serious.filter((u) => u.gender === "female");

  // 3️⃣ Compute "centroid" (average traits) to sort by proximity
  const centroid: Traits = TRAIT_KEYS.reduce((acc, key) => {
    const vals = serious.map((u) => u.traits[key]);
    const mean = vals.length
      ? vals.reduce((a, b) => a + b, 0) / vals.length
      : 3;
    (acc as any)[key] = mean;
    return acc;
  }, {} as Traits);

  const byProximity = (a: User, b: User) => {
    const da = similarityScore(a.traits, centroid);
    const db = similarityScore(b.traits, centroid);
    return db - da; // higher similarity first
  };

  males.sort(byProximity);
  females.sort(byProximity);

  // 4️⃣ Build groups
  const groups: Group[] = [];
  const sizePerGender = 3;
  const groupSize = 6;
  let gid = 1;

  while (males.length >= sizePerGender && females.length >= sizePerGender) {
    const chunkM = males.splice(0, sizePerGender);
    const chunkF = females.splice(0, sizePerGender);
    const candidates = [...chunkM, ...chunkF];

    const compatibility = averagePairwiseSimilarity(candidates);
    const percent = Math.round(compatibility * 100);
    const reason = summarizeReason(candidates);

    groups.push({
      id: `g${gid++}`,
      users: candidates,
      compatibilityPercent: percent,
      reason,
    });
  }

  return groups;
}
