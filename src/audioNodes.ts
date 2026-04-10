export interface ContextConfig {
  startValue: number;
  endValue: number;
  endTime: number;
}

export interface OscillatorConfig extends OscillatorOptions, ContextConfig {}
export interface GainNodeConfig extends GainOptions, ContextConfig {}

export const createOscillator = (
  ctx: AudioContext,
  time: number,
  config: OscillatorConfig,
): OscillatorNode => {
  const { startValue, endValue, endTime, ...oscOptions } = config;

  const o = new OscillatorNode(ctx, oscOptions);

  o.frequency.setValueAtTime(config.startValue, time);
  o.frequency.exponentialRampToValueAtTime(
    config.endValue,
    time + config.endTime,
  );

  return o;
};

export const createGainNode = (
  ctx: AudioContext,
  time: number,
  config: GainNodeConfig,
): GainNode => {
  const { startValue, endValue, endTime, ...gnOptions } = config;

  const gn = new GainNode(ctx, gnOptions);

  gn.gain.setValueAtTime(config.startValue, time);
  gn.gain.exponentialRampToValueAtTime(config.endValue, time + config.endTime);

  return gn;
};
