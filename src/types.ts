export type Gender = "male" | "female" | "other";

export type Intent = "serious" | "open to dating" | "just exploring";

export type Traits = {
  openness: number; // 1-5
  humor: number; // 1-5
  empathy: number; // 1-5
  seriousness: number; // 1-5
  adventure: number; // 1-5
  extroversion: number; // 1-5
  conscientiousness: number; // 1-5
};

export type User = {
  id: string;
  name: string;
  gender: Gender;
  age: number;
  intent: Intent;
  instagram?: string; // optional
  location?: string; // city or neighborhood
  traits: Traits;
};

export type Group = {
  id: string;
  users: User[]; // length 6 (3 males + 3 females)
  compatibilityPercent: number; // 0-100
  reason: string;
  venue?: string;
  dateTime?: string; // ISO string
};

export type QuestionnaireInput = {
  name: string;
  gender: Gender;
  age: number;
  intent: Intent;
  openness: number;
  humor: number;
  empathy: number;
  seriousness: number;
  adventure: number;
  extroversion: number;
  conscientiousness: number;
  instagram?: string;
  location?: string;
};

