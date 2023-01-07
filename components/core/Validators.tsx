import {
  Box,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import {
  motion,
  useTime,
  useTransform,
} from "framer-motion";
import {
  useMemo,
  useRef,
} from "react";
import { useValidators } from "../../hooks";
import { Chain } from "../../hooks/useValidators";

let stackRefScrollWidth = 0;
export function Validators() {
  const validators = useValidators();
  const stackRef = useRef<HTMLDivElement>(null);
  const chains = useMemo(() => validators.validator.chains, [validators]);
  const time = useTime();

  // const lightSpring = useSpring(time, {
  //   stiffness: 80,
  //   damping: 50,
  //   // restDelta: 0.1,
  // });
  // put on four second loop
  const timeTransform = useTransform(time, (value) => (value % 40000) / 40000);

  const hoverRef = useRef(false);
  const translateX = useTransform(timeTransform, function (value) {
    const offsetCompletionRatio = -1 * (value + 0.2);
    stackRefScrollWidth = stackRefScrollWidth || stackRef.current?.scrollWidth || 0;
    return offsetCompletionRatio * (stackRefScrollWidth || 0);
  });

  return (
    <>
      <Box
        className="w-screen h-[100px]"
        position="absolute"
        left={0}
        right={0}
      >
        <motion.div
          className="flex flex-row justify-start overflow-visible items-end w-full"
          style={{
            translateX: translateX,
          }}
          animate="visible"
          transition={{
            easings: ["linear"],
            // duration: 0,
          }}
          onHoverStart={() => {
            hoverRef.current = true;
          }}
          onHoverEnd={() => {
            hoverRef.current = false;
          }}
        >
          {[0, 1].map((i) => (
            <Stack
              key={i}
              ref={i == 0 ? stackRef : undefined}
              // columns={[1, 2, 3, null, null, 4]}
              spacing={10}
              direction={"row"}
              alignItems="center"
              paddingRight={10}
            >
              {chains.map(
                (chain, index) =>
                  chain && (
                    <Validator
                      key={chain?.name + chain.name}
                      validator={chain}
                    />
                  )
              )}
            </Stack>
          ))}
        </motion.div>
      </Box>
      <Box h={200}></Box>
    </>
  );
}

export function Validator({
  validator,
}: {
  validator: Chain;
}) {
  const ref = useRef<HTMLDivElement>(null);
  // const isVisible = useInView(ref);
  return (
    <Stack
      ref={ref}
      className="relative bg-gray-100 dark:bg-neutral-900"
      style={{
        marginTop: "50px",
      }}
      px={0}
      shadow="md"
      rounded="xl"
      textAlign={"right"}
      width={"300px"}
      minWidth={"300px"}
      display="flex"
      align={"center"}
      direction={"row"}
      spacing={4}
      overflow={"visible"}
    >
      <Box
        className="mt-[-50px] ml-[-50px]"
        w="120px"
        height="120px"
        // fallbackSrc={`/validators/base.png`}
        rounded="2xl"
        overflow={"visible"}
      >
        <Image
          // hidden={!isVisible}
          src={`/validators/${validator.name}.png`}
          alt={validator.name}
          fallbackSrc={`/validators/base.png`}
          maxWidth="100%"
          maxHeight={"100%"}
          rounded="2xl"
        />
      </Box>
      <Box w="full" className='relative' py={2}>
        <Text textAlign={"left"} fontSize="2xl" fontWeight="black">
          {validator.name.toUpperCase()}
        </Text>
        <Stack direction={"row"} className="mt-1" textAlign={"left"}>
          <Text fontWeight={"bold"} color="pink.300">
            {validator.delegations
              ? "$" +
                formatStake(validator.delegations.total_usd)?.toLocaleString()
              : "ZOON"}{" "}
            STEAK
          </Text>
          <Text fontSize={"sm"} className="text-teal-300">
            {validator.uptime ? validator.uptime * 100 : "ZOON"}% PUPTIME
          </Text>
        </Stack>
        {/* Delegate Button In Gentle Pink */}
        <a
          target={"_blank"}
          rel="noreferrer"
          referrerPolicy="no-referrer"
          href={`https://restake.app/${validator.name}/${validator.operator_address}/stake`}
          className="absolute right-0 top-0 bottom-0 left-0 h-full w-full rounded-r-xl rounded-l-none overflow-hidden cursor-pointer block"
        >
          <Box
            // bgGradient={"linear(to-r, yellow.500, pink.500)"}
            className="bg-gray-100 dark:bg-neutral-900 bg-gradient-to-r w-full h-full absolute inset-0 cursor-pointer transition-opacity"
            opacity={0}
            _hover={{
              opacity: 1,
            }}
            display="flex"
            alignItems="center"
            justifyContent="start"
            fontWeight={"bold"}
            fontSize={"xl"}
          >
            Delegate 🐾
          </Box>
        </a>
      </Box>
    </Stack>
  );
}

// format stake and round to the nearest thousand
function formatStake(stake?: number) {
  stake = stake || 0;
  return Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(stake);
}

// <Card
//   className="bg-gray-100 dark:bg-neutral-900 dark:text-white"
//   border={'none'}
//   key={validator.name}
//   direction={{ base: "column", sm: "row" }}
//   overflow="hidden"
//   variant="outline"
// >
//   <Image
//     objectFit="cover"
//     maxW={{ base: "100%", sm: "200px" }}
//     src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
//     alt="Caffe Latte"
//   />

//   <Stack>
//     <CardBody>
//       <Heading size="md">The perfect latte</Heading>

//       <Text py="2">
//         Caffè latte is a coffee beverage of Italian origin made with
//         espresso and steamed milk.
//       </Text>
//     </CardBody>

//     <CardFooter>
//       <Button variant="solid" colorScheme="blue">
//         Buy Latte
//       </Button>
//     </CardFooter>
//   </Stack>
// </Card>
