import React from "react";
import { Link } from "react-router-dom";
import {
  HStack,
  VStack,
  Box,
  Flex,
  Progress,
  Badge,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
  ModalFooter,
  Button,
  Card,
  CardBody,
  Image,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { UserContext } from "../../App";
import Globe from "../../assets/GIFs/globe-26.gif";
import { PiCoinsFill } from "react-icons/pi";
import { TbTargetArrow } from "react-icons/tb";
import CustomButton from "../../utils/CustomButton";
import { useParams } from "react-router-dom";
import API from "../../API";
import LvlMoneyBar from "../../utils/LvlMoneyBar";
import { Nav, Spinner } from "react-bootstrap";
import { MdHome } from "react-icons/md";
import { TfiBackRight } from "react-icons/tfi";

const purpleColorButton = "#AD5983";
const whiteColorText = "#EFEFEF";
const yellowColorBadge = "#E0993D";
const orangeColorButton = "#F27127";
const redColorButton = "#D14C5F";
const orangeLightColorBg = "#F5E1DA";
const turquoiseColorBar = "#157DA1";
const greenColorButton = "#98A62E";

const FeedMeFeedback = () => {
  const { coins, setCoins } = React.useContext(UserContext);
  const { exp, setExp } = React.useContext(UserContext);
  const { level, setLevel } = React.useContext(UserContext);
  const { user, setUser } = React.useContext(UserContext);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { meal } = useParams();

  const [isGood, setIsGood] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [tip, setTip] = useState("");

  const [isLoading, setIsLoading] = useState(true)


  const x = {
    food: {
      name: meal
    }
  }


  const closeModal = () => {
    setGoalCompleted(false);
    setInternationalCompleted(false);
  }

  const [goalCompleted, setGoalCompleted] = useState(false);
  const [internationalCompleted, setInternationalCompleted] = useState(false);

  const [dirty, setDirty] = useState(false);


  useEffect(() => {
    if (x) {
      console.log(x)
      API.feedMe(x)
        .then((res) => {
          setIsGood(res.is_good);
          setFeedback(res.feedback);
          setTip(res.tip);
          setDirty(true);
        })
        .catch((err) => {
          console.log(err);
        });

      //API goal  --> setGoalCompleted
      API.feedMeGoals(x)
        .then((res) => {
          console.log(res);
          setGoalCompleted(res);
        })
        .catch((err) => {
          console.log(err);
        });

      //API international  --> setInternationalCompleted
      API.feedMeInternational(x)
        .then((res) => {
          console.log(res);
          setInternationalCompleted(res);
        })
        .catch((err) => {
          console.log(err);
        });

    }
  }, [onOpen]);

  useEffect(() => {
    API.getUser().then((data) => {
      setCoins(data.coins);
      setExp(data.exp);
      setLevel(data.level);
    });

    setDirty(false);

  }, [dirty]);

  useEffect(() => {
    setIsLoading(true)
    API.getUser().then((data) => {
      setUser(data)
      setIsLoading(false)
    });


  }, []);

  return (
    <VStack
      w={"390px"}
      h={"670px"}
      bg={orangeLightColorBg}
      padding={0}
      paddingLeft={2}
      paddingRight={2}
      margin={0}>

      <LvlMoneyBar level={level} exp={exp} coins={coins} />

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
          alignItems="center"
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


      </HStack>
      <Flex mt={3} direction={"column"} gap={3} width={"100%"} alignItems={"center"}
      maxH={"570px"}
      overflowY={"auto"}
      >


        {isLoading ? <Spinner /> :
          isGood ? (
            <>
              <Flex width="80%">
                <Card p={2}>
                  <CardBody p={2}>
                    <VStack gap={0} spacing={0}>

                      <Image
                        src={"/src/assets/Skins/" + user.item + "/Happy.png"}
                        alt={"'s Skin"}
                        w={"40%"}
                        borderRadius="lg"
                        mt={-2}
                      />
                      <Text fontWeight={"bold"} textAlign={"center"} px={4} mt={4} mb={2}>Zero-Hunger! <br /> Your meal was deliciuos! </Text>
                      <Text mt={2} px={2} textAlign={"justify"}>{feedback}</Text>
                      <Flex gap={0}>
                        <HStack mb={2} mt={0}>
                          <Badge bg={turquoiseColorBar} ml={2} mr={2} pl={2} pr={2} color={whiteColorText} borderRadius={"10px"}>
                            + 5 xp
                          </Badge>
                          <Badge bg={yellowColorBadge} ml={2} pl={2} pr={2} color={whiteColorText} borderRadius={"10px"} fontWeight={"bold"}>
                            <Box display="flex" alignItems="center" gap={1}>
                              + 30 <PiCoinsFill />
                            </Box>
                          </Badge>
                        </HStack>
                      </Flex>
                    </VStack>
                  </CardBody>
                </Card>
              </Flex>
            </>
          ) : (

            <>
              <Flex width="80%" >
                <Card p={2}>
                  <CardBody p={2}>
                    <VStack gap={0} spacing={0}>

                      <Image
                        src={isLoading ? "/src/assets/Skins/" + user.item + "/Sad.png" : ""}
                        alt={"'s Skin"}
                        w={"40%"}
                        borderRadius="lg"
                        mt={-2}
                      />
                      <Text textAlign={"justify"} px={4} mt={7} mb={2}>Ouch, your meal was not so good, try to improve!</Text>
                      <Text textAlign={"justify"} mt={2}>{feedback}</Text>
                      <Flex gap={0}>
                        <HStack mb={2} mt={0}>
                          <Badge bg={turquoiseColorBar} ml={2} mr={2} pl={2} pr={2} color={whiteColorText} borderRadius={"10px"}>
                            + 1 xp
                          </Badge>
                          <Badge bg={yellowColorBadge} ml={2} pl={2} pr={2} color={whiteColorText} borderRadius={"10px"} fontWeight={"bold"}>
                            <Box display="flex" alignItems="center" gap={1}>
                              + 2 <PiCoinsFill />
                            </Box>
                          </Badge>
                        </HStack>
                      </Flex>
                    </VStack>
                  </CardBody>
                </Card>
              </Flex>
            </>

          )}


        {isLoading ? "" :
          <Flex width="80%" >
            <Card p={2}>
              <CardBody p={2}>
                <VStack gap={0} spacing={0}>

                  {tip.title ?
                    <>
                      <Badge bg={greenColorButton} mt={4} ml={2} mr={2} pl={2} pr={2} color={whiteColorText} borderRadius={"10px"}>
                        NEW TIP
                      </Badge>
                      <Text color={"gray.600"} fontWeight={"bold"} textAlign={"center"} px={4} mt={4} mb={2}>{tip.title}! </Text>
                      <Text px={5} textAlign={"justify"} mt={4}>
                        {" "}
                        {tip.description}
                      </Text>
                    </>
                    : <>
                      <Text color={"gray.600"} fontWeight={"bold"} textAlign={"center"} px={4} mt={4} mb={2}> Uoah! <br /> You unlocked all the tips! </Text>
                      <Text px={5} textAlign={"justify"} mt={3}>
                        {" "}
                        {tip.description}
                      </Text>
                    </>
                  }


                </VStack>
              </CardBody>
            </Card>
          </Flex>}


        {isLoading ? "" :
          <Link to={"/home"}>
            <CustomButton mt={4} mb={4} color={whiteColorText} bgColor={turquoiseColorBar}>
              GOT IT
            </CustomButton>
          </Link>}

      </Flex>
      { }

      {goalCompleted ?

        <>
          <Modal isOpen={goalCompleted} onClose={onClose}>
            <ModalOverlay />
            <ModalContent maxW="350px">
              <ModalHeader>Congratulations!</ModalHeader>

              <ModalBody>
                You have completed a goal, rewards are waiting for you!
              </ModalBody>

              <ModalFooter justifyContent="center">
                <CustomButton
                  onClick={closeModal} mr={3}
                  w={"170px"}
                  txtColor={whiteColorText}
                  bgColor={purpleColorButton}
                  width="110px"
                  fontSize="13px"
                  textAlign="center">
                  MAYBE LATER
                </CustomButton>
                <Link to={"/selected-goals-panel"}>
                  <CustomButton
                    w={"180px"}
                    txtColor={whiteColorText}
                    bgColor={turquoiseColorBar}
                    width="110px"
                    fontSize="13px"
                    textAlign="center">
                    RETIRE NOW
                  </CustomButton>
                </Link>
              </ModalFooter>

            </ModalContent>
          </Modal>
        </> : <></>}


      {internationalCompleted ?
        <>
          <Modal isOpen={internationalCompleted} onClose={onClose}>
            <ModalOverlay />
            <ModalContent maxW="350px">
              <ModalHeader>Congratulations!</ModalHeader>

              <ModalBody>
                <Text>You have done an international meal!</Text>
                <Flex width={"100%"} justifyContent={"center"}>                
                <Image
                  src={"/src/assets/Skins/MexicanCarrot/PreviewInternational.gif"}
                  w={"40%"}
                />
                </Flex>
                <Text>You have unlocked this special item, do you want to change your skin?</Text>
              </ModalBody>

              <ModalFooter justifyContent="center">
                <CustomButton
                  onClick={closeModal} mr={3}
                  w={"170px"}
                  txtColor={whiteColorText}
                  bgColor={purpleColorButton}
                  width="100px"
                  fontSize="14px"
                  textAlign="center">
                  Maybe Later
                </CustomButton>
                <Link to={"/personalize-tamagotchi"}>
                  <CustomButton
                    w={"170px"}
                    txtColor={whiteColorText}
                    bgColor={turquoiseColorBar}
                    width="100px"
                    fontSize="14px"
                    textAlign="center">
                    Change Now
                  </CustomButton>
                </Link>
              </ModalFooter>

            </ModalContent>
          </Modal>
        </> : <></>}

    </VStack>
  );
};

export default FeedMeFeedback;
