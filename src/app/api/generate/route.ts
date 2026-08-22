import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "API key not configured." }, { status: 500 });
  }

  const { word, synonym, category } = await req.json();

  const guidelines =
    category === "Poetic"
      ? "Write a highly poetic, lyrical, and evocative sentence. Use vivid imagery."
      : category === "Academic"
      ? "Write a formal, scholarly, and objective academic sentence."
      : category === "Professional"
      ? "Write a crisp, clear, business-appropriate sentence."
      : category === "Common"
      ? "Write a natural, everyday conversational sentence."
      : "Write a well-structured standard sentence.";

  const prompt = `You are an expert writing assistant API.
Generate exactly ONE distinct sentence using the word "${synonym}".
Style: ${category}
Guidelines: ${guidelines}
Do not use quotes. Do not provide any conversational filler or introductions. Output ONLY the raw sentence.`;

  try {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "meta-llama/llama-3.3-70b-instruct",
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json({ error: `OpenRouter error: ${text}` }, { status: res.status });
    }

    const data = await res.json();
    const sentence = data.choices?.[0]?.message?.content?.trim();
    if (!sentence) {
      return NextResponse.json({ error: "Empty response from model." }, { status: 500 });
    }

    return NextResponse.json({ sentence });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Generation failed." }, { status: 500 });
  }
}
