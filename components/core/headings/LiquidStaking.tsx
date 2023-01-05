import { Text } from "@chakra-ui/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { BathPup } from "../animations/BathPup";
import { Bubbles } from "../animations/Bubbles";
export function LiquidStaking() {
  const containerRef = useRef<HTMLDivElement>(null);
  // container ref width and height
  const [{ width, height }, setWH] = useState<{
    width: number | undefined;
    height: number | undefined;
  }>({
    width: undefined,
    height: undefined,
  });
  useEffect(() => {
    setWH({
      width: global.innerWidth || 100000,
      height: containerRef.current?.offsetHeight,
    });
  }, [containerRef]);
  return (
    <>
      <div
        ref={containerRef}
        className="relative mb-10 flex flex-col items-center"
      >
        <BathPup />
        <Bubbles width={width} height={height}></Bubbles>
        <Text
          fontSize={{
            base: "5xl",
            sm: "6xl",
            md: "7xl",
            lg: "8xl",
            xl: "8xl",
          }}
          mb={10}
          className="mt-12 tracking-tighter text-center mb-6 font-black leading-[1]"
        >
          GOVMØS
          <span className="inline-block text-transparent bg-gradient-to-r from-teal-300 to-cyan-400  bg-clip-text leading-[1.1] ">
            <span>&nbsp;Liquid Staking&nbsp;</span>
          </span>
        </Text>
      </div>
    </>
  );
}
