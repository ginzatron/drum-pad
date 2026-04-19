type RecordingState =
  | "idle"
  | "recording"
  | "replaying"
  | "paused_recording"
  | "paused_replay";
type RecordingEvent =
  | "start_recording"
  | "pause_recording"
  | "resume_recording"
  | "restart_recording"
  | "stop_recording"
  | "start_replay"
  | "pause_replay"
  | "resume_replay"
  | "restart_replay"
  | "stop_replay";

let state: RecordingState = "idle";

export function createRecordingMachine() {
  return {
    startRecording: () => transition("start_recording"),
    startReplay: () => transition("start_replay"),
    stopReplay: () => transition("stop_replay"),
    pauseRecording: () => transition("pause_recording"),
    resumeRecording: () => transition("resume_recording"),
    getState: () => state,
  };
}

const transitionMap: Record<
  RecordingState,
  Partial<Record<RecordingEvent, RecordingState>>
> = {
  idle: { start_recording: "recording", start_replay: "replaying" },
  recording: {
    stop_recording: "idle",
    pause_recording: "paused_recording",
    start_replay: "replaying",
  },
  replaying: {
    stop_replay: "idle",
    pause_replay: "paused_replay",
  },
  paused_recording: {
    resume_recording: "recording",
    restart_recording: "idle",
  },
  paused_replay: { resume_replay: "replaying", restart_replay: "replaying" },
};

function transition(event: RecordingEvent): boolean {
  const newState = transitionMap[state][event];
  if (!newState) return false;
  state = newState;
  return true;
}

function getState(): RecordingState {
  return state;
}
