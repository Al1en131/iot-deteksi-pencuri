import { NextRequest } from "next/server";
import fs from "fs/promises";
import path from "path";

// ✅ Tipe data notifikasi
type Notif = {
  sensor: string;
  time: string;
  message: string;
};

const filePath = path.join(process.cwd(), "notif-log.json");

// ✅ Fungsi untuk membaca log notifikasi dari file
async function loadLogData(): Promise<Notif[]> {
  try {
    const file = await fs.readFile(filePath, "utf-8");
    return JSON.parse(file);
  } catch {
    return [];
  }
}

// ✅ Fungsi untuk menyimpan log notifikasi ke file
async function saveLogData(data: Notif[]): Promise<void> {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
}

// ✅ Format waktu Indonesia
function formatWaktuSekarang(): string {
  const bulanIndo = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Mei",
    "Jun",
    "Jul",
    "Agu",
    "Sep",
    "Okt",
    "Nov",
    "Des",
  ];

  const now = new Date();
  const tanggal = now.getDate();
  const bulan = bulanIndo[now.getMonth()];
  const tahun = now.getFullYear();
  const jam = now.getHours().toString().padStart(2, "0");
  const menit = now.getMinutes().toString().padStart(2, "0");
  const detik = now.getSeconds().toString().padStart(2, "0");

  return `${tanggal} ${bulan} ${tahun} ${jam}:${menit}:${detik}`;
}

// ✅ Handle request POST (menyimpan notifikasi baru)
export async function POST(req: NextRequest) {
  const body = await req.json();

  const logData = await loadLogData();

  const newNotif: Notif = {
    sensor: body.sensor,
    time: formatWaktuSekarang(),
    message: body.message,
  };

  logData.unshift(newNotif);
  if (logData.length > 50) logData.pop();

  await saveLogData(logData);

  return Response.json({
    status: "success",
    message: "Notifikasi disimpan",
    data: newNotif,
  });
}

// ✅ Handle request GET (mengambil semua notifikasi)
export async function GET() {
  const logData = await loadLogData();

  return Response.json({
    status: "success",
    data: logData,
  });
}
