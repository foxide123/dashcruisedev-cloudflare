// components/ui/StaticHeroText.tsx
export default function StaticHeroText({ fallbackText }: { fallbackText: string }) {
    return (
      <span className="text-carrot-500">
        {fallbackText}
      </span>
    );
  }
  