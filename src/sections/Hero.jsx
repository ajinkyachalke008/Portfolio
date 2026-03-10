import { useRef } from "react";
import { useMediaQuery } from "react-responsive";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";

const AnimatedAntonioText = ({ text1, text2 }) => {
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.from(".antonio-line1 .antonio-word", {
      opacity: 0,
      filter: "blur(12px)",
      x: -30,
      scale: 1.1,
      stagger: 0.08,
      duration: 1.2,
      ease: "power4.out",
      delay: 1.5, // wait for header to settle
    });

    gsap.from(".antonio-line2 .antonio-word", {
      opacity: 0,
      filter: "blur(12px)",
      x: 30,
      scale: 1.1,
      stagger: 0.08,
      duration: 1.2,
      ease: "power4.out",
      delay: 2.2, // play slightly after first line
    });
  }, { scope: containerRef });

  const renderWords = (text, className) => {
    return (
      <div className={`${className} flex flex-wrap gap-x-2 mb-4`}>
        {text.split(" ").map((word, index) => (
          <span key={index} className="antonio-word inline-block will-change-[opacity,transform,filter]">
            {word}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div ref={containerRef} className="font-antonio text-[20px] sm:text-[24px] md:text-[30px] lg:text-[36px] leading-[1.3] uppercase tracking-wide text-black/80 w-full">
      {renderWords(text1, "antonio-line1")}
      {renderWords(text2, "antonio-line2")}
    </div>
  );
};

const Hero = () => {
  const isMobile = useMediaQuery({ maxWidth: 853 });

  const text1 = "Passionate about turning complex technical ideas into impactful digital solutions.";
  const text2 = "Driven to build innovative systems that bridge engineering knowledge with real-world applications.";

  return (
    <section
      id="home"
      className="min-h-screen flex flex-col items-center justify-center"
    >
      <div className="w-full mt-4 flex flex-col items-center z-30">
        <AnimatedHeaderSection
          subTitle={"Where logic meets imagination, creation starts."}
          title={"Hi, I'm Ajinkya."}
          text={""}
          textColor={"text-black"}
        />
        <div className="w-full px-10 relative -mt-8 sm:-mt-12 text-start z-40">
          <AnimatedAntonioText text1={text1} text2={text2} />
        </div>
      </div>
    </section>
  );
};

export default Hero;
