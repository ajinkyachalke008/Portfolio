import { useRef } from "react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import mohamedfawzi from "../../public/images/me.jpeg";

const AnimatedBebasText = ({ text }) => {
  const containerRef = useRef(null);
  const lineRefs = useRef([]);
  const lines = text.split("\n");

  useGSAP(() => {
    gsap.from(lineRefs.current, {
      y: 150,
      rotationZ: 2,
      opacity: 0,
      duration: 1.2,
      stagger: 0.1,
      ease: "power4.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%",
      },
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="w-full font-bebas text-[40px] md:text-[60px] lg:text-[80px] leading-[0.85] uppercase text-[#e5e5e0] tracking-wide">
      {lines.map((line, index) => (
        <div key={index} className="overflow-hidden pb-2 -mt-2 pt-2">
          <div ref={(el) => (lineRefs.current[index] = el)} className="origin-left">
            {line}
          </div>
        </div>
      ))}
    </div>
  );
};
const About = () => {
  const text = `Passionate about clean architecture
    I build scalable, high-performance solutions
    from prototype to production`;
  const aboutText = `I am Ajinkya Chalke,
an EE student at GCE Karad.
Passionate about building
AI-driven platforms and
innovative tech solutions.
Transforming complex concepts
into practical digital systems.
My goal is to combine
engineering, AI, and research
to solve real-world problems
and shape the future.`;
  const imgRef = useRef(null);
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
  });
  return (
    <section id="about" className="min-h-screen bg-black rounded-b-4xl">
      <AnimatedHeaderSection
        subTitle={"Code with purpose, Built to scale"}
        title={"About"}
        text={text}
        textColor={"text-white"}
        withScrollTrigger={true}
      />
      <div className="flex flex-col items-center justify-between gap-16 px-10 pb-16 text-xl font-light tracking-wide lg:flex-row md:text-2xl lg:text-3xl text-white/60">
        <img
          ref={imgRef}
          src={mohamedfawzi}
          alt="Ajinkya Chalke"
          className="w-md rounded-3xl"
        />
        <AnimatedBebasText text={aboutText} />
      </div>
    </section>
  );
};

export default About;
