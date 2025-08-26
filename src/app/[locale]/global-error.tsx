"use client"
export default function GlobalError({ error }: { error: Error }) {
  return (
    <div>
      <h1>Global Error</h1>
      <p>{error.message}</p>
    </div>
  );
}