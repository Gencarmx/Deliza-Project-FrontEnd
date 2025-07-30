// src/api/deliveryApi.ts
'use client';

import axios from 'axios';

// Base URL para tu API (leída desde .env.local)
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://192.168.0.105:3000';
console.log("🔎 API_URL en runtime:", API_URL);    // <<-- añade esto
const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});
console.log("➡️ Axios baseURL:", api.defaults.baseURL);
// ——— TYPES ——————————————————————————————————————————————————

export interface Order {
   id: string;
   restaurantName: string;
   clientAddress: string;
   total: number;
   tip: number;
   canAccept: boolean;
}

export interface OrderDetails {
  id: string;
  restaurantName: string;
  restaurantAddress: string;
  address: string;
  total: number;
  estatus: "Por aceptar" | "En camino" | "Entregado";
  createdAt: string;
  detalles: Array<{
    productoId?: string;
    comboId?:   string;
    cantidad:   number;
    precio:     number;
  }>;
}

export interface Profile {
  id: string;
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  correo_electronico: string;
  numero_telefono: string;
  tipo_usuario: 'cliente' | 'repartidor';
}

export interface NotificationSettings {
  appNotifs: boolean;
  orderUpdates: boolean;
  appUpdates: boolean;
  pwChange: boolean;
}

export interface SecuritySettings {
  trackLocation: boolean;
  authCode: boolean;
}

// Para las estadísticas dinámicas:
export interface Breakdown {
  label: string;
  value: number;
}

export interface RecentDelivery {
  address: string;
  time: string;
  amount: number;
  tip: number;
}

export interface Stats {
  totalEarnings: number;
  totalDeliveries: number;
  avgPerDelivery: number;
  distanciaRecorrida: number;
  promedioCalificacion: number;
  tiempoPromedioEntrega: number;
  breakdown: Breakdown[];
  recentDeliveries: RecentDelivery[];
}

export interface DeliveryHistoryResponse {
  orders: Order[];
  totalPages: number;
}

// Payload para crear repartidor
export interface CreateRepartidorPayload {
  usuario_id: string;
  tipo_vehiculo: string;
  disponibilidad: string;
  matricula: string;
  licencia: string;
}

export interface RouteResponse {
  distancia_km: string;
  tiempo_min:   string;
  ruta: {
    type: string;
    coordinates: [number, number][];
  };
}

export interface RouteGeoJSON { type: 'FeatureCollection'; features: any[]; }

//--------------------Ruta-----------------------

export async function fetchRouteForOrder(orderId: string): Promise<RouteResponse> {
  // ¡Aquí sólo pides /ordenes/:id/ruta, el servidor ya usó fullAddress y bbox!
  const { data } = await api.get<RouteResponse>(`/ordenes/${orderId}/ruta`);
  return data;
}

export async function fetchInTransitOrders(): Promise<Order[]> {
  return (await api.get<Order[]>("/ordenes/en-camino")).data;
}


// ——— ORDERS ——————————————————————————————————————————————————

export async function fetchAssignedOrders(): Promise<Order[]> {
  return (await api.get<Order[]>("/ordenes")).data;
}

export async function fetchDeliveredOrders(): Promise<Order[]> {
  return (await api.get<Order[]>("/ordenes/entregadas")).data;
}

export async function acceptOrder(orderId: string): Promise<OrderDetails> {
  return (await api.put<OrderDetails>(`/ordenes/${orderId}/aceptar`)).data;
}

export async function fetchOrderById(orderId: string): Promise<OrderDetails> {
  return (await api.get<OrderDetails>(`/ordenes/${orderId}`)).data;
}

export async function updateOrderStatus( orderId: string, status: string ): Promise<void> {
  await api.put(`/ordenes/${orderId}/estatus`, { status });
}

// ——— PROFILE ——————————————————————————————————————————————————

export async function fetchProfile(): Promise<Profile> {
  const id = localStorage.getItem("userId");
  if (!id) throw new Error("No hay userId en localStorage");
  const { data } = await api.get<Profile>(`/usuarios/${id}`);
  return data;
}

export async function updateProfile(profile: Profile): Promise<Profile> {
  // si quisieras separar cliente/repartidor en endpoints distintos
  // podrías alternativamente hacer `/usuarios/${profile.id}` aquí
  const { data } = await api.put<Profile>(`/usuarios/${profile.id}`, profile);
  return data;
}

// ——— NOTIFICATIONS ——————————————————————————————————————————————————

export async function fetchNotificationSettings(): Promise<NotificationSettings> {
  const { data } = await api.get<NotificationSettings>('/notificacion');
  return data;
}

export async function updateNotificationSettings(settings: NotificationSettings): Promise<void> {
  await api.put('/notificacion/1', settings);
}

// ——— SECURITY ——————————————————————————————————————————————————

export async function fetchSecuritySettings(): Promise<SecuritySettings> {
  const { data } = await api.get<SecuritySettings>('/usuario/1');
  return data;
}

export async function updateSecuritySettings(settings: SecuritySettings): Promise<void> {
  await api.put('/usuario/1', settings);
}

// ——— STATS & HISTORY ——————————————————————————————————————————————————

export type Periodo = 'day' | 'week' | 'month';

/**
 * Obtiene estadísticas de ganancias y entregas.
 *
 * @param period 'day' | 'week' | 'month'
 */
export async function fetchStats(
  period: Periodo = 'week'
): Promise<Stats> {
  const { data } = await api.get<Stats>(`/estadisticas/stats?period=${period}`);
  return data;
}

export async function fetchDeliveryHistory(
  page: number
): Promise<DeliveryHistoryResponse> {
  const { data } = await api.get<DeliveryHistoryResponse>(`/ordenes?page=${page}`);
  return data;
}

// ——— REGISTRATION ——————————————————————————————————————————————————

export async function createRepartidor(
  payload: CreateRepartidorPayload
): Promise<CreateRepartidorPayload> {
  const { data } = await api.post<CreateRepartidorPayload>('/repartidor', payload);
  return data;
}

export default api;
