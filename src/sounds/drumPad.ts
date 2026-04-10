import { playClap } from "./clap";
import { playHiHat } from "./hiHat";
import { playKick } from "./kickDrum";
import { playSnare } from "./snare";

export interface IPadCmd {
  key: string;
  animateFunc: () => void;
}

interface Beat {
  execute: () => void;
  animate: () => void;
  timeMs?: number;
}

let beats: Beat[] = [];
let startTime: number;

const keyMap: Record<string, () => void> = {
  kick: playKick,
  snare: playSnare,
  hiHat: playHiHat,
  clap: playClap,
};

export const GetKeys = (): string[] => {
  return Object.keys(keyMap);
};

export const drumPadHandler = (cmd: IPadCmd) => {
  const handler = keyMap[cmd.key];

  if (handler) {
    record({
      execute: handler,
      animate: () => cmd.animateFunc(),
    });
  }
};

export const ctrlHandler = (key: string) => {
  if (key === "replay") replay();
  else if (key === "start") beats = [];
};

const record = (sound: Beat) => {
  if (beats.length == 0) startTime = Date.now();

  sound.timeMs = Date.now() - startTime;
  beats.push(sound);

  sound.execute();
  sound.animate();
};

const replay = () => {
  const replayStart = Date.now();
  beats.forEach((b) => {
    setTimeout(
      () => {
        b.execute();
        b.animate();
      },
      b.timeMs! - (Date.now() - replayStart),
    );
  });
};
