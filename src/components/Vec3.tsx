import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { inter, theme } from "../theme";

export type V3 = [number, number, number];

/* a fixed isometric-ish camera: yaw about y, then pitch about x */
const YAW = 0.62;
const PITCH = 0.33;
const SCALE = 48;
const CX = 356;
const CY = 292;

export const project = (v: V3): { x: number; y: number } => {
  const [x, y, z] = v;
  const cy = Math.cos(YAW);
  const sy = Math.sin(YAW);
  const cp = Math.cos(PITCH);
  const sp = Math.sin(PITCH);
  const X = x * cy + z * sy;
  const Z = -x * sy + z * cy;
  const Y = y * cp - Z * sp;
  return { x: CX + X * SCALE, y: CY - Y * SCALE };
};

export const VIEW = { width: 720, height: 540 };

const ease = (frame: number, fps: number, delay: number, len = 18) =>
  spring({ frame: frame - delay, fps, config: { damping: 200 }, durationInFrames: len });

/* ------------------------------------------------------------------ */

export const Arrow: React.FC<{
  from: V3;
  to: V3;
  color?: string;
  width?: number;
  delay?: number;
  dash?: string;
  head?: number;
  opacity?: number;
}> = ({ from, to, color = theme.accent, width = 5, delay = 0, dash, head = 18, opacity = 1 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = ease(frame, fps, delay);
  const a = project(from);
  const b = project(to);
  const tip = { x: a.x + (b.x - a.x) * p, y: a.y + (b.y - a.y) * p };
  const ang = Math.atan2(b.y - a.y, b.x - a.x);
  const w = 0.42;
  const h1 = { x: tip.x - head * Math.cos(ang - w), y: tip.y - head * Math.sin(ang - w) };
  const h2 = { x: tip.x - head * Math.cos(ang + w), y: tip.y - head * Math.sin(ang + w) };
  return (
    <g opacity={p * opacity}>
      <line
        x1={a.x}
        y1={a.y}
        x2={tip.x}
        y2={tip.y}
        stroke={color}
        strokeWidth={width}
        strokeLinecap="round"
        strokeDasharray={dash}
      />
      <polygon points={`${tip.x},${tip.y} ${h1.x},${h1.y} ${h2.x},${h2.y}`} fill={color} />
    </g>
  );
};

export const Seg: React.FC<{
  from: V3;
  to: V3;
  color?: string;
  width?: number;
  dash?: string;
  delay?: number;
  opacity?: number;
}> = ({ from, to, color = theme.line, width = 3, dash, delay = 0, opacity = 1 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = ease(frame, fps, delay);
  const a = project(from);
  const b = project(to);
  return (
    <line
      x1={a.x}
      y1={a.y}
      x2={a.x + (b.x - a.x) * p}
      y2={a.y + (b.y - a.y) * p}
      stroke={color}
      strokeWidth={width}
      strokeDasharray={dash}
      strokeLinecap="round"
      opacity={opacity * p}
    />
  );
};

export const Dot3: React.FC<{
  at: V3;
  label?: string;
  color?: string;
  delay?: number;
  dx?: number;
  dy?: number;
  r?: number;
}> = ({ at, label, color = theme.ink, delay = 0, dx = 14, dy = -12, r = 8 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = ease(frame, fps, delay);
  const pt = project(at);
  return (
    <g opacity={p}>
      <circle cx={pt.x} cy={pt.y} r={r} fill={color} />
      <circle cx={pt.x} cy={pt.y} r={r + 5} fill="none" stroke={color} strokeWidth={2} opacity={0.35} />
      {label ? (
        <text
          x={pt.x + dx}
          y={pt.y + dy}
          fontFamily={inter}
          fontSize={22}
          fontWeight={700}
          fill={color}
        >
          {label}
        </text>
      ) : null}
    </g>
  );
};

export const Axes: React.FC<{ len?: number; delay?: number }> = ({ len = 4.6, delay = 0 }) => (
  <g>
    <Seg from={[0, 0, 0]} to={[len, 0, 0]} color={theme.line} width={2} delay={delay} />
    <Seg from={[0, 0, 0]} to={[0, len, 0]} color={theme.line} width={2} delay={delay} />
    <Seg from={[0, 0, 0]} to={[0, 0, len]} color={theme.line} width={2} delay={delay} />
    {(
      [
        { at: [len + 0.3, 0, 0] as V3, t: "x" },
        { at: [0, len + 0.35, 0] as V3, t: "y" },
        { at: [0, 0, len + 0.3] as V3, t: "z" },
      ] as const
    ).map((a) => {
      const pt = project(a.at);
      return (
        <text
          key={a.t}
          x={pt.x}
          y={pt.y}
          fontFamily={inter}
          fontSize={20}
          fontWeight={700}
          fill={theme.faint}
          textAnchor="middle"
        >
          {a.t}
        </text>
      );
    })}
  </g>
);

/* the line of action: through A in direction d, drawn over a parameter range */
export const LineOfAction: React.FC<{
  through: V3;
  dir: V3;
  t0?: number;
  t1?: number;
  color?: string;
  width?: number;
  delay?: number;
}> = ({ through, dir, t0 = -0.5, t1 = 1.6, color = theme.faint, width = 3, delay = 0 }) => {
  const at = (t: number): V3 => [
    through[0] + dir[0] * t,
    through[1] + dir[1] * t,
    through[2] + dir[2] * t,
  ];
  return <Seg from={at(t0)} to={at(t1)} color={color} width={width} dash="10 8" delay={delay} />;
};
