import { GetAudioContext } from "../audioContext";
import {
  createGainNode,
  createOscillator,
  type GainNodeConfig,
  type OscillatorConfig,
} from "../audioNodes";
import { WhiteNoiseBuffer } from "../whiteNoise";

export const playSnare = () => {
  const audioCtx = GetAudioContext();
  const now = audioCtx.currentTime;
  const oscillatorConfig: OscillatorConfig = {
    type: "sine",
    frequency: 200,
    startValue: 200,
    endValue: 200,
    endTime: 0.05,
  };

  const gainConfig: GainNodeConfig = {
    startValue: 1,
    endValue: 0.01,
    endTime: 0.15,
  };

  const oscillator = createOscillator(audioCtx, now, oscillatorConfig);
  const gainNode = createGainNode(audioCtx, now, gainConfig);

  const source = audioCtx.createBufferSource();
  source.buffer = WhiteNoiseBuffer;

  oscillator.connect(gainNode).connect(audioCtx.destination);
  source.connect(gainNode);

  oscillator.start(now);
  source.start(now);

  oscillator.stop(now + 0.2);
  source.stop(now + 0.2);
};
