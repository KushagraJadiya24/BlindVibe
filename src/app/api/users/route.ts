import { NextRequest, NextResponse } from "next/server";
import { addUserToStore, readUsers, writeUsers } from "../../../lib/store";
import { QuestionnaireInput, User } from "../../../types";
import { generateRandomUsers } from "../../../lib/seed";

function toUser(input: QuestionnaireInput): User {
  return {
    id: `u-${Date.now()}`,
    name: input.name,
    gender: input.gender,
    age: input.age,
    intent: input.intent,
    instagram: input.instagram,
    location: input.location,
    traits: {
      openness: input.openness,
      humor: input.humor,
      empathy: input.empathy,
      seriousness: input.seriousness,
      adventure: input.adventure,
      extroversion: input.extroversion,
      conscientiousness: input.conscientiousness,
    },
  };
}

export async function GET() {
  // Seed from mock if empty
  const current = readUsers();
  if (current.length === 0) {
    const seeded = generateRandomUsers(20);
    writeUsers(seeded);
    return NextResponse.json({ users: seeded });
  }
  return NextResponse.json({ users: current });
}

export async function POST(req: NextRequest) {
  const body = (await req.json()) as QuestionnaireInput;
  const user = toUser(body);
  addUserToStore(user);
  return NextResponse.json({ user }, { status: 201 });
}

