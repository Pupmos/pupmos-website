import { Text } from "@chakra-ui/react";
import { CloudPup } from "../animations/CloudPup";

export function CloudInfrastructure() {
  return (
    <div className="relative mb-10 flex flex-col items-center">
      <CloudPup />
      <Text
        fontSize={{
          base: "5xl",
          sm: "6xl",
          md: "7xl",
          lg: "8xl",
          xl: "8xl",
        }}
        className="mt-12 tracking-tighter text-center mb-6 font-black leading-[1]"
      >
        Cloud
        <span className="inline-block text-transparent bg-gradient-to-r from-sky-300 to-blue-500 bg-clip-text leading-[1] ">
          <span>&nbsp;Infrastructure&nbsp;</span>
        </span>
      </Text>
    </div>
  );
}
