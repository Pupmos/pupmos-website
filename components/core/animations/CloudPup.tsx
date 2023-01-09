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
    stiffness: 80,
    damping: 50,
    restDelta: 0.001,
  });

  const translateX = useTransform(lightSpring, [-1, 1], ["100vw", "-50vw"]);
  return (
    <>
      <motion.div className="w-screen h-[300px] absolute mb-[-4em] pt-[4em]" ref={ref}>
        <AnimatePresence>
          {isVisible && (
            <motion.div
              style={{ translateX }}
              className={"absolute w-[300px] z-10"}
              ref={imageRef}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.img
                src="/animations/pupmos-cloud.png"
                alt="Pupmos Cloud"
                className="w-full"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
