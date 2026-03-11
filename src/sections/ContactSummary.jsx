import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import KineticQuote from "../components/KineticQuote";
import Marquee from "../components/Marquee";

const ContactSummary = () => {
  const containerRef = useRef(null);

  const items = [
    "let's connect",
    "let's connect",
    "let's connect",
    "let's connect",
    "let's connect",
    "let's connect",
  ];

  return (
    <section ref={containerRef} className="w-full min-h-screen relative z-0 flex flex-col justify-center overflow-hidden bg-white">
      {/* Top L-to-R Marquee */}
      <Marquee
        items={Array(6).fill(items).flat()}
        className="text-black bg-[#f4f4f4] py-2 border-y border-black/10"
        reverse={false}
      />

      <div className="flex-grow flex items-center justify-center py-20">
        <KineticQuote triggerRef={containerRef} />
      </div>

      {/* Bottom R-to-L Marquee */}
      <Marquee
        items={Array(6).fill(items).flat()}
        className="text-black bg-[#f4f4f4] py-2 border-y border-black/10"
        reverse={true}
      />
    </section>
  );
};

export default ContactSummary;
