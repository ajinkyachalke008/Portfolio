import React, { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { ScrambleText } from "./AnimatedHeaderSection";

gsap.registerPlugin(ScrollTrigger);

const KineticQuote = ({ triggerRef }) => {
    const containerRef = useRef(null);
    const line1Ref = useRef(null);
    const line2Ref = useRef(null);
    const cursorMaskRef = useRef(null);
    const baseTextRef = useRef(null);

    const [init, setInit] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    // Removed unused quoteParts array

    // Initialize Particles
    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    useGSAP(() => {
        // 1. Bi-Directional Horizontal Scroll Tickers (Stabilized & Detailed)
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: triggerRef ? triggerRef.current : containerRef.current,
                start: "top center",
                end: "+=2000", // Longer duration for more "detained" stable feel
                scrub: 1.2,    // Extra smooth scrub
                pin: true,
                anticipatePin: 1,
            },
        });

        // Initial setup for the rows
        gsap.set([line1Ref.current, line2Ref.current], { opacity: 0 });

        tl.to([line1Ref.current, line2Ref.current], {
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
        });

        // 2. Infinite Image Shuffle Loop (Left to Right)
        const scrollWidth = 5 * (window.innerWidth / 4 + 24);
        gsap.set(".image-track", { x: `-${scrollWidth / 2}px` });
        gsap.to(".image-track", {
            x: "0px",
            duration: 30, // Slower for detailing
            repeat: -1,
            ease: "none",
        });

        // 3. Continuous AJINKYA Highlight Pulse
        // Vibrant Cyan for Neon layer
        gsap.to(".keyword-ajinkya", {
            textShadow: "0px 0px 20px rgba(0, 234, 255, 0.8), 0px 0px 30px rgba(0, 234, 255, 0.6)",
            scale: 1.05,
            duration: 1.2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
        });

        // Gold glow for AJINKYA layer (+ multi-layer golden depth shadow)
        gsap.to(".keyword-ajinkya-base", {
            textShadow: "4px 4px 8px rgba(0,0,0,0.5), 0px 0px 15px rgba(255, 215, 0, 0.8), 0px 0px 25px rgba(255, 184, 0, 0.6)",
            scale: 1.05,
            duration: 1.2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
        });

    }, { scope: containerRef });

    const handleMouseMove = (e) => {
        // Removed highlight logic
    };

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const line1Text = "Let’s transform ideas into powerful innovations";
    const line2Text = "that shape the future with AJINKYA.";
    const renderTextContent = (text, isLine2 = false) => {
        return (
            <h2 className="flex justify-center flex-wrap text-center text-[16px] sm:text-[20px] md:text-[28px] lg:text-[40px] xl:text-[48px] uppercase leading-tight tracking-wider items-center gap-x-2 md:gap-x-4">
                {text.split(" ").map((word, wordIndex) => {
                    // Check if the current word exactly matches "AJINKYA." (with or without punctuation)
                    const isAjinkyaWord = isLine2 && word.includes("AJINKYA");

                    return (
                        <span
                            key={wordIndex}
                            className={`inline-block font-bold ${isAjinkyaWord ? "text-[#FFD700] keyword-ajinkya-base" : "text-[#0a0a0a]"}`}
                            style={{
                                fontFamily: "'Space Grotesk', sans-serif",
                                textShadow: isAjinkyaWord
                                    ? "4px 4px 8px rgba(0,0,0,0.5), 0px 4px 16px rgba(0,0,0,0.3)" // GSAP will animate this
                                    : "4px 4px 8px rgba(0,0,0,0.2)"
                            }}
                        >
                            <ScrambleText text={word} />
                        </span>
                    );
                })}
            </h2>
        );
    };

    return (
        <div
            ref={containerRef}
            className="relative w-full h-[60vh] md:h-[70vh] bg-white overflow-hidden flex items-center justify-center cursor-crosshair z-0"
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Background Image Collage Track */}
            <div className="absolute inset-0 z-0 overflow-hidden flex items-center pointer-events-none">
                <div className="image-track flex gap-4 md:gap-8 min-w-[200%] opacity-40">
                    {[...Array(3)].map((_, loopIdx) => (
                        <React.Fragment key={loopIdx}>
                            {[1, 2, 3, 4, 5].map((item, index) => (
                                <div key={`${loopIdx}-${index}`} className="flex-none w-[20vw] md:w-[15vw] aspect-[3/4] relative rounded-2xl overflow-hidden shadow-2xl mix-blend-multiply transition-all duration-700 hover:scale-105 hover:z-20 group">
                                    <img
                                        src={`/images/photo${item}.jpg`}
                                        alt={`Ajinkya Achievement ${item}`}
                                        className="object-cover w-full h-full grayscale-[0.4] saturate-[0.8] brightness-[1.05] transition-all duration-700 group-hover:grayscale-0 group-hover:saturate-100"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = `https://placehold.co/600x800/e2e8f0/94a3b8?text=Photo+${item}`;
                                        }}
                                    />
                                    <div className="absolute inset-0 border border-black/5 rounded-2xl pointer-events-none" />
                                </div>
                            ))}
                        </React.Fragment>
                    ))}
                </div>
            </div>
            {/* Background Particles Layer */}
            {init && (
                <Particles
                    id="tsparticles-quote"
                    className="absolute inset-0 z-0 pointer-events-none"
                    options={{
                        particles: {
                            number: { value: 70, density: { enable: true, area: 1000 } },
                            color: { value: ["#00eaff", "#000000"] },
                            links: { enable: false },
                            move: { enable: true, speed: 0.2, direction: "none", random: true, straight: false, outModes: "out" },
                            size: { value: { min: 1, max: 2.5 } },
                            opacity: { value: { min: 0.2, max: 0.6 } },
                        },
                        interactivity: {
                            events: { onHover: { enable: true, mode: "bubble" } },
                            modes: { bubble: { distance: 200, size: 4, duration: 2, opacity: 1, speed: 3 } },
                        },
                    }}
                />
            )}

            {/* Floating Ambient Gradient */}
            <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#00eaff]/5 to-transparent opacity-50 blur-[100px] pointer-events-none" />

            {/* Ticker Container mapped to Scroll */}
            <div className="relative z-10 w-full px-10 h-full transition-opacity duration-300 pointer-events-none flex flex-col items-center justify-center gap-2 overflow-hidden">

                {/* Row 1 */}
                <div ref={line1Ref} className="relative py-2 w-full flex justify-center items-center">
                    {/* Base Layer - High Contrast */}
                    <div ref={baseTextRef} className="text-[#121212]/85 select-none drop-shadow-sm flex justify-center">
                        {renderTextContent(line1Text, false)}
                    </div>
                </div>

                {/* Row 2 */}
                <div ref={line2Ref} className="relative py-2 w-full flex justify-center items-center">
                    {/* Base Layer - High Contrast */}
                    <div className="text-[#121212]/85 select-none drop-shadow-sm flex justify-center">
                        {renderTextContent(line2Text, true)}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default KineticQuote;
