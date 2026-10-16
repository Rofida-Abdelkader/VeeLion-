import Link from "next/link";

export default function HomePage() {
  return (
    <main className="home-page">
      <header className="stack" style={{ marginBottom: "1.5rem" }}>
        <h1 style={{ margin: 0 }}>VeeLion Frontend Assessment</h1>
        <p style={{ margin: 0, color: "var(--muted)" }}>
          Two separate modules built against the provided backend.
        </p>
      </header>

      <section className="stack home-page__links">
        <Link href="/tasks" className="card home-page__link">
          <h2>Task Dashboard</h2>

        </Link>

        <Link href="/activity" className="card home-page__link">
          <h2>Activity Feed</h2>

        </Link>

        <Link href="/reports" className="card home-page__link">
          <h2>Reports</h2>
        </Link>
      </section>
    </main>
  );
}
