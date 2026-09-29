"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

export interface AdminUser {
  username: string;
}

interface UseAdminAuthResult {
  user: AdminUser | null;
  loading: boolean;
  logout: () => Promise<void>;
  refetch: () => void;
}

export function useAdminAuth(): UseAdminAuthResult {
  const [user, setUser] =
    useState<AdminUser | null>(null);

  const [loading, setLoading] =
    useState(true);

  const fetchMe = useCallback(() => {
    setLoading(true);

    fetch("/api/admin/me", {
      method: "GET",
      credentials: "same-origin",
      cache: "no-store",
    })
      .then((response) =>
        response.ok ? response.json() : null,
      )
      .then((data: unknown) => {
        if (
          data &&
          typeof data === "object" &&
          "username" in data &&
          typeof (
            data as { username?: unknown }
          ).username === "string"
        ) {
          setUser(data as AdminUser);
        } else {
          setUser(null);
        }
      })
      .catch(() => {
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchMe();
  }, [fetchMe]);

  const logout = useCallback(async () => {
    try {
      await fetch("/api/admin/logout", {
        method: "POST",
        credentials: "same-origin",
      });
    } finally {
      setUser(null);
    }
  }, []);

  return {
    user,
    loading,
    logout,
    refetch: fetchMe,
  };
}