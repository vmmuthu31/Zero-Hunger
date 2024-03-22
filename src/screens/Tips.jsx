import React from "react";

import { Link } from "react-router-dom";
import { Badge, Nav } from "react-bootstrap";

import {
  HStack,
  Button,
  VStack,
  Box,
  Flex,
  Progress,
  Text,
  Stack,
  Heading,
  Card,
  CardBody,
  CardHeader,
  StackDivider,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  ModalFooter,
  Spinner
} from "@chakra-ui/react";
import { UserContext } from "../App";
import LvlMoneyBar from "../utils/LvlMoneyBar";
import { MdHome } from "react-icons/md";
import { PiCoinsFill } from "react-icons/pi";
import { BiMessageDots } from "react-icons/bi";
import { Image } from "@chakra-ui/image";
import { IoIosLock } from "react-icons/io";

import API from "../API";
import { useEffect, useState } from "react";


import CustomButton from "../utils/CustomButton";
import CustomSpinner from "../utils/CustomSpinner";

const purpleColorButton = "#AD5983";
const whiteColorText = "#EFEFEF";
const orangeColorBg = "#FDD2A8";
const orangeLightColorBg = "#F5E1DA";
const turquoiseColorBar = "#157DA1";
const greenColorButton = "#98A62E";
const greenDarkColorHeader = "#81872D";


const LockedCard = ({ category }) => {
  return (
    <CardBody color={whiteColorText} borderRadius="lg"
      bg={category == "Basic" ? greenColorButton
        : category == "Advanced" ? purpleColorButton
          : turquoiseColorBar}>
      <Stack divider={<StackDivider />} spacing="2">
        <Box>
          <Flex gap={3} alignItems="center" direction="row" width={"100%"} justifyContent={"center"}>
            <IoIosLock size={30} color={"gray.600"} />
            <Text pt="2" fontSize="xs" color={whiteColorText} fontWeight={"bold"} mt={3}>
              Play more to unlock other tips!
            </Text>
          </Flex>
        </Box>
      </Stack>
    </CardBody>
  );
};

const UnlockedCard = ({ tip, category }) => {
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  const urlImages = `http://localhost:3001/images/tips/`;


  return (
    <CardBody onClick={onOpen}
      style={{ cursor: "pointer" }}
      boxShadow={"0px 3px 2px rgba(0, 0, 0, 0.05)"}
      borderRadius="lg">
      <VStack spacing="0" mt={2} alignItems={"start"} justifyContent={"start"}>
        <Flex direction="row" gap={3} alignItems={"center"} justifyContent={"start"} mb={0} width={"100%"}>
          <Box
            bg={category == "Basic" ? greenColorButton
              : category == "Advanced" ? purpleColorButton
                : turquoiseColorBar}
            color={whiteColorText}
            borderRadius="full"
            mb={3}
            width={"50px"}
            pt={.5}
          >
            <Text pt="4" fontSize="xs" fontWeight={"bold"} textTransform="uppercase" m={0} p={0} mb={1} mt={.5} ml={.5}>
              Tip {tip.id}
            </Text>
          </Box>
          <Heading fontSize="lg" color={"gray.700"} pb={2} mt={1}>
            {tip.title}
          </Heading>
        </Flex>
        <Text pt="2" fontSize="sm" color={"gray.600"} textAlign="left">
          {tip.preview}
        </Text>
      </VStack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxW="320px" h={"520px"}>
          <ModalHeader justifyContent={"center"}>
            <Flex direction={"row"} gap={4}>
              <BiMessageDots size={30} /> <Text> Tip {tip.id}  </Text>
            </Flex>
          </ModalHeader>

          <ModalBody>
            <Card maxW="xs" maxH={"xs"}>
              <CardBody overflowY={"auto"}>
                <Image
                  src="https://imgs.search.brave.com/ckKvgiqL1Saz4PylDISRAxqAUnN1rdMOYi8bc15efVk/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS12ZWN0b3Iv/cXVpY2stdGlwcy1h/ZHZpY2Utd2l0aC1t/ZWdhcGhvbmUteWVs/bG93LWJhY2tncm91/bmRfMTAxNy0zNjMx/MS5qcGc_c2l6ZT02/MjYmZXh0PWpwZw"
                  alt={tip.title}
                  borderRadius="lg"
                />
                <Stack mt="6" spacing="1" alignItems="center">

                  <Heading fontSize={"15px"}>{tip.title}</Heading>

                  <Text fontSize={"15px"}>
                    {tip.description}
                  </Text>

                </Stack>
              </CardBody>
            </Card>
          </ModalBody>

          <ModalFooter justifyContent="center" mt={2}>
            <VStack>
              <Box>
                <Flex gap={5}>
                  <CustomButton
                    bgColor={turquoiseColorBar}
                    txtColor={whiteColorText}
                    onClick={onClose}
                    w={"100px"}
                  >
                    GOT IT
                  </CustomButton>
                </Flex>
              </Box>
            </VStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </CardBody>
  );
};

const CategoryCard = ({ tips, category, isLoading }) => {
  return (
    <Card mb={2} width={"80%"}>
      <CardHeader
        bg={
          category == "Basic" ? greenColorButton
            : category == "Advanced" ? purpleColorButton
              : turquoiseColorBar}
        borderRadius="lg"
        boxShadow={"0px 3px 2px rgba(0, 0, 0, 0.1)"}
      >
        <Heading size="md" textAlign="center" color={whiteColorText}>
          {category}
        </Heading>
      </CardHeader>

      <Box>
        {isLoading ? <Spinner m={2} /> :
          tips.map((tip, index) =>
            tip.locked ? "" : <UnlockedCard key={tip.id} tip={tip} category={category} />
          )}
        <LockedCard category={category} />
      </Box>
    </Card>
  );
};

const Tips = () => {
  const { coins, setCoins } = React.useContext(UserContext);
  const { exp, setExp } = React.useContext(UserContext);
  const { level, setLevel } = React.useContext(UserContext);

  const [tips, setTips] = useState([]);

  const [basicTips, setBasicTips] = useState([]);
  const [advancedTips, setAdvancedTips] = useState([]);
  const [timeTips, setTimeTips] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true)
    API.getTips()
      .then((data) => {

        setTips(data);

        // filtra le tips per cateogria e ordino (prima locked=0 poi locked=1)
        setBasicTips(data.filter((tip) => tip.type === "basic").sort((a, b) => a.locked - b.locked));
        setAdvancedTips(data.filter((tip) => tip.type === "advanced").sort((a, b) => a.locked - b.locked));
        setTimeTips(data.filter((tip) => tip.type === "time_saving").sort((a, b) => a.locked - b.locked));

        setIsLoading(false)
      })
      .catch((error) => {
        console.log("Error:", error);
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
      margin={0}
    >
      <LvlMoneyBar level={level} exp={exp} coins={coins} />

      <HStack mt={4} width={"100%"} justifyContent="space-between">
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

      <VStack
        className="VStack"
        alignItems="center"
        width={"100%"}
        mt={5}
        overflowY={"auto"}
      >
        <CategoryCard tips={basicTips} category={"Basic"} isLoading={isLoading} />
        <CategoryCard tips={advancedTips} category={"Advanced"} isLoading={isLoading} />
        <CategoryCard tips={timeTips} category={"Time Saving"} isLoading={isLoading} />

      </VStack>
    </VStack>
  );
};

export default Tips;
