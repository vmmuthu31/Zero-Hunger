import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { VStack, Box, Flex, Badge, Text, Image, Card, HStack, Spinner } from "@chakra-ui/react";
import { UserContext } from "../../App";
import Globe from "../../assets/GIFs/globe-26.gif";

import { TbTargetArrow } from "react-icons/tb";
import { useParams } from "react-router-dom";
import LvlMoneyBar from "../../utils/LvlMoneyBar";
import CustomButton from "../../utils/CustomButton";

import API from "../../API";
import { CardBody, Nav } from "react-bootstrap";
import { MdHome } from "react-icons/md";
import { TfiBackRight } from "react-icons/tfi";
import { PiCoinsFill } from "react-icons/pi";

const purpleColorButton = "#AD5983";
const whiteColorText = "#EFEFEF";
const yellowColorBadge = "#E0993D";
const orangeColorBg = "#FDD2A8";
const orangeLightColorBg = "#F5E1DA";
const turquoiseColorBar = "#157DA1";
const greenColorButton = "#98A62E";
const greenDarkColorHeader = "#81872D";


const CheckGoalResult = () => {
  const { coins, setCoins } = React.useContext(UserContext);
  const { exp, setExp } = React.useContext(UserContext);
  const { level, setLevel } = React.useContext(UserContext);

  const [isLoading, setIsLoading] = useState(false)

  const { goalID } = useParams();

  const [isSuccessfullyCompleted, setIsSuccessfullyCompleted] = React.useState();
  const [goal, setGoal] = useState({});


  useEffect(() => {
    const x = {
      goal: {
        id: goalID
      }
    }


    setIsLoading(true)
    API.checkResults(x).then((res) => {
      setIsLoading(false)
      setIsSuccessfullyCompleted(res.successfullyCompleted);

      if(res.successfullyCompleted){
        API.getUser().then((res) => {
          setCoins(res.coins);
          setExp(res.exp);
          setLevel(res.level);
        });
      }
    }).then(API.getGoalById(goalID).then((data) => {
      setGoal(data);

  }));
   
  }, []);


  return (
    <VStack
      w={"390px"}
      h={"670px"}
      padding={0}
      paddingLeft={2}
      paddingRight={2}
      margin={0}
      alignItems="flex-start"
      bg={orangeLightColorBg}
    >
      <LvlMoneyBar level={level} exp={exp} coins={coins} />

      <VStack
        className="VSTACK"
        w="100%"
        h="100%"
        justifyContent="space-between"
      >
        <HStack
          mt={4}
          mb={2}
          w="100%"
          justifyContent="space-between"
          alignItems="center"
        >
          <Flex
            direction="column"
            justifyContent="flex-end"
            alignItems="flex-start"
            height="10px"
            gap={8}
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

          <Flex direction={"column"} gap={3}>
            <Link to={"/goals"}>
              <Box
                borderRadius="50%"
                bg={purpleColorButton}
                p={2}
                boxShadow={"2px 2px 2px rgba(0, 0, 0, 0.2)"}
              >
                <TfiBackRight
                  size={20}
                  color={whiteColorText}
                  style={{ transform: "scaleX(-1)" }}
                  strokeWidth={1}
                />{" "}
              </Box>
            </Link>
          </Flex>
        </HStack>

        {/* Card */}

        {
          isLoading ? <Spinner /> :
            isSuccessfullyCompleted == true ? (
              <Flex width={"80%"}>
                <Card pb={4}>
                  <CardBody>
                    <VStack spacing={1}>
                      <Text mt={4} mb={1} fontSize="md" color={"gray.600"} fontWeight={"bold"} >GOAL {goalID}:  </Text> {/* Titolo del goal */}
                      <Text fontSize="25px" fontWeight={"bold"}> {goal.title} </Text>
                      <Image
                        src={"/src/assets/Skins/" + "ClassicCarrot" + "/Happy.png"}
                        alt={"'s Skin"}
                        w={"50%"}
                        borderRadius="lg"
                      />

                      <Text pr={3} pl={3} fontWeight={"bold"} color={"gray.600"} mb={1} mt={7} textAlign={"center"}>
                        Goal successfully completed!
                      </Text>
                      <Text pr={3} pl={3} color={"gray.600"} mt={1} textAlign={"justify"}>
                        Keep it up and choose one other goal!
                      </Text>

                      <HStack mb={2} mt={4}>
                        <Badge bg={turquoiseColorBar} ml={2} mr={2} pl={2} pr={2} color={whiteColorText} borderRadius={"10px"}>
                          + {goal.exp} xp
                        </Badge>
                        <Badge bg={yellowColorBadge} ml={2} pl={2} pr={2} color={whiteColorText} borderRadius={"10px"} fontWeight={"bold"}>
                          <Box display="flex" alignItems="center" gap={1}>
                            + {goal.coins} <PiCoinsFill />
                          </Box>
                        </Badge>
                      </HStack>


                    </VStack>
                  </CardBody>
                </Card>
              </Flex>
            ) : (
              <Flex width={"80%"}>
                <Card pb={4}>
                  <CardBody>
                    <VStack spacing={1}>
                      <Text mt={4} mb={1} fontSize="md" color={"gray.600"} fontWeight={"bold"} >GOAL {goalID}:  </Text> {/* Titolo del goal */}
                      <Text fontSize="25px" fontWeight={"bold"}> {goal.title} </Text>
                      <Image
                        src={"/src/assets/Skins/" + "ClassicCarrot" + "/Sad.png"}
                        alt={"'s Skin"}
                        w={"50%"}
                        borderRadius="lg"
                      />

                      <Text color={"gray.600"} mb={1} mt={7} textAlign={"justify"}>
                        Ops, It seems you failed the goal!
                      </Text>
                      <Text fontWeight={"bold"} color={"gray.600"} mt={1} textAlign={"justify"}>
                        Don't give up and try again!
                      </Text>


                    </VStack>
                  </CardBody>
                </Card>
              </Flex>
            )}

        <Link to={"/selected-goals-panel"}>
          <HStack mb={10} justifyContent="center">

            <Flex direction={"column"} gap={3}>
              <CustomButton bgColor={turquoiseColorBar} txtColor={whiteColorText} mt={4} icon={<TbTargetArrow size={19} />}>
                GOT IT
              </CustomButton>          </Flex>
          </HStack>
        </Link>
      </VStack>
    </VStack>
  );
};

export default CheckGoalResult;
