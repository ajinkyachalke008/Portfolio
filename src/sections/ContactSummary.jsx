import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import KineticQuote from "../components/KineticQuote";
import Marquee from "../components/Marquee";

const ContactSummary = () => {
  const items = [
    "let's connect",
    "let's connect",
    "let's connect",
    "let's connect",
    "let's connect",
    "let's connect",
  ];

  return (
    <section className="w-full relative z-0 flex flex-col pt-20">
      {/* Top L-to-R Marquee */}
      <Marquee
        items={items}
        className="text-black bg-[#f4f4f4] py-2 border-y border-black/10"
        reverse={false}
      />

      <KineticQuote />

      {/* Bottom R-to-L Marquee */}
      <Marquee
        items={items}
        className="text-black bg-[#f4f4f4] py-2 border-y border-black/10"
        reverse={true}
      />
    </section>
  );
};

export default ContactSummary;
