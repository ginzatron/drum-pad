import { GetAudioContext } from "../audioContext";
import { createGainNode, type GainNodeConfig } from "../audioNodes";
import { WhiteNoiseBuffer } from "../whiteNoise";

export const playHiHat = () => {
  const audioCtx = GetAudioContext();
  const now = audioCtx.currentTime;
  const gainConfig: GainNodeConfig = {
    startValue: 1,
    endValue: 0.01,
    endTime: 0.05,
  };

  const gainNode = createGainNode(audioCtx, now, gainConfig);

  const bufferSource = audioCtx.createBufferSource();
  bufferSource.buffer = WhiteNoiseBuffer;

  const biQuadFilterNode = audioCtx.createBiquadFilter();
  biQuadFilterNode.type = "highpass";
  biQuadFilterNode.frequency.setValueAtTime(7000, now);

  bufferSource
    .connect(biQuadFilterNode)
    .connect(gainNode)
    .connect(audioCtx.destination);

  bufferSource.start();
  bufferSource.stop(now + 0.06);
};
