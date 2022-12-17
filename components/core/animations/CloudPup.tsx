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
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 50,
    restDelta: 0.001,
  });
  const translateX = useTransform(scaleX, [-1, 1], ["120vw", "-20vw"]);
  return (
    <>
      <motion.div
        style={{ translateX, translateY: -15 }}
        className={"absolute w-[300px] z-10"}
        ref={imageRef}
      >
        <motion.img
          src="/animations/pupmos-cloud.png"
          alt="Pupmos Cloud"
          className="w-full"
          animate={{
            translateY: [0, 10, 0],
          }}
          transition={{
            duration: 10,
            ease: "easeInOut",
            repeat: Infinity,
            repeatDelay: 0,
          }}
        />
      </motion.div>
      <motion.div
        style={{ marginTop: (imageRef.current?.offsetHeight || 0) / 2 }}
        className={"absolute left-0"}
        ref={ref}
      ></motion.div>
    </>
  );
}
