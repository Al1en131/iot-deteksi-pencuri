"use client";

import { useState } from "react";

interface Notif {
  sensor: string;
  time: string;
}

export default function Home() {
  const [log] = useState<Notif[]>([
    { sensor: "Pintu Depan", time: "2025-07-03 10:15:23" },
    { sensor: "Jendela Belakang", time: "2025-07-03 09:43:02" },
    { sensor: "Pintu Samping", time: "2025-07-02 20:10:11" },
  ]);

  const [isActive, setIsActive] = useState(true);

  const handleToggle = () => {
    setIsActive((prev) => !prev);

    // TODO: kirim status ini ke backend atau ESP32 (via fetch POST misalnya)
    // fetch('/api/control', { method: 'POST', body: JSON.stringify({ active: !isActive }) })
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-extrabold text-red-600">
            🚨 Sistem Keamanan Rumah
          </h1>
          <button
            onClick={handleToggle}
            className={`px-5 py-2 rounded-lg font-medium transition-all ${
              isActive
                ? "bg-green-600 text-white hover:bg-green-700"
                : "bg-gray-300 text-gray-700 hover:bg-gray-400"
            }`}
          >
            {isActive ? "ON (Aktif)" : "OFF (Nonaktif)"}
          </button>
        </div>

        <div className="border-t pt-4">
          <h2 className="text-xl font-semibold mb-4">Riwayat Notifikasi</h2>
          {log.length === 0 ? (
            <p className="text-gray-500">Belum ada notifikasi.</p>
          ) : (
            <ul className="space-y-4">
              {log.map((item, index) => (
                <li
                  key={index}
                  className="border-l-4 border-red-500 bg-red-50 p-4 rounded-md shadow-sm"
                >
                  <p className="text-sm text-gray-800">
                    <strong>Sensor:</strong> {item.sensor}
                  </p>
                  <p className="text-sm text-gray-500">
                    <strong>Waktu:</strong> {item.time}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
