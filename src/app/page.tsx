import ColorPicker from "@/components/color-picker";

export default function Home() {
  return (
    <main className="px-4 py-8 max-w-7xl mx-auto">
      <h1 className="text-4xl font-extrabold text-center mb-2">Tailwind Colorgen</h1>
      <h2 className="text-2xl font-semibold text-center mb-8">Color Palette Generator</h2>
      <ColorPicker />
    </main>
  );
}
