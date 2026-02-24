"use client";
import { useState, useEffect } from "react";
import { register } from "../../api/api";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  UserIcon,
  IdentificationIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import router from "next/router";

export default function Home() {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const response = await register(username, name, password);
      console.log("Usuario registrado exitosamente:", response);
      useRouter().push("/login");
      // router.push("/login");
    } catch (error) {
      console.error("Error registrando usuario:", error);
    }
  };

  return (
    <div className="isolate relative min-h-screen bg-[#0d1117] px-6 py-24 sm:py-32 lg:px-8 flex items-center justify-center overflow-hidden">
      {/* Grid pattern overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#4f6aff 1px, transparent 1px), linear-gradient(to right, #4f6aff 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Radial glow */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#1e3a5f] opacity-25 rounded-full blur-[140px] pointer-events-none"
      />

      {/* Original blob shape — kept, recolored to match dark theme */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80 pointer-events-none"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="relative left-1/2 -z-10 aspect-1155/678 w-144.5 max-w-none -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#1e3a8a] to-[#4f6aff] opacity-10 sm:left-[calc(50%-40rem)] sm:w-288.75"
        />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center mb-10">
          <h2
            className="text-4xl font-extrabold tracking-tight text-balance text-white sm:text-5xl"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            Crea tu cuenta
          </h2>
          <p className="mt-2 text-lg/8 text-[#8da0b8]">
            Unete a esta prueba de API!.
          </p>
        </div>

        {/* Link a PokePage */}
        <div className="text-center mb-6">
          <Link
            href="/poke"
            className="text-[#4f6aff] font-semibold hover:underline"
          >
            Ir a PokePage
          </Link>
        </div>
        {/* Card */}
        <div className="bg-[#111827]/80 border border-white/[0.06] rounded-2xl p-8 backdrop-blur-sm shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username */}
            <div>
              <label
                htmlFor="username"
                className="block text-xs font-semibold text-[#94a3b8] uppercase tracking-widest mb-1.5"
              >
                Username
              </label>
              <div className="relative">
                <UserIcon className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4f6aff]" />
                <input
                  id="username"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  type="text"
                  autoComplete="username"
                  className="block w-full rounded-lg bg-[#1a2332] border border-white/[0.08] pl-9 pr-3.5 py-2.5 text-sm text-white outline-none placeholder:text-[#4a5568] focus:ring-2 focus:ring-[#4f6aff]/60 transition"
                />
              </div>
            </div>

            {/* Name */}
            <div>
              <label
                htmlFor="first-name"
                className="block text-xs font-semibold text-[#94a3b8] uppercase tracking-widest mb-1.5"
              >
                Name
              </label>
              <div className="relative">
                <IdentificationIcon className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4f6aff]" />
                <input
                  id="first-name"
                  name="first-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  autoComplete="given-name"
                  className="block w-full rounded-lg bg-[#1a2332] border border-white/[0.08] pl-9 pr-3.5 py-2.5 text-sm text-white outline-none placeholder:text-[#4a5568] focus:ring-2 focus:ring-[#4f6aff]/60 transition"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-xs font-semibold text-[#94a3b8] uppercase tracking-widest mb-1.5"
              >
                Password
              </label>
              <div className="relative">
                <LockClosedIcon className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4f6aff]" />
                <input
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  autoComplete="new-password"
                  className="block w-full rounded-lg bg-[#1a2332] border border-white/[0.08] pl-9 pr-3.5 py-2.5 text-sm text-white outline-none placeholder:text-[#4a5568] focus:ring-2 focus:ring-[#4f6aff]/60 transition"
                />
              </div>
            </div>

            {/* Agree to policies toggle */}
            {/* <div className="flex gap-x-4 pt-1">
              <div className="flex h-6 items-center">
                <div className="group relative inline-flex w-8 shrink-0 rounded-full bg-white/5 p-px inset-ring inset-ring-white/10 outline-offset-2 outline-[#4f6aff] transition-colors duration-200 ease-in-out has-checked:bg-[#4f6aff] has-focus-visible:outline-2">
                  <span className="size-4 rounded-full bg-white shadow-xs ring-1 ring-gray-900/5 transition-transform duration-200 ease-in-out group-has-checked:translate-x-3.5" />
                  <input
                    id="agree-to-policies"
                    name="agree-to-policies"
                    type="checkbox"
                    aria-label="Agree to policies"
                    className="absolute inset-0 size-full appearance-none focus:outline-hidden"
                  />
                </div>
              </div>
              <label htmlFor="agree-to-policies" className="text-sm/6 text-[#8da0b8]">
                Seleccionando esto eres un{" "}
                <a href="#" className="font-semibold whitespace-nowrap text-[#4f6aff] hover:text-[#7b93ff] transition-colors">
                  CRACK
                </a>
                .
              </label>
            </div> */}

            {/* Submit */}
            <div className="pt-2">
              <button
                type="submit"
                className="block w-full rounded-lg bg-[#4f6aff] hover:bg-[#3d56e8] active:scale-95 transition-all px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-lg shadow-[#4f6aff]/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4f6aff]"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
