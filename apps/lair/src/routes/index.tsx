import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute('/')({component: App});

function App() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="text-2xl font-semibold">Home</h1>
    </main>
  );
}
