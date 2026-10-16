import { NextResponse } from "next/server";
import { BACKEND_BASE_URL } from "@/lib/constants";
import type { ErrorResponse, TasksSummary } from "@/types/api";

async function parseError(response: Response): Promise<string> {
  let fallback = `Request failed with status ${response.status}`;

  try {
    const body = (await response.json()) as ErrorResponse;
    return body.error?.message || fallback;
  } catch {
    return fallback;
  }
}

export async function GET() {
  try {
    const response = await fetch(`${BACKEND_BASE_URL}/reports/tasks-summary`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(await parseError(response));
    }

    const summary = (await response.json()) as TasksSummary;
    return NextResponse.json(summary, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        error: {
          message: error instanceof Error ? error.message : "Unable to fetch reports.",
        },
      },
      { status: 500 }
    );
  }
}
