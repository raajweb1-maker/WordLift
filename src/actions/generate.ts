"use server";

export async function generateContextualSentence(word: string, synonym: string, category: string) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    throw new Error("OpenRouter API key is missing");
  }

  const guidelines = 
    category === "Poetic" ? "Write a highly poetic, lyrical, and evocative sentence." :
    category === "Academic" ? "Write a formal, scholarly, and objective academic sentence." :
    category === "Professional" ? "Write a crisp, clear, business-appropriate sentence." :
    category === "Common" ? "Write a natural, everyday conversational sentence." :
    "Write a well-structured standard sentence.";

  const prompt = `You are an expert writing assistant API.
Generate exactly ONE distinct sentence using the word "${synonym}".
Style: ${category}
Guidelines: ${guidelines}
Do not use quotes. Do not provide any conversational filler or introductions. Output ONLY the raw sentence.`;

  try {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "meta-llama/llama-3.3-70b-instruct",
        messages: [{ role: "user", content: prompt }]
      }),
    });

    if (!res.ok) {
      throw new Error(`Failed to generate sentence: ${res.statusText}`);
    }

    const data = await res.json();
    return data.choices?.[0]?.message?.content?.trim() || "Failed to generate context.";
  } catch (error: any) {
    console.error("Generation error:", error);
    throw new Error(error.message || "An unexpected error occurred during generation.");
  }
}
