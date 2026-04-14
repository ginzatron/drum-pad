type RecordingState = "idle" | "recording" | "replaying";
type RecordingEvent =
  | "start"
  | "replay"
  | "restart"
  | "pauseRecording"
  | "endRecording"
  | "pauseReplay"
  | "stopReplay";

interface Transition {
  from: RecordingState;
  event: RecordingEvent;
  to: RecordingState;
  sideEffect?: () => void;
}

interface Beat {
  execute: () => void;
  animate: () => void;
  timeMs?: number;
}

let track: Beat[] = [];
function resetTrack() {
  track = [];
}

export let state: RecordingState = "idle";

const transitionMap: Transition[] = [
  {
    from: "idle",
    event: "start",
    to: "recording",
    sideEffect: resetTrack,
  },
];

function transition(event: RecordingEvent): void {
  const t = transitionMap.find((t) => t.from === state && t.event === event);
  if (!t) return;

  state = t.to;
  t.sideEffect?.();
}
