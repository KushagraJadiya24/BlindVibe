import fs from "fs";
import path from "path";
import { User } from "../types";

const DATA_DIR = path.join(process.cwd(), "data");
const USERS_FILE = path.join(DATA_DIR, "users.json");

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(USERS_FILE)) fs.writeFileSync(USERS_FILE, JSON.stringify({ users: [] }, null, 2));
}

export function readUsers(): User[] {
  ensureDataDir();
  const raw = fs.readFileSync(USERS_FILE, "utf-8");
  const json = JSON.parse(raw) as { users: User[] };
  return json.users;
}

export function writeUsers(users: User[]) {
  ensureDataDir();
  fs.writeFileSync(USERS_FILE, JSON.stringify({ users }, null, 2));
}

export function addUserToStore(user: User) {
  const all = readUsers();
  all.push(user);
  writeUsers(all);
}

