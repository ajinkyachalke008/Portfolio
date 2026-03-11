import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);

const ServiceSummary = () => {
  useGSAP(() => {
    // Reveal animation for the section itself
    gsap.fromTo(
      ".service-bg-video",
      { opacity: 0, filter: "blur(20px)", scale: 1.1 },
      {
        opacity: 0.8,
        filter: "blur(0px)",
        scale: 1.05,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".service-summary-section",
          start: "top 70%",
        },
      }
    );

    gsap.to("#title-service-1", {
      xPercent: 20,
      scrollTrigger: {
        trigger: ".service-summary-section", // Target the section, not the element itself for smoother scrubbing
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });
    gsap.to("#title-service-2", {
      xPercent: -30,
      scrollTrigger: {
        trigger: ".service-summary-section",
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });
    gsap.to("#title-service-3", {
      xPercent: 100,
      scrollTrigger: {
        trigger: ".service-summary-section",
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });
    gsap.to("#title-service-4", {
      xPercent: -100,
      scrollTrigger: {
        trigger: ".service-summary-section",
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });
  });

  return (
    <section className="service-summary-section relative min-h-[60vh] md:min-h-[80vh] bg-black overflow-hidden font-light leading-snug text-center flex flex-col justify-center contact-text-responsive py-10">
      {/* Background Video */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="service-bg-video object-cover w-full h-full opacity-80 scale-105"
        >
          <source src="/videos/service-bg.mp4" type="video/mp4" />
        </video>
        {/* Dark gradient overlay to fade smoothly into Hero (top) and Services (bottom) */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/20 to-black pointer-events-none" />
      </div>

      <div className="relative z-10 w-full flex flex-col gap-10 lg:gap-16 drop-shadow-2xl text-white">
        <div id="title-service-1">
          <p className="opacity-90">Frontend</p>
        </div>
        <div
          id="title-service-2"
          className="flex items-center justify-center gap-3 md:gap-8 translate-x-16"
        >
          <p className="font-normal opacity-90">Development</p>
          <div className="w-10 h-1 md:w-32 bg-[#00eaff] rounded-full shadow-[0_0_15px_#00eaff]" />
          <p className="opacity-90">Deployment</p>
        </div>
        <div
          id="title-service-3"
          className="flex items-center justify-center gap-3 md:gap-8 -translate-x-48"
        >
          <p className="opacity-90">APIs</p>
          <div className="w-10 h-1 md:w-32 bg-[#00eaff] rounded-full shadow-[0_0_15px_#00eaff]" />
          <p className="italic opacity-90">Readability</p>
          <div className="w-10 h-1 md:w-32 bg-[#00eaff] rounded-full shadow-[0_0_15px_#00eaff]" />
          <p className="opacity-90">Scalability</p>
        </div>
      </div>
    </section>
  );
};

export default ServiceSummary;
