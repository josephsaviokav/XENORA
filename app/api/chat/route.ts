import { NextResponse } from "next/server";
const GeminiAPIKey = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${GeminiAPIKey}`;
const systemPrompt="you are a helpful assistant your job is to answer the user questions and reply concisely and politely";
export async function POST(request: Request) {
try{
    const {message} =await request.json();
 if (!message) {
    return NextResponse.json({ error: 'Message is required' }, { status: 400 });
  }
  const payload = {
  contents: [{ role: 'user', parts: [{ text: message }] }],
  systemInstruction: { parts: [{ text: systemPrompt }] },
};
const response = await fetch(GEMINI_API_URL, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(payload),
});

if (!response.ok) {
  console.error('Gemini API Error:', await response.text());
  return NextResponse.json({ error: 'API call failed' }, { status: response.status });
}
const result = await response.json();
const botResponse = result.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't get a response.";

return NextResponse.json({ response: botResponse });
} catch (error) {
  console.error('Internal Server Error:', error);
  return NextResponse.json({ error: 'An internal server error occurred.' }, { status: 500 });
}

}