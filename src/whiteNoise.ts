import { GetAudioContext } from "./audioContext";

const createWhiteNoiseBuffer = (ctx: AudioContext) => {
  const buffer = ctx.createBuffer(
    2, // 2 = stereo
    ctx.sampleRate * 3, // length in samples. 3 = 3 seconds of sampling the buffer
    ctx.sampleRate, // playback sample rate. matching means it plays as it sounds
  );

  fillBufferChannels(getBufferChannels(buffer));

  return buffer;
};

const getBufferChannels = (buffer: AudioBuffer) => {
  const left = buffer.getChannelData(0);
  const right = buffer.getChannelData(1);

  return [left, right];
};

const fillBufferChannels = (channels: Float32Array<ArrayBuffer>[]) => {
  channels.forEach((ch) => {
    for (let i = 0; i < ch.byteLength; i++) {
      ch[i] = Math.random() * 2 - 1;
    }
  });
};

export const WhiteNoiseBuffer = createWhiteNoiseBuffer(GetAudioContext());
