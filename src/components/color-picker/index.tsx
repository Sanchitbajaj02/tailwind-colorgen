// app/page.tsx
"use client";

import { useState, useMemo } from "react";
import { HexColorInput, HexColorPicker } from "react-colorful";
import chroma from "chroma-js";
import { Input } from "@/components/ui/input";
import CopyTooltip from "@/components/color-picker/copy-tooltip";
import seedRandom from "seedrandom"

export default function ColorPicker() {
  const [color, setColor] = useState("#000000");
  const [tailwind3, setTailwind3] = useState("");
  const [tailwind4, setTailwind4] = useState("");

  const generateColorScale = (inputColor: string) => {
    const labels = ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900"];
    let closestIndex = 0;
    let minDelta = Infinity;

    const scale = chroma
      .scale([chroma(inputColor).brighten(3), inputColor, chroma(inputColor).darken(2)])
      .mode("lch")
      .colors(10);

    // Include the actual input color in the scale
    for (let i = 0; i < scale.length; i++) {
      const delta = chroma.deltaE(inputColor, scale[i]);
      if (delta < minDelta) {
        minDelta = delta;
        closestIndex = i;
      }
    }
    scale[closestIndex] = inputColor;

    const result: Record<string, string> = {};
    labels.forEach((label, i) => {
      result[label] = scale[i];
    });
    return { result, closestIndex };
  };

  const generateColorName = (inputColor: string) => {
    // Seed-based random generator using the color hex
    // const seed = parseInt(inputColor.slice(1), 16);
    const rng = seedRandom(inputColor);

    // Generate a random name based on the seed
    const names = ["Ocean", "Sky", "Coral", "Forest", "Sunset", "Lavender", "Keppel", "Mercury"];
    const index = Math.floor(rng() * names.length);

    return `${names[index]} ${inputColor.slice(1).toUpperCase()}`;
  };

  const { result: palette, closestIndex } = useMemo(() => generateColorScale(color), [color]);
  const paletteName = useMemo(() => generateColorName(color), [color])

  console.log(paletteName)

  return (
    <section className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center w-full">
        <HexColorPicker color={color} onChange={setColor} style={{ width: "100%" }} />
        <div>
          <HexColorInput className="border rounded p-2 w-full" color={color} onChange={setColor} />
          <div className="text-sm text-gray-600 mt-1">Pick a color or input HEX code</div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-4">
        {Object.entries(palette).map(([key, hex], index) => (
          <CopyTooltip key={key} colorNumberKey={key} hex={hex} closestIndex={closestIndex} index={index} />
        ))}
      </div>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center w-full">
        <article>
          <div className="flex flex-col md:flex-row gap-2 mb-2">
            <h2 className="text-xl font-semibold">Tailwind V3</h2>
            <Input
              type="text"
              name="colorName"
              id="colorName"
              onChange={(e) => setTailwind3(e.target.value)}
              placeholder="Enter your custom name"
              className="w-full md:w-1/2"
            />
          </div>

          <pre className="bg-gray-100 p-4 rounded overflow-auto text-sm">
            {`'${tailwind3 ? tailwind3 : "DEFAULT"}': {
${Object.entries(palette)
  .map(([k, v]) => `  '${k}: ${v}',`)
  .join("\n")}
}`}
          </pre>
        </article>
        <article>
          <div className="flex flex-col md:flex-row gap-2 mb-2">
            <h2 className="text-xl font-semibold">Tailwind V4</h2>
            <Input
              type="text"
              name="colorName"
              id="colorName"
              onChange={(e) => setTailwind4(e.target.value)}
              placeholder="Enter your custom name"
              className="w-full md:w-1/2"
            />
          </div>
          <pre className="bg-gray-100 p-4 rounded overflow-auto text-sm">
            {`:root {
${Object.entries(palette)
  .map(([k, v]) => `  --color${tailwind4 ? "-" + tailwind4 : ""}-${k}: ${v};`)
  .join("\n")}
}`}
          </pre>
        </article>
      </section>
    </section>
  );
}
