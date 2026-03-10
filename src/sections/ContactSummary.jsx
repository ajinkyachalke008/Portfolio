import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import KineticQuote from "../components/KineticQuote";

const ContactSummary = () => {
  return (
    <section className="w-full relative z-0">
      <KineticQuote />
    </section>
  );
};

export default ContactSummary;
