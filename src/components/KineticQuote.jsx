import React, { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

gsap.registerPlugin(ScrollTrigger);

const KineticQuote = () => {
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
                trigger: containerRef.current,
                start: "top center",
                end: "+=2000", // Longer duration for more "detained" stable feel
                scrub: 1.2,    // Extra smooth scrub
                pin: true,
                anticipatePin: 1,
            },
        });

        // Initial setup for the rows
        gsap.set([line1Ref.current, line2Ref.current], { opacity: 0 });
        gsap.set(line1Ref.current, { x: "-60vw" }); // Reduced offset for stability
        gsap.set(line2Ref.current, { x: "60vw" });

        tl.to([line1Ref.current, line2Ref.current], {
            opacity: 1,
            duration: 0.1,
        })
            .to(line1Ref.current, {
                x: "60vw", // Moves from Left to Right
                ease: "power1.inOut",
                duration: 1,
            }, 0)
            .to(line2Ref.current, {
                x: "-60vw", // Moves from Right to Left
                ease: "power1.inOut",
                duration: 1,
            }, 0);

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

    const line1Text = "Let’s transform ideas into powerful innovations";
    const line2Text = "that shape the future with AJINKYA.";
    const ajinkyaStart = line2Text.indexOf("AJINKYA");

    const renderTextContent = (text, isNeonLayer = false, isLine2 = false) => {
        return (
            <h2 className="flex whitespace-nowrap text-[32px] md:text-[52px] lg:text-[72px] uppercase leading-tight tracking-wider items-center">
                {text.split("").map((char, index) => {
                    const isSpace = char === " ";
                    // Only apply Ajinkya styling if it's Line 2 and within range
                    const isAjinkya = isLine2 && index >= ajinkyaStart && index < ajinkyaStart + 7;
                    const isDot = char === ".";

                    let charClasses = "";
                    if (isAjinkya) {
                        charClasses = isNeonLayer ? "text-[#00eaff] keyword-ajinkya" : "text-[#cfa355] keyword-ajinkya font-bold";
                    }

                    return (
                        <span
                            key={index}
                            className={`wave-char inline-block transition-transform will-change-[font-weight,transform] ${isNeonLayer && (!isSpace && !isDot) ? "drop-shadow-[0_0_12px_rgba(0,234,255,1)]" : ""} ${charClasses}`}
                            style={{
                                minWidth: isSpace ? "0.3em" : "auto",
                                fontFamily: "'Space Grotesk', sans-serif",
                                textShadow: !isNeonLayer ? "2px 2px 4px rgba(0,0,0,0.15), 0px 4px 10px rgba(0,0,0,0.1)" : "none"
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
            className="relative w-full h-[45vh] bg-white overflow-hidden flex items-center justify-start cursor-crosshair z-0"
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Background Image Collage Track */}
            <div className="absolute inset-0 z-0 overflow-hidden flex items-center pointer-events-none">
                <div className="image-track flex gap-4 md:gap-8 min-w-[200%] opacity-[0.12]">
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
            <div className="relative z-10 w-full transition-opacity duration-300 pointer-events-none flex flex-col gap-0">

                {/* Row 1: Left to Right */}
                <div ref={line1Ref} className="relative py-4">
                    {/* Base Layer - High Contrast */}
                    <div ref={baseTextRef} className="text-black/85 select-none drop-shadow-sm">
                        {renderTextContent(line1Text, false)}
                    </div>
                    {/* Neon Layer (Revealed via Mask) */}
                    <div
                        className="absolute top-0 left-0 text-[#00eaff] transition-opacity duration-300 py-4"
                        style={{
                            opacity: isHovered ? 1 : 0,
                            clipPath: "circle(180px at var(--x, 50%) var(--y, 50%))",
                        }}
                    >
                        {renderTextContent(line1Text, true)}
                    </div>
                </div>

                {/* Row 2: Right to Left */}
                <div ref={line2Ref} className="relative py-4">
                    {/* Base Layer - High Contrast */}
                    <div className="text-black/85 select-none drop-shadow-sm">
                        {renderTextContent(line2Text, false, true)}
                    </div>
                    {/* Neon Layer (Revealed via Mask) */}
                    <div
                        className="absolute top-0 left-0 text-[#00eaff] transition-opacity duration-300 py-4"
                        style={{
                            opacity: isHovered ? 1 : 0,
                            clipPath: "circle(180px at var(--x, 50%) var(--y, 50%))",
                        }}
                    >
                        {renderTextContent(line2Text, true, true)}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default KineticQuote;
