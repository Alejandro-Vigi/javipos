import { REST_URL } from "@/constants/config";

export async function health() {
  const r = await fetch(`${REST_URL}/health`);
  return r.json();
}

export async function seed() {
  const r = await fetch(`${REST_URL}/dev/seed`, { method: "POST" });
  return r.json();
}

export async function listTables() {
  const r = await fetch(`${REST_URL}/tables`);
  return r.json();
}
