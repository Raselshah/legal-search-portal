"use client";
import React, { useState } from "react";
import ResultCard from "../components/ResultCard";

export default function Home() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [summary, setSummary] = useState<string | null>(null);
  const [matches, setMatches] = useState<
    { id: string; title: string; content: string }[]
  >([]);

  async function handleSearch(e?: React.FormEvent) {
    e?.preventDefault();
    setError(null);
    setSummary(null);
    setMatches([]);

    if (!query.trim()) {
      setError("Please enter a query");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:4000/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j?.error || `error: ${res.status}`);
      }

      const data = await res.json();
      setSummary(data.summary || null);
      setMatches(data.matches || []);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Unknown error");
      } else {
        setError("Unknown error");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-start justify-center p-6">
      <div className="max-w-3xl w-full">
        <header className="mb-6">
          <h1 className="text-2xl font-bold">Legal Document Search</h1>
          <p className="text-sm text-gray-600">
            Search and summarize mock legal documents.
          </p>
        </header>

        <form onSubmit={handleSearch} className="flex gap-3">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 p-3 rounded border border-gray-200 bg-white"
            placeholder="Type search 'termination', 'confidential'"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-60"
          >
            {loading ? "Searching…" : "Search"}
          </button>
        </form>

        <div className="mt-4">
          {error && <div className="text-red-600">{error}</div>}
          {summary && (
            <div className="mt-2 text-sm text-gray-700">{summary}</div>
          )}

          <div className="mt-4 grid gap-4">
            {matches.length === 0 && !loading && !error && (
              <div className="text-sm text-gray-500">
                No results yet — try searching.
              </div>
            )}

            {matches.map((m) => (
              <ResultCard
                key={m.id}
                id={m.id}
                title={m.title}
                content={m.content}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
