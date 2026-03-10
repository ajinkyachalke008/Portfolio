import React, { useState, useEffect, useRef } from "react";
import { AnimatedTextLines } from "../components/AnimatedTextLines";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const ScrambleText = ({ text }) => {
  const [displayText, setDisplayText] = useState("");
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+<>?";

  useEffect(() => {
    let iterations = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text.split("").map((letter, index) => {
          if (index < iterations || letter === " ") {
            return letter;
          }
          return letters[Math.floor(Math.random() * letters.length)];
        }).join("")
      );

      if (iterations >= text.length) {
        clearInterval(interval);
      }

      // Speed of decryption (lower decimal = more scrambling per letter)
      iterations += 1 / 3;
    }, 40);

    return () => clearInterval(interval);
  }, [text]);

  return <span>{displayText}</span>;
}

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
          <div className="px-10">
            <h1
              className={`flex flex-col gap-12 tracking-tight banner-text-responsive sm:gap-16 md:block ${textColor}`}
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
