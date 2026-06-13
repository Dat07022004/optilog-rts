// Mock domain data for the OptiLog prototype.

export type CameraStatus = "online" | "offline" | "degraded";
export type AlertSeverity = "low" | "medium" | "high" | "critical";
export type ObjectType = "forklift" | "pallet" | "worker" | "vehicle";
export type ZoneName = "Inbound" | "Storage A" | "Storage B" | "Packing" | "Outbound";

export interface Camera {
  id: string;
  name: string;
  zone: ZoneName;
  status: CameraStatus;
  fps: number;
  latencyMs: number;
  lastFrame: string; // relative label
  streamUrl: string;
  hasAlert: boolean;
}

export interface Zone {
  name: ZoneName;
  status: "healthy" | "warning" | "danger";
  objects: number;
  occupancy: number; // percent
}

export interface TrackedObject {
  id: string;
  type: ObjectType;
  zone: ZoneName;
  speed: number; // m/s
  lastUpdate: string;
  alert: boolean;
  x: number; // 0-100 relative position on BEV
  y: number;
}

export interface AlertItem {
  id: string;
  severity: AlertSeverity;
  title: string;
  zone: ZoneName;
  camera: string;
  time: string;
}

export interface ActivityItem {
  id: string;
  time: string;
  message: string;
  type: "info" | "warning" | "danger" | "success";
}

export interface ReplayEvent {
  id: string;
  time: string;
  timestamp: number; // seconds within timeline
  type: ObjectType | "alert";
  zone: ZoneName;
  description: string;
  severity?: AlertSeverity;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "Supervisor" | "Operator" | "Analyst";
  status: "active" | "disabled";
  lastActive: string;
}

export const zones: Zone[] = [
  { name: "Inbound", status: "healthy", objects: 12, occupancy: 64 },
  { name: "Storage A", status: "warning", objects: 28, occupancy: 88 },
  { name: "Storage B", status: "healthy", objects: 19, occupancy: 51 },
  { name: "Packing", status: "danger", objects: 9, occupancy: 95 },
  { name: "Outbound", status: "healthy", objects: 14, occupancy: 42 },
];

export const cameras: Camera[] = [
  { id: "cam-01", name: "Inbound Gate", zone: "Inbound", status: "online", fps: 30, latencyMs: 82, lastFrame: "now", streamUrl: "rtsp://10.0.1.11/stream", hasAlert: false },
  { id: "cam-02", name: "Inbound Dock 2", zone: "Inbound", status: "online", fps: 25, latencyMs: 120, lastFrame: "1s ago", streamUrl: "rtsp://10.0.1.12/stream", hasAlert: false },
  { id: "cam-03", name: "Storage A Aisle 1", zone: "Storage A", status: "degraded", fps: 12, latencyMs: 410, lastFrame: "4s ago", streamUrl: "rtsp://10.0.2.11/stream", hasAlert: true },
  { id: "cam-04", name: "Storage A Aisle 2", zone: "Storage A", status: "online", fps: 30, latencyMs: 76, lastFrame: "now", streamUrl: "rtsp://10.0.2.12/stream", hasAlert: false },
  { id: "cam-05", name: "Storage B Aisle 1", zone: "Storage B", status: "online", fps: 28, latencyMs: 95, lastFrame: "now", streamUrl: "rtsp://10.0.3.11/stream", hasAlert: false },
  { id: "cam-06", name: "Packing Line 1", zone: "Packing", status: "offline", fps: 0, latencyMs: 0, lastFrame: "since 14:05", streamUrl: "rtsp://10.0.4.11/stream", hasAlert: true },
  { id: "cam-07", name: "Packing Line 2", zone: "Packing", status: "online", fps: 30, latencyMs: 88, lastFrame: "now", streamUrl: "rtsp://10.0.4.12/stream", hasAlert: false },
  { id: "cam-08", name: "Outbound Dock 1", zone: "Outbound", status: "online", fps: 30, latencyMs: 71, lastFrame: "now", streamUrl: "rtsp://10.0.5.11/stream", hasAlert: false },
  { id: "cam-09", name: "Outbound Dock 2", zone: "Outbound", status: "degraded", fps: 18, latencyMs: 260, lastFrame: "2s ago", streamUrl: "rtsp://10.0.5.12/stream", hasAlert: false },
  { id: "cam-10", name: "Yard North", zone: "Inbound", status: "online", fps: 24, latencyMs: 140, lastFrame: "1s ago", streamUrl: "rtsp://10.0.1.21/stream", hasAlert: false },
  { id: "cam-11", name: "Yard South", zone: "Outbound", status: "online", fps: 24, latencyMs: 132, lastFrame: "1s ago", streamUrl: "rtsp://10.0.5.21/stream", hasAlert: false },
  { id: "cam-12", name: "Mezzanine", zone: "Storage B", status: "online", fps: 30, latencyMs: 90, lastFrame: "now", streamUrl: "rtsp://10.0.3.21/stream", hasAlert: false },
];

export const trackedObjects: TrackedObject[] = [
  { id: "obj-1042", type: "forklift", zone: "Storage A", speed: 2.4, lastUpdate: "now", alert: false, x: 28, y: 34 },
  { id: "obj-1043", type: "forklift", zone: "Packing", speed: 0.0, lastUpdate: "2s ago", alert: true, x: 70, y: 62 },
  { id: "obj-1044", type: "worker", zone: "Inbound", speed: 1.2, lastUpdate: "now", alert: false, x: 14, y: 20 },
  { id: "obj-1045", type: "worker", zone: "Storage B", speed: 1.5, lastUpdate: "1s ago", alert: false, x: 52, y: 44 },
  { id: "obj-1046", type: "vehicle", zone: "Outbound", speed: 3.1, lastUpdate: "now", alert: false, x: 86, y: 78 },
  { id: "obj-1047", type: "pallet", zone: "Storage A", speed: 0.0, lastUpdate: "12s ago", alert: false, x: 34, y: 52 },
  { id: "obj-1048", type: "pallet", zone: "Inbound", speed: 0.0, lastUpdate: "8s ago", alert: false, x: 20, y: 40 },
  { id: "obj-1049", type: "worker", zone: "Packing", speed: 0.9, lastUpdate: "now", alert: true, x: 64, y: 70 },
];

export const alerts: AlertItem[] = [
  { id: "al-9001", severity: "critical", title: "Camera offline", zone: "Packing", camera: "Packing Line 1", time: "14:05" },
  { id: "al-9002", severity: "high", title: "Forklift idle in lane", zone: "Packing", camera: "Packing Line 2", time: "14:11" },
  { id: "al-9003", severity: "medium", title: "Zone occupancy near limit", zone: "Storage A", camera: "Storage A Aisle 1", time: "14:18" },
  { id: "al-9004", severity: "high", title: "Worker in restricted area", zone: "Packing", camera: "Packing Line 2", time: "14:22" },
  { id: "al-9005", severity: "low", title: "Stream degraded", zone: "Outbound", camera: "Outbound Dock 2", time: "14:25" },
];

export const activity: ActivityItem[] = [
  { id: "ac-1", time: "14:25:11", message: "Outbound Dock 2 stream degraded (260ms latency)", type: "warning" },
  { id: "ac-2", time: "14:22:48", message: "Worker entered restricted area in Packing", type: "danger" },
  { id: "ac-3", time: "14:20:02", message: "Forklift obj-1042 completed route in Storage A", type: "success" },
  { id: "ac-4", time: "14:18:33", message: "Storage A occupancy reached 88%", type: "warning" },
  { id: "ac-5", time: "14:15:09", message: "Vehicle obj-1046 arrived at Outbound Dock 1", type: "info" },
  { id: "ac-6", time: "14:05:00", message: "Packing Line 1 camera went offline", type: "danger" },
  { id: "ac-7", time: "14:01:24", message: "Inbound Gate sync restored", type: "success" },
];

export const replayEvents: ReplayEvent[] = [
  { id: "ev-1", time: "00:12", timestamp: 12, type: "forklift", zone: "Inbound", description: "Forklift entered Inbound" },
  { id: "ev-2", time: "00:48", timestamp: 48, type: "alert", zone: "Storage A", description: "Occupancy threshold reached", severity: "medium" },
  { id: "ev-3", time: "01:30", timestamp: 90, type: "worker", zone: "Packing", description: "Worker crossed lane marker" },
  { id: "ev-4", time: "02:05", timestamp: 125, type: "alert", zone: "Packing", description: "Restricted area breach", severity: "high" },
  { id: "ev-5", time: "02:52", timestamp: 172, type: "vehicle", zone: "Outbound", description: "Vehicle docked at Outbound 1" },
  { id: "ev-6", time: "03:40", timestamp: 220, type: "alert", zone: "Packing", description: "Camera disconnected", severity: "critical" },
];

export const users: User[] = [
  { id: "u-1", name: "Maya Chen", email: "maya.chen@optilog.io", role: "Admin", status: "active", lastActive: "2m ago" },
  { id: "u-2", name: "David Okafor", email: "david.okafor@optilog.io", role: "Supervisor", status: "active", lastActive: "18m ago" },
  { id: "u-3", name: "Lena Park", email: "lena.park@optilog.io", role: "Operator", status: "active", lastActive: "1h ago" },
  { id: "u-4", name: "Tomas Vidal", email: "tomas.vidal@optilog.io", role: "Analyst", status: "active", lastActive: "3h ago" },
  { id: "u-5", name: "Ines Roy", email: "ines.roy@optilog.io", role: "Operator", status: "disabled", lastActive: "5d ago" },
  { id: "u-6", name: "Karl Mertens", email: "karl.mertens@optilog.io", role: "Supervisor", status: "active", lastActive: "yesterday" },
];

// Chart series
export const throughputSeries = Array.from({ length: 12 }, (_, i) => ({
  time: `${8 + i}:00`,
  inbound: 40 + Math.round(Math.sin(i / 2) * 18 + i * 2),
  outbound: 30 + Math.round(Math.cos(i / 2) * 14 + i * 1.5),
}));

export const alertsByZone = zones.map((z) => ({
  zone: z.name,
  alerts: Math.max(1, Math.round(z.occupancy / 14)),
}));

export const dwellSeries = [
  { type: "Forklift", minutes: 8.2 },
  { type: "Pallet", minutes: 42.5 },
  { type: "Worker", minutes: 5.1 },
  { type: "Vehicle", minutes: 14.8 },
];

export const cameraHealthSeries = Array.from({ length: 12 }, (_, i) => ({
  time: `${8 + i}:00`,
  uptime: 92 + Math.round(Math.sin(i / 3) * 5),
}));
