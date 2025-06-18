import { CardsDemo } from "@/components/cards";
import { ThemeWrapper } from "@/components/theme-wrapper";

export const dynamic = "force-static";
export const revalidate = false;

export default function ComponentLayout() {
  return (
    <ThemeWrapper>
      <CardsDemo />
    </ThemeWrapper>
  );
}
