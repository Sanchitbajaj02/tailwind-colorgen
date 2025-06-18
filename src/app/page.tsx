import ColorPicker from "@/components/color-picker";

export default function Home() {
  return (
    <main className="px-4 py-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-extrabold text-center mb-8">
        Tailwind Color Palette Generator
      </h1>

      <ColorPicker />
    </main>
  );
}
