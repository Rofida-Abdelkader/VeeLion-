"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { ActivityLog } from "@/types/api";

export default function ActivityPage() {
  const [allActivity, setAllActivity] = useState<ActivityLog[]>([]);
  const [query, setQuery] = useState("");

  function formatTimeActivity(value: string) {
    return new Date(value).toLocaleString();
  }

  useEffect(() => {
    fetch("/api/activity")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch activity");
        }
        return response.json();
      })
      .then((data: ActivityLog[]) => {
        setAllActivity(data || []);
      })
      .catch(() => {
        setAllActivity([]);
      });
  }, []);

  const lowerQuery = query.trim().toLowerCase();

  const shownActivity = !lowerQuery
    ? allActivity
    : allActivity.filter(
        (item) =>
          (item.action || "").toLowerCase().includes(lowerQuery) ||
          (item.info || "").toLowerCase().includes(lowerQuery)
      );

  const stats = {
    total: allActivity.length,
    visible: shownActivity.length,
  };

  return (
    <main className="stack page-shell activity-page">
      <nav>
        <Link href="/" className="button">
          Back
        </Link>
      </nav>

      <section className="card activity-search">
        <h1>Activity Feed</h1>

        <input
          className="input"
          placeholder="Search activity"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </section>

      <section className="card activity-count">
        <small>
          Total: {stats.total} | Visible: {stats.visible}
        </small>
      </section>

      <section className="card activity-feed">
        <ul className="activity-feed__list">
          {shownActivity.map((item) => (
            <li key={item.id} className="activity-feed__item">
              <div style={{ fontWeight: 600 }}>{item.action || "(no action)"}</div>
              <div>{item.info || "(no info)"}</div>
              <small style={{ color: "var(--muted)" }}>{formatTimeActivity(item.when)}</small>
              <br />
              {/* <small style={{ color: "var(--muted)" }}>{formatTimeActivity(item.when)}</small> */}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
