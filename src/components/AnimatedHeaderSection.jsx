import React, { useState, useEffect, useRef } from "react";
import { AnimatedTextLines } from "../components/AnimatedTextLines";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const ScrambleText = ({ text }) => {
  const [charStates, setCharStates] = useState(
    text.split("").map((char) => ({ char, isScrambled: false }))
  );
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*<>?/";
  const hoverIntervalRef = useRef(null);
  const entranceIntervalRef = useRef(null);

  // Entrance Animation
  useEffect(() => {
    let iterations = 0;

    setCharStates(text.split("").map((char) => ({
      char: char.trim() ? letters[Math.floor(Math.random() * letters.length)] : " ",
      isScrambled: !!char.trim()
    })));

    entranceIntervalRef.current = setInterval(() => {
      setCharStates((prev) =>
        text.split("").map((letter, index) => {
          if (index < iterations || letter === " ") {
            return { char: letter, isScrambled: false };
          }
          return {
            char: letters[Math.floor(Math.random() * letters.length)],
            isScrambled: true,
          };
        })
      );

      if (iterations >= text.length) {
        clearInterval(entranceIntervalRef.current);
      }
      iterations += 1 / 2.5;
    }, 45);

    return () => clearInterval(entranceIntervalRef.current);
  }, [text]);

  // Cyberpunk Hover Scramble
  const handleMouseEnter = () => {
    clearInterval(entranceIntervalRef.current);
    if (hoverIntervalRef.current) clearInterval(hoverIntervalRef.current);

    const cyberColors = ["#00eaff", "#ff00e6", "#f2ff00", "#00ff3c", "#ff3300"];

    hoverIntervalRef.current = setInterval(() => {
      setCharStates(prev => text.split("").map((letter) => {
        if (letter === " ") return { char: " ", isScrambled: false, color: "#00eaff" };
        // Randomly glitch 30% of the letters at a time
        const shouldGlitch = Math.random() < 0.3;
        return {
          char: shouldGlitch ? letters[Math.floor(Math.random() * letters.length)] : letter,
          isScrambled: shouldGlitch,
          color: shouldGlitch ? cyberColors[Math.floor(Math.random() * cyberColors.length)] : "#00eaff"
        };
      }));
    }, 50);
  };

  const handleMouseLeave = () => {
    if (hoverIntervalRef.current) clearInterval(hoverIntervalRef.current);

    // Snap cleanly back to normal
    setCharStates(text.split("").map((char) => ({ char, isScrambled: false, color: "#00eaff" })));
  };

  return (
    <span
      className="inline-block cursor-crosshair group relative z-50 pointer-events-auto"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {charStates.map((state, i) => {
        if (state.char === " ") {
          return <React.Fragment key={i}>{" "}</React.Fragment>;
        }
        return (
          <span
            key={i}
            style={{
              color: state.isScrambled ? state.color : undefined,
              textShadow: state.isScrambled ? `0 0 12px ${state.color}` : undefined
            }}
            className={`inline-block transition-colors duration-[30ms] relative ${state.isScrambled
              ? "opacity-100 -skew-x-[15deg] scale-[1.15] font-bold z-10"
              : "text-inherit group-hover:text-[#00eaff] group-hover:drop-shadow-[0_0_8px_rgba(0,234,255,0.6)] transition-all duration-300"
              }`}
          >
            {state.char}
          </span>
        );
      })}
    </span>
  );
};

const AnimatedHeaderSection = ({
  subTitle,
  title,
  text,
  textColor,
  withScrollTrigger = false,
  scrambleTitle = false,
}) => {
  const contextRef = useRef(null);
  const headerRef = useRef(null);
  const shouldSplitTitle = title.includes(" ");
  const titleParts = shouldSplitTitle ? title.split(" ") : [title];

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: withScrollTrigger
        ? {
          trigger: contextRef.current,
        }
        : undefined,
    });
    tl.from(contextRef.current, {
      y: "50vh",
      duration: 1,
      ease: "circ.out",
    });
    tl.from(
      headerRef.current,
      {
        opacity: 0,
        y: "200",
        duration: 1,
        ease: "circ.out",
      },
      "<+0.2"
    );
  }, []);

  return (
    <div ref={contextRef}>
      <div style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}>
        <div
          ref={headerRef}
          className="flex flex-col justify-center gap-12 pt-16 sm:gap-16 "
        >
          <p
            className={`text-sm font-light tracking-[0.4rem] uppercase px-10 ${textColor}`}
          >
            {subTitle}
          </p>
          <div className="px-10 pb-4 md:pb-8 lg:pb-12">
            <h1
              className={`flex flex-col gap-12 tracking-tight banner-text-responsive sm:gap-16 md:block pb-5 ${textColor}`}
            >
              {scrambleTitle ? (
                <ScrambleText text={title} />
              ) : (
                titleParts.map((part, index) => (
                  <span key={index}>{part} </span>
                ))
              )}
            </h1>
          </div>
        </div>
      </div>
      {text && (
        <div className={`relative px-10 ${textColor}`}>
          <div className="pt-12 sm:pt-16 text-start">
            <AnimatedTextLines
              text={text}
              className={`font-light uppercase value-text-responsive ${textColor}`}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AnimatedHeaderSection;
