import {
  AnimatePresence,
  motion,
  useInView,
  useScroll,
  useSpring,
  useTransform,
  VariantLabels,
} from "framer-motion";
import { useMemo, useRef, useState } from "react";
import Wave from "./wave.png";
import WaveVector from "./wave.svg";
import { Bubbles } from "./Bubbles";
import pupmosFloating from "./pupmos-floating.png";
import { NextImageMotion } from "../../../components/core/NextImageMotion";

const WIDTH = "240px";

export function BathPup(props: { height: number | undefined }) {
  const ref = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [waveImageSrc, setWaveImageSrc] = useState(
    Wave.blurDataURL || Wave.src
  );
  const { scrollYProgress } = useScroll({
    target: ref,
    // offset: ["end end", "start start"],
  });
  const isVisible = useInView(ref);
  const lightSpring = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 50,
    restDelta: 0.001,
  });

  const waveSpring = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 70,
    restDelta: 0.001,
  });

  const translateX = useTransform(lightSpring, [-1, 1], ["-60vw", "80vw"], {});
  const y = useTransform(
    waveSpring,
    (value) => -1 * (5 + Math.sin(value * 40) * 5)
  );
  return (
    <div
      className="absolute left-0 right-0 h-full w-screen overflow-hidden"
      style={{
        height: props.height,
      }}
    >
      {/* Phantom Image to leverage NextImage on background image */}
      <NextImageMotion
        className="opacity-0 pointer-events-none fixed z-0"
        height={10}
        width={200}
        src={Wave.src}
        alt="wave"
        onLoad={(e) => {
          setWaveImageSrc(e.currentTarget.currentSrc);
        }}
      ></NextImageMotion>
      <div
        ref={ref}
        className="z-20"
        style={{
          pointerEvents: "none",
          // background: `bottom left 10px / 300px auto url(${Wave.src}) repeat-x, bottom left 100px / 300px auto url(${Wave.src}) repeat-x`,
          background: `bottom left 10px / 200px auto url('${waveImageSrc}') repeat-x`,
          // backgroundSize: 'contain',
          width: "100vw",
          position: "absolute",
          left: 0,
          right: 0,
          height: props.height || "100vh",
        }}
      ></div>
      <motion.div className="relative w-full h-full">
        <AnimatePresence>
          {isVisible && (
            <NextImageMotion
              style={{ translateX, translateY: y }}
              className={"absolute bottom-0 z-10"}
              ref={imageRef}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, easings: ["anticipate"] }}
              src={pupmosFloating.src}
              alt="Pupmos Bath Bubbles"
              // objectFit="contain"
              // objectPosition={"bottom right"}
              width={300}
              height={255}
            />
          )}
        </AnimatePresence>
      </motion.div>

      {/* <WaveVector/> */}
    </div>
  );
}
