import { NextResponse } from "next/server";
import { generateRandomUsers } from "../../../lib/seed";
import { readUsers, writeUsers } from "../../../lib/store";

export async function POST() {
  const current = readUsers();
  const extra = generateRandomUsers(20);
  writeUsers([...current, ...extra]);
  return NextResponse.json({ added: extra.length, total: current.length + extra.length });
}

