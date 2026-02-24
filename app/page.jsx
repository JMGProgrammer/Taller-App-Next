"use client";
import { useEffect, useState } from "react";
import { PokeCard } from "./components/PokeCard";

// Página principal de la aplicacion, que muestra una grilla de pokemones.
export default function Home() {
  const [pokemonData, setPokemonData] = useState([]);
  const BASE_URL = "https://pokeapi.co/api/v2/pokemon/";

  const fetchAllPokemons = async () => {
    try {
      const ids = Array.from({ length: 20 }, (_, i) => i + 1);
      const fetchPromises = ids.map((id) => fetch(`${BASE_URL}${id}`));
      const responses = await Promise.all(fetchPromises);
      const results = await Promise.all(responses.map((res) => res.json()));
      setPokemonData(results);
    } catch (error) {
      console.error("ERROR CON EL FETCHING DE LOS POKEMONES", error);
    }
  };

  useEffect(() => {
    fetchAllPokemons();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Nunito:wght@400;600;700;800&display=swap');

        .poke-bg {
          background-color: #CC0000;
          background-image:
            radial-gradient(circle at 50% 0%, rgba(255,255,255,0.08) 0%, transparent 60%),
            repeating-linear-gradient(
              0deg,
              transparent, transparent 60px,
              rgba(0,0,0,0.04) 60px, rgba(0,0,0,0.04) 61px
            ),
            repeating-linear-gradient(
              90deg,
              transparent, transparent 60px,
              rgba(0,0,0,0.04) 60px, rgba(0,0,0,0.04) 61px
            );
          min-height: 100vh;
          position: relative;
          overflow: hidden;
        }

        .poke-bg::before {
          content: '';
          position: fixed;
          top: -300px; right: -300px;
          width: 700px; height: 700px;
          border-radius: 50%;
          border: 80px solid rgba(255,255,255,0.06);
          pointer-events: none;
          z-index: 0;
        }

        .poke-bg::after {
          content: '';
          position: fixed;
          bottom: -200px; left: -200px;
          width: 500px; height: 500px;
          border-radius: 50%;
          border: 60px solid rgba(255,255,255,0.05);
          pointer-events: none;
          z-index: 0;
        }

        /* ---- HEADER ---- */
        .pokeball-divider {
          width: 100%;
          height: 8px;
          background: linear-gradient(
            to right,
            #CC0000 calc(50% - 24px),
            #1a1a1a calc(50% - 24px),
            #1a1a1a calc(50% + 24px),
            #f5f5f5 calc(50% + 24px)
          );
          position: relative;
        }
        .pokeball-divider::after {
          content: '';
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 28px; height: 28px;
          border-radius: 50%;
          background: #1a1a1a;
          border: 5px solid white;
          box-shadow: 0 0 0 3px #1a1a1a;
        }

        .title-font { font-family: 'Press Start 2P', monospace; }
        .body-font  { font-family: 'Nunito', sans-serif; }

        .header-card {
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
          border: 3px solid #FFD700;
          box-shadow:
            0 0 0 1px #1a1a1a,
            0 8px 32px rgba(0,0,0,0.4),
            inset 0 1px 0 rgba(255,255,255,0.1);
          position: relative;
          overflow: hidden;
        }
        .header-card::before {
          content: '';
          position: absolute;
          top: -50%; left: -50%;
          width: 200%; height: 200%;
          background: radial-gradient(circle at 30% 30%, rgba(255,215,0,0.06) 0%, transparent 60%);
          pointer-events: none;
        }

        .pokeball-icon {
          display: inline-block;
          width: 14px; height: 14px;
          border-radius: 50%;
          background: linear-gradient(to bottom, #CC0000 50%, #f5f5f5 50%);
          border: 2px solid #1a1a1a;
          position: relative;
          vertical-align: middle;
          margin: 0 6px;
        }
        .pokeball-icon::after {
          content: '';
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 5px; height: 5px;
          border-radius: 50%;
          background: white;
          border: 1px solid #1a1a1a;
        }

        .stars-decoration::before {
          content: '★ ★ ★';
          color: #FFD700;
          font-size: 10px;
          letter-spacing: 4px;
        }

        /* ---- GRID WRAPPER ---- */
        .grid-wrapper {
          position: relative;
          border-radius: 0 0 24px 24px;
          overflow: hidden;

          /* Dark navy grid — matches the header card */
          background-color: #12192b;
          background-image:
            /* dot grid */
            radial-gradient(circle, rgba(255,215,0,0.18) 1px, transparent 1px),
            /* subtle radial glow in center */
            radial-gradient(ellipse at 50% 0%, rgba(255,215,0,0.07) 0%, transparent 65%);
          background-size: 32px 32px, 100% 100%;

          box-shadow:
            0 0 0 3px #FFD700,
            0 0 0 6px #1a1a1a,
            0 12px 40px rgba(0,0,0,0.5);

          padding: 36px 28px 40px;
        }

        /* faint pokeball watermark, bottom right */
        .grid-wrapper::after {
          content: '';
          position: absolute;
          bottom: -80px; right: -80px;
          width: 280px; height: 280px;
          border-radius: 50%;
          border: 35px solid rgba(255,215,0,0.05);
          pointer-events: none;
        }

        /* staggered card entrance animation */
        .card-grid > *:nth-child(1)  { animation-delay: 0.02s; }
        .card-grid > *:nth-child(2)  { animation-delay: 0.06s; }
        .card-grid > *:nth-child(3)  { animation-delay: 0.10s; }
        .card-grid > *:nth-child(4)  { animation-delay: 0.14s; }
        .card-grid > *:nth-child(5)  { animation-delay: 0.18s; }
        .card-grid > *:nth-child(6)  { animation-delay: 0.22s; }
        .card-grid > *:nth-child(7)  { animation-delay: 0.26s; }
        .card-grid > *:nth-child(8)  { animation-delay: 0.30s; }
        .card-grid > *:nth-child(9)  { animation-delay: 0.34s; }
        .card-grid > *:nth-child(10) { animation-delay: 0.38s; }
        .card-grid > *:nth-child(11) { animation-delay: 0.42s; }
        .card-grid > *:nth-child(12) { animation-delay: 0.46s; }
        .card-grid > *:nth-child(13) { animation-delay: 0.50s; }
        .card-grid > *:nth-child(14) { animation-delay: 0.54s; }
        .card-grid > *:nth-child(15) { animation-delay: 0.58s; }
        .card-grid > *:nth-child(16) { animation-delay: 0.62s; }
        .card-grid > *:nth-child(17) { animation-delay: 0.66s; }
        .card-grid > *:nth-child(18) { animation-delay: 0.70s; }
        .card-grid > *:nth-child(19) { animation-delay: 0.74s; }
        .card-grid > *:nth-child(20) { animation-delay: 0.78s; }
      `}</style>

      <div className="poke-bg body-font">
        <div className="relative z-10 max-w-6xl mx-auto px-4 py-10">
          {/* HEADER */}
          <div className="header-card rounded-2xl mb-0 px-8 py-8 text-center">
            <div className="stars-decoration mb-3 block"></div>

            <h1
              className="title-font text-white mb-4 leading-relaxed"
              style={{
                fontSize: "clamp(18px, 3vw, 28px)",
                textShadow: "3px 3px 0px #FFD700, 5px 5px 0px rgba(0,0,0,0.3)",
              }}
            >
              POKÉDEX
            </h1>

            <div
              className="pokeball-divider my-4 mx-auto"
              style={{ maxWidth: "100%" }}
            />

            <p
              className="body-font text-blue-200 mt-4"
              style={{
                fontSize: "clamp(13px, 1.8vw, 16px)",
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}
            >
              <span className="pokeball-icon" />
              PokeAPI Edition
              <span className="pokeball-icon" />
            </p>

            <p
              className="body-font text-blue-300 mt-2 text-sm"
              style={{ fontWeight: 600 }}
            >
              Atrápalos a todos, ¡Haz click en cada uno para ver sus detalles!
            </p>
          </div>

          {/* GRID */}
          <div className="grid-wrapper">
            <div className="card-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {pokemonData.map((pokemon) => (
                <PokeCard key={pokemon.id} pokemonData={pokemon} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
