import { useRef, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";

const AdvancedKineticText = ({ text1, text2 }) => {
  const containerRef = useRef(null);
  const cursorRef = useRef(null);
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  useGSAP(() => {
    const tl = gsap.timeline({
      delay: 1.2, // Wait for initial AnimatedHeaderSection
      ease: "power2.inOut",
    });

    // SCENE 1: Environment Boot (Background gradient fades in gently handled by CSS)

    // SCENE 2 & 3: Line 1 Kinetic Reveal
    tl.from(".kinetic-word", {
      opacity: 0,
      filter: "blur(20px)",
      y: 40,
      scale: 1.2,
      rotateX: 45,
      stagger: 0.08,
      duration: 1.4,
      ease: "expo.out",
    });

    // Sub-effect: Glow highlight on "digital solutions"
    tl.to(".glow-target", {
      textShadow: "0px 0px 16px rgba(124, 108, 255, 0.8), 0px 0px 8px rgba(0, 234, 255, 0.5)",
      color: "#ffffff",
      duration: 1.5,
      ease: "power2.inOut",
    }, "-=0.5");

    // SCENE 5: Line 2 AI Typewriter
    tl.from(".typewriter-char", {
      opacity: 0,
      display: "none",
      stagger: 0.03, // 30ms per character
      duration: 0.1,
      ease: "none",
      onStart: () => {
        gsap.set(cursorRef.current, { opacity: 1 });
      },
    }, "+=0.2");

    // Move cursor tracking animation implicitly via display block of spans
    // Blinking cursor
    gsap.to(cursorRef.current, {
      opacity: 0,
      duration: 0.5,
      repeat: -1,
      yoyo: true,
      ease: "steps(1)",
    });

    // SCENE 6: Ambient floating
    tl.to(containerRef.current, {
      y: -5,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

  }, { scope: containerRef });

  const renderKineticLine = (text) => {
    return (
      <div className="flex flex-wrap gap-x-3 mb-6  text-[26px] md:text-[36px] lg:text-[48px] font-semibold text-white/90 leading-[1.2] tracking-[0.03em]">
        {text.split(" ").map((word, i) => (
          <span
            key={i}
            className={`kinetic-word inline-block will-change-[transform,opacity,filter] ${word.includes("digital") || word.includes("solutions") ? "glow-target transition-all" : ""
              }`}
          >
            {word}
          </span>
        ))}
      </div>
    );
  };

  const renderTypewriterLine = (text) => {
    return (
      <div className="relative  text-[18px] md:text-[22px] lg:text-[28px] font-normal text-[#8b8b73] leading-[1.4] tracking-wide max-w-4xl">
        {text.split("").map((char, i) => (
          <span key={i} className="typewriter-char opacity-100 hidden">
            {char}
          </span>
        ))}
        <span ref={cursorRef} className="ml-1 inline-block w-2 bg-[#00eaff] h-[1.2em] translate-y-1 opacity-0 shadow-[0_0_8px_#00eaff]" />
      </div>
    );
  };

  return (
    <div ref={containerRef} className="relative w-full z-40 transform-gpu">
      {/* Background Particles Layer */}
      {init && (
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#05070f]/0 via-[#0b1220]/40 to-[#121a2c]/0 pointer-events-none rounded-3xl" style={{ filter: "blur(40px)" }} />
      )}

      {init && (
        <Particles
          id="tsparticles"
          className="absolute inset-0 -z-10 opacity-30 pointer-events-none"
          options={{
            particles: {
              number: { value: 60, density: { enable: true, area: 800 } },
              color: { value: ["#00eaff", "#7c6cff"] },
              links: { enable: true, color: "#7c6cff", opacity: 0.1, distance: 150 },
              move: { enable: true, speed: 0.3, direction: "none", random: true, straight: false, outModes: "out" },
              size: { value: { min: 1, max: 2 } },
              opacity: { value: { min: 0.1, max: 0.5 } },
            },
            interactivity: {
              events: { onHover: { enable: true, mode: "grab" } },
              modes: { grab: { distance: 140, links: { opacity: 0.3 } } },
            },
          }}
        />
      )}

      {/* Text Layers */}
      <div className="relative z-10 px-6 sm:px-0">
        {renderKineticLine(text1)}
        {renderTypewriterLine(text2)}
      </div>
    </div>
  );
};

const Hero = () => {
  const text1 = "Passionate about turning complex technical ideas into impactful digital solutions.";
  const text2 = "I am Ajinkya Chalke, a second-year Electrical Engineering student at GCE Karad, building AI-powered systems that transform complex concepts into real-world solutions.";

  return (
    <section
      id="home"
      className="relative min-h-[85vh] md:min-h-[90vh] flex flex-col items-center justify-center overflow-hidden bg-black pb-10"
    >
      <div className="w-full mt-4 flex flex-col items-center z-30">
        <AnimatedHeaderSection
          subTitle={"Where logic meets imagination, creation starts."}
          title={"Hi, I'm Ajinkya."}
          text={""}
          textColor={"text-white"}
          scrambleTitle={true}
        />
        <div className="w-full max-w-[1400px] px-10 relative mt-4 md:mt-12 text-start z-40">
          <AdvancedKineticText text1={text1} text2={text2} />
        </div>
      </div>
    </section>
  );
};

export default Hero;
