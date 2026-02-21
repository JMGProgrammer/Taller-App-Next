"use client"
import { useState } from "react";
import { BuildingOffice2Icon, PhoneIcon, EnvelopeIcon } from "@heroicons/react/24/outline";

export default function Home() {
  const navigation = [
    { name: "Product", href: "#" },
    { name: "Features", href: "#" },
    { name: "Marketplace", href: "#" },
    { name: "Company", href: "#" },
  ];
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <section className="relative min-h-screen bg-[#0d1117] flex items-center overflow-hidden">
      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(#4f6aff 1px, transparent 1px), linear-gradient(to right, #4f6aff 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Radial glow left */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#1e3a5f] opacity-30 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* ── LEFT PANEL ── */}
        <div className="text-white space-y-8">
          <div>
            <h2
              className="text-5xl font-extrabold tracking-tight leading-tight mb-4"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              Get in touch
            </h2>
            <p className="text-[#8da0b8] text-base leading-relaxed max-w-sm">
              Proin volutpat consequat porttitor cras nullam gravida at. Orci
              molestie a eu arcu. Sed ut tincidunt integer elementum id sem. Arcu
              sed malesuada et magna.
            </p>
          </div>

          <ul className="space-y-5 text-[#c5d3e0]">
            <li className="flex items-start gap-3">
              <BuildingOffice2Icon className="w-5 h-5 mt-0.5 text-[#4f6aff] shrink-0" />
              <span className="text-sm leading-relaxed">
                545 Mavis Island
                <br />
                Chicago, IL 99191
              </span>
            </li>
            <li className="flex items-center gap-3">
              <PhoneIcon className="w-5 h-5 text-[#4f6aff] shrink-0" />
              <span className="text-sm">+1 (555) 234-5678</span>
            </li>
            <li className="flex items-center gap-3">
              <EnvelopeIcon className="w-5 h-5 text-[#4f6aff] shrink-0" />
              <span className="text-sm">hello@example.com</span>
            </li>
          </ul>
        </div>

        {/* ── RIGHT PANEL – FORM ── */}
        <div className="bg-[#111827]/80 border border-white/[0.06] rounded-2xl p-8 backdrop-blur-sm shadow-2xl">
          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            {/* First / Last name */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[#94a3b8] uppercase tracking-widest">
                  First name
                </label>
                <input
                  type="text"
                  placeholder=""
                  className="bg-[#1a2332] border border-white/[0.08] rounded-lg px-3 py-2.5 text-sm text-white placeholder-[#4a5568] focus:outline-none focus:ring-2 focus:ring-[#4f6aff]/60 transition"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[#94a3b8] uppercase tracking-widest">
                  Last name
                </label>
                <input
                  type="text"
                  placeholder=""
                  className="bg-[#1a2332] border border-white/[0.08] rounded-lg px-3 py-2.5 text-sm text-white placeholder-[#4a5568] focus:outline-none focus:ring-2 focus:ring-[#4f6aff]/60 transition"
                />
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#94a3b8] uppercase tracking-widest">
                Email
              </label>
              <input
                type="email"
                placeholder=""
                className="w-full bg-[#1a2332] border border-white/[0.08] rounded-lg px-3 py-2.5 text-sm text-white placeholder-[#4a5568] focus:outline-none focus:ring-2 focus:ring-[#4f6aff]/60 transition"
              />
            </div>

            {/* Phone */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#94a3b8] uppercase tracking-widest">
                Phone number
              </label>
              <input
                type="tel"
                placeholder=""
                className="w-full bg-[#1a2332] border border-white/[0.08] rounded-lg px-3 py-2.5 text-sm text-white placeholder-[#4a5568] focus:outline-none focus:ring-2 focus:ring-[#4f6aff]/60 transition"
              />
            </div>

            {/* Message */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#94a3b8] uppercase tracking-widest">
                Message
              </label>
              <textarea
                rows={5}
                placeholder=""
                className="w-full bg-[#1a2332] border border-white/[0.08] rounded-lg px-3 py-2.5 text-sm text-white placeholder-[#4a5568] focus:outline-none focus:ring-2 focus:ring-[#4f6aff]/60 transition resize-none"
              />
            </div>

            {/* Submit */}
            <div className="flex justify-end pt-1">
              <button
                type="submit"
                className="bg-[#4f6aff] hover:bg-[#3d56e8] active:scale-95 transition-all text-white text-sm font-semibold px-6 py-2.5 rounded-lg shadow-lg shadow-[#4f6aff]/30"
              >
                Send message
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
