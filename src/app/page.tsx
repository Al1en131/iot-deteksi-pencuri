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

      setLog((json.data || []).slice(0, 4));
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
              src="/image/people.svg"
              alt=""
              className="h-full w-auto object-cover block overflow-hidden leading-none"
              width={100}
              height={100}
            />
          </div>
          <div className="text-[#49426c]">
            <p className="text-lg font-semibold">Halo, User</p>
            <p className="text-sm">Selamat datang kembali</p>
          </div>
        </div>
      </div>
      <h2 className="text-lg font-semibold mb-4">Sensor Area</h2>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-[#353157] rounded-xl p-5 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <p className="font-semibold text-[#eec08c]">Pintu</p>

            <div className="w-10 h-10 bg-[#494269] shadow-[0_4px_8px_rgba(0,0,0,0.3)] rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="#eec08c"
                viewBox="0 0 256 256"
              >
                <path d="M232,216H208V40a16,16,0,0,0-16-16H64A16,16,0,0,0,48,40V216H24a8,8,0,0,0,0,16H232a8,8,0,0,0,0-16ZM64,40H192V216H64Zm104,92a12,12,0,1,1-12-12A12,12,0,0,1,168,132Z"></path>
              </svg>
            </div>
          </div>
          {/* Pintu */}
          <div className="flex items-center justify-between gap-4">
            <div
              onClick={async () => {
                const newStatus = !pintuAktif;
                setPintuAktif(newStatus);

                try {
                  await fetch("http://192.168.20.45/pintu-status", {
                    method: "POST",
                    headers: {
                      "Content-Type": "text/plain",
                    },
                    body: newStatus.toString(),
                  });
                } catch (err) {
                  console.error("Gagal kirim status pintu:", err);
                }
              }}
              className={`w-11 h-6 rounded-full shadow-[0_4px_8px_rgba(0,0,0,0.3)] cursor-pointer flex items-center px-1 transition-colors duration-300 ${
                pintuAktif ? "bg-[#494269]" : "bg-gray-400"
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-[#eec08c] shadow-md transform transition-transform duration-300 ${
                  pintuAktif ? "translate-x-5" : "translate-x-0"
                }`}
              ></div>
            </div>

            <span className="text-sm font-semibold">
              {pintuAktif ? "ON" : "OFF"}
            </span>
          </div>
        </div>
        <div className="bg-[#353157] rounded-xl p-5 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <p className="font-semibold">Jendela</p>

            <div className="w-10 h-10 bg-[#494269] shadow-[0_4px_8px_rgba(0,0,0,0.3)] rounded-full flex items-center justify-center">
              <Image
                src="/image/window.png"
                alt=""
                className="h-6 w-6"
                width={100}
                height={100}
              />
            </div>
          </div>
          {/* Jendela */}
          <div className="flex items-center justify-between gap-4">
            <div
              onClick={async () => {
                const newStatus = !jendelaAktif;
                setJendelaAktif(newStatus);

                try {
                  await fetch("http://192.168.20.45/jendela-status", {
                    method: "POST",
                    headers: {
                      "Content-Type": "text/plain",
                    },
                    body: newStatus.toString(),
                  });
                } catch (err) {
                  console.error("Gagal kirim status jendela:", err);
                }
              }}
              className={`w-11 h-6 rounded-full cursor-pointer shadow-[0_4px_8px_rgba(0,0,0,0.3)] flex items-center px-1 transition-colors duration-300 ${
                jendelaAktif ? "bg-[#494269]" : "bg-gray-400"
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-[#eec08c] shadow-md transform transition-transform duration-300 ${
                  jendelaAktif ? "translate-x-5" : "translate-x-0"
                }`}
              ></div>
            </div>

            <span className="text-sm font-semibold">
              {jendelaAktif ? "ON" : "OFF"}
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between mb-4 z-40">
        <h2 className="text-lg font-semibold">Notifikasi Terbaru</h2>
        <Link href="/notification" className="z-50">
          <div className="bg-[#eec08c] p-2 z-50 rounded-full text-[#49426c] flex items-center justify-center hover:bg-[#eec08c]/80 transition">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
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
