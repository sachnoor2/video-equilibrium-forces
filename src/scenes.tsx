import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Arrow, Axes, Dot3, LineOfAction, Seg, V3, VIEW } from "./components/Vec3";
import { Body, Eyebrow, Formula, Heading, Pill, Rise } from "./components/Bits";
import { inter, lora, theme } from "./theme";

export type SceneProps = { dur: number };

/* the actual data of question 11 */
const A: V3 = [1, 0, 0]; // point of application of F2
const B: V3 = [3, 3, 4]; // point of application of F1
const F1: V3 = [2, 3, 4];
const F2: V3 = [-2, -3, -4];
const D: V3 = [B[0] - A[0], B[1] - A[1], B[2] - A[2]];

const Column: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({
  children,
  style,
}) => (
  <AbsoluteFill
    style={{
      background: theme.bg,
      padding: "68px 92px 100px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      fontFamily: inter,
      ...style,
    }}
  >
    {children}
  </AbsoluteFill>
);

const TwoUp: React.FC<{ left: React.ReactNode; right: React.ReactNode }> = ({ left, right }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 60 }}>
    <div style={{ flex: 1, minWidth: 0 }}>{left}</div>
    <div style={{ flex: "0 0 auto", display: "flex", alignItems: "center", justifyContent: "center" }}>
      {right}
    </div>
  </div>
);

const Canvas: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <svg viewBox={`0 0 ${VIEW.width} ${VIEW.height}`} style={{ width: 640, height: 480 }}>
    {children}
  </svg>
);

const VecCard: React.FC<{
  title: string;
  vec: string;
  at: string;
  tone?: "accent" | "ok";
  delay?: number;
}> = ({ title, vec, at, tone = "accent", delay = 0 }) => {
  const c = tone === "accent" ? theme.accent : theme.ok;
  return (
    <Rise delay={delay}>
      <div
        style={{
          background: theme.card,
          border: `2px solid ${theme.line}`,
          borderRadius: 20,
          padding: "24px 30px",
          minWidth: 330,
        }}
      >
        <div
          style={{
            fontSize: 20,
            fontWeight: 800,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: c,
          }}
        >
          {title}
        </div>
        <div style={{ fontFamily: lora, fontSize: 34, fontWeight: 600, marginTop: 10, color: theme.ink }}>
          {vec}
        </div>
        <div style={{ fontSize: 21, color: theme.muted, marginTop: 8 }}>at the point {at}</div>
      </div>
    </Rise>
  );
};

/* a 2-D figure: two forces on a rod, with or without a sideways gap */
const RodFigure: React.FC<{ mode: "couple" | "line"; delay?: number }> = ({ mode, delay = 0 }) => {
  const frame = useCurrentFrame();
  const p = Math.min(1, Math.max(0, (frame - delay) / 16));
  const spin = mode === "couple";
  const arc = `M ${200 + 46 * Math.cos(-2.2)} ${150 + 46 * Math.sin(-2.2)} A 46 46 0 1 1 ${200 + 46 * Math.cos(2.2)} ${150 + 46 * Math.sin(2.2)}`;
  return (
    <svg viewBox="0 0 400 300" style={{ width: 400, height: 300, opacity: p }}>
      <rect x={60} y={138} width={280} height={24} rx={10} fill="#e7e2d6" />
      {/* left force */}
      {spin ? (
        <>
          <line x1={80} y1={150} x2={80} y2={62} stroke={theme.accent} strokeWidth={6} strokeLinecap="round" />
          <polygon points="80,46 71,66 89,66" fill={theme.accent} />
          <line x1={320} y1={150} x2={320} y2={238} stroke={theme.ok} strokeWidth={6} strokeLinecap="round" />
          <polygon points="320,254 311,234 329,234" fill={theme.ok} />
          <path d={arc} fill="none" stroke={theme.ink} strokeWidth={4} strokeDasharray="8 6" />
          <text x={200} y={285} textAnchor="middle" fontFamily={inter} fontSize={20} fontWeight={700} fill={theme.ink}>
            different lines → spins
          </text>
        </>
      ) : (
        <>
          <line x1={200} y1={150} x2={80} y2={150} stroke={theme.accent} strokeWidth={6} strokeLinecap="round" />
          <polygon points="62,150 84,141 84,159" fill={theme.accent} />
          <line x1={200} y1={150} x2={320} y2={150} stroke={theme.ok} strokeWidth={6} strokeLinecap="round" />
          <polygon points="338,150 316,141 316,159" fill={theme.ok} />
          <text x={200} y={230} textAnchor="middle" fontFamily={inter} fontSize={20} fontWeight={700} fill={theme.ink}>
            one line → stays put
          </text>
        </>
      )}
    </svg>
  );
};

/* ------------------------------------------------------------------ */
/* 01 — title                                                          */
/* ------------------------------------------------------------------ */

export const TitleScene: React.FC<SceneProps> = () => (
  <Column style={{ alignItems: "center", textAlign: "center" }}>
    <Rise delay={2}>
      <div
        style={{
          fontSize: 22,
          fontWeight: 700,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: theme.faint,
        }}
      >
        Rotational dynamics · question eleven
      </div>
    </Rise>
    <Rise delay={12}>
      <h1
        style={{
          fontSize: 76,
          fontWeight: 800,
          color: theme.ink,
          letterSpacing: "-0.03em",
          lineHeight: 1.08,
          margin: "24px 0 0",
        }}
      >
        Two opposite forces,
        <br />
        and still no rotation
      </h1>
    </Rise>
    <Rise delay={26}>
      <div style={{ marginTop: 22, fontFamily: lora, fontSize: 30, color: theme.body }}>
        why this body is in equilibrium — and where your instinct is still right
      </div>
    </Rise>
    <div style={{ marginTop: 26 }}>
      <svg viewBox="0 0 620 190" style={{ width: 620, height: 190 }}>
        <line x1={90} y1={95} x2={530} y2={95} stroke={theme.faint} strokeWidth={3} strokeDasharray="10 8" />
        <line x1={190} y1={95} x2={90} y2={95} stroke={theme.accent} strokeWidth={6} strokeLinecap="round" />
        <polygon points="72,95 94,86 94,104" fill={theme.accent} />
        <line x1={430} y1={95} x2={530} y2={95} stroke={theme.ok} strokeWidth={6} strokeLinecap="round" />
        <polygon points="548,95 526,86 526,104" fill={theme.ok} />
        <circle cx={190} cy={95} r={9} fill={theme.ink} />
        <circle cx={430} cy={95} r={9} fill={theme.ink} />
        <text x={190} y={140} textAnchor="middle" fontFamily={inter} fontSize={19} fontWeight={700} fill={theme.muted}>
          (1, 0, 0)
        </text>
        <text x={430} y={140} textAnchor="middle" fontFamily={inter} fontSize={19} fontWeight={700} fill={theme.muted}>
          (3, 3, 4)
        </text>
      </svg>
    </div>
  </Column>
);

/* ------------------------------------------------------------------ */
/* 02 — the question                                                   */
/* ------------------------------------------------------------------ */

export const QuestionScene: React.FC<SceneProps> = () => (
  <Column>
    <Eyebrow>The question</Eyebrow>
    <Heading size={52}>Two forces, two points</Heading>
    <div style={{ marginTop: 34, display: "flex", gap: 30 }}>
      <VecCard title="Force one" vec="2i + 3j + 4k" at="(3, 3, 4)" delay={22} />
      <VecCard title="Force two" vec="−2i − 3j − 4k" at="(1, 0, 0)" tone="ok" delay={34} />
    </div>
    <Body size={30} delay={46}>
      Which of these is true? The body is in equilibrium, or the body is under a couple only, or
      under a single force.
    </Body>
    <Rise delay={60}>
      <div style={{ marginTop: 26 }}>
        <Pill tone="ok">answer: equilibrium</Pill>
      </div>
    </Rise>
  </Column>
);

/* ------------------------------------------------------------------ */
/* 03 — the instinct is right, in general                              */
/* ------------------------------------------------------------------ */

export const IntuitionScene: React.FC<SceneProps> = () => (
  <Column>
    <TwoUp
      left={
        <>
          <Eyebrow>Your instinct</Eyebrow>
          <Heading size={54}>
            Usually, this
            <br />
            does spin
          </Heading>
          <Body size={30}>
            Equal and opposite forces at two different points usually make a couple: no net force,
            but a real torque. A steering wheel is the standard example.
          </Body>
        </>
      }
      right={<RodFigure mode="couple" delay={30} />}
    />
  </Column>
);

/* ------------------------------------------------------------------ */
/* 04 — net force                                                      */
/* ------------------------------------------------------------------ */

const Term: React.FC<{ children: React.ReactNode; color?: string; size?: number }> = ({
  children,
  color = theme.ink,
  size = 40,
}) => (
  <span style={{ fontFamily: lora, fontSize: size, fontWeight: 600, color, whiteSpace: "nowrap" }}>
    {children}
  </span>
);

export const NetForceScene: React.FC<SceneProps> = () => (
  <Column>
    <Eyebrow>Condition one</Eyebrow>
    <Heading size={52}>Net force is zero</Heading>
    <Body size={29} delay={20}>
      Add the two forces component by component. Each component meets its own negative.
    </Body>
    <div
      style={{
        marginTop: 34,
        background: "#f7f5ef",
        border: `2px solid ${theme.line}`,
        borderRadius: 20,
        padding: "30px 36px",
        display: "inline-flex",
        alignItems: "center",
        gap: 22,
        alignSelf: "flex-start",
      }}
    >
      <Rise delay={26}>
        <Term color={theme.accent}>(2, 3, 4)</Term>
      </Rise>
      <Rise delay={32}>
        <Term color={theme.faint}>+</Term>
      </Rise>
      <Rise delay={38}>
        <Term color={theme.ok}>(−2, −3, −4)</Term>
      </Rise>
      <Rise delay={44}>
        <Term color={theme.faint}>=</Term>
      </Rise>
      <Rise delay={50}>
        <Term>(0, 0, 0)</Term>
      </Rise>
    </div>
    <Rise delay={60}>
      <div style={{ marginTop: 28 }}>
        <Pill tone="ok">no acceleration of the centre of mass</Pill>
      </div>
    </Rise>
  </Column>
);

/* ------------------------------------------------------------------ */
/* 05 — torque about the origin                                        */
/* ------------------------------------------------------------------ */

export const TorqueScene: React.FC<SceneProps> = () => (
  <Column>
    <Eyebrow>Condition two</Eyebrow>
    <Heading size={50}>Torque about the origin is zero</Heading>
    <Body size={28} delay={18}>
      Take the moment of each force about the origin. Position crossed with force.
    </Body>
    <div style={{ marginTop: 30, display: "flex", flexDirection: "column", gap: 16 }}>
      <Rise delay={26}>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <Term color={theme.accent} size={32}>
            (3, 3, 4) × (2, 3, 4)
          </Term>
          <Term color={theme.faint} size={30}>
            =
          </Term>
          <Term size={32}>(0, −4, 3)</Term>
        </div>
      </Rise>
      <Rise delay={38}>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <Term color={theme.ok} size={32}>
            (1, 0, 0) × (−2, −3, −4)
          </Term>
          <Term color={theme.faint} size={30}>
            =
          </Term>
          <Term size={32}>(0, 4, −3)</Term>
        </div>
      </Rise>
      <Rise delay={52}>
        <div style={{ display: "flex", alignItems: "center", gap: 18, marginTop: 6 }}>
          <Term size={30} color={theme.muted}>
            total
          </Term>
          <Term color={theme.faint} size={30}>
            =
          </Term>
          <Term size={34}>(0, 0, 0)</Term>
          <Formula size={34} color={theme.ok}>
            ✓
          </Formula>
        </div>
      </Rise>
    </div>
  </Column>
);

/* ------------------------------------------------------------------ */
/* 06 — any point will do                                              */
/* ------------------------------------------------------------------ */

export const AnyPointScene: React.FC<SceneProps> = () => (
  <Column style={{ alignItems: "center", textAlign: "center" }}>
    <Eyebrow>Why the origin was allowed</Eyebrow>
    <Heading size={54}>When net force is zero, the point does not matter</Heading>
    <Body size={29} delay={20} style={{ maxWidth: 1120, textAlign: "center" }}>
      A force system with zero net force has the same total torque about every point in space. So
      zero about the origin means zero about the centre of mass, and about every other point.
    </Body>
    <Rise delay={40}>
      <div style={{ marginTop: 34, display: "flex", alignItems: "center", gap: 26 }}>
        <Term size={40} color={theme.muted}>
          τ about origin = 0
        </Term>
        <Term size={36} color={theme.faint}>
          ⟹
        </Term>
        <Term size={40} color={theme.ok}>
          τ about any point = 0
        </Term>
      </div>
    </Rise>
  </Column>
);

/* ------------------------------------------------------------------ */
/* 07 — the hidden fact                                                */
/* ------------------------------------------------------------------ */

export const SecretScene: React.FC<SceneProps> = () => (
  <Column>
    <TwoUp
      left={
        <>
          <Eyebrow>The hidden fact</Eyebrow>
          <Heading size={50}>The two points lie along the force</Heading>
          <Body size={28}>
            From the point of application of force two to that of force one, the displacement is
            two, three, four. That is force one itself.
          </Body>
          <Rise delay={40}>
            <div style={{ marginTop: 24, display: "flex", alignItems: "center", gap: 14 }}>
              <Formula size={30} color={theme.ok}>
                d = B − A = (2, 3, 4) = F₁
              </Formula>
            </div>
          </Rise>
        </>
      }
      right={
        <Canvas>
          <Axes delay={20} />
          <LineOfAction through={A} dir={F1} color={theme.line} width={3} delay={26} />
          <Arrow from={A} to={B} color={theme.ok} width={5} delay={34} />
          <Arrow from={A} to={[A[0] + F1[0] * 0.75, A[1] + F1[1] * 0.75, A[2] + F1[2] * 0.75]} color={theme.accent} width={5} delay={28} />
          <Dot3 at={A} label="A (1, 0, 0)" delay={22} dx={-150} dy={34} color={theme.ink} />
          <Dot3 at={B} label="B (3, 3, 4)" delay={30} dx={16} dy={-14} color={theme.ink} />
        </Canvas>
      }
    />
  </Column>
);

/* ------------------------------------------------------------------ */
/* 08 — one line of action                                             */
/* ------------------------------------------------------------------ */

export const CollinearScene: React.FC<SceneProps> = () => (
  <Column>
    <TwoUp
      left={
        <>
          <Eyebrow>What that means</Eyebrow>
          <Heading size={50}>One line, two equal pulls</Heading>
          <Body size={28}>
            Both forces act along the same straight line. This is not a couple with a gap in it. It
            is a tug of war along a single rope, and the rope does not turn.
          </Body>
          <Rise delay={44}>
            <div style={{ marginTop: 24 }}>
              <Pill tone="accent">same line of action</Pill>
            </div>
          </Rise>
        </>
      }
      right={
        <Canvas>
          <LineOfAction through={A} dir={F1} color={theme.faint} width={3} delay={20} />
          <Arrow from={[A[0] + F1[0] * 0.05, A[1] + F1[1] * 0.05, A[2] + F1[2] * 0.05]} to={[A[0] - F1[0] * 0.55, A[1] - F1[1] * 0.55, A[2] - F1[2] * 0.55]} color={theme.accent} width={6} delay={30} />
          <Arrow from={[B[0] - F1[0] * 0.05, B[1] - F1[1] * 0.05, B[2] - F1[2] * 0.05]} to={[B[0] + F1[0] * 0.55, B[1] + F1[1] * 0.55, B[2] + F1[2] * 0.55]} color={theme.ok} width={6} delay={38} />
          <Dot3 at={A} label="A" delay={24} dx={-70} dy={30} />
          <Dot3 at={B} label="B" delay={26} dx={18} dy={-14} />
          <Seg from={[0, 0, 0]} to={A} color={theme.line} width={2} delay={22} />
        </Canvas>
      }
    />
  </Column>
);

/* ------------------------------------------------------------------ */
/* 09 — what a couple needs                                            */
/* ------------------------------------------------------------------ */

export const CoupleScene: React.FC<SceneProps> = () => (
  <Column style={{ alignItems: "center" }}>
    <Eyebrow>The rule behind it</Eyebrow>
    <Heading size={50}>A couple needs a gap between the lines</Heading>
    <div style={{ marginTop: 26, display: "flex", gap: 50, alignItems: "flex-start" }}>
      <Rise delay={22}>
        <div
          style={{
            background: theme.badSoft,
            border: "2px solid #f6d6c6",
            borderRadius: 22,
            padding: "20px 26px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <RodFigure mode="couple" delay={26} />
          <div style={{ fontFamily: lora, fontSize: 26, color: theme.bad }}>τ = F × gap</div>
        </div>
      </Rise>
      <Rise delay={34}>
        <div
          style={{
            background: theme.okSoft,
            border: "2px solid #cbe8d9",
            borderRadius: 22,
            padding: "20px 26px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <RodFigure mode="line" delay={38} />
          <div style={{ fontFamily: lora, fontSize: 26, color: theme.ok }}>gap = 0, so τ = 0</div>
        </div>
      </Rise>
    </div>
    <Rise delay={52}>
      <div style={{ marginTop: 26, fontSize: 26, color: theme.body, textAlign: "center", maxWidth: 1180 }}>
        In this question the two lines of action are the same line, so the perpendicular gap between
        them is zero — and no turning effect survives.
      </div>
    </Rise>
  </Column>
);

/* ------------------------------------------------------------------ */
/* 10 — recap                                                          */
/* ------------------------------------------------------------------ */

export const RecapScene: React.FC<SceneProps> = () => (
  <Column style={{ alignItems: "center", textAlign: "center" }}>
    <Eyebrow>Recap</Eyebrow>
    <Heading size={52}>Two checks, then one picture</Heading>
    <div style={{ marginTop: 34, display: "flex", gap: 34 }}>
      {[
        { k: "ΣF", v: "= 0", note: "centre of mass stays put", tone: theme.ok },
        { k: "τ about O", v: "= 0", note: "no spin about any point", tone: theme.ok },
        { k: "lines of action", v: "coincide", note: "so there is no couple", tone: theme.accent },
      ].map((c, i) => (
        <Rise key={c.k} delay={22 + i * 12}>
          <div
            style={{
              background: theme.card,
              border: `2px solid ${theme.line}`,
              borderRadius: 20,
              padding: "24px 28px",
              minWidth: 300,
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            <div style={{ fontSize: 22, fontWeight: 800, color: theme.faint, letterSpacing: "0.06em" }}>
              {c.k}
            </div>
            <div style={{ fontFamily: lora, fontSize: 34, fontWeight: 600, color: c.tone }}>{c.v}</div>
            <div style={{ fontSize: 20, color: theme.muted }}>{c.note}</div>
          </div>
        </Rise>
      ))}
    </div>
    <Rise delay={64}>
      <div style={{ marginTop: 34, fontSize: 27, color: theme.body }}>
        Equal and opposite forces cancel only on one line. Give them a sideways gap, and the body
        spins.
      </div>
    </Rise>
  </Column>
);

/* ------------------------------------------------------------------ */

export const SCENES: Record<string, React.FC<SceneProps>> = {
  "01-title": TitleScene,
  "02-question": QuestionScene,
  "03-intuition": IntuitionScene,
  "04-netforce": NetForceScene,
  "05-torque": TorqueScene,
  "06-anypoint": AnyPointScene,
  "07-secret": SecretScene,
  "08-collinear": CollinearScene,
  "09-couple": CoupleScene,
  "10-recap": RecapScene,
};
