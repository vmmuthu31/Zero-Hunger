import React, { useState, useRef } from "react";

import "../../App.css";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import DailyMealSuggestions from "../DailyMealSuggestions";
import CustomButton from "../../utils/CustomButton";

import {
  HStack,
  VStack,
  Box,
  Flex,
  Text,
  Stack,
  Card,
  CardBody,
} from "@chakra-ui/react";
import LvlMoneyBar from "../../utils/LvlMoneyBar";

import { MdHome } from "react-icons/md";
import { UserContext } from "../../App";

import { FaCamera } from "react-icons/fa";
import { PiCoinsFill } from "react-icons/pi";
import { BiMessageDots } from "react-icons/bi";

const purpleColorButton = "#AD5983";
const whiteColorText = "#EFEFEF";
const orangeColorBg = "#FDD2A8";
const orangeLightColorBg = "#F5E1DA";
const orangeColorButton = "#F27127";
const redColorButton = "#D14C5F";
const yellowColorButton = "#FE9846";

const Feedme = (props) => {
  const { coins, setCoins } = React.useContext(UserContext);
  const { exp, setExp } = React.useContext(UserContext);
  const { level, setLevel } = React.useContext(UserContext);

  return (
    <VStack
      w={"390px"}
      h={"670px"}
      justifyContent="space-between"
      alignItems="flex-start"
      bgSize="cover"
      bgPosition="center"
      bg={orangeLightColorBg}
      padding={0}
      paddingLeft={2}
      paddingRight={2}
    >
      <LvlMoneyBar level={level} exp={exp} coins={coins} />

      <HStack mt={4}>
        <Flex
          direction="column"
          justifyContent="flex-end"
          alignItems="flex-start"
          height="10px"
          gap={5}
        >
          <Nav className="me-auto">
            <Link to={"/"}>
              <Flex align="center" position="relative">
                <Box
                  borderRadius="50%"
                  bg={purpleColorButton}
                  p={2}
                  position="absolute"
                  zIndex="1"
                  boxShadow={"2px 2px 2px rgba(0, 0, 0, 0.2)"}
                >
                  <MdHome size={23} color={whiteColorText} />
                </Box>
              </Flex>
            </Link>
          </Nav>
        </Flex>
      </HStack>

      <VStack mt={8} pr={1} pl={1} gap={4} width={"100%"}>
        <Card width={"100%"} borderRadius="10px" p={3}>
          <CardBody>
            <Stack pb={4} spacing={0}>
              <Text fontSize="12px">DON'T KNOW WHAT TO COOK?</Text>
              <Text fontSize="12px">HERE'S AN IDEA FOR YOU</Text>
            </Stack>

            <DailyMealSuggestions
              bgColor={purpleColorButton}
              txtColor={whiteColorText}
            />
          </CardBody>
        </Card>

        <Card width={"100%"} borderRadius="10px" p={3}>
          <CardBody>
            <Stack pb={5} spacing={0}>
              <Text fontSize="12px">TAKE A LOOK AT THE TIPS</Text>
              <Text fontSize="12px">BEFORE YOU START COOKING</Text>
            </Stack>
            <Box display="flex" justifyContent="center">
              <Flex align="center" position="relative">
                <Link to={"/tips"}>
                  <Box
                    borderRadius="50%"
                    bg={whiteColorText}
                    p={2}
                    position="absolute"
                    left="-1px"
                    zIndex="1"
                    boxShadow={"2px 2px 2px rgba(0, 0, 0, 0.2)"}
                  >
                    <BiMessageDots color={orangeColorButton} size={23} />
                  </Box>
                  <CustomButton
                    fontSize="16px"
                    bgColor={orangeColorButton}
                    txtColor={whiteColorText}
                    ml={5}
                    w={"100px"}
                  >
                    TIPS
                  </CustomButton>
                </Link>
              </Flex>
            </Box>
          </CardBody>
        </Card>
      </VStack>

      <HStack className="HSTACK" pb={6} width={"100%"} justifyContent="center">
        <Flex
          pb={2}
          direction="column"
          justifyContent="flex-end"
          alignItems="flex-end"
          height="125px"
          gap={5}
        >
          <Nav className="me-auto">
            <Flex gap={2}>
              <Box>
                <Link to={"/uploadmeal"}>
                  <Flex align="center" position="relative">
                    <Box
                      borderRadius="50%"
                      bg={whiteColorText}
                      boxShadow={"2px 2px 2px rgba(0, 0, 0, 0.2)"}
                      p={2}
                      position="absolute"
                      left="-1px"
                      zIndex="1"
                      mr={10}
                    >
                      <FaCamera size={23} color={redColorButton} />
                    </Box>
                    <CustomButton
                      bgColor={redColorButton}
                      txtColor={whiteColorText}
                      ml={6}
                      pl={4}
                      w={"130px"}
                      fontSize={"13px"}
                      focusBorderColor="transparent"
                    >
                      UPLOAD MEAL
                    </CustomButton>
                  </Flex>
                </Link>
              </Box>
            </Flex>
          </Nav>
        </Flex>
      </HStack>
    </VStack>
  );
};

export default Feedme;
