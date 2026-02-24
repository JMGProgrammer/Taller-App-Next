"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

//Pagina de detalles del pokemon al clickear en su card, con su imagen, tipos, stats y demás info relevante.
export default function PokePage() {
  const { id } = useParams();
  const router = useRouter();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((res) => res.json())
      .then((data) => setPokemon(data));
  }, [id]);

  const typeColors = {
    fire: { bg: "#FF6B35", light: "#FFE5D9" },
    water: { bg: "#4A90D9", light: "#D9ECFF" },
    grass: { bg: "#5BAD6F", light: "#D9F5E0" },
    electric: { bg: "#F5C518", light: "#FFFBE0" },
    psychic: { bg: "#E8507A", light: "#FFE0EA" },
    ice: { bg: "#5BC8D9", light: "#D9F8FF" },
    dragon: { bg: "#5A6FD6", light: "#E0E5FF" },
    dark: { bg: "#4A4A6A", light: "#E0E0F0" },
    fairy: { bg: "#E87DB0", light: "#FFE0F0" },
    normal: { bg: "#8A8A8A", light: "#F0F0F0" },
    fighting: { bg: "#D64545", light: "#FFE0E0" },
    flying: { bg: "#7EB3D9", light: "#E0F0FF" },
    poison: { bg: "#9B59B6", light: "#F0E0FF" },
    ground: { bg: "#C4943A", light: "#FFF0D9" },
    rock: { bg: "#8B6914", light: "#F5E8D0" },
    bug: { bg: "#7BB33A", light: "#EAFFD9" },
    ghost: { bg: "#6B4F9B", light: "#EDE0FF" },
    steel: { bg: "#7A9BB0", light: "#E0EEF5" },
  };

  const statLabels = {
    hp: "HP",
    attack: "ATK",
    defense: "DEF",
    "special-attack": "SpA",
    "special-defense": "SpD",
    speed: "SPD",
  };

  const statBarColors = {
    hp: "#FF5959",
    attack: "#F5AC78",
    defense: "#FAE078",
    "special-attack": "#9DB7F5",
    "special-defense": "#A7DB8D",
    speed: "#FA92B2",
  };

  if (!pokemon) {
    return (
      <>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Nunito:wght@400;600;700;800&display=swap');
          .poke-bg {
            background-color: #CC0000;
            background-image: radial-gradient(circle at 50% 0%, rgba(255,255,255,0.08) 0%, transparent 60%);
            min-height: 100vh;
          }
          .title-font { font-family: 'Press Start 2P', monospace; }
        `}</style>
        <div className="poke-bg flex items-center justify-center">
          <p className="title-font text-white text-xs animate-pulse">
            Cargando...
          </p>
        </div>
      </>
    );
  }

  const primaryType = pokemon.types[0]?.type.name || "normal";
  const colors = typeColors[primaryType] || typeColors.normal;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Nunito:wght@400;600;700;800&display=swap');

        .poke-bg {
          background-color: #CC0000;
          background-image:
            radial-gradient(circle at 50% 0%, rgba(255,255,255,0.08) 0%, transparent 60%),
            repeating-linear-gradient(0deg, transparent, transparent 60px, rgba(0,0,0,0.04) 60px, rgba(0,0,0,0.04) 61px),
            repeating-linear-gradient(90deg, transparent, transparent 60px, rgba(0,0,0,0.04) 60px, rgba(0,0,0,0.04) 61px);
          min-height: 100vh;
          position: relative;
          overflow: hidden;
        }

        .poke-bg::before {
          content: '';
          position: fixed;
          top: -300px;
          right: -300px;
          width: 700px;
          height: 700px;
          border-radius: 50%;
          border: 80px solid rgba(255,255,255,0.06);
          pointer-events: none;
        }

        .poke-bg::after {
          content: '';
          position: fixed;
          bottom: -200px;
          left: -200px;
          width: 500px;
          height: 500px;
          border-radius: 50%;
          border: 60px solid rgba(255,255,255,0.05);
          pointer-events: none;
        }

        .title-font { font-family: 'Press Start 2P', monospace; }
        .body-font { font-family: 'Nunito', sans-serif; }

        .poke-card {
          background: white;
          border-radius: 28px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.3), 0 0 0 3px #FFD700, 0 0 0 6px #1a1a1a;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          max-width: 900px;
          width: 100%;
        }

        @media (min-width: 768px) {
          .poke-card {
            flex-direction: row;
          }
        }

        .info-side {
          flex: 1;
          padding: 36px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .image-side {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 40px;
          background: ${colors.light};
          position: relative;
          overflow: hidden;
        }

        .image-side::before {
          content: '';
          position: absolute;
          bottom: -80px;
          right: -80px;
          width: 280px;
          height: 280px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(0,0,0,0.06) 0%, transparent 70%);
        }

        .image-side::after {
          content: '';
          position: absolute;
          top: -60px;
          left: -60px;
          width: 200px;
          height: 200px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255,255,255,0.5) 0%, transparent 70%);
        }

        .back-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'Nunito', sans-serif;
          font-weight: 700;
          font-size: 13px;
          color: #CC0000;
          background: none;
          border: 2px solid #CC0000;
          border-radius: 999px;
          padding: 6px 14px;
          cursor: pointer;
          transition: all 0.15s ease;
          width: fit-content;
        }

        .back-btn:hover {
          background: #CC0000;
          color: white;
          transform: translateX(-2px);
        }

        .type-badge {
          display: inline-flex;
          align-items: center;
          padding: 4px 14px;
          border-radius: 999px;
          font-family: 'Nunito', sans-serif;
          font-weight: 800;
          font-size: 13px;
          color: white;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          text-shadow: 0 1px 2px rgba(0,0,0,0.2);
        }

        .stat-label {
          font-family: 'Press Start 2P', monospace;
          font-size: 8px;
          color: #666;
          min-width: 36px;
        }

        .stat-bar-bg {
          flex: 1;
          background: #f0f0f0;
          border-radius: 999px;
          height: 10px;
          overflow: hidden;
        }

        .stat-bar-fill {
          height: 100%;
          border-radius: 999px;
          transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .poke-number {
          font-family: 'Press Start 2P', monospace;
          font-size: 11px;
          color: #aaa;
        }

        .poke-name {
          font-family: 'Press Start 2P', monospace;
          font-size: clamp(14px, 2.5vw, 20px);
          color: #1a1a1a;
          line-height: 1.6;
          text-transform: capitalize;
        }

        .info-chip {
          background: #f7f7f7;
          border: 1.5px solid #eee;
          border-radius: 12px;
          padding: 10px 16px;
          text-align: center;
        }

        .info-chip-label {
          font-family: 'Press Start 2P', monospace;
          font-size: 7px;
          color: #aaa;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 4px;
        }

        .info-chip-value {
          font-family: 'Nunito', sans-serif;
          font-weight: 800;
          font-size: 16px;
          color: #333;
        }

        .poke-image {
          width: 500px;
          height: 500px;
          object-fit: contain;
          position: relative;
          z-index: 1;
          filter: drop-shadow(4px 8px 16px rgba(0,0,0,0.2));
          image-rendering: pixelated;
        }

        .section-title {
          font-family: 'Press Start 2P', monospace;
          font-size: 8px;
          color: #999;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 8px;
        }

        .divider {
          width: 100%;
          height: 2px;
          background: linear-gradient(to right, #CC0000, #FFD700, transparent);
          border-radius: 999px;
          margin: 4px 0;
        }
      `}</style>

      <div className="poke-bg body-font flex items-center justify-center p-6 relative z-10">
        <div className="poke-card">
          {/* LEFT - Info */}
          <div className="info-side">
            <button className="back-btn" onClick={() => router.back()}>
              ← Volver
            </button>

            <div>
              <p className="poke-number">
                #{String(pokemon.id).padStart(3, "0")}
              </p>
              <h1 className="poke-name mt-1">{pokemon.name}</h1>
            </div>

            <div className="divider"></div>

            {/* Types */}
            <div>
              <p className="section-title">Tipo</p>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {pokemon.types.map((t) => (
                  <span
                    key={t.type.name}
                    className="type-badge"
                    style={{
                      background: typeColors[t.type.name]?.bg || "#8A8A8A",
                    }}
                  >
                    {t.type.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div>
              <p className="section-title">Estadísticas base</p>
              <div
                style={{ display: "flex", flexDirection: "column", gap: "8px" }}
              >
                {pokemon.stats.map((s) => (
                  <div
                    key={s.stat.name}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                    }}
                  >
                    <span className="stat-label">
                      {statLabels[s.stat.name] || s.stat.name}
                    </span>
                    <div className="stat-bar-bg">
                      <div
                        className="stat-bar-fill"
                        style={{
                          width: `${Math.min((s.base_stat / 255) * 100, 100)}%`,
                          background: statBarColors[s.stat.name] || "#aaa",
                        }}
                      />
                    </div>
                    <span
                      style={{
                        fontFamily: "Nunito, sans-serif",
                        fontWeight: 700,
                        fontSize: "13px",
                        color: "#555",
                        minWidth: "28px",
                        textAlign: "right",
                      }}
                    >
                      {s.base_stat}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="divider"></div>

            {/* Extra info chips */}
            <div style={{ display: "flex", gap: "10px" }}>
              <div className="info-chip" style={{ flex: 1 }}>
                <p className="info-chip-label">Altura</p>
                <p className="info-chip-value">{pokemon.height / 10}m</p>
              </div>
              <div className="info-chip" style={{ flex: 1 }}>
                <p className="info-chip-label">Peso</p>
                <p className="info-chip-value">{pokemon.weight / 10}kg</p>
              </div>
              <div className="info-chip" style={{ flex: 1 }}>
                <p className="info-chip-label">EXP base</p>
                <p className="info-chip-value">{pokemon.base_experience}</p>
              </div>
            </div>
          </div>

          {/* RIGHT - Image */}
          <div className="image-side">
            <img
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              className="poke-image"
              style={{ imageRendering: "pixelated" }}
            />
            <p
              style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: "12px",
                color: "#858484",
                marginTop: "10px",
                textTransform: "capitalize",
                position: "relative",
                zIndex: 1,
              }}
            >
              {pokemon.name}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
