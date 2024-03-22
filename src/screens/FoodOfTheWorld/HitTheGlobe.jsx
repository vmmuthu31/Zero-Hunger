import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";
import {
  VStack,
  HStack,
  Button,
  Box,
  Flex,
  Progress,
  Text,
  Heading,
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Modal,
  ModalContent,
  ModalCloseButton,
  ModalFooter,
  Card,
  CardBody,
  Badge,
  ModalOverlay,
  ModalBody,
  ModalHeader,
} from "@chakra-ui/react";
import { UserContext } from "../../App";
import { MdHome } from "react-icons/md";
import { TfiBackRight } from "react-icons/tfi";
import { PiCoinsFill } from "react-icons/pi";
import { GiConfirmed } from "react-icons/gi";
import { RiArrowGoBackFill } from "react-icons/ri";
import LvlMoneyBar from "../../utils/LvlMoneyBar";
import CustomButton from "../../utils/CustomButton";

const purpleColorButton = "#AD5983";
const whiteColorText = "#EFEFEF";
const orangeColorBg = "#FDD2A8";
const orangeLightColorBg = "#F5E1DA";
const turquoiseColorExp = "#0CA8C6";
const turquoiseColorBar = "#157DA1";
const yellowColorCoin = "#FFC44E";
const yellowColorBadge = "#E0993D";
const greenColorButton = "#98A62E";

import { useEffect } from "react";
import API from "../../API";
import { FaEarthAmericas } from "react-icons/fa6";
import { AiOutlineClose } from "react-icons/ai";



function ConfirmGlobeLaunch({ dishesFinished, setDishesFinished, setIsOpenResult, setHitRegion, internationalDish, setInternationalDish, coins, setCoins, setActiveAnimation }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [resultOpen, setResultOpen] = useState(false);
  const cancelRef = React.useRef();


  const [dirty, setDirty] = useState(true);



  useEffect(() => {

    // aggiorna lo stato di user con i coins spesi
    API.getUser().then(res => {

      setCoins(res.coins)

    })

    API.getInternationalDishes().then((data) => {
      setDishesFinished(data.filter((dish) => dish.locked == 0).length === 3)
    });

    setDirty(false);
  }, [dirty]);


  const handleGlobeAnimation = (setActiveAnimation) => {
    // start globe animation and when it finishes set hitRegion to true
    setActiveAnimation(true)
    setHitRegion(true);
    setTimeout(() => {
      //setHitRegion(true); //Va settato subito true, altrimenti l'utente può cliccare mentre c'è l'animazione
      setResultOpen(true)
      setActiveAnimation(false)
      setIsOpenResult(true)

    }, 10000);
  };

  const hitTheGlobe = () => {

    //spin sarebbe unlockRegionalDish
    API.spin()
      .then((data) => {

        setInternationalDish(data);
        setDirty(true);
      })
      .catch((error) => {
        console.log("Error:", error);
      });


  }

  return (
    <>
      {/*<Button
        onClick={onOpen}
        pt={4}
        backgroundColor="transparent"
        variant="unstyled"
        isDisabled={coins < 300 || dishesFinished}
        _hover={{}}
        _focus={{ boxShadow: "none" }}
      >
        <CardComponent>
          <Heading size="sm">Hit the globe</Heading>
          {dishesFinished ?

            (<>

              <>
                <Text fontSize="sm">
                  You have already unlocked all the special dishes!
                </Text>

              </>
            </>)

            : (<>

              {coins >= 300 ? (
                <>
                  <Text fontSize="sm">
                    Click here to unlock a new regional cuisine
                  </Text>
                  <Flex
                    fontSize="sm"
                    alignItems="center"
                    justifyContent="center"
                    gap={2}
                    fontWeight={"bold"}
                    mb={0}
                  >
                    300 <PiCoinsFill color={yellowColorCoin} />
                  </Flex>{" "}
                </>
              ) : (
                <Text mt={5}>You need 300 coins to try the launch</Text>
              )}

            </>)}



        </CardComponent>
              </Button>*/}

      <VStack mb="5" h={"100%"} justifyContent="end">


        <VStack spacing="2">
          <Box>
            <Flex gap={2} alignItems="center" direction="column" width={"100%"} justifyContent={"center"}>
              <Badge px="3" borderRadius={"10px"} bg={turquoiseColorBar}>
                <Text mb={0} pt="0" mt={0} fontSize="lg" color={whiteColorText} fontWeight={"bold"}>
                  International Food
                </Text>
              </Badge>

              {dishesFinished ?
                <>
                  <Text mb={0} pt="0" mt={0} fontSize="sm" color={whiteColorText}>
                    You have already unlocked all the special dishes! <br />New ones will be added by developers in future.
                  </Text>
                </> :
                <>
                  <Text px={5} mb={0} pt="0" mt={0} fontSize="sm" color={whiteColorText}>
                    Pay 300 coins to unlock a new international dish by pressing the button below.
                  </Text>
                </>}

            </Flex>
          </Box>
        </VStack>

        <Flex mt="10" mb="2" align="center" position="relative" direction="column">

          {coins < 300 ?
            <HStack mb={5}>
              <Nav>
                {dishesFinished ? <></>

                  :
                  <CustomButton isDisabled={true} fontSize="14px" textAlign="center" w="150px" bgColor={purpleColorButton}>
                    <Text mb={1} color={whiteColorText}>You need </Text>
                    <Badge mb={0} bg={yellowColorBadge} ml={1} pl={2} pr={2} color={whiteColorText} borderRadius={"10px"} fontWeight={"bold"}>
                      <Box display="flex" alignItems="center" gap={1}>
                        {300 - coins} <PiCoinsFill color={whiteColorText} />
                      </Box>
                    </Badge>
                  </CustomButton>


                }

              </Nav>

            </HStack>

            :
            <>

              {dishesFinished ?
                <></>
                : <>
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
                    <FaEarthAmericas color={turquoiseColorBar} size={23} />
                  </Box>
                  <CustomButton
                    mb={5}
                    onClick={onOpen}
                    fontSize="13px"
                    bgColor={turquoiseColorBar}
                    txtColor={whiteColorText}
                    ml={5}
                    w={"140px"}
                    isDisabled={coins < 300 || dishesFinished}
                  >
                    <Text pl={3} pb={.3} m={0}> HIT THE GLOBE</Text>
                  </CustomButton>
                </>
              }

            </>}
        </Flex>
      </VStack >

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        mt={100}
      >
        <AlertDialogOverlay alignItems="center" justifyContent="center" >
          <AlertDialogContent w={"300px"} p={3}>
            <AlertDialogBody>
              <VStack justifyContent="center" alignItems="center" gap={1}>

                <Text mb={1} mt={2} fontSize="25px" color={"gray.600"} fontWeight={"bold"}>
                  Hit the globe
                </Text>

                <Text mt={1} fontSize="20px" fontWeight={"bold"}>  </Text>

                <Text fontSize={"15px"}>
                  Do you really want to discover a new international meal?
                </Text>

                <Text fontSize="15px" mb={1} color={"gray.600"}>
                  This action has the following cost:
                </Text>

                <Badge mb={0} bg={purpleColorButton} pl={3} pr={2} color={whiteColorText} borderRadius={"10px"} fontWeight={"bold"}>
                  <Box display="flex" alignItems="center" gap={1}>
                    - 300 <PiCoinsFill />
                  </Box>
                </Badge>

              </VStack>
            </AlertDialogBody>

            <AlertDialogFooter justifyContent="center">
              <Box>
                <Flex gap={3} justifyContent="center" alignItems="center">
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

                  <Flex direction={"column"} gap={2} onClick={() => {
                    handleGlobeAnimation(setActiveAnimation);
                    onClose();
                    //hitTheGlobe(dishesFinished);
                    hitTheGlobe(internationalDish);
                  }} style={{ cursor: "pointer" }}>
                    <CustomButton
                      bgColor={turquoiseColorBar}
                      txtColor={whiteColorText}
                      justifyContent="flex-start"
                      icon={<GiConfirmed size={21} />}
                      w={"140px"}
                      ml={"0px"}
                    >
                      HIT THE GLOBE
                    </CustomButton>
                  </Flex>

                </Flex>
              </Box>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

const CardComponent = ({ children }) => (
  <Card
    align="center"
    h={"120px"}
    w={"340px"}
    borderRadius={"10px"}
    boxShadow={"2px 2px 2px rgba(0, 0, 0, 0.2)"}
    bg={turquoiseColorBar}
    color={whiteColorText}
  >
    <CardBody pt={4} pb={0}>
      {children}
    </CardBody>
  </Card>
);

const HitTheGlobe = () => {
  const { coins, setCoins, exp, level } = useContext(UserContext);
  const [hitRegion, setHitRegion] = useState(false);

  const [internationalDish, setInternationalDish] = useState({});

  const [activeAnimation, setActiveAnimation] = useState(false);

  const [isOpenResult, setIsOpenResult] = useState(false);

  const [dishesFinished, setDishesFinished] = useState(false);

  return (
    <VStack
      w={"390px"}
      h={"670px"}
      bgImage={activeAnimation ? "src/assets/Globe/GlobeHitAnimation.gif" : "src/assets/Globe/GlobeLoop.gif"}
      bgSize="cover"
      bgPosition="center"
      alignItems="flex-start"
      padding={0}
      paddingLeft={2}
      paddingRight={2}
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
          <Flex direction="column">
            <Nav className="me-auto">
              <Link
                to={"/"}>
                <Flex align="center" position="relative">

                  <CustomButton
                    isDisabled={activeAnimation}
                    borderRadius="50%"
                    justifyContent="flex-center"
                    bg={purpleColorButton}
                    color={whiteColorText}
                    width="25px"
                    boxShadow={"2px 2px 2px rgba(0, 0, 0, 0.2)"}
                    p={2}
                    zIndex="1"
                    focusBorderColor="transparent"
                    icon={<MdHome size={23} />}
                  >
                  </CustomButton>


                  {/* <Box
                    isDisabled={activeAnimation}
                    borderRadius="50%"
                    bg={purpleColorButton}
                    color={whiteColorText}
                    boxShadow={"2px 2px 2px rgba(0, 0, 0, 0.2)"}
                    p={2}
                    zIndex="1"
                    focusBorderColor="transparent"
                  >
                    <MdHome size={23} />
                  </Box> */}
                </Flex>
              </Link>
            </Nav>
          </Flex>

          <Link to={"/try-something-new"}>
            <CustomButton
              isDisabled={activeAnimation}
              bgColor={greenColorButton}
              txtColor={whiteColorText}
              justifyContent="flex-start"
              fontSize={"13px"}
              w={"180px"}
              ml={"70px"}
              icon={<FaEarthAmericas size={19} />}
            >
              DISCOVERED MEALS
            </CustomButton>
          </Link>

          {/* <Flex direction={"column"} gap={3}>
            <Link to={"/try-something-new"}>
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
          </Flex> */}

        </HStack>

        <Box
          className="box"
          h="100%"
          justifyContent="flex-end"
          alignItems="flex-end"
        >
          {!hitRegion ?

            ( //apre il pop up per confermare il lancio
              <ConfirmGlobeLaunch dishesFinished={dishesFinished} setDishesFinished={setDishesFinished} setIsOpenResult={setIsOpenResult} setCoins={setCoins} setHitRegion={setHitRegion} setInternationalDish={setInternationalDish} internationalDish={internationalDish} coins={coins} setActiveAnimation={setActiveAnimation} />
            ) :


            (
              //risultato del lancio
              <>

                <Modal isOpen={isOpenResult} onClose={() => setIsOpenResult(false)}>
                  <ModalOverlay />
                  <ModalContent maxW="350px">

                    <ModalHeader>Congratulations!</ModalHeader>
                    <ModalBody>
                      <Text>You have landed in {internationalDish.country} and unlocked a new international dish:</Text>
                      <Text fontWeight={"bold"} color="gray.600">{internationalDish.name}!</Text>
                    </ModalBody>

                    <ModalFooter justifyContent="center">
                      <CustomButton
                        onClick={() => {
                          setIsOpenResult(false);
                          setHitRegion(false);
                        }} mr={3}
                        w={"170px"}
                        txtColor={whiteColorText}
                        bgColor={purpleColorButton}
                        width="100px"
                        fontSize="14px"
                        textAlign="center">
                        CLOSE
                      </CustomButton>
                      <Link to={"/selected-world-food/" + internationalDish.id}>
                        <CustomButton
                          w={"170px"}
                          txtColor={whiteColorText}
                          bgColor={turquoiseColorBar}
                          width="100px"
                          fontSize="14px"
                          textAlign="center">
                          LET ME SEE
                        </CustomButton>
                      </Link>
                    </ModalFooter>
                  </ModalContent>
                </Modal>


              </>

            )}
        </Box>
      </VStack>
    </VStack>
  );
};

export default HitTheGlobe;
