let audioCtx: AudioContext | null = null;

export function GetAudioContext(): AudioContext {
  if (audioCtx === null) {
    audioCtx = new AudioContext();
  }
  return audioCtx;
}
