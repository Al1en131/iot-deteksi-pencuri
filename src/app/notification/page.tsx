"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Notif {
  sensor: string;
  time: string;
  message: string;
}

export default function Home() {
  const [log, setLog] = useState<Notif[]>([]);
  const prevLatestId = useRef<string | null>(null);
  const isInitial = useRef(true);
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  useEffect(() => {
    const eventSource = new EventSource("/api/notification/stream");

    eventSource.onmessage = async () => {
      const res = await fetch("/api/notification");
      const json = await res.json();

      const latest = json.data?.[0];

      if (latest) {
        const uniqueKey = latest.sensor + latest.time;

        if (isInitial.current) {
          prevLatestId.current = uniqueKey;
          isInitial.current = false;
        } else if (uniqueKey !== prevLatestId.current) {
          prevLatestId.current = uniqueKey;

          setPopupMessage(latest.message);
          setPopupVisible(true);
        }
      }

      setLog(json.data);
    };

    eventSource.onerror = (err) => {
      console.error("SSE Error:", err);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  const [pintuAktif, setPintuAktif] = useState(true);
  const [jendelaAktif, setJendelaAktif] = useState(true);

  return (
    <div className="min-h-screen bg-[#49426c] text-[#eec08c] px-6 py-6">
      {popupVisible && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
          <div className="bg-[#49426c]  text-white px-8 py-6 rounded-2xl shadow-xl text-center max-w-xs w-full animate-pulse">
            <Image
              src="/image/warning.svg"
              alt="Warning"
              width={100}
              height={100}
              className="mx-auto h-24 w-24 mb-3"
            />
            <p className="text-lg mb-2 font-semibold text-[#eec08c]">
              {popupMessage}
            </p>
            <p className="text-sm mb-1 text-[#eec08c]">
              Aktivitas mencurigakan terdeteksi. Segera periksa rumah Anda.
            </p>
            <button
              onClick={() => {
                setPopupVisible(false);
                setPopupMessage("");
              }}
              className="bg-[#eec08c] text-[#49426c] font-semibold px-4 py-2 rounded-md hover:bg-[#eec08c]/80 transition"
            >
              OK
            </button>
          </div>
        </div>
      )}

      <div className="mb-5">
        <h1 className="text-3xl font-bold">AntiThief</h1>
      </div>

      <div className="grid mb-8">
        <div className="bg-[#eec08c] rounded-xl px-4 flex items-center justify-between h-44">
          <div className="h-full flex items-center">
            <Image
              src="/image/people-2.svg"
              alt=""
              className="h-full w-auto object-cover block overflow-hidden leading-none"
              width={100}
              height={100}
            />
          </div>
          <div className="text-[#49426c]">
            <p className="text-lg font-semibold">Riwayat Notifikasi</p>
            <p className="text-sm">Lihat semua catatan sistem</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Riwayat Notifikasi</h2>
        <Link href="/">
          <div className="bg-[#eec08c] p-2 rounded-full text-[#49426c] flex items-center justify-center hover:bg-[#eec08c]/80 transition">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
              />
            </svg>
          </div>
        </Link>
      </div>

      <div className="space-y-3">
        {log.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-3 bg-[#353157]  rounded-xl p-6"
          >
            <div className="flex items-center justify-center gap-3">
              <div className="w-10 h-10 bg-[#494269] shadow-[0_4px_8px_rgba(0,0,0,0.3)] rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="#eec08c"
                  className="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5"
                  />
                </svg>
              </div>
              <div>
                <p className="font-medium mb-0.5">{item.message}</p>
                <p className="text-xs ">{item.time}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
