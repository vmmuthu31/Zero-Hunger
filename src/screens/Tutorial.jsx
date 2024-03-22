import React from "react";
import { useContext, useEffect, useState } from "react";
import { Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Carrot from "../assets/GIFs/BaseCarrot+BG.gif";
import DailyMealSuggestions from "./DailyMealSuggestions";
import LvlMoneyBar from "../utils/LvlMoneyBar";
import CustomButton from "../utils/CustomButton";
import CustomSpinner from "../utils/CustomSpinner";

import {
  HStack,
  VStack,
  Box,
  Flex,
  Text,
  Heading,
  Image,
  Badge,
  Card,
} from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";
import { UserContext } from "../App";
import { TbTargetArrow } from "react-icons/tb";
import { FaArrowRight, FaArrowLeft, FaRegCheckCircle } from "react-icons/fa";
const purpleColorButton = "#AD5983";
const whiteColorText = "#EFEFEF";
const orangeLightColorBg = "#F5E1DA";
const blueColorSpace = "#2C3E50";
const turquoiseColorBar = "#157DA1";
const greenColorButton = "#98A62E";

const Tutorial = () => {
  const { intialTutorial, setInitialTutorial } = useContext(UserContext);

  const [pages, setPages] = useState(0);

  const textPages = [
    "Feed your carrot with your meals to receive personalized feedback on your diet's healthiness. Get valuable tips on how to enhance your nutrition.",
    "Complete objectives to enhance your eating habits and unlock special rewards along the way. Stay motivated and track your progress!",
    "Unlock special international meals to broaden your culinary horizons. Explore new tastes and cultures while nourishing your body.",
  ];
  const titlePages = [
    "Feed Your Carrot, Feed Your Health",
    "Achieve Goals, Reap Rewards",
    "Discover International Meals",
  ];

  return (
    <>
      <VStack
        className={"MAIN_VSTACK"}
        w={"390px"}
        h={"670px"}
        bg={orangeLightColorBg}
        bgSize="cover"
        bgPosition="center"
        padding={0}
        paddingLeft={2}
        paddingRight={2}
        margin={0}
        alignItems="flex-start"
        transition="background-image 0.5s ease-in-out" 
        _before={{
          content: '""',
          position: "absolute",
          inset: 0,
          bg: { blueColorSpace },
          transition:
            "background-image 0.5s ease-in-out, width 0.5s ease-in-out, height 0.5s ease-in-out",
        }}
      >
        <VStack
          justifyContent="space-between"
          h={"100%"}
          className="TOP_BUTTON"
        >
          <HStack gap={5} mt={4} w={"100%"} h={"100%"} alignItems="flex-start">
            <Flex
              justifyContent="space-between"
              direction={"column"}
              h={"100%"}
              position="relative"
              alignItems={"center"}
              gap={1}
            >
              <Box alignItems={"center"}>
                <Badge
                  pb={1}
                  px="5"
                  borderRadius={"50px"}
                  bg={purpleColorButton}
                >
                  <Text
                    mb={0}
                    pt="0"
                    mt={0}
                    fontSize="35px"
                    color={whiteColorText}
                    fontWeight={"bold"}
                  >
                    Zero-Hunger
                  </Text>
                </Badge>
                <Text
                  mt="1"
                  px={8}
                  fontWeight="bold"
                  color={purpleColorButton}
                  textAlign={"center"}
                >
                  Tutorial {pages + 1}/3
                </Text>
              </Box>

              <Flex w="85%">
                <Card alignItems={"center"} pb={4}>
                  <Image
                    mt={4}
                    w={"50%"}
                    src="src/assets/Skins/ClassicCarrot/PreviewTutorial.gif"
                  />
                  <Badge
                    borderRadius={"50px"}
                    px={3}
                    mt={6}
                    mb={3}
                    py={1}
                    bg={turquoiseColorBar}
                  >
                    <Text
                      mb={0}
                      color={whiteColorText}
                      fontWeight="bold"
                      fontSize="13px"
                      textAlign={"justify"}
                    >
                      {titlePages[pages]}
                    </Text>
                  </Badge>
                  <Text
                    mt={3}
                    mb={3}
                    color={"gray.600"}
                    px={8}
                    fontSize="15px"
                    textAlign={"justify"}
                  >
                    {textPages[pages]}
                  </Text>
                </Card>
              </Flex>

              <HStack style={{ marginTop: "20px", justifyContent: "center" }}>
                {pages > 0 ? (
                  <CustomButton
                    width="100px"
                    bgColor={purpleColorButton}
                    txtColor={whiteColorText}
                    fontSize="14px"
                    justifyContent="flex-center"
                    icon={<FaArrowLeft size={19} />}
                    onClick={() => {
                      setPages(pages - 1);
                    }}
                  >
                    Previous
                  </CustomButton>
                ) : (
                  <></>
                )}

                {pages < 2 ? (
                  <CustomButton
                    width="100px"
                    bgColor={turquoiseColorBar}
                    txtColor={whiteColorText}
                    fontSize="14px"
                    justifyContent="flex-center"
                    icon={<FaArrowRight size={19} />}
                    onClick={() => {
                      setPages(pages + 1);
                    }}
                  >
                    NEXT
                  </CustomButton>
                ) : (
                  <></>
                )}
              </HStack>
              <Box mb={8}>
                <CustomButton
                  style={{ marginTop: "30px" }}
                  bgColor={greenColorButton}
                  txtColor={whiteColorText}
                  fontSize="14px"
                  justifyContent="flex-start"
                  icon={<FaRegCheckCircle size={19} />}
                  onClick={() => setInitialTutorial(false)}
                >
                  READY TO START!
                </CustomButton>
              </Box>
            </Flex>
          </HStack>
        </VStack>
      </VStack>
    </>
  );
};

export default Tutorial;
