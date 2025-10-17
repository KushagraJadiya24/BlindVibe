import { Intent, Traits, User } from "../types";

const maleNames = ["Arjun","Rohan","Aarav","Vihaan","Ishaan","Aditya","Kabir","Rahul","Kunal","Siddharth"];
const femaleNames = ["Aanya","Ananya","Diya","Ira","Myra","Saanvi","Aarohi","Kiara","Priya","Rhea"];
const neighborhoods = ["Koramangala","Powai","Koregaon Park","Bandra","Connaught Place","Salt Lake","Gachibowli","Cyber City","Indiranagar","Viman Nagar"];

function rand(min: number, max: number) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function pick<T>(arr: T[]): T { return arr[rand(0, arr.length - 1)]; }
function trait(): number { return rand(1, 5); }

function randomTraits(): Traits {
  return {
    openness: trait(),
    humor: trait(),
    empathy: trait(),
    seriousness: trait(),
    adventure: trait(),
    extroversion: trait(),
    conscientiousness: trait(),
  };
}

function randomIntent(): Intent {
  // Bias away from "just exploring" so more users pass the seriousness filter
  const r = Math.random();
  if (r < 0.55) return "serious";
  if (r < 0.9) return "open to dating";
  return "just exploring";
}

export function generateRandomUsers(count = 20): User[] {
  const users: User[] = [];
  let id = Date.now();
  // Ensure near 50/50 split
  const half = Math.floor(count / 2);
  for (let i = 0; i < half; i++) {
    const name = pick(maleNames);
    const t = randomTraits();
    users.push({
      id: `r-${id++}`,
      name,
      gender: "male",
      age: rand(22, 34),
      intent: randomIntent(),
      instagram: `@${name.toLowerCase()}`,
      location: pick(neighborhoods),
      traits: t,
    });
  }
  for (let i = 0; i < count - half; i++) {
    const name = pick(femaleNames);
    const t = randomTraits();
    users.push({
      id: `r-${id++}`,
      name,
      gender: "female",
      age: rand(21, 32),
      intent: randomIntent(),
      instagram: `@${name.toLowerCase()}`,
      location: pick(neighborhoods),
      traits: t,
    });
  }
  return users;
}

