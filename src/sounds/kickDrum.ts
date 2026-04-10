import { GetAudioContext } from "../audioContext";
import {
  createGainNode,
  createOscillator,
  type GainNodeConfig,
  type OscillatorConfig,
} from "../audioNodes";

export const playKick = () => {
  const audioCtx = GetAudioContext();
  const now = audioCtx.currentTime;
  const gainConfig: GainNodeConfig = {
    startValue: 1,
    endValue: 0.01,
    endTime: 0.2,
  };
  const oscillatorConfig: OscillatorConfig = {
    startValue: 150,
    endValue: 40,
    endTime: 0.1,
  };
  const gainNode = createGainNode(audioCtx, now, gainConfig);
  const oscillator = createOscillator(audioCtx, now, oscillatorConfig);

  oscillator.connect(gainNode).connect(audioCtx.destination);
  oscillator.start(now);
  oscillator.stop(now + 0.3);
};
