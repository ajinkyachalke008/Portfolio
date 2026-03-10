import React, { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

gsap.registerPlugin(ScrollTrigger);

const KineticQuote = () => {
    const containerRef = useRef(null);
    const textContainerRef = useRef(null);
    const baseTextRef = useRef(null);
    const neonTextRef = useRef(null);
    const cursorMaskRef = useRef(null);

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
        if (!textContainerRef.current) return;

        // 1. Horizontal Scroll Ticker
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top center",
                end: "+=1500", // Length of scroll duration
                scrub: 0.8,    // Smoothness
                pin: true,     // Pin the section while scrolling the text
                anticipatePin: 1,
            },
        });

        // Make text fade in initially
        gsap.set(textContainerRef.current, { opacity: 0, x: "100vw" });

        tl.to(textContainerRef.current, {
            opacity: 1,
            duration: 0.1, // Quick fade in
        })
            .to(textContainerRef.current, {
                x: "-100vw", // Move horizontally across the screen
                ease: "none",
                duration: 1,
            });

        // 2. Continuous AJINKYA Highlight Pulse
        gsap.to(".keyword-ajinkya", {
            textShadow: "0px 0px 20px rgba(0, 234, 255, 0.8), 0px 0px 30px rgba(0, 234, 255, 0.6)",
            scale: 1.05,
            duration: 1.2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
        });

    }, { scope: containerRef });

    // 3. Cursor X-Ray Reveal Mask & Variable Font Wave
    const handleMouseMove = (e) => {
        if (!cursorMaskRef.current || !containerRef.current || !baseTextRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Update clipping mask position
        gsap.to(cursorMaskRef.current, {
            "--x": `${x}px`,
            "--y": `${y}px`,
            duration: 0.1,
            ease: "power2.out",
        });

        // Variable Font Wave Effect (calc distance from mouse to characters)
        const chars = baseTextRef.current.querySelectorAll('.wave-char');
        const maskChars = cursorMaskRef.current.querySelectorAll('.wave-char');

        // Wave radius 
        const radius = 150;
        const maxWeight = 800;
        const minWeight = 300;

        chars.forEach((char, index) => {
            const charRect = char.getBoundingClientRect();
            const charX = charRect.left - rect.left + charRect.width / 2;
            const charY = charRect.top - rect.top + charRect.height / 2;

            const dist = Math.sqrt(Math.pow(x - charX, 2) + Math.pow(y - charY, 2));

            let weight = minWeight;
            if (dist < radius) {
                // Interpolate weight based on proximity
                const intensity = 1 - (dist / radius);
                weight = minWeight + (maxWeight - minWeight) * intensity;
            }

            // Apply to both base and neon layer so they match perfectly
            gsap.to([char, maskChars[index]], {
                fontWeight: weight,
                duration: 0.15,
                ease: "power1.out",
            });
        });
    };

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => {
        setIsHovered(false);
        // Reset weights
        const chars = baseTextRef.current?.querySelectorAll('.wave-char');
        const maskChars = cursorMaskRef.current?.querySelectorAll('.wave-char');
        if (chars && maskChars) {
            gsap.to([chars, maskChars], {
                fontWeight: 300,
                duration: 0.5,
                ease: "power2.out",
            });
        }
    };

    const quoteText = "Let’s transform ideas into powerful innovations that shape the future with AJINKYA.";
    // Finding index of "AJINKYA" to isolate styles
    const ajinkyaStart = quoteText.indexOf("AJINKYA");

    const renderTextContent = (isNeonLayer = false) => {
        return (
            <h2 className="flex whitespace-nowrap text-[32px] md:text-[52px] lg:text-[72px] uppercase leading-tight tracking-wider items-center">
                {quoteText.split("").map((char, index) => {
                    const isSpace = char === " ";
                    // Check if current char is part of the word "AJINKYA"
                    const isAjinkya = index >= ajinkyaStart && index < ajinkyaStart + 7;
                    const isDot = char === ".";

                    let charClasses = "";
                    if (isAjinkya) {
                        charClasses = isNeonLayer ? "text-[#00eaff] keyword-ajinkya" : "text-[#cfa355] keyword-ajinkya font-bold";
                    }

                    return (
                        <span
                            key={index}
                            className={`wave-char inline-block transition-transform will-change-[font-weight,transform] ${isNeonLayer && (!isSpace && !isDot) ? "drop-shadow-[0_0_8px_rgba(0,234,255,1)]" : ""} ${charClasses}`}
                            style={{
                                minWidth: isSpace ? "0.3em" : "auto",
                                fontFamily: "'Space Grotesk', sans-serif"
                            }}
                        >
                            {isSpace ? "\u00A0" : char}
                        </span>
                    );
                })}
            </h2>
        );
    };

    return (
        <div
            ref={containerRef}
            className="relative w-full min-h-screen bg-[#070b14] overflow-hidden flex items-center justify-start cursor-crosshair z-0"
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Background Particles Layer */}
            {init && (
                <Particles
                    id="tsparticles-quote"
                    className="absolute inset-0 z-0 pointer-events-none"
                    options={{
                        particles: {
                            number: { value: 70, density: { enable: true, area: 1000 } },
                            color: { value: ["#00eaff", "#ffffff"] },
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
            <div ref={textContainerRef} className="relative z-10 pl-[50vw] transition-opacity duration-300">

                {/* Layer 1: Base Dark/White Text */}
                <div
                    ref={baseTextRef}
                    className="text-[#ffffff] opacity-40 select-none pb-4"
                >
                    {renderTextContent(false)}
                </div>

                {/* Layer 2: Neon Cyan Highlight Text (Revealed via Clip Path) */}
                <div
                    ref={cursorMaskRef}
                    className="absolute top-0 left-0 pl-[50vw] pb-4 text-[#00eaff] pointer-events-none select-none transition-opacity duration-300"
                    style={{
                        opacity: isHovered ? 1 : 0,
                        // X-Ray circle clipping mask
                        clipPath: "circle(180px at var(--x, 50%) var(--y, 50%))",
                    }}
                >
                    {renderTextContent(true)}
                </div>

            </div>
        </div>
    );
};

export default KineticQuote;
