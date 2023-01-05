import { useDimensions } from '@chakra-ui/react';
import { useInView } from 'framer-motion';
import React, { createRef, useEffect, useRef, useState } from "react";
import drawBubbles from "./drawBubbles";


export const Bubbles = ({ width, height }: { width: string | number | undefined, height: string | number | undefined }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const inView = useInView(canvasRef)
  const [pauser, setPauser] = useState<null | (() => void)>(null);
  const [resumer, setResumer] = useState<null | (() => void)>(null);
  useEffect(() => {
    if (canvasRef && width && height) {
      const controller = drawBubbles(canvasRef, width, height);
      setPauser(() => controller.pause);
      setResumer(() => controller.resume);
    }
    return () => {
      pauser && pauser();
    }
  }, [height, width, canvasRef]);

  useEffect(() => {
    if (inView) {
      resumer && resumer();
    } else {
      pauser && pauser();
    }
  }, [inView, pauser, resumer]);

  return (
    <>
      {/* gradient resembling bath bubbles */}
      {/* <div
        style={{
          position: "absolute",
          zIndex: -100,
          width: "100%",
          height: "100%",
          background: "linear-gradient(180deg, rgba(230,230,230,0) 33%, rgba(230,230,230,1) 100%)",
        }}
      /> */}

      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        style={{ position: "absolute", zIndex: -100, pointerEvents: "none" }}
      />
    </>
  );
};