"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import type { ErrorResponse, TasksSummary } from "@/types/api";

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : "Could not load reports right now.";
}

export default function ReportsPage() {
  const [summary, setSummary] = useState<TasksSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchSummary = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/reports/tasks-summary", {
        cache: "no-store",
      });

      if (!response.ok) {
        let message = `Request failed with status ${response.status}`;

        try {
          const body = (await response.json()) as ErrorResponse;
          message = body.error?.message || message;
        } catch {
          // Keep the status-based message when the error response is not JSON.
        }

        throw new Error(message);
      }

      const data = (await response.json()) as TasksSummary;
      setSummary(data);
    } catch (fetchError) {
      setError(getErrorMessage(fetchError));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchSummary();
  }, [fetchSummary]);

  return (
    <main className="stack page-shell reports-page">
      <nav>
        <Link href="/" className="button">
          Back
        </Link>
      </nav>

      <header className="card report-header">
        <h1>Reports</h1>
        <p style={{ margin: 0, color: "var(--muted)" }}>
          A live summary of tasks and recent activity.
        </p>
      </header>

      {loading ? (
        <section className="card report-state" role="status">
          <p style={{ margin: 0 }}>Loading reports...</p>
        </section>
      ) : null}

      {error ? (
        <section
          className="card report-state"
          style={{ borderColor: "#e3b4c0", background: "#fff8fa" }}
          role="alert"
        >
          <p style={{ marginTop: 0, marginBottom: "0.75rem", color: "var(--danger)" }}>
            {error}
          </p>
          <button type="button" className="button" onClick={() => void fetchSummary()}>
            Retry
          </button>
        </section>
      ) : null}

      {!loading && !error && summary ? (
        <section
          className="stack report-summary"
          aria-label="Task summary"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}
        >
          <article className="card">
            <h2 style={{ margin: 0, color: "var(--muted)" }}>Total tasks</h2>
            <p style={{ margin: "0.5rem 0 0", fontWeight: 700 }}>
              {summary.total}
            </p>
          </article>
          <article className="card">
            <h2 style={{ margin: 0, color: "var(--muted)" }}>To do</h2>
            <p style={{ margin: "0.5rem 0 0", fontWeight: 700 }}>
              {summary.byStatus.todo}
            </p>
          </article>
          <article className="card">
            <h2 style={{ margin: 0, color: "var(--muted)" }}>In progress</h2>
            <p style={{ margin: "0.5rem 0 0", fontWeight: 700 }}>
              {summary.byStatus["in-progress"]}
            </p>
          </article>
          <article className="card">
            <h2 style={{ margin: 0, color: "var(--muted)" }}>Done</h2>
            <p style={{ margin: "0.5rem 0 0", fontWeight: 700 }}>
              {summary.byStatus.done}
            </p>
          </article>
          <article className="card">
            <h2 style={{ margin: 0, color: "var(--muted)" }}>
              Recent activity
            </h2>
            <p style={{ margin: "0.5rem 0 0", fontWeight: 700 }}>
              {summary.recentActivityCount}
            </p>
          </article>
        </section>
      ) : null}
    </main>
  );
}