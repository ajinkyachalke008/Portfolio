import React, { useEffect, useState } from "react";
import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import ServiceSummary from "./sections/ServiceSummary";
import Services from "./sections/Services";
import ReactLenis from "lenis/react";
import About from "./sections/About";
import Works from "./sections/Works";
import Marquee from "./components/Marquee";
import ContactSummary from "./sections/ContactSummary";
import Contact from "./sections/Contact";
import { useProgress } from "@react-three/drei";
import SpiderManMask from "./sections/SpiderManMask";

const App = () => {
  const { progress } = useProgress();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (progress === 100) {
      setIsReady(true);
    }
  }, [progress]);

  return (
    <ReactLenis
      root
      options={{ lerp: 0.05, duration: 1.5, smoothTouch: true }}
      className="relative w-screen min-h-screen overflow-x-hidden"
    >
      {!isReady && (
        <div className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-black text-white transition-opacity duration-700 font-light">
          <p className="mb-4 text-xl tracking-widest animate-pulse">
            Loading {Math.floor(progress)}%
          </p>
          <div className="relative h-1 overflow-hidden rounded w-60 bg-white/20">
            <div
              className="absolute top-0 left-0 h-full transition-all duration-300 bg-white"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}

      <div
        className={`${isReady ? "opacity-100" : "opacity-0"
          } transition-opacity duration-1000`}
      >
        <Navbar />
        <div className="sticky top-0 h-screen w-full z-0">
          <SpiderManMask />
        </div>
        <div className="relative z-10 bg-black rounded-t-[40px] shadow-[0_-20px_50px_rgba(0,0,0,0.5)] flex flex-col">
          <Hero />

          <div className="w-full relative z-20">
            <Marquee
              items={Array(4).fill(["Innovation", "Design", "Development", "Architecture", "Scalability", "Deployment", "APIs"]).flat()}
              className="text-black bg-[#e2e8f0] py-3 text-2xl lg:text-3xl font-medium tracking-wider shadow-lg"
              reverse={false}
              icon="mdi:lightning-bolt"
            />
          </div>

          <ServiceSummary />

          <div className="w-full relative z-20">
            <Marquee
              items={Array(4).fill(["Performance", "Reliability", "Optimization", "Security", "Automation", "Flexibility", "Integrations"]).flat()}
              className="text-black bg-[#e2e8f0] py-3 text-2xl lg:text-3xl font-medium tracking-wider shadow-lg"
              reverse={true}
              icon="mdi:star-four-points"
            />
          </div>

          <Services />
          <About />
          <Works />
          <ContactSummary />
          <Contact />
        </div>
      </div>
    </ReactLenis>
  );
};

export default App;
