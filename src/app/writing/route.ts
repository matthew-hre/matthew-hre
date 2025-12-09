import { redirect } from "next/navigation";

export async function GET() {
  redirect("/?tab=writing");
}
