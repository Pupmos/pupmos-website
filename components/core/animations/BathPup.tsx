import {
  AnimatePresence,
  motion,
  useInView,
  useScroll,
  useSpring,
  useTransform,
  VariantLabels,
} from "framer-motion";
import { useMemo, useRef } from "react";
import Wave from "./wave.png";
import WaveVector from './wave.svg'
import { Bubbles } from './Bubbles';
import pupmosFloating from "./pupmos-floating.png";

const WIDTH = "240px";

export function BathPup() {
  const ref = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
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
  

  const translateX = useTransform(lightSpring, [-1, 1], ["-100vw", "50vw"]);
  const y = useTransform(waveSpring, value => -1 * (5 + Math.sin(value * 40) * 5))
  return (
    <>
      <div
      ref={ref}
        className="z-20"
        style={{
          pointerEvents: "none",
          // background: `bottom left 10px / 300px auto url(${Wave.src}) repeat-x, bottom left 100px / 300px auto url(${Wave.src}) repeat-x`,
          background: `bottom left 10px / 200px auto url(${Wave.src}) repeat-x`,
          // backgroundSize: 'contain',
          width: "100vw",
          position: "absolute",
          height: "100%",
        }}
      >
        
      </div>

      {/* <WaveVector/> */}

      <motion.div>
        <AnimatePresence>
          {isVisible && (
            <motion.div
              style={{ translateX, translateY: y }}
              className={"absolute bottom-0 w-[300px] z-10"}
              ref={imageRef}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* <Bubbles width={300} height={300}></Bubbles> */}
              <motion.img
                src={pupmosFloating.src}
                alt="Pupmos Bath Bubbles"
                className="w-full"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
