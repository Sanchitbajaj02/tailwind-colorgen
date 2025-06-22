// app/page.tsx
"use client";

import { useState, useMemo } from "react";
import { HexColorInput, HexColorPicker } from "react-colorful";
import chroma from "chroma-js";
import { Input } from "@/components/ui/input";
import CopyTooltip from "@/components/color-picker/copy-tooltip";

export default function ColorPicker() {
  const [color, setColor] = useState("#ef4444");
  const [tailwind3, setTailwind3] = useState("");
  const [tailwind4, setTailwind4] = useState("");

  const generateColorScale = (inputColor: string) => {
    const labels = ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900"];
    let closestIndex = 0;
    let minDelta = Infinity;

    const scale = chroma
      .scale([chroma(inputColor).brighten(4), inputColor, chroma(inputColor).darken(3.5)])
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

  const { result: palette, closestIndex } = useMemo(() => generateColorScale(color), [color]);

  return (
    <section className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center w-full">
        <HexColorPicker color={color} onChange={setColor} style={{ width: "100%" }} />
        <div>
          <HexColorInput className="border rounded p-2 w-full" color={color} onChange={setColor} />
          <div className="text-sm text-gray-600 mt-1">Pick a color or input HEX code</div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
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
