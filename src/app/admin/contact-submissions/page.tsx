"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";
import { Search } from "lucide-react";

import { AdminLayout } from "@/components/admin/admin-layout";

type SubmissionStatus =
  | "new"
  | "reviewed"
  | "completed";

interface ContactSubmission {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  consentGiven: boolean;
  ipAddress: string | null;
  status: SubmissionStatus;
  createdAt: string;
}

const STATUS_OPTIONS = [
  "new",
  "reviewed",
  "completed",
] as const;

const STATUS_CONFIG = {
  new: {
    label: "New",
    className:
      "border-blue-200 bg-blue-100 text-blue-800",
  },

  reviewed: {
    label: "Reviewed",
    className:
      "border-amber-200 bg-amber-100 text-amber-800",
  },

  completed: {
    label: "Completed",
    className:
      "border-green-200 bg-green-100 text-green-800",
  },
} as const;

function formatDate(value: string) {
  return new Date(value).toLocaleString(
    "en-US",
    {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    },
  );
}

export default function ContactSubmissionsPage() {
  const [
    submissions,
    setSubmissions,
  ] = useState<
    ContactSubmission[]
  >([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState<string | null>(
    null,
  );

  const [
    searchText,
    setSearchText,
  ] = useState("");

  const [
    statusFilter,
    setStatusFilter,
  ] = useState<
    "all" | SubmissionStatus
  >("all");

  const [
    updatingId,
    setUpdatingId,
  ] = useState<number | null>(
    null,
  );

  useEffect(() => {
    async function loadSubmissions() {
      try {
        setLoading(true);
        setError(null);

        const response =
          await fetch(
            "/api/admin/contact-submissions",
            {
              credentials:
                "same-origin",
              cache: "no-store",
            },
          );

        if (
          response.status === 401
        ) {
          throw new Error(
            "Your admin session has expired. Please sign in again.",
          );
        }

        if (!response.ok) {
          throw new Error(
            "Failed to load contact submissions.",
          );
        }

        const data =
          (await response.json()) as ContactSubmission[];

        setSubmissions(data);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Failed to load contact submissions.",
        );
      } finally {
        setLoading(false);
      }
    }

    loadSubmissions();
  }, []);

  const filtered =
    useMemo(() => {
      const query =
        searchText
          .trim()
          .toLowerCase();

      return submissions.filter(
        (submission) => {
          const matchesSearch =
            !query ||
            submission.name
              .toLowerCase()
              .includes(query) ||
            submission.email
              .toLowerCase()
              .includes(query) ||
            submission.phone.includes(
              query,
            );

          const matchesStatus =
            statusFilter === "all" ||
            submission.status ===
              statusFilter;

          return (
            matchesSearch &&
            matchesStatus
          );
        },
      );
    }, [
      submissions,
      searchText,
      statusFilter,
    ]);

  const counts =
    useMemo(() => {
      const values = {
        new: 0,
        reviewed: 0,
        completed: 0,
      };

      submissions.forEach(
        (submission) => {
          values[
            submission.status
          ] += 1;
        },
      );

      return values;
    }, [submissions]);

  async function updateStatus(
    id: number,
    status: SubmissionStatus,
  ) {
    try {
      setUpdatingId(id);

      const response =
        await fetch(
          `/api/admin/contact-submissions/${id}/status`,
          {
            method: "PATCH",

            credentials:
              "same-origin",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              status,
            }),
          },
        );

      const data =
        await response
          .json()
          .catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data.error ??
            "Status update failed.",
        );
      }

      setSubmissions(
        (current) =>
          current.map(
            (submission) =>
              submission.id === id
                ? {
                    ...submission,
                    status,
                  }
                : submission,
          ),
      );
    } catch (error) {
      window.alert(
        error instanceof Error
          ? error.message
          : "Status update failed.",
      );
    } finally {
      setUpdatingId(null);
    }
  }

  return (
    <AdminLayout>
      <div className="mx-auto max-w-7xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Contact Messages
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            {submissions.length} total
            {" · "}
            {counts.new} new
          </p>
        </div>

        <div className="mb-5 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-4 xl:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

              <input
                type="search"
                placeholder="Search by name, email, or phone..."
                value={searchText}
                onChange={(event) =>
                  setSearchText(
                    event.target.value,
                  )
                }
                className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-900 outline-none transition focus:border-green-700 focus:ring-2 focus:ring-green-700/20"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() =>
                  setStatusFilter(
                    "all",
                  )
                }
                className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                  statusFilter ===
                  "all"
                    ? "bg-green-700 text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                All (
                {
                  submissions.length
                }
                )
              </button>

              {STATUS_OPTIONS.map(
                (status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() =>
                      setStatusFilter(
                        status,
                      )
                    }
                    className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                      statusFilter ===
                      status
                        ? "bg-green-700 text-white"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    {
                      STATUS_CONFIG[
                        status
                      ].label
                    }{" "}
                    (
                    {
                      counts[
                        status
                      ]
                    }
                    )
                  </button>
                ),
              )}
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          {loading ? (
            <div className="flex min-h-64 items-center justify-center">
              <div className="text-center">
                <div className="mx-auto h-9 w-9 animate-spin rounded-full border-4 border-slate-200 border-t-green-700" />

                <p className="mt-3 text-sm text-slate-500">
                  Loading messages...
                </p>
              </div>
            </div>
          ) : error ? (
            <div className="p-12 text-center">
              <p className="text-sm text-red-700">
                {error}
              </p>
            </div>
          ) : filtered.length ===
            0 ? (
            <div className="p-12 text-center text-sm text-slate-500">
              {searchText ||
              statusFilter !==
                "all"
                ? "No submissions match your filters."
                : "No contact submissions yet."}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[850px] text-left text-sm">
                <thead className="border-b border-slate-200 bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 font-semibold text-slate-600">
                      Date
                    </th>

                    <th className="px-4 py-3 font-semibold text-slate-600">
                      Name
                    </th>

                    <th className="px-4 py-3 font-semibold text-slate-600">
                      Contact
                    </th>

                    <th className="px-4 py-3 font-semibold text-slate-600">
                      Message
                    </th>

                    <th className="px-4 py-3 font-semibold text-slate-600">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-200">
                  {filtered.map(
                    (submission) => (
                      <tr
                        key={
                          submission.id
                        }
                        className="transition hover:bg-slate-50"
                      >
                        <td className="whitespace-nowrap px-4 py-4 text-xs text-slate-500">
                          {formatDate(
                            submission.createdAt,
                          )}
                        </td>

                        <td className="px-4 py-4">
                          <p className="font-medium text-slate-900">
                            {
                              submission.name
                            }
                          </p>
                        </td>

                        <td className="px-4 py-4">
                          <p className="text-slate-900">
                            {
                              submission.email
                            }
                          </p>

                          <p className="mt-1 text-xs text-slate-500">
                            {
                              submission.phone
                            }
                          </p>
                        </td>

                        <td className="max-w-sm px-4 py-4">
                          <p
                            className="truncate text-slate-600"
                            title={
                              submission.message
                            }
                          >
                            {
                              submission.message
                            }
                          </p>
                        </td>

                        <td className="px-4 py-4">
                          <select
                            value={
                              submission.status
                            }
                            disabled={
                              updatingId ===
                              submission.id
                            }
                            onChange={(
                              event,
                            ) =>
                              updateStatus(
                                submission.id,
                                event
                                  .target
                                  .value as SubmissionStatus,
                              )
                            }
                            className={`rounded-full border px-3 py-1.5 text-xs font-semibold outline-none ${
                              STATUS_CONFIG[
                                submission
                                  .status
                              ]
                                .className
                            }`}
                          >
                            {STATUS_OPTIONS.map(
                              (
                                status,
                              ) => (
                                <option
                                  key={
                                    status
                                  }
                                  value={
                                    status
                                  }
                                >
                                  {
                                    STATUS_CONFIG[
                                      status
                                    ]
                                      .label
                                  }
                                </option>
                              ),
                            )}
                          </select>
                        </td>
                      </tr>
                    ),
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {!loading &&
          !error &&
          filtered.length > 0 && (
            <p className="mt-3 text-right text-xs text-slate-500">
              Showing{" "}
              {filtered.length} of{" "}
              {submissions.length}{" "}
              submissions
            </p>
          )}
      </div>
    </AdminLayout>
  );
}