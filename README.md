# Two opposite forces, and still no rotation

A narrated explainer (English, Kokoro-82M `am_michael`) on this question:

> If a rigid body is subjected to two forces **F₁ = 2i + 3j + 4k** acting at **(3, 3, 4)** and
> **F₂ = −2i − 3j − 4k** acting at **(1, 0, 0)**, then which of the following is true?
> (A) the body is in equilibrium (B) the body is under a couple only (C) a single force
> (D) a force together with a couple.

Answer: **(A)**. The video explains why, because the usual instinct — equal and opposite forces at
two points make a couple — is right in general and fails here for a specific reason.

## The reasoning on screen

1. **Net force.** `(2,3,4) + (−2,−3,−4) = (0,0,0)`. No acceleration of the centre of mass.
2. **Torque about the origin.** `(3,3,4) × (2,3,4) = (0,−4,3)` and `(1,0,0) × (−2,−3,−4) = (0,4,−3)`.
   They sum to zero.
3. **Any point.** With `ΣF = 0` the total torque is independent of the reference point, so zero
   about the origin means zero everywhere.
4. **The hidden fact.** The displacement between the points of application is
   `(3,3,4) − (1,0,0) = (2,3,4)`, which *is* `F₁`. The two points therefore lie on one line, and
   both forces act along that same line of action.
5. **Couple test.** A couple's torque is force × the perpendicular gap *between the two lines of
   action*. Here the two lines coincide, so the gap is zero and no turning effect survives. For a
   two-force system the total torque about any point is `(r₁ − r₂) × F₁ = d × F₁`, which vanishes
   exactly when `d ∥ F₁`.

## Build

```bash
npm install
pip install kokoro-onnx numpy
curl -L -o kokoro-v1.0.onnx https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0/kokoro-v1.0.onnx
curl -L -o voices-v1.0.bin  https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0/voices-v1.0.bin
python3 scripts/tts_kokoro.py --model kokoro-v1.0.onnx --voices voices-v1.0.bin
npx tsc --noEmit
npx remotion render src/index.ts EquilibriumForces out/raw.mp4 --gl=swangle
```

Scene lengths are measured from the generated audio, never typed by hand
(`scripts/tts_kokoro.py` writes `src/manifest.json`). Rendering happens on GitHub Actions, never in
a chat sandbox. The workflow also normalises loudness to −14 LUFS before uploading.

Visuals: `src/scenes.tsx`, with the 3-D vector primitives (projection, arrows, line of action) in
`src/components/Vec3.tsx`.
