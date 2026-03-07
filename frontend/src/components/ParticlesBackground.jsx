import { useCallback } from "react";
import Particles from "@tsparticles/react";
import { loadFull } from "tsparticles";

export default function ParticlesBackground() {

const particlesInit = useCallback(async (engine) => {
  await loadFull(engine);
}, []);

return (
<Particles
  id="particles"
  init={particlesInit}
  className="fixed inset-0 z-0 pointer-events-none"
  options={{
    background: {
      color: "transparent"
    },

    fpsLimit: 60,

    particles: {
      number: {
        value: 90
      },

      color: {
        value: "#a855f7"
      },

      size: {
        value: { min: 1, max: 3 }
      },

      opacity: {
        value: 0.6
      },

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