// src/pages/Home.tsx
export default function Mission() {
  return (
    <main className="flex h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-bold">야외 방탈출</h1>
      <a
        className="rounded-lg bg-primary px-6 py-3 text-white hover:bg-primary/90"
        href="/mission/1"
      >
        미션 시2
      </a>
    </main>
  );
}
