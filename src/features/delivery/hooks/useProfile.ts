// src/features/delivery/hooks/useProfile.ts
"use client";

import { useState, useEffect, useCallback } from "react";
import type { User as Profile, UpdateUserPayload } from "@/api/userApi";
import {fetchUserById, updateUser,} from "@/api/userApi";

export function useProfile() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProfile = useCallback(async () => {
    setLoading(true)
    try {
      const userId = localStorage.getItem("userId")
      if (!userId) throw new Error("No hay userId en localStorage")
      const data = await fetchUserById(userId)
      setProfile(data)
    } catch (err: any) {
      setError(err.message || "No se pudo cargar el perfil")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  const saveProfile = useCallback(
  async (updated: UpdateUserPayload) => {
    setLoading(true);
    try {
      const saved = await updateUser(updated);
      setProfile(saved);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  },
  []
);

  return { profile, loading, error, saveProfile };
}
