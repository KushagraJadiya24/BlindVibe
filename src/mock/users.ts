import { Intent, User } from "../types";

const makeUser = (
  id: number,
  name: string,
  gender: "male" | "female",
  age: number,
  intent: Intent,
  traits: { openness: number; humor: number; empathy: number; seriousness: number; adventure: number; extroversion: number; conscientiousness: number },
  instagram?: string,
  location?: string
): User => ({
  id: String(id),
  name,
  gender,
  age,
  intent,
  instagram,
  location,
  traits,
});

// Updated: Indian users with varied intents, ages, and locations
export const MOCK_USERS: User[] = [
  // --- Male Users ---
  makeUser(1, "Aarav", "male", 27, "serious", { openness: 4, humor: 5, empathy: 3, seriousness: 4, adventure: 4, extroversion: 4, conscientiousness: 3 }, "@aarav_mehta", "Mumbai"),
  makeUser(2, "Rohan", "male", 29, "serious", { openness: 3, humor: 4, empathy: 4, seriousness: 5, adventure: 3, extroversion: 3, conscientiousness: 4 }, "@rohan_patel", "Delhi"),
  makeUser(3, "Karan", "male", 26, "open to dating", { openness: 5, humor: 4, empathy: 4, seriousness: 3, adventure: 5, extroversion: 5, conscientiousness: 3 }, "@karan_rao", "Bangalore"),
  makeUser(4, "Aditya", "male", 31, "serious", { openness: 2, humor: 3, empathy: 5, seriousness: 4, adventure: 2, extroversion: 2, conscientiousness: 5 }, "@aditya_sharma", "Jaipur"),
  makeUser(5, "Vihaan", "male", 24, "just exploring", { openness: 5, humor: 5, empathy: 2, seriousness: 2, adventure: 5, extroversion: 5, conscientiousness: 2 }, "@vihaan_kapoor", "Goa"),
  makeUser(6, "Ishaan", "male", 28, "open to dating", { openness: 4, humor: 3, empathy: 4, seriousness: 4, adventure: 4, extroversion: 3, conscientiousness: 4 }, "@ishaan_verma", "Pune"),
  makeUser(7, "Arjun", "male", 25, "serious", { openness: 4, humor: 4, empathy: 5, seriousness: 4, adventure: 3, extroversion: 4, conscientiousness: 5 }, "@arjun_singh", "Chandigarh"),
  makeUser(8, "Dev", "male", 30, "open to dating", { openness: 5, humor: 5, empathy: 4, seriousness: 3, adventure: 5, extroversion: 5, conscientiousness: 4 }, "@dev_malhotra", "Hyderabad"),
  makeUser(9, "Samar", "male", 27, "just exploring", { openness: 4, humor: 4, empathy: 3, seriousness: 3, adventure: 5, extroversion: 4, conscientiousness: 3 }, "@samar_jain", "Ahmedabad"),
  makeUser(10, "Reyansh", "male", 32, "serious", { openness: 3, humor: 3, empathy: 5, seriousness: 5, adventure: 3, extroversion: 3, conscientiousness: 5 }, "@reyansh_bhatt", "Kolkata"),

  // --- Female Users ---
  makeUser(11, "Aanya", "female", 26, "serious", { openness: 4, humor: 5, empathy: 4, seriousness: 4, adventure: 4, extroversion: 4, conscientiousness: 4 }, "@aanya_mehra", "Mumbai"),
  makeUser(12, "Diya", "female", 30, "open to dating", { openness: 3, humor: 4, empathy: 5, seriousness: 4, adventure: 3, extroversion: 3, conscientiousness: 5 }, "@diya_khurana", "Delhi"),
  makeUser(13, "Kiara", "female", 25, "serious", { openness: 5, humor: 4, empathy: 4, seriousness: 5, adventure: 5, extroversion: 5, conscientiousness: 4 }, "@kiara_reddy", "Hyderabad"),
  makeUser(14, "Meera", "female", 27, "serious", { openness: 2, humor: 3, empathy: 5, seriousness: 4, adventure: 2, extroversion: 2, conscientiousness: 5 }, "@meera_nair", "Kochi"),
  makeUser(15, "Tara", "female", 24, "just exploring", { openness: 5, humor: 5, empathy: 2, seriousness: 2, adventure: 5, extroversion: 5, conscientiousness: 2 }, "@tara_sen", "Pune"),
  makeUser(16, "Nisha", "female", 29, "open to dating", { openness: 4, humor: 3, empathy: 4, seriousness: 3, adventure: 4, extroversion: 3, conscientiousness: 4 }, "@nisha_gupta", "Lucknow"),
  makeUser(17, "Sanya", "female", 28, "serious", { openness: 4, humor: 4, empathy: 5, seriousness: 5, adventure: 4, extroversion: 3, conscientiousness: 5 }, "@sanya_pillai", "Chennai"),
  makeUser(18, "Priya", "female", 26, "open to dating", { openness: 5, humor: 5, empathy: 4, seriousness: 3, adventure: 5, extroversion: 5, conscientiousness: 3 }, "@priya_iyer", "Bangalore"),
  makeUser(19, "Ira", "female", 23, "just exploring", { openness: 5, humor: 5, empathy: 3, seriousness: 2, adventure: 5, extroversion: 5, conscientiousness: 2 }, "@ira_banerjee", "Goa"),
  makeUser(20, "Anaya", "female", 31, "serious", { openness: 3, humor: 3, empathy: 5, seriousness: 5, adventure: 3, extroversion: 3, conscientiousness: 5 }, "@anaya_chopra", "Delhi"),
];

// Utility to add a newly submitted user to the in-memory list for this session.
export function addUser(user: User) {
  MOCK_USERS.push(user);
}
