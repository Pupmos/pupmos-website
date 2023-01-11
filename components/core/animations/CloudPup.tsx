import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTime,
  useTransform,
  VariantLabels,
} from "framer-motion";
import { useMemo, useRef } from "react";
import { NextImageMotion } from '../NextImageMotion';

const WIDTH = "240px";
export function CloudPup() {
  const ref = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    // offset: ["end end", "start start"],
  });
  const isVisible = useInView(ref);
  const lightSpring = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 40,
    restDelta: 0.001,
  });

  const translateX = useTransform(lightSpring, [1, 0], ["-22vw", "110vw"]);

  return (
    <>
      <motion.div ref={ref} className="w-screen h-[300px] overflow-hidden absolute mb-[-4em] pt-[4em]">
        <AnimatePresence>
          {isVisible && (
            <motion.div
              style={{ translateX }}
              className={"absolute w-[300px] z-10 origin-center"}
              ref={imageRef}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, easings: ["circInOut"], origin: 'center center' }}
            >
              <NextImageMotion
                src="/animations/pupmos-cloud.png"
                alt="Pupmos Cloud"
                className="w-full"
                width={300}
                height={300}
              />
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div  className="absolute bottom-0 w-full" />
      </motion.div>
    </>
  );
}
