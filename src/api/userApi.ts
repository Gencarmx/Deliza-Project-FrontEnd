// src/api/userApi.ts
import api from "./deliveryApi";

export interface User {
  id: string;
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  correo_electronico: string;
  numero_telefono: string;
  tipo_usuario: "cliente" | "repartidor";
}

export interface CreateUserPayload {
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  correo_electronico: string;
  numero_telefono: string;
  contrasena: string;
  tipo_usuario: "cliente" | "repartidor";
}

export interface UpdateUserPayload {
  id: string;
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  correo_electronico: string;
  numero_telefono: string;
  // agrega aquí cualquier otro campo editable de Usuario
}

/**
 * Crea un usuario genérico.
 */
export async function createUser(data: CreateUserPayload): Promise<User> {
  const { data: user } = await api.post<User>("/usuarios", data);
  return user;
}

/**
 * Devuelve la lista completa de usuarios.
 */
export async function fetchAllUsers(): Promise<User[]> {
  const { data } = await api.get<User[]>("/usuarios");
  return data;
}

/**
 * Obtiene un usuario por su ID.
 */
export async function fetchUserById(id: string): Promise<User> {
  const { data } = await api.get<User>(`/usuarios/${id}`);
  return data;
}

/**
 * Obtiene el perfil del usuario “activo” asumiendo que solo hay uno
 * (o que nos interesa el primero de la lista).
 */
export async function fetchProfile(): Promise<User> {
  const users = await fetchAllUsers();
  if (!Array.isArray(users) || users.length === 0) {
    throw new Error("No hay usuarios en el sistema");
  }
  return users[0];
}

/**
 * Actualiza un usuario existente.
 */
export async function updateUser(
  payload: UpdateUserPayload
): Promise<User> {
  const { data: user } = await api.put<User>(
    `/usuarios/${payload.id}`,
    payload
  );
  return user;
}
