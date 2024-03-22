import React from "react";

import { Link } from "react-router-dom";
import { GeoAltFill } from 'react-bootstrap-icons';


import {
  HStack,
  Button,
  VStack,
  Box,
  Flex,
  Text,
  Card,
  CardBody,
  Badge,
  Heading,
  Avatar,
  Stack,
  StackDivider,
} from "@chakra-ui/react";
import { UserContext } from "../../App";
import CustomButton from "../../utils/CustomButton";
import LvlMoneyBar from "../../utils/LvlMoneyBar";

import { MdHome } from "react-icons/md";

import { FaEarthAmericas } from "react-icons/fa6";
const purpleColorButton = "#AD5983";
const whiteColorText = "#EFEFEF";
const yellowColorCoin = "#F2BA17";
const greenColorButton = "#98A62E";
const turquoiseColorExp = "#0CA8C6";
const turquoiseColorBar = "#157DA1";
const orangeLightColorBg = "#F5E1DA";


import { useState, useEffect } from "react";
import API from "../../API";
import { Nav } from "react-bootstrap";




const GoalCard = ({ dishId, dishCountry, dishName, dishPreview, dishDescription, locked, dishImg, isNew }) => {


  // Da Locale
  //const urlImages = `http://localhost:3001/images/international/`;

  // Da Remoto
  const urlImages = `https://Zero-Hungerserver.eu.loclx.io/images/international/`;



  return (
    <Link
      to={{
        pathname: `/selected-world-food/${dishId}`,
      }}
    >
      <Card mt={1}>
        <CardBody
          boxShadow={"0px 3px 2px rgba(0, 0, 0, 0.05)"}
          borderRadius="lg"
          pt={4}
          pb={6}
          bg={"white"}
        >
          <HStack alignItems={"start"} mt={2}>
            <VStack height={"100%"}>
              <Flex spacing="4">
                <Flex
                  height={"100%"}
                  flexDirection={"column"}
                  alignItems="center"
                >
                  <Avatar
                    name={dishName}
                    src={urlImages.concat(dishImg)}
                    bg={purpleColorButton}
                    color={whiteColorText}
                  />
                </Flex>
              </Flex>
            </VStack>

            <Box mt={0} mx={3} pt={0} width={"100%"}>
              <Heading textAlign={"start"} size="sm">{dishName} &nbsp;&nbsp;&nbsp;&nbsp;{/*isNew ? <Badge bg={yellowColorCoin}>NEW</Badge> : <Badge bg={greenColorButton}>DONE</Badge>*/}</Heading>

              <Flex direction="row" alignItems="start">
                <Box mt={.5} mr={2}>
                  <GeoAltFill size={15} color={greenColorButton} />
                </Box>
                <Text alignItems="flex-start" textAlign={"start"} fontSize="sm" color={"gray.600"}><strong>{dishCountry}</strong></Text>
              </Flex>


              <Text pr={2} textAlign={"justify"}>{dishPreview}</Text>
            </Box>
          </HStack>
        </CardBody>
      </Card>
    </Link>
  );
};

const TrySomethingNew = () => {
  const { coins, setCoins } = React.useContext(UserContext);
  const { exp, setExp } = React.useContext(UserContext);
  const { level, setLevel } = React.useContext(UserContext);

  const [internationalDishes, setInternationalDishes] = useState([]);



  useEffect(() => {
    API.getInternationalDishes()
      .then((data) => {

        setInternationalDishes(data.filter((dish) => dish.locked == 0));
      })
      .catch((error) => {
        console.log("Error:", error);
      });



  }, []);

  return (
    <VStack
      w={"390px"}
      h={"670px"}
      justifyContent="flex-first"
      alignItems="flex-start"
      bgSize="cover"
      bgPosition="center"
      bg={orangeLightColorBg}
      padding={0}
      paddingLeft={2}
      paddingRight={2}
    >
      <LvlMoneyBar level={level} exp={exp} coins={coins} />

      <HStack
        mt={4}
        className="HSTACK"
        width={"100%"}
        justifyContent="space-between"
      >
        <Flex direction="column">
          <Nav className="me-auto">
            <Link to={"/"}>
              <Flex align="center" position="relative">
                <Box
                  borderRadius="50%"
                  bg={purpleColorButton}
                  color={whiteColorText}
                  boxShadow={"2px 2px 2px rgba(0, 0, 0, 0.2)"}
                  p={2}
                  zIndex="1"
                  focusBorderColor="transparent"
                >
                  <MdHome size={23} />
                </Box>
              </Flex>
            </Link>
          </Nav>
        </Flex>

        <Box>
          <Link to={"/hit-the-globe"}>
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
                <FaEarthAmericas color={turquoiseColorBar} size={23} />
              </Box>
              <CustomButton
                fontSize="13px"
                bgColor={turquoiseColorBar}
                txtColor={whiteColorText}
                ml={5}
                w={"140px"}
              >
                <Text pl={3} pb={.3} m={0}> HIT THE GLOBE</Text>

              </CustomButton>
            </Flex>
          </Link>
        </Box>

      </HStack>

      <VStack
        className="VStack"
        alignItems="center"
        width={"100%"}
        mt={5}
        overflowY={"auto"}
      >

        <Card mb={2} width={"80%"} justifyContent={"center"}>


          <Flex direction="column">

            <CardBody
              color={whiteColorText}
              boxShadow={"0px 3px 2px rgba(0, 0, 0, 0.1)"}
              borderRadius="lg"
              bg={turquoiseColorBar}
            >
              <VStack divider={<StackDivider />} spacing="2">
                <Box>
                  <Flex gap={2} alignItems="center" direction="column" width={"100%"} justifyContent={"center"}>
                    <Text mb={0} pt="2" mt={3} fontSize="lg" color={whiteColorText} fontWeight={"bold"}>
                      International Food
                    </Text>
                    <Text fontSize="md" color={whiteColorText}>
                      Select one international meal to unlock new special skins!
                    </Text>
                  </Flex>
                </Box>
              </VStack>
            </CardBody>

            {internationalDishes.length > 0 ? (
              internationalDishes.map((internationalDish, index) => (
                internationalDish.new ? <GoalCard
                  width={"100%"}
                  key={internationalDish.id}
                  dishId={internationalDish.id}
                  dishCountry={internationalDish.country}
                  dishName={internationalDish.name}
                  dishPreview={internationalDish.preview}
                  dishDescription={internationalDish.description}
                  dishImg={internationalDish.img}
                  isLocked={internationalDish.locked}
                  isNew={internationalDish.new}
                />
                  : ""
              ))
            ) : (<>
              <Card mt={1}>
                <CardBody
                  boxShadow={"0px 3px 2px rgba(0, 0, 0, 0.05)"}
                  borderRadius="lg"
                  pt={4}
                  pb={6}
                  bg={"white"}
                >
                  <Text mb="2" alignItems="flex-start" textAlign={"center"} fontSize="sm" color={"gray.600"}><strong>Hit the globe</strong></Text>
                  <Text alignItems="flex-start" textAlign={"center"} fontSize="sm" color={"gray.600"}>to unlock international meals!</Text>
                </CardBody>
              </Card>
            </>)}

          </Flex>
        </Card>

        <Card mb={2} width={"80%"} justifyContent={"center"}>


          <Flex direction="column">

            <CardBody
              color={whiteColorText}
              boxShadow={"0px 3px 2px rgba(0, 0, 0, 0.1)"}
              borderRadius="lg"
              bg={greenColorButton}
            >
              <VStack divider={<StackDivider />} spacing="2">
                <Box>
                  <Flex gap={2} alignItems="center" direction="column" width={"100%"} justifyContent={"center"}>
                    <Text mb={0} pt="0" mt={0} fontSize="lg" color={whiteColorText} fontWeight={"bold"}>
                      Completed
                    </Text>
                  </Flex>
                </Box>
              </VStack>
            </CardBody>

            {internationalDishes.length > 0 ? (
              internationalDishes.map((internationalDish, index) => (
                !internationalDish.new ? <GoalCard
                  width={"100%"}
                  key={internationalDish.id}
                  dishId={internationalDish.id}
                  dishCountry={internationalDish.country}
                  dishName={internationalDish.name}
                  dishPreview={internationalDish.preview}
                  dishDescription={internationalDish.description}
                  dishImg={internationalDish.img}
                  isLocked={internationalDish.locked}
                  isNew={internationalDish.new}
                />
                  : ""
              ))
            ) : (<>
              <Card mt={1}>
                <CardBody
                  boxShadow={"0px 3px 2px rgba(0, 0, 0, 0.05)"}
                  borderRadius="lg"
                  pt={4}
                  pb={6}
                  bg={"white"}
                >
                  <Text mb="2" alignItems="flex-start" textAlign={"center"} fontSize="sm" color={"gray.600"}><strong>Hit the globe</strong></Text>
                  <Text alignItems="flex-start" textAlign={"center"} fontSize="sm" color={"gray.600"}>to unlock international meals!</Text>
                </CardBody>
              </Card>
            </>)}

          </Flex>
        </Card>

      </VStack>
    </VStack>
  );
};

export default TrySomethingNew;
