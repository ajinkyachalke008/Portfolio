import { useRef } from "react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import mohamedfawzi from "../../public/images/me.jpeg";

const AnimatedBebasTextUltra = ({ text }) => {
  const containerRef = useRef(null);
  const lines = text.split("\n");

  useGSAP(() => {
    const chars = containerRef.current.querySelectorAll(".ultra-char");
    const glowLines = containerRef.current.querySelectorAll(".glow-line");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });

    // 1. PreReveal & Mask Break Reveal
    tl.fromTo(
      chars,
      {
        y: "160%",
        z: -200,
        rotationX: -45,
        rotationZ: -6,
        scale: 0.85,
        opacity: 0,
        filter: "blur(12px)",
        letterSpacing: "0.35em",
        textShadow: "4px 0px 0px rgba(255,0,0,0), -4px 0px 0px rgba(0,255,0,0), 0px 4px 0px rgba(0,0,255,0)",
      },
      {
        y: "0%",
        z: 0,
        rotationX: 0,
        rotationZ: 0,
        scale: 1,
        opacity: 1,
        filter: "blur(0px)",
        letterSpacing: "0.05em",
        textShadow: "2px 0px 5px rgba(255,0,0,0.5), -2px 0px 5px rgba(0,255,255,0.5), 0px 10px 20px rgba(0,0,0,0.35)",
        duration: 1.3,
        stagger: 0.02,
        ease: "back.out(1.7)",
      }
    )
      // Settle Depth & Chromatic Aberration fade out
      .to(
        chars,
        {
          textShadow: "0px 25px 40px rgba(0,0,0,0.35), 0px 0px 20px rgba(255,255,255,0.4)",
          duration: 0.5,
          ease: "power2.out",
        },
        "<0.8"
      );

    // Glow Sweep Effect
    gsap.fromTo(
      glowLines,
      { backgroundPosition: "200% center" },
      {
        backgroundPosition: "-200% center",
        duration: 2,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      }
    );

  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="w-full  text-[24px] md:text-[36px] lg:text-[48px] leading-[0.85] uppercase tracking-[0.05em] perspective-900"
      style={{ perspective: "900px", transformStyle: "preserve-3d" }}
    >
      {lines.map((line, lineIndex) => (
        <div key={lineIndex} className="relative overflow-hidden block pb-2 -mt-2 pt-2">
          {/* Main Text with character splitting */}
          <div className="flex flex-wrap will-change-transform" style={{ transformStyle: "preserve-3d" }}>
            {line.split(" ").map((word, wordIndex) => (
              <div key={wordIndex} className="flex overflow-hidden mr-3">
                {word.split("").map((char, charIndex) => (
                  <span
                    key={charIndex}
                    className="ultra-char inline-block will-change-[transform,opacity,filter] text-[#e5e5e0]"
                    style={{ transformOrigin: "bottom center" }}
                  >
                    {char}
                  </span>
                ))}
              </div>
            ))}
          </div>

          {/* Light Sweep / Glow Layer */}
          <div
            className="glow-line absolute inset-0 pointer-events-none mix-blend-overlay opacity-60"
            style={{
              backgroundImage: "linear-gradient(120deg, transparent 0%, transparent 40%, rgba(255,255,255,0.8) 50%, transparent 60%, transparent 100%)",
              backgroundSize: "200% 100%",
            }}
          />
        </div>
      ))}
    </div>
  );
};
const About = () => {
  const text = `Passionate about turning complex technical ideas into impactful digital solutions.`;

  const bioParas = [
    "Ajinkya Chalke is a second-year Electrical Engineering student at Government College of Engineering, Karad, driven by a deep curiosity for technology, scientific research, and innovation. He focuses on building advanced digital engineering platforms and AI-powered systems that transform complex technical concepts into practical, real-world solutions.",
    "His work centers around the intersection of Electrical Engineering, Artificial Intelligence, and intelligent software systems, where he develops projects such as AI-driven engineering platforms, electrical simulation environments, and security technologies. Through these projects, he aims to bridge the traditional gap between academic theory and real-world engineering applications.",
    "Ajinkya is particularly interested in exploring next-generation technologies, emerging scientific discoveries, and startup-driven innovation, with the goal of creating impactful systems that improve how engineers learn, design, and solve global technological challenges.",
    "He believes that the future of engineering lies in combining deep technical knowledge with intelligent digital platforms, and he continuously works toward building technologies that push the boundaries of modern engineering and research.",
  ];

  const imgRef = useRef(null);
  const bioRef = useRef(null);

  useGSAP(() => {
    gsap.to("#about", {
      scale: 0.95,
      scrollTrigger: {
        trigger: "#about",
        start: "bottom 80%",
        end: "bottom 20%",
        scrub: true,
        markers: false,
      },
      ease: "power1.inOut",
    });

    gsap.set(imgRef.current, {
      clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)",
    });
    gsap.to(imgRef.current, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      duration: 2,
      ease: "power4.out",
      scrollTrigger: { trigger: imgRef.current },
    });

    // Bio paragraphs — cinematic staggered entrance
    const bioItems = bioRef.current
      ? bioRef.current.querySelectorAll(".bio-para")
      : document.querySelectorAll(".bio-para");

    bioItems?.forEach((para, i) => {
      const direction = i % 2 === 0 ? -60 : 60;
      gsap.from(para, {
        opacity: 0,
        x: direction,
        y: 40,
        rotateY: i % 2 === 0 ? 8 : -8,
        filter: "blur(10px)",
        duration: 1.4,
        ease: "expo.out",
        scrollTrigger: {
          trigger: para,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      });

      // Glowing left border sweep
      gsap.from(para, {
        borderColor: "rgba(0, 234, 255, 0)",
        duration: 0.8,
        delay: 0.4,
        ease: "power2.out",
        scrollTrigger: {
          trigger: para,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      });
    });
  });

  // Highlight keywords
  const highlightWords = ["Electrical Engineering", "Artificial Intelligence", "AI-powered", "AI-driven", "Government College of Engineering, Karad", "next-generation technologies", "intelligent digital platforms"];

  const renderHighlightedPara = (text) => {
    let result = text;
    highlightWords.forEach((word) => {
      result = result.replace(
        new RegExp(`(${word})`, "gi"),
        `<span class="text-[#00eaff] font-semibold">${word}</span>`
      );
    });
    return result;
  };

  return (
    <section id="about" className="min-h-screen bg-black rounded-b-4xl">
      <AnimatedHeaderSection
        subTitle={"Code with purpose, Built to scale"}
        title={"About"}
        text={text}
        textColor={"text-white"}
        withScrollTrigger={true}
      />
      <div className="flex flex-col items-center justify-center gap-16 px-10 pb-8 text-xl font-light tracking-wide md:text-2xl lg:text-3xl text-white/60">
        <img
          ref={imgRef}
          src={mohamedfawzi}
          alt="Ajinkya Chalke"
          className="w-md rounded-3xl"
        />
      </div>

      {/* Detailed Biography */}
      <div ref={bioRef} className="px-10 lg:px-20 pb-20 pt-8">
        <div className="max-w-5xl mx-auto flex flex-col gap-8">
          {bioParas.map((para, index) => (
            <p
              key={index}
              className="bio-para  text-[16px] md:text-[18px] lg:text-[20px] text-white/70 leading-[1.8] tracking-wide will-change-[transform,opacity,filter] border-l-2 border-[#00eaff]/40 pl-6 py-2 transition-all duration-500 hover:border-[#7c6cff] hover:text-white/90"
              dangerouslySetInnerHTML={{ __html: renderHighlightedPara(para) }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
