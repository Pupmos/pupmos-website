import { AnimatePresence, motion, useInView, VariantLabels } from "framer-motion";
import { useMemo, useRef } from "react";
import { NextImageMotion } from '../NextImageMotion';


export function CornerPup(props: { whenVisible: VariantLabels, whenHidden: VariantLabels }) {
  const ref = useRef<HTMLImageElement>(null);
  const inView = useInView(ref);

  return (
    <>
      <motion.div ref={ref}></motion.div>
      <AnimatePresence>
        {inView && (
          <NextImageMotion
            src="/animations/pupmos.png"
            alt="Logo"
            initial={props.whenHidden}
            animate={props.whenVisible}
            exit={props.whenHidden}
            width={160}
            height={160}
            className="fixed z-20 overflow-hidden"
          />
        )}
      </AnimatePresence>
    </>
  );
}
