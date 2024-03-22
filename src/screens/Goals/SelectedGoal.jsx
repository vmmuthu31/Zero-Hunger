import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../API";

import {
  HStack,
  Button,
  VStack,
  Box,
  Flex,
  Text,
  Heading,
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogBody,
  AlertDialogFooter,
  Badge,
} from "@chakra-ui/react";
import { UserContext } from "../../App";

import { RiArrowGoBackLine } from "react-icons/ri";

import { GiConfirmed } from "react-icons/gi";
import { RiArrowGoBackFill } from "react-icons/ri";

import CustomButton from "../../utils/CustomButton";
import LvlMoneyBar from "../../utils/LvlMoneyBar";

const purpleColorButton = "#AD5983";
const whiteColorText = "#EFEFEF";
const yellowColorBadge = "#E0993D";
const orangeColorBg = "#FDD2A8";
const orangeLightColorBg = "#F5E1DA";
const turquoiseColorBar = "#157DA1";
const greenColorButton = "#98A62E";
const greenDarkColorHeader = "#81872D";


function ConfirmGoalButton({ goalID, title }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  const handleClick = (goalID) => {
    const x = {
      goal: {
        id: goalID
      }
    };
    API.selectGoal(x).then((data) => {
      console.log(data);
    });
  };

  return (
    <>
      <CustomButton bgColor={turquoiseColorBar} color={whiteColorText} fontSize="15px" onClick={onOpen}>ACTIVATE</CustomButton>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent w={"300px"} p={3}>
            <AlertDialogBody>
              <VStack justifyContent="center" alignItems="center" gap={1}>

                <Text mb={1} fontSize="15px" color={"gray.600"} fontWeight={"bold"} >GOAL {goalID}:  </Text> {/* Titolo del goal */}
                <Text mt={1} fontSize="20px" fontWeight={"bold"}> {title} </Text>

                <Text fontSize={"15px"}>
                  Do you want to activate this goal?
                </Text>
              </VStack>
            </AlertDialogBody>

            <AlertDialogFooter justifyContent="center">
              <Box>

                <Box alignItems={"center"}>
                  <HStack>

                    <Flex direction={"column"} gap={3} onClick={onClose} style={{ cursor: "pointer" }}>
                      <CustomButton
                        bgColor={purpleColorButton}
                        txtColor={whiteColorText}
                        justifyContent="flex-start"
                        icon={<AiOutlineClose size={21} style={{ transform: "scaleX(-1)" }} />}
                        w={"120px"}
                        ml={"0px"}
                      >
                        CLOSE
                      </CustomButton>
                    </Flex>

                    <Link to={"/selected-goals-panel"}>
                      <Flex direction={"column"} gap={3} style={{ cursor: "pointer" }}>
                        <CustomButton
                          onClick={() => handleClick(goalID)}
                          bgColor={turquoiseColorBar}
                          txtColor={whiteColorText}
                          justifyContent="flex-start"
                          icon={<GiConfirmed size={21} />}
                          w={"120px"}
                          ml={"0px"}
                        >
                          ACTIVATE
                        </CustomButton>
                      </Flex>
                    </Link>

                  </HStack>
                </Box>
              </Box>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

import { useParams } from "react-router-dom";
import { Card, CardBody, Nav } from "react-bootstrap";
import { MdHome } from "react-icons/md";
import { TfiBackRight } from "react-icons/tfi";
import { AiOutlineClose } from "react-icons/ai";
import { PiCoinsFill } from "react-icons/pi";

const SelectedGoal = () => {
  const { coins, setCoins } = React.useContext(UserContext);
  const { exp, setExp } = React.useContext(UserContext);
  const { level, setLevel } = React.useContext(UserContext);

  const { goalID } = useParams();

  const [goal, setGoal] = useState({});



  useEffect(() => {
    if (goalID) {
      console.log(goalID);
      API.getGoalById(goalID).then((data) => {
        setGoal(data);
      });
    }
  }
    , []);





  return (
    <VStack
      w={"390px"}
      h={"670px"}
      padding={0}
      paddingLeft={2}
      paddingRight={2}
      bg={orangeLightColorBg}
      bgSize="cover"
      margin={0}
      alignItems="flex-start"
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

        <Flex width={"80%"} >
          <Card mb={15} width={"50px"} mx="auto" pl={0}>
            <CardBody borderRadius="100px" p={0} >
              <Text mb={1} fontSize="md" color={"gray.600"} fontWeight={"bold"} >GOAL {goalID}:  </Text> {/* Titolo del goal */}
              <Text fontSize="25px" fontWeight={"bold"}> {goal.title} </Text>
              <Text textAlign={"justify"} mt={6} mb={5}>
                {goal.description}
              </Text>{" "}
              <Text fontSize={"sm"} color={"gray.600"} textAlign={"justify"}>You have <strong>{goal.trials}</strong> trials to complete this Goal, you will earn +{goal.coins} coins and +{goal.exp} exp.</Text>

              <HStack mb={2} mt={8}>
                <Badge bg={purpleColorButton} color={whiteColorText} ml={-3.5} mr={2} pl={2} pr={2} borderRadius={"10px"}>
                  {goal.trials} TRIALS
                </Badge>
                <Badge bg={turquoiseColorBar} ml={2} mr={2} pl={2} pr={2} color={whiteColorText} borderRadius={"10px"}>
                  + {goal.exp} xp
                </Badge>
                <Badge bg={yellowColorBadge} ml={2} pl={2} pr={2} color={whiteColorText} borderRadius={"10px"} fontWeight={"bold"}>
                  <Box display="flex" alignItems="center" gap={1}>
                    + {goal.coins} <PiCoinsFill />
                  </Box>
                </Badge>
              </HStack>

            </CardBody>
          </Card>
        </Flex>


        <HStack mt={10} mb={10} gap={12} justifyContent="center">

          <Flex direction={"column"} gap={3}>
            <ConfirmGoalButton goalID={goalID} title={goal.title} />
          </Flex>
        </HStack>
      </VStack>
    </VStack>
  );
};

export default SelectedGoal;
