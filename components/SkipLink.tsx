export default function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:bg-paper focus:text-ink focus:px-4 focus:py-2 focus:rounded-sm focus:ring-2 focus:ring-accent focus:outline-none"
    >
      メインコンテンツへスキップ
    </a>
  );
}
