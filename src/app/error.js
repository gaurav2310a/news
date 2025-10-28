"use client";

import { useEffect } from "react";

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold">Something went wrong</h2>
      <p className="mt-2">An unexpected error occurred. Try again.</p>
      <button onClick={() => reset()} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">
        Retry
      </button>
    </div>
  );
}
