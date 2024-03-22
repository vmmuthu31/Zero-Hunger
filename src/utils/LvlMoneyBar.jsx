import React from "react";
import {
  HStack,
  Box,
  Flex,
  Progress,
  Text
} from "@chakra-ui/react";
import { PiCoinsFill } from "react-icons/pi";

const turquoiseColorExp = "#0CA8C6";
const turquoiseColorBar = "#157DA1";
const whiteColorText = "#EFEFEF";

const LvlMoneyBar = ({ level, exp, coins, gap = 10, otherComp }) => {
  return (
    <>
      <HStack gap={gap} justifyContent="space-between" width="100%"
        marginTop={2}

      >

        {otherComp}

        <Flex gap={2}>
          <Progress
            bg={turquoiseColorBar}
            colorScheme="turquoise"
            value={exp}
            w={"190px"}
            h={"18px"}
            borderRadius={"10px"}
            className="prova"
          />
          <Box
            w={"50px"}
            h={"20px"}
            bg={turquoiseColorExp}
            color={whiteColorText}
            fontWeight="bold"
            fontSize={"10px"}
            borderRadius={"300px"}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            LV {level}
          </Box>
        </Flex>
        <Box
          w={"fit-content"}
          h={"30px"}
          borderRadius={"30px"}
          bg={turquoiseColorBar}
          color={whiteColorText}
          display="flex"
          alignItems="center"
          justifyContent="center"
          pl={2}
          pr={2}
        >
          <Flex gap={2} alignItems="center" fontSize={"13px"}>

            <Text margin={0} paddingBottom={0.5} paddingLeft={1}>
              {coins}
            </Text>
            <PiCoinsFill color="#FFC44E" />
          </Flex>
        </Box>

      </HStack>
    </>
  )
}

export default LvlMoneyBar;