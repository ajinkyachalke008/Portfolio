import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import Marquee from "../components/Marquee";
import { socials } from "../constants";
import gsap from "gsap";

const AnimatedContactText = ({ text }) => {
  const containerRef = useRef(null);
  const lineRefs = useRef([]);
  const lines = text.split("\n");

  useGSAP(() => {
    gsap.from(lineRefs.current, {
      y: "100%",
      opacity: 0,
      filter: "blur(4px)",
      duration: 1,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="text-[#e5e5e0]/80 text-[20px] md:text-[28px] lg:text-[36px] font-light tracking-wide leading-relaxed mb-16">
      {lines.map((line, index) => (
        <div key={index} className="overflow-hidden pb-1">
          <div ref={(el) => (lineRefs.current[index] = el)} className="will-change-transform">
            {line}
          </div>
        </div>
      ))}
    </div>
  );
};

const Contact = () => {
  const introText = `Got a question, collaboration opportunity,\nor project idea?`;

  const bodyText = `I'd be happy to connect and discuss\nengineering, research, or technology innovations.`;

  const items = [
    "let's connect",
    "let's connect",
    "let's connect",
    "let's connect",
    "let's connect",
  ];

  useGSAP(() => {
    // Animate the links with a staggered slide-up & fade-in effect
    gsap.from(".social-link", {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power4.out",
      scrollTrigger: {
        trigger: ".social-link-container",
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });
  }, []);

  return (
    <section
      id="contact"
      className="flex flex-col justify-between min-h-screen bg-black pt-20"
    >
      <div>
        <AnimatedHeaderSection
          subTitle={"Let's build something incredible"}
          title={"Contact"}
          text={introText}
          textColor={"text-white"}
          withScrollTrigger={true}
        />

        <div className="flex flex-col px-10 mb-20 lg:mb-32">
          {/* Animated Description Text */}
          <AnimatedContactText text={bodyText} />

          {/* Social Links & Info Grid */}
          <div className="social-link-container flex flex-col w-full gap-12 text-[#e5e5e0]">

            <div className="social-link w-full">
              <h2 className="font-bebas text-[30px] md:text-[40px] tracking-wide text-[#8b8b73]">E-mail</h2>
              <div className="w-full h-px my-4 bg-white/20" />
              <a href="mailto:ajinkyachalke008@gmail.com" className="text-[20px] md:text-[30px] lg:text-[40px] font-light tracking-wide hover:text-white transition-colors duration-300">
                ajinkyachalke008@gmail.com
              </a>
            </div>

            <div className="social-link w-full">
              <h2 className="font-bebas text-[30px] md:text-[40px] tracking-wide text-[#8b8b73]">Social Media & Links</h2>
              <div className="w-full h-px my-4 bg-white/20" />
              <div className="flex flex-wrap gap-8 md:gap-12 pt-2">
                {socials.map((social, index) => (
                  <a
                    key={index}
                    href={social.href !== "#" ? social.href : undefined}
                    target={social.href !== "#" ? "_blank" : "_self"}
                    rel="noreferrer"
                    className="font-bebas text-[28px] md:text-[40px] tracking-wider hover:text-white hover:-translate-y-1 transition-all duration-300"
                  >
                    {social.name}
                  </a>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Footer Marquee */}
      <Marquee items={items} className="text-[#e5e5e0] bg-transparent pb-10" />
    </section>
  );
};

export default Contact;
