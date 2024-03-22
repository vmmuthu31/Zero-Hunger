import React from "react";
import { useContext, useEffect, useState } from "react";
import { Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Carrot from "../assets/GIFs/BaseCarrot+BG.gif";
import DailyMealSuggestions from "./DailyMealSuggestions";
import LvlMoneyBar from "../utils/LvlMoneyBar";
import CustomButton from "../utils/CustomButton";
import CustomSpinner from "../utils/CustomSpinner";
import Tutorial from "./Tutorial";

import { HStack, VStack, Box, Flex, Text } from "@chakra-ui/react";
import { Spinner } from '@chakra-ui/react'
import { UserContext } from "../App";
import { TbTargetArrow } from "react-icons/tb";
import { AiTwotoneShop } from "react-icons/ai";

import { FaQuestion } from "react-icons/fa";

import { LuDices } from "react-icons/lu";
import { PiForkKnifeBold } from "react-icons/pi";
import { BiMessageDots } from "react-icons/bi";
import { IoIosUnlock } from "react-icons/io";

import API from "../API";
import { color } from "framer-motion";

const purpleColorButton = "#AD5983";
const whiteColorText = "#EFEFEF";
const orangeColorButton = "#F27127";
const redColorButton = "#D14C5F";
const orangeLightColorBg = "#F5E1DA";

const TutorialButton = ({ setInitialTutorial }) => {
  return (
    <Box
      borderRadius="50%"
      bg={orangeColorButton}
      p={2}
      boxShadow={"2px 2px 2px rgba(0, 0, 0, 0.2)"}
      cursor={"pointer"}
      onClick={() => setInitialTutorial(true)}
    >
      <FaQuestion color={whiteColorText} size={10} />
    </Box>

  )
}

const Home = () => {
  const { coins, setCoins } = useContext(UserContext);
  const { exp, setExp } = useContext(UserContext);
  const { level, setLevel } = useContext(UserContext);
  const { user, setUser } = useContext(UserContext);
  const { activeItem, setActiveItem } = useContext(UserContext);

  const { initialTutorial, setInitialTutorial } = useContext(UserContext);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true)
    API.getUser().then(res => {
      setUser(res)
      setCoins(res.coins)
      setExp(res.exp)
      setLevel(res.level)
      setActiveItem(res.item)
      setIsLoading(false)
    })
  }, [])

  return (<>

    {initialTutorial ?
      <>
        <Tutorial />
      </>

      :
      <>
        <VStack
          className={"MAIN_VSTACK"}
          justifyContent="space-between"
          w={"390px"}
          h={"670px"}
          bg={orangeLightColorBg}
          bgImage={isLoading ? "" : "src/assets/Skins/" + user.item + "/Home.gif"}
          bgSize="cover"
          bgPosition="center"
          padding={0}
          paddingLeft={2}
          paddingRight={2}


          transition="background-image 0.5s ease-in-out" // Tempo di transizione per lo sfondo
          _before={{
            content: '""',
            position: "absolute",
            inset: 0,
            bg: { orangeLightColorBg }, // Sfondo per lo spinner
            visibility: isLoading ? "visible" : "hidden", // Mostra lo spinner solo quando isLoading è true
            transition: "background-image 0.5s ease-in-out, width 0.5s ease-in-out, height 0.5s ease-in-out", // Tempo di transizione per lo spinner
          }}
        >
          <VStack className="TOP_BUTTON" mx={.5}>
            <HStack w="100%">
              <LvlMoneyBar level={level} exp={exp} coins={coins} gap={2} otherComp={<TutorialButton setInitialTutorial={setInitialTutorial} />} />


            </HStack>




            <HStack gap={5} mt={4}>
              <Flex direction={"column"} gap={3}>
                <Link to={"/goals"}>
                  <CustomButton
                    bgColor={purpleColorButton}
                    txtColor={whiteColorText}
                    justifyContent="flex-start"
                    icon={<TbTargetArrow size={19} />}
                  >
                    CHOOSE A GOAL
                  </CustomButton>
                </Link>

                <DailyMealSuggestions
                  bgColor={purpleColorButton}
                  txtColor={whiteColorText}
                />
              </Flex>

              <Flex direction="column" gap={3}>
                <Link to={"/shop"}>
                  <CustomButton
                    bgColor={purpleColorButton}
                    txtColor={whiteColorText}
                    justifyContent="flex-start"
                    icon={<AiTwotoneShop size={19} />}
                    w={"100px"}
                    ml={"70px"}
                    textAlign="left"
                  >
                    SHOP
                  </CustomButton>
                </Link>

                <Box position="relative">
                  {level < 30 && (
                    <Flex
                      direction="column"
                      position="absolute"
                      top="-10px"
                      left="8%"
                      transform="translateX(-50%)"
                      alignItems="center"
                      zIndex="1"
                    >
                      <IoIosUnlock style={{ transform: "rotate(-20deg)" }} color={purpleColorButton} />
                    </Flex>
                  )}
                  {level < 30 && (
                    <Flex
                      direction="column"
                      position="absolute"
                      top="-9px"
                      left="40%"
                      transform="translateX(-50%)"
                      alignItems="center"
                      zIndex="1"
                    >
                      <Text fontSize="9px" color={purpleColorButton} fontWeight={"bold"}>
                        Unlock at level 30
                      </Text>
                    </Flex>
                  )}
                  <Link to={"/hit-the-globe"}>
                    <CustomButton
                      bgColor={purpleColorButton}
                      txtColor={whiteColorText}
                      justifyContent="flex-start"
                      icon={<LuDices size={19} />}
                      fontSize={"11px"}
                      isDisabled={level < 30}
                    >
                      TRY SOMETHING NEW
                    </CustomButton>
                  </Link>
                </Box>
              </Flex>


            </HStack>


          </VStack>

          {isLoading && <Spinner />}

          <Link style={{ width: "50%", height: "45%" }} to={"/personalize-tamagotchi"}>
            <Button className="btn" style={{ width: "90%", height: "45%", marginTop: "20px", backgroundColor: "transparent", borderColor: "transparent" }} ></Button>
          </Link>


          <HStack className="BOTTOM_BUTTON" marginBottom={5} alignItems="flex-end">
            <Nav className="me-auto">
              <Flex gap={8}>
                <Box>
                  <Link to={"/tips"}>
                    <Flex align="center" position="relative">
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
                    </Flex>
                  </Link>
                </Box>
                <Box>
                  <Link to={"/feedme"}>
                    <Flex align="center" position="relative">
                      <Box
                        borderRadius="50%"
                        bg={whiteColorText}
                        p={2}
                        position="absolute"
                        left="-1px"
                        zIndex="1"
                        mr={10}
                        boxShadow={"2px 2px 2px rgba(0, 0, 0, 0.2)"}
                      >
                        <PiForkKnifeBold color={redColorButton} size={23} />
                      </Box>
                      <CustomButton
                        fontSize="16px"
                        bgColor={redColorButton}
                        txtColor={whiteColorText}
                        ml={5}
                        w={"150px"}
                      >
                        FEED ME
                      </CustomButton>
                    </Flex>
                  </Link>
                </Box>
              </Flex>
            </Nav>
          </HStack>
        </VStack>
      </>}

  </>);
};

export default Home;
