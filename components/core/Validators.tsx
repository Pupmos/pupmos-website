import {
  Box,
  Image,
  Card,
  CardBody,
  CardFooter,
  Heading,
  SimpleGrid,
  Stack,
  Text,
  Button,
  Stat,
  StatArrow,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useValidators } from "../../hooks";
import { Chain } from "../../hooks/useValidators";

export function Validators() {
  const validators = useValidators();
  return (
    <SimpleGrid
      mt="10"
      columns={3}
      spacing={10}
      alignItems="center"
      justifyContent={"center"}
    >
      {validators.validator.chains.map((validator) => (
        <Validator key={validator.name} validator={validator} />
      ))}
    </SimpleGrid>
  );
}

function Validator({ validator }: { validator: Chain }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref);
  return (
    <Box
      className="relative bg-gray-100 dark:bg-neutral-900"
      p={4}
      pt={0}
      shadow="md"
      rounded="xl"
      textAlign={"right"}
      ref={ref}
    >
      <Image
        className="absolute mt-[-50px] ml-[-50px]"
        style={{
          width: "33%",
          height: "auto",
        }}
        src={`/validators/${validator.name}.png`}
        height="auto"
        width="100%"
        alt={validator.name}
        // fallbackSrc={`/validators/base.png`}
        rounded="2xl"
      />
      <Text textAlign={"right"} fontSize="2xl" fontWeight="black">
        {validator.name.toUpperCase()}
      </Text>
      <StatGroup>
        <Stat>
          <StatLabel>STEAK</StatLabel>
          <StatNumber>
            ${formatStake(validator.delegations.total_usd)?.toLocaleString()}
          </StatNumber>
          <StatHelpText>
            <StatArrow type="increase" />
            {validator.uptime * 100}% PUPTIME
          </StatHelpText>
        </Stat>
      </StatGroup>
      {/* Delegate Button In Gentle Pink */}
      <a
        target={"_blank"}
        rel="noreferrer"
        referrerPolicy="no-referrer"
        href={`https://restake.app/${validator.name}/${validator.operator_address}/stake`}
      >
        <Button
          mt={4}
          size="sm"
          variant="solid"
          bgGradient={"linear(to-r, yellow.500, pink.500)"}
          rounded="lg"
          className="inline-block from-amber-400 to-pink-500 bg-gradient-to-r"
        >
          Delegate
        </Button>
      </a>
    </Box>
  );
}

// format stake and round to the nearest thousand
function formatStake(stake?: number) {
  stake = stake || 0;
  return Math.round(stake / 1000) * 1000;
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
