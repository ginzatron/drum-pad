import { GetAudioContext } from "../audioContext";
import { createGainNode, type GainNodeConfig } from "../audioNodes";
import { WhiteNoiseBuffer } from "../whiteNoise";

export const playClap = () => {
  const audioCtx = GetAudioContext();

  const now = audioCtx.currentTime;
  const source = audioCtx.createBufferSource();
  source.buffer = WhiteNoiseBuffer;

  const biQuadFilter = audioCtx.createBiquadFilter();
  biQuadFilter.frequency.setValueAtTime(1500, now);
  biQuadFilter.type = "bandpass";

  const gainConfig: GainNodeConfig = {
    startValue: 1,
    endValue: 0.01,
    endTime: 0.15,
  };

  const gainNode = createGainNode(audioCtx, now, gainConfig);

  source.connect(biQuadFilter).connect(gainNode).connect(audioCtx.destination);
  source.start(now);
  source.stop(now + 0.15);
};
