// /src/app/api/control/pintu/route.ts
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const status = body.status === true ? "true" : "false";

  try {
    const res = await fetch("http://192.168.20.45/pintu-status", {
      method: "POST",
      headers: {
        "Content-Type": "text/plain",
      },
      body: status,
    });

    const text = await res.text();
    return new Response(JSON.stringify({ success: true, response: text }), {
      status: 200,
    });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: err }), {
      status: 500,
    });
  }
}
