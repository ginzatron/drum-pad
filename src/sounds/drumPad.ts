import {
  createRecordingMachine,
  type Beat,
} from "../stateMachines/recordingState";
import { playClap } from "./clap";
import { playHiHat } from "./hiHat";
import { playKick } from "./kickDrum";
import { playSnare } from "./snare";

export interface IPadCmd {
  key: string;
  animateFunc: () => void;
}

interface SoundGroup {
  label: string;
  execute: () => void;
}

const machine = createRecordingMachine();

const keyMap: Record<string, SoundGroup> = {
  k: { label: "kick", execute: playKick },
  s: { label: "snare", execute: playSnare },
  h: { label: "hiHat", execute: playHiHat },
  c: { label: "clap", execute: playClap },
};

export const GetSoundMap = (): Record<string, SoundGroup> => {
  return keyMap;
};

export const drumPadHandler = (cmd: IPadCmd) => {
  const handler = keyMap[cmd.key];
  if (!handler) return;

  const state = machine.getState();

  handler.execute();
  cmd.animateFunc();

  if (state === "recording") {
    record({
      execute: handler.execute,
      animate: () => cmd.animateFunc(),
    });
  }
};

export const ctrlHandler = (key: string) => {
  if (key === "replay" && machine.startReplay()) {
    replay();
  }
  if (key === "start" && machine.startRecording()) {
    machine.getContext().beats = [];
  }
};

const record = (sound: Beat) => {
  if (machine.getContext().beats.length == 0)
    machine.getContext().startTime = Date.now();

  sound.timeMs = Date.now() - machine.getContext().startTime!;
  machine.getContext().beats.push(sound);
};

const replay = () => {
  const replayStart = Date.now();
  machine.getContext().beats.forEach((b) => {
    setTimeout(() => {
      b.execute();
      b.animate();
    }, b.timeMs! - (Date.now() - replayStart));
  });
  machine.stopReplay();
  console.log(machine.getState());
};
