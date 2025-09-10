// src/features/auth/hooks/useProfile.ts
'use client';

import { useState, useEffect } from 'react';
import { fetchProfile, Profile } from '@/api/deliveryApi'; // o '@/api/userApi'

export function useProfile() {
  const [user, setUser] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile()
      .then((u) => setUser(u))
      .catch((err) => {
        console.error('Error al cargar perfil:', err);
      })
      .finally(() => setLoading(false));
  }, []);

  return { user, loading };
}
