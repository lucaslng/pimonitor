import { getSystemDetails } from "./system";

export async function GET(request: Request) {
  console.log('system route got request:', request);
  const details = await getSystemDetails();
  return new Response(JSON.stringify(details), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}