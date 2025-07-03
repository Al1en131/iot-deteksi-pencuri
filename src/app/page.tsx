"use client";

import { useState } from "react";
import Image from "next/image";

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

  const [pintuAktif, setPintuAktif] = useState(true);
  const [jendelaAktif, setJendelaAktif] = useState(true);

  return (
    <div className="min-h-screen bg-white text-blue-400 px-6 py-6">
      {/* Header */}
      <div className="text-center mb-5">
        <h1 className="text-3xl font-bold">AntiThief</h1>
      </div>

      {/* Status Card */}
      <div className="grid mb-8">
        <div className="bg-[#d5e5ff] rounded-xl px-4 text-left flex items-center justify-between">
          <div className="">
            <p className="text-xl font-semibold">Halo, User</p>
            <p>Selamat datang kembali</p>
          </div>
          <div className="">
            <Image
              src="/image/people.png"
              alt=""
              className="h-44 w-full "
              width={100}
              height={100}
            />
          </div>
        </div>
      </div>

      {/* Sensor Control */}
      <h2 className="text-lg font-semibold mb-2">Sensor Area</h2>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-[#d7efff] border border-[#008ded] rounded-xl p-4 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <p className="font-semibold text-[#008ded]">Pintu</p>

            <div className="w-10 h-10 bg-[#b5dbff] border border-[#008ded] rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="#008ded"
                viewBox="0 0 256 256"
              >
                <path d="M232,216H208V40a16,16,0,0,0-16-16H64A16,16,0,0,0,48,40V216H24a8,8,0,0,0,0,16H232a8,8,0,0,0,0-16ZM64,40H192V216H64Zm104,92a12,12,0,1,1-12-12A12,12,0,0,1,168,132Z"></path>
              </svg>
            </div>
          </div>
          <div className="flex items-center justify-between gap-4">
            <div
              onClick={() => setPintuAktif((prev) => !prev)}
              className={`w-11 h-6 rounded-full cursor-pointer flex items-center px-1 transition-colors duration-300 ${
                pintuAktif ? "bg-[#008ded]" : "bg-gray-400"
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-300 ${
                  pintuAktif ? "translate-x-5" : "translate-x-0"
                }`}
              ></div>
            </div>

            <span className="text-sm font-semibold text-[#008ded]">
              {pintuAktif ? "ON" : "OFF"}
            </span>
          </div>
        </div>
        <div className="bg-[#ccebd5] rounded-xl border border-[#009d2c] p-4 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <p className="font-semibold text-[#009d2c]">Jendela</p>

            <div className="w-10 h-10 bg-[#9de0b1] border border-[#009d2c] rounded-full flex items-center justify-center">
              <Image
                src="/image/window.png"
                alt=""
                className="h-6 w-6"
                width={100}
                height={100}
              />
            </div>
          </div>
          <div className="flex items-center justify-between gap-4">
            <div
              onClick={() => setJendelaAktif((prev) => !prev)}
              className={`w-11 h-6 rounded-full cursor-pointer flex items-center px-1 transition-colors duration-300 ${
                jendelaAktif ? "bg-[#009d2c]" : "bg-gray-400"
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-300 ${
                  jendelaAktif ? "translate-x-5" : "translate-x-0"
                }`}
              ></div>
            </div>

            <span className="text-sm font-semibold text-[#009d2c]">
              {jendelaAktif ? "ON" : "OFF"}
            </span>
          </div>
        </div>
      </div>

      {/* Riwayat Notifikasi */}
      <h2 className="text-lg font-semibold mb-2">Riwayat Notifikasi</h2>
      <div className="space-y-3">
        {log.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-3 bg-[#ffd9d9]  border border-[#ff0000] rounded-xl p-3"
          >
            {/* <FaBell className="text-red-400 text-xl" /> */}
            <div className="flex items-center justify-center gap-3">
              <div className="w-10 h-10 bg-[#ffb9b9] border border-[#ff0000] rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="#ff0000"
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
                <p className="font-medium text-[#ff0000]">{item.sensor}</p>
                <p className="text-xs text-[#ff0000]">{item.time}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
