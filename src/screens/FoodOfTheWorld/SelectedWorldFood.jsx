import React from "react";

import { Link } from "react-router-dom";

import {
  HStack,
  Button,
  VStack,
  Box,
  Flex,
  Text,
  Image,
  Heading,
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/react";
import { UserContext } from "../../App";

import { RiArrowGoBackLine } from "react-icons/ri";
import { FaCamera } from "react-icons/fa";

import { GiConfirmed } from "react-icons/gi";
import { RiArrowGoBackFill } from "react-icons/ri";
const purpleColorButton = "#AD5983";
const redColorButton = "#D14C5F";
const turquoiseColorExp = "#0CA8C6";
const turquoiseColorBar = "#157DA1";
const whiteColorText = "#EFEFEF";
const yellowColorButton = "#FE9846";

import CustomButton from "../../utils/CustomButton";
import LvlMoneyBar from "../../utils/LvlMoneyBar";

import { useState, useEffect } from "react";
import API from "../../API";

import { useParams } from "react-router-dom";
import { MdHome } from "react-icons/md";
import { TfiBackRight } from "react-icons/tfi";
import { Card, CardBody, Nav } from "react-bootstrap";
import { GeoAltFill } from "react-bootstrap-icons";

const SelectedWorldFood = () => {

  // Da Locale
  //const urlImages = `http://localhost:3001/images/international/`;

  // Da Remoto
  const urlImages = `https://Zero-Hungerserver.eu.loclx.io/images/international/`;

  const { coins, setCoins } = React.useContext(UserContext);
  const { exp, setExp } = React.useContext(UserContext);
  const { level, setLevel } = React.useContext(UserContext);

  const { dishID } = useParams();

  const [dish, setDish] = useState({});

  const purpleColorButton = "#AD5983";
  const whiteColorText = "#EFEFEF";
  const yellowColorBadge = "#E0993D";
  const orangeColorBg = "#FDD2A8";
  const orangeLightColorBg = "#F5E1DA";
  const turquoiseColorBar = "#157DA1";
  const greenColorButton = "#98A62E";
  const greenDarkColorHeader = "#81872D";

  useEffect(() => {

    console.log("dishID preso da front " + dishID);

    API.getInternationalDishById(dishID).then((res) => {
      setDish(res);
      console.log(res);
    }
    );
  }, []);

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
            </Flex>
          </HStack>


          <Flex width={"80%"} m={0} mt={4} p={0}>
            <Card m={0} p={0} mb={15} width={"50px"} mx="auto" pl={0} overflowY="auto">
              <CardBody borderRadius="100px" p={0} >
                <Text mb={1} fontSize="25px" fontWeight={"bold"}> {dish.name} </Text>
                <Flex pr={2} direction="row" alignItems="start" justifyContent={"center"}>
                  <Box mt={1} mr={2}>
                    <GeoAltFill size={13} color={greenColorButton} />
                  </Box>
                  <Text alignItems="flex-start" textAlign={"start"} fontSize="sm" color={"gray.600"}><strong>{dish.country}</strong></Text>
                </Flex>
                <Image style={{ margin: "auto", maxWidth: '60%', maxHeight: '50%' }} src={urlImages.concat(dish.img)} />
                <Text fontSize="14px" textAlign={"justify"} mt={6} mb={0}>
                  {dish.description}
                </Text>{" "}
              </CardBody>
            </Card>
          </Flex>

          <VStack>
            <Box mt={10} mb={10} gap={12} justifyContent="center">
              <Flex gap={5}>
                <Link to={"/try-something-new"}>
                  <CustomButton
                    bgColor={turquoiseColorBar}
                    txtColor={whiteColorText}
                    w={"100px"}
                  >
                    GOT IT
                  </CustomButton>
                </Link>
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
              </Flex>
            </Box>
          </VStack>
        </VStack>

      </VStack>
    </VStack>
  );
};

export default SelectedWorldFood;
