"use client"

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

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-6">
        <h1 className="text-3xl font-bold text-red-600 mb-6">
          🚨 Notifikasi Keamanan
        </h1>

        {log.length === 0 ? (
          <p className="text-gray-500">Belum ada notifikasi.</p>
        ) : (
          <ul className="space-y-4">
            {log.map((item, index) => (
              <li
                key={index}
                className="border-l-4 border-red-500 bg-red-50 p-4 rounded-md shadow-sm"
              >
                <p className="text-sm text-gray-700">
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
  );
}
