let ctx: AudioContext | null = null;
let muted = false;

// Persist mute across sessions
if (typeof window !== "undefined") {
  muted = localStorage.getItem("sfx") === "off";
}

export function isMuted() { return muted; }

export function toggleMute() {
  muted = !muted;
  if (typeof window !== "undefined") {
    localStorage.setItem("sfx", muted ? "off" : "on");
  }
  return muted;
}

function createCtx(): AudioContext | null {
  if (muted || typeof window === "undefined") return null;
  try {
    if (!ctx) ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    return ctx;
  } catch { return null; }
}

/** True after a successful user-gesture unlock (see `unlockAudio`). */
export function isAudioUnlocked(): boolean {
  return typeof window !== "undefined" && !!(window as unknown as { __portfolioAudioUnlocked?: boolean }).__portfolioAudioUnlocked;
}

/** Call from a pointer/key handler; unlocks playback for the session. */
export async function unlockAudio(): Promise<boolean> {
  const ac = createCtx();
  if (!ac) return false;
  try {
    await ac.resume();
    (window as unknown as { __portfolioAudioUnlocked?: boolean }).__portfolioAudioUnlocked = true;
    window.dispatchEvent(new Event("portfolio-audio-unlocked"));
    return true;
  } catch { return false; }
}

/** @deprecated use `unlockAudio` */
export function warmupAudio() { void unlockAudio(); }

function withAudio(run: (ac: AudioContext) => void): void {
  const ac = createCtx();
  if (!ac) return;
  const go = () => { try { run(ac); } catch { /* no-op */ } };
  if (ac.state === "suspended") void ac.resume().then(go);
  else go();
}

/** Short descending blip — played on section navigation */
export function playNav() {
  withAudio(ac => {
    const osc  = ac.createOscillator();
    const gain = ac.createGain();
    osc.connect(gain);
    gain.connect(ac.destination);
    osc.type = "sine";
    osc.frequency.setValueAtTime(700, ac.currentTime);
    osc.frequency.exponentialRampToValueAtTime(350, ac.currentTime + 0.07);
    gain.gain.setValueAtTime(0.11, ac.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.09);
    osc.start(ac.currentTime);
    osc.stop(ac.currentTime + 0.1);
  });
}

/** Mechanical key click — played per typed line */
export function playType(volume = 0.12) {
  withAudio(ac => {
    const len = Math.floor(ac.sampleRate * 0.016); // 16ms burst
    const buf = ac.createBuffer(1, len, ac.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < len; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 5);
    }
    const src    = ac.createBufferSource();
    src.buffer   = buf;
    const filter = ac.createBiquadFilter();
    filter.type  = "bandpass";
    filter.frequency.value = 2800;
    filter.Q.value = 0.7;
    const gain   = ac.createGain();
    gain.gain.value = volume;
    src.connect(filter);
    filter.connect(gain);
    gain.connect(ac.destination);
    src.start();
  });
}

/** Slightly softer click for the prompt line */
export function playPrompt() { playType(0.07); }

/** Sharp UI click — for buttons */
export function playClick() {
  withAudio(ac => {
    const osc  = ac.createOscillator();
    const gain = ac.createGain();
    osc.connect(gain);
    gain.connect(ac.destination);
    osc.type = "square";
    osc.frequency.setValueAtTime(1200, ac.currentTime);
    osc.frequency.exponentialRampToValueAtTime(400, ac.currentTime + 0.04);
    gain.gain.setValueAtTime(0.08, ac.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.05);
    osc.start(ac.currentTime);
    osc.stop(ac.currentTime + 0.06);
  });
}
