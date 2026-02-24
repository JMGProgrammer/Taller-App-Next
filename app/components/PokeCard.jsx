"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const typeColors = {
  fire: { from: "#FF6B35", to: "#FF4500", light: "rgba(255,107,53,0.15)" },
  water: { from: "#4A90D9", to: "#1A6FBF", light: "rgba(74,144,217,0.15)" },
  grass: { from: "#5BAD6F", to: "#3D8C52", light: "rgba(91,173,111,0.15)" },
  electric: { from: "#F5C518", to: "#E0A800", light: "rgba(245,197,24,0.15)" },
  psychic: { from: "#E8507A", to: "#C9335D", light: "rgba(232,80,122,0.15)" },
  ice: { from: "#5BC8D9", to: "#3AAFC0", light: "rgba(91,200,217,0.15)" },
  dragon: { from: "#5A6FD6", to: "#3A4FBF", light: "rgba(90,111,214,0.15)" },
  dark: { from: "#4A4A6A", to: "#2E2E50", light: "rgba(74,74,106,0.15)" },
  fairy: { from: "#E87DB0", to: "#D45A95", light: "rgba(232,125,176,0.15)" },
  normal: { from: "#9A9A9A", to: "#777777", light: "rgba(154,154,154,0.15)" },
  fighting: { from: "#D64545", to: "#B52E2E", light: "rgba(214,69,69,0.15)" },
  flying: { from: "#7EB3D9", to: "#5A95C0", light: "rgba(126,179,217,0.15)" },
  poison: { from: "#9B59B6", to: "#7D3C98", light: "rgba(155,89,182,0.15)" },
  ground: { from: "#C4943A", to: "#A67C1E", light: "rgba(196,148,58,0.15)" },
  rock: { from: "#8B6914", to: "#6E5210", light: "rgba(139,105,20,0.15)" },
  bug: { from: "#7BB33A", to: "#5D9620", light: "rgba(123,179,58,0.15)" },
  ghost: { from: "#6B4F9B", to: "#4E3580", light: "rgba(107,79,155,0.15)" },
  steel: { from: "#7A9BB0", to: "#5A7E96", light: "rgba(122,155,176,0.15)" },
};

function PokeCard({ pokemonData }) {
  const [isShiny, setIsShiny] = useState(false);
  const router = useRouter();

  if (!pokemonData) {
    return (
      <div
        style={{
          fontFamily: "'Press Start 2P', monospace",
          fontSize: "8px",
          color: "#999",
          padding: "20px",
          textAlign: "center",
        }}
      >
        Cargando...
      </div>
    );
  }

  const primaryType = pokemonData.types?.[0]?.type?.name || "normal";
  const color = typeColors[primaryType] || typeColors.normal;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Nunito:wght@400;600;700;800&display=swap');

        .poke-card-wrap {
          font-family: 'Nunito', sans-serif;
          border-radius: 20px;
          position: relative;
          cursor: pointer;
          transition: transform 0.18s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.18s ease;
          background: white;
          overflow: hidden;

          box-shadow:
            0 0 0 2.5px #1a1a1a,
            0 0 0 5px #FFD700,
            0 0 0 7px #1a1a1a,
            0 8px 24px rgba(0,0,0,0.25);
        }

        .poke-card-wrap:hover {
          transform: translateY(-6px) scale(1.02);
          box-shadow:
            0 0 0 2.5px #1a1a1a,
            0 0 0 5px #FFD700,
            0 0 0 7px #1a1a1a,
            0 16px 40px rgba(0,0,0,0.35);
        }

        .poke-card-wrap:active {
          transform: translateY(-2px) scale(0.99);
        }

        .card-top-banner {
          height: 8px;
          width: 100%;
        }

        .card-img-area {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px 20px 12px;
          overflow: hidden;
        }

        .card-img-bg {
          position: absolute;
          inset: 0;
          opacity: 0.12;
          border-radius: 0;
        }

        .card-img-pokeball {
          position: absolute;
          bottom: -40px;
          right: -40px;
          width: 130px;
          height: 130px;
          border-radius: 50%;
          border: 18px solid rgba(0,0,0,0.07);
          pointer-events: none;
        }

        .card-img-pokeball::after {
          content: '';
          position: absolute;
          top: 50%;
          left: -18px;
          right: -18px;
          height: 3px;
          background: rgba(0,0,0,0.07);
          transform: translateY(-50%);
        }

        .card-pokemon-img {
          width: 120px;
          height: 120px;
          object-fit: contain;
          position: relative;
          z-index: 1;
          image-rendering: pixelated;
          filter: drop-shadow(0 4px 10px rgba(0,0,0,0.2));
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.3s ease;
        }

        .poke-card-wrap:hover .card-pokemon-img {
          transform: scale(1.1) translateY(-4px);
          filter: drop-shadow(0 8px 16px rgba(0,0,0,0.3));
        }

        .card-pokemon-img.shiny-on {
          filter:
            drop-shadow(0 4px 10px rgba(0,0,0,0.2))
            drop-shadow(0 0 12px rgba(255, 215, 0, 0.8));
          animation: shiny-pulse 1.5s ease-in-out infinite;
        }

        @keyframes shiny-pulse {
          0%, 100% { filter: drop-shadow(0 4px 10px rgba(0,0,0,0.2)) drop-shadow(0 0 10px rgba(255,215,0,0.7)); }
          50%       { filter: drop-shadow(0 4px 10px rgba(0,0,0,0.2)) drop-shadow(0 0 20px rgba(255,215,0,1)); }
        }

        .card-info-area {
          padding: 0 16px 16px;
        }

        .card-id {
          font-family: 'Press Start 2P', monospace;
          font-size: 8px;
          color: #bbb;
          margin-bottom: 2px;
        }

        .card-name {
          font-family: 'Press Start 2P', monospace;
          font-size: 10px;
          color: #1a1a1a;
          text-transform: capitalize;
          line-height: 1.6;
          margin-bottom: 10px;
        }

        .card-types {
          display: flex;
          gap: 6px;
          margin-bottom: 14px;
          flex-wrap: wrap;
        }

        .card-type-badge {
          font-family: 'Nunito', sans-serif;
          font-weight: 800;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          padding: 3px 10px;
          border-radius: 999px;
          color: white;
          text-shadow: 0 1px 2px rgba(0,0,0,0.25);
        }

        .card-divider {
          height: 2px;
          border-radius: 999px;
          margin-bottom: 12px;
          opacity: 0.3;
        }

        /* Shiny button */
        .shiny-btn {
          font-family: 'Press Start 2P', monospace;
          font-size: 8px;
          padding: 9px 14px;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          position: relative;
          letter-spacing: 0.05em;
          transition: all 0.1s ease;
          outline: none;
          user-select: none;
          width: 100%;

          background: linear-gradient(180deg, #1a2a4a 0%, #0f1e36 100%);
          color: #FFD700;
          box-shadow:
            0 0 0 2px #FFD700,
            0 0 0 4px #1a1a1a,
            0 4px 0 4px #1a1a1a,
            0 6px 0 5px rgba(0,0,0,0.4);
          text-shadow: 0 0 8px rgba(255,215,0,0.4);
        }

        .shiny-btn.is-shiny {
          background: linear-gradient(180deg, #FFD700 0%, #FFA500 100%);
          color: #1a1a1a;
          box-shadow:
            0 0 0 2px #FF8C00,
            0 0 0 4px #1a1a1a,
            0 4px 0 4px #1a1a1a,
            0 6px 0 5px rgba(0,0,0,0.4),
            0 0 16px rgba(255,215,0,0.6);
          text-shadow: none;
        }

        .shiny-btn:hover {
          transform: translateY(-1px);
          box-shadow:
            0 0 0 2px #FFD700,
            0 0 0 4px #1a1a1a,
            0 5px 0 4px #1a1a1a,
            0 7px 0 5px rgba(0,0,0,0.4),
            0 0 12px rgba(255,215,0,0.3);
        }

        .shiny-btn.is-shiny:hover {
          box-shadow:
            0 0 0 2px #FF8C00,
            0 0 0 4px #1a1a1a,
            0 5px 0 4px #1a1a1a,
            0 7px 0 5px rgba(0,0,0,0.4),
            0 0 22px rgba(255,215,0,0.9);
        }

        .shiny-btn:active {
          transform: translateY(4px);
          box-shadow:
            0 0 0 2px #FFD700,
            0 0 0 4px #1a1a1a,
            0 1px 0 4px #1a1a1a;
        }

        .shiny-btn .star {
          display: inline-block;
          margin-right: 5px;
          transition: transform 0.3s ease;
        }

        .shiny-btn.is-shiny .star {
          animation: spin-star 0.4s ease;
        }

        @keyframes spin-star {
          0%   { transform: rotate(0deg) scale(1); }
          50%  { transform: rotate(180deg) scale(1.4); }
          100% { transform: rotate(360deg) scale(1); }
        }

        .card-enter {
          animation: card-fade-in 0.4s ease both;
        }

        @keyframes card-fade-in {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div
        className="poke-card-wrap card-enter"
        onClick={() => router.push(`/pokemon/${pokemonData.id}`)}
      >
        {/* Top color banner */}
        <div
          className="card-top-banner"
          style={{
            background: `linear-gradient(to right, ${color.from}, ${color.to})`,
          }}
        />

        {/* Image area with colored bg */}
        <div className="card-img-area">
          <div
            className="card-img-bg"
            style={{
              background: `linear-gradient(135deg, ${color.from}, ${color.to})`,
            }}
          />
          <div className="card-img-pokeball" />
          <img
            src={
              isShiny
                ? pokemonData.sprites.front_shiny
                : pokemonData.sprites.front_default
            }
            alt={pokemonData.name}
            className={`card-pokemon-img ${isShiny ? "shiny-on" : ""}`}
          />
        </div>

        {/* Info area */}
        <div className="card-info-area">
          <p className="card-id">#{String(pokemonData.id).padStart(3, "0")}</p>
          <h2 className="card-name">{pokemonData.name}</h2>

          <div className="card-types">
            {pokemonData.types.map((t) => (
              <span
                key={t.type.name}
                className="card-type-badge"
                style={{
                  background: `linear-gradient(135deg, ${typeColors[t.type.name]?.from || "#9A9A9A"}, ${typeColors[t.type.name]?.to || "#777"})`,
                }}
              >
                {t.type.name}
              </span>
            ))}
          </div>

          <div
            className="card-divider"
            style={{
              background: `linear-gradient(to right, ${color.from}, ${color.to})`,
            }}
          />

          <button
            className={`shiny-btn ${isShiny ? "is-shiny" : ""}`}
            onClick={(e) => {
              e.stopPropagation();
              setIsShiny(!isShiny);
            }}
          >
            <span className="star">★</span>
            {isShiny ? "SHINY!" : "SHINY"}
          </button>
        </div>
      </div>
    </>
  );
}

export { PokeCard };
