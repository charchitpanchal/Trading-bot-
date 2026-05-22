"use client";

import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";

export default function ParticlesBackground() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setReady(true));
  }, []);

  const options: ISourceOptions = useMemo(
    () => ({
      fullScreen: { enable: false },
      background: { color: { value: "transparent" } },
      fpsLimit: 60,
      particles: {
        number: { value: 60, density: { enable: true } },
        color: { value: ["#6366f1", "#8b5cf6", "#22d3ee"] },
        links: {
          enable: true,
          color: "#6366f1",
          opacity: 0.2,
          distance: 150,
        },
        move: { enable: true, speed: 0.8 },
        opacity: { value: { min: 0.2, max: 0.6 } },
        size: { value: { min: 1, max: 3 } },
      },
      detectRetina: true,
    }),
    []
  );

  if (!ready) return null;

  return (
    <Particles
      id="tsparticles"
      className="pointer-events-none fixed inset-0 z-0"
      options={options}
    />
  );
}
