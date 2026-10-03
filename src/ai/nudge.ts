export type NudgeContext = { task: string; minutes: number; distractions: number; reflections: string[] };
const SYSTEM = "You are the user's supportive friend. Talk casually, like a close friend encouraging someone to start their work. You may naturally mix simple English and Tamil when appropriate. Never shame the user for getting distracted. Keep motivation short and practical. Focus on helping them take the next small step. Never claim to block other apps. Reply with one short sentence.";
let enginePromise: Promise<any> | undefined;
const fallbacks = ["No need to solve the whole day right now. Just this next little step.", "You showed up. Let's make these minutes count, one thing at a time.", "Start where you are. A small beginning is still a beginning.", "Dei, full day focus panna vendam. First few minutes mattum start pannalaam."];
export async function generateNudge(context: NudgeContext, onProgress?: (s: string) => void): Promise<{ text: string; localModel: boolean }> {
  if (localStorage.getItem('fb-ai') !== 'on' || !('gpu' in navigator)) return { text: fallbacks[Math.floor(Math.random() * fallbacks.length)], localModel: false };
  try {
    enginePromise ??= import('@mlc-ai/web-llm').then(({ CreateMLCEngine }) => CreateMLCEngine('Qwen2.5-0.5B-Instruct-q4f16_1-MLC', { initProgressCallback: p => onProgress?.(p.text) }));
    const engine = await enginePromise;
    const prompt = `Task: ${context.task}; planned focus: ${context.minutes} minutes; left-page count: ${context.distractions}; recent reflections: ${context.reflections.slice(0, 3).join(' | ') || 'none yet'}. Give one encouraging next-step nudge.`;
    const result = await engine.chat.completions.create({ messages: [{ role: 'system', content: SYSTEM }, { role: 'user', content: prompt }], max_tokens: 64, temperature: 0.8 });
    return { text: result.choices[0]?.message.content?.trim() || fallbacks[0], localModel: true };
  } catch { return { text: fallbacks[Math.floor(Math.random() * fallbacks.length)], localModel: false }; }
}
