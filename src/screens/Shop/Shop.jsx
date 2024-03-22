import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import API from "../../API";

import {
  HStack,
  Button,
  VStack,
  Box,
  Flex,
  Text,
  Image,
  Stack,
  Heading,
  Divider,
  Card,
  CardBody,
  Grid,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  StackDivider,
  Badge,
} from "@chakra-ui/react";

import { UserContext } from "../../App";

import { PiCoinsFill } from "react-icons/pi";

import { MdHome } from "react-icons/md";
import { GiConfirmed } from "react-icons/gi";
import { RiArrowGoBackFill } from "react-icons/ri";
import { AiOutlineClose } from "react-icons/ai";
import { AiTwotoneShop } from "react-icons/ai";
import { FaLock } from "react-icons/fa";
import LvlMoneyBar from "../../utils/LvlMoneyBar";
import CustomButton from "../../utils/CustomButton";
import { TfiBackRight } from "react-icons/tfi";

const purpleColorButton = "#AD5983";
const whiteColorText = "#EFEFEF";
const yellowColorBadge = "#E0993D";
const orangeColorBg = "#FDD2A8";
const orangeLightColorBg = "#F5E1DA";
const greenColorButton = "#98A62E";
const turquoiseColorExp = "#0CA8C6";
const turquoiseColorBar = "#157DA1";

const ConfirmationModal = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [dirty, setDirty] = useState(true);

  useEffect(() => {
    API.getUser()
      .then((res) => {
        props.setCoins(res.coins);
      })
      .catch((err) => {
        console.log(err);
      });

    setDirty(false);
  }, [dirty]);

  const handleConfirm = (item) => {
    API.buyItem(item)
      .then((res) => {
        console.log(res);
        setDirty(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <CustomButton
        isDisabled={props.coins < props.item.coins}
        textAlign="center"
        onClick={onOpen}
        variant="solid"
        w={props.coins < props.item.coins ? "130px" : "70px"}
        bgColor={turquoiseColorBar}
        txtColor={whiteColorText}
        fontSize={"13px"}
      >
        <Text mb={1}>
          {props.coins < props.item.coins ? "Not enough money" : "Buy now"}
        </Text>
      </CustomButton>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxW="300px">
          <ModalHeader color="gray.600" fontSize="md" justifyContent={"center"}>
            You have selected
          </ModalHeader>

          <ModalBody>
            <Card maxW="xs" maxH={"xs"}>
              <Flex
                justifyContent="center"
                alignItems="center"
                bg={orangeLightColorBg}
              >
                <Image
                  src={"src/assets/Skins/" + props.item.name + "/Preview.gif"}
                  alt="Skin"
                  borderRadius="lg"
                  style={{ width: "70%" }}
                />
              </Flex>
              <Stack mt="6" spacing="1" alignItems="center">
                <Heading fontSize={"15px"}>{props.item.name}</Heading>
                <Flex
                  gap={3}
                  alignItems="center"
                  fontSize={"13px"}
                  justifyContent={"center"}
                >
                  <Badge
                    mb={3}
                    bg={purpleColorButton}
                    ml={1}
                    pl={2}
                    pr={2}
                    color={whiteColorText}
                    borderRadius={"10px"}
                    fontWeight={"bold"}
                  >
                    <Box display="flex" alignItems="center" gap={1}>
                      {props.item.coins} <PiCoinsFill color={whiteColorText} />
                    </Box>
                  </Badge>
                </Flex>
              </Stack>
            </Card>
          </ModalBody>

          <ModalFooter justifyContent="center">
            <VStack>
              <Text>Do you want to buy this skin?</Text>
              <Box alignItems={"center"}>
                <HStack>
                  <Flex
                    direction={"column"}
                    gap={3}
                    onClick={onClose}
                    style={{ cursor: "pointer" }}
                  >
                    <CustomButton
                      bgColor={purpleColorButton}
                      txtColor={whiteColorText}
                      justifyContent="flex-start"
                      icon={
                        <AiOutlineClose
                          size={21}
                          style={{ transform: "scaleX(-1)" }}
                        />
                      }
                      w={"120px"}
                      ml={"0px"}
                    >
                      CLOSE
                    </CustomButton>
                  </Flex>

                  <Link to={"/personalize-tamagotchi"}>
                    <Flex
                      direction={"column"}
                      gap={3}
                      onClick={() => handleConfirm(props.item)}
                      style={{ cursor: "pointer" }}
                    >
                      <CustomButton
                        bgColor={turquoiseColorBar}
                        txtColor={whiteColorText}
                        justifyContent="flex-start"
                        icon={<GiConfirmed size={21} />}
                        w={"120px"}
                        ml={"0px"}
                      >
                        BUY IT
                      </CustomButton>
                    </Flex>
                  </Link>
                </HStack>
              </Box>
            </VStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

const ItemCard = (props) => {
  const [isLocked, setIsLocked] = React.useState(false);
  const [itemPrice, setItemPrice] = React.useState(450);
  const { coins, setCoins } = useContext(UserContext);

  return (
    <Card maxW="xs" maxH={"400px"} bg="white">
      <CardBody>
        <Box position="relative">
          <Image
            src={"src/assets/Skins/" + props.item.name + "/Pic.png"}
            alt={props.item.name + "'s Skin"}
            borderRadius="lg"
            style={{ filter: isLocked ? "blur(2px)" : "none" }}
          />
          {isLocked && (
            <Box
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
            >
              <FaLock size={30} />
            </Box>
          )}
        </Box>
        <Stack mt="6" spacing="1">
          <Heading fontSize={"15px"} color="#333333">
            {props.item.name}
          </Heading>

          {isLocked ? (
            <Text color="#333333" fontSize={"15px"}>
              Unlock at level 30
            </Text>
          ) : (
            <Flex
              gap={3}
              alignItems="center"
              fontSize={"13px"}
              justifyContent={"center"}
            >
              <Badge
                mb={0}
                bg={purpleColorButton}
                ml={1}
                pl={2}
                pr={2}
                color={whiteColorText}
                borderRadius={"10px"}
                fontWeight={"bold"}
              >
                <Box display="flex" alignItems="center" gap={1}>
                  {props.item.coins} <PiCoinsFill color={whiteColorText} />
                </Box>
              </Badge>
            </Flex>
          )}
        </Stack>

        <Divider />
        {isLocked ? (
          <CustomButton
            isDisabled={coins < props.item.coins}
            bgColor={turquoiseColorExp}
          >
            Buy Now
          </CustomButton>
        ) : (
          <ConfirmationModal
            coins={coins}
            setCoins={setCoins}
            item={props.item}
          />
        )}
      </CardBody>
    </Card>
  );
};

const Shop = () => {
  const { coins, setCoins } = React.useContext(UserContext);
  const { exp, setExp } = React.useContext(UserContext);
  const { level, setLevel } = React.useContext(UserContext);
  const [items, setItems] = React.useState([]);

  useEffect(() => {
    API.getItems().then((res) => {
      setItems(
        res.filter((item) => item.bought == 0 && item.international == 0)
      );
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

      <HStack mt={4} width={"100%"} justifyContent="space-between">
        <Flex
          direction="column"
          justifyContent="flex-end"
          alignItems="flex-start"
          height="10px"
        >
          <Nav className="me-auto">
            <Link to={"/"}>
              <Flex align="center" position="relative">
                <Box
                  borderRadius="50%"
                  bg={purpleColorButton}
                  p={2}
                  mb={2}
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

        <Link to={"/personalize-tamagotchi"}>
          <CustomButton
            bgColor={greenColorButton}
            txtColor={whiteColorText}
            justifyContent="flex-start"
            w={"140px"}
            ml={"70px"}
            icon={<AiTwotoneShop size={19} />}
          >
            YOUR SKINS
          </CustomButton>
        </Link>
      </HStack>

      <Flex direction="column" mt={6}>
        <Card bg={purpleColorButton}>
          <CardBody
            color={whiteColorText}
            boxShadow={"0px 3px 2px rgba(0, 0, 0, 0.1)"}
            borderRadius="lg"
          >
            <VStack divider={<StackDivider />} spacing="2">
              <Box>
                <Flex
                  gap={2}
                  alignItems="center"
                  direction="column"
                  width={"100%"}
                  justifyContent={"center"}
                >
                  <Text
                    mb={0}
                    pt="0"
                    mt={0}
                    fontSize="lg"
                    color={whiteColorText}
                    fontWeight={"bold"}
                  >
                    Skins Shop
                  </Text>
                  <Text mb={0} fontSize="md" color={whiteColorText}>
                    Here you can buy your favorite skins!
                  </Text>
                </Flex>
              </Box>
            </VStack>
          </CardBody>
        </Card>

        <Grid
          templateColumns="repeat(2, 1fr)"
          gap={6}
          maxH={"435px"}
          overflowY={"auto"}
        >
          {items.length != 0
            ? items.map((item, index) => (
                <Box key={index}>
                  <ItemCard item={item} currentPrice={coins} />
                </Box>
              ))
            : ""}
        </Grid>

        {items.length == 0 ? (
          <Card w="100%">
            <CardBody
              color={whiteColorText}
              boxShadow={"0px 3px 2px rgba(0, 0, 0, 0.1)"}
              borderRadius="lg"
            >
              <Text mb={0} fontSize="md" color={"gray.600"}>
                You must be a pro player: you have already bought all the skins!
              </Text>
            </CardBody>
          </Card>
        ) : (
          ""
        )}
      </Flex>
    </VStack>
  );
};

export default Shop;
