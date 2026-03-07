import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";

export default function ParticlesBackground() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFull(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  if (!init) return null;

  return (
    <Particles
      id="particles"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0
      }}
      options={{
        background: {
          color: "transparent"
        },
        fpsLimit: 60,
        particles: {
          number: { value: 80 },
          color: { value: "#a855f7" },
          links: {
            enable: true,
            distance: 150,
            color: "#c084fc",
            opacity: 0.4,
            width: 1
          },
          move: {
            enable: true,
            speed: 0.6
          },
          size: {
            value: { min: 1, max: 3 }
          },
          opacity: {
            value: 0.6
          }
        },
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "repulse"
            }
          },
          modes: {
            repulse: {
              distance: 120
            }
          }
        }
      }}
    />
  );
}