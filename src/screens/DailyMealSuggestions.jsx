import React from "react";
import { useEffect, useState } from 'react';
import API from '../API';
import { Link } from "react-router-dom";
import {
  Button,
  VStack,
  Box,
  Flex,
  Text,
  Image,
  Stack,
  Heading,
  Card,
  CardBody,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
} from "@chakra-ui/react";
import { HiOutlineLightBulb } from "react-icons/hi";
import { FaCamera } from "react-icons/fa";
import CustomButton from "../utils/CustomButton";


const redColorButton = "#D14C5F";

const turquoiseColorBar = "#157DA1";
const whiteColorText = "#EFEFEF";
const yellowColorButton = "#FE9846";

const DailyMealSuggestions = ({ bgColor, txtColor }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [dailyMeal, setDailyMeal] = useState([]);
  const [dirty, setDirty] = useState(true);


  const urlImages = `http://localhost:3001/images/daily/`;




  useEffect(() => {
    if (dirty) {
      API.getDailyMeal()
        .then((meal) => {
          setDailyMeal(meal);
          setDirty(false);
        })
        .catch((err) => console.log(err));
    }
  }, [dirty]);



  return (
    <>
      <CustomButton
        paddingLeft={2}
        bgColor={bgColor}
        txtColor={txtColor}
        icon={<HiOutlineLightBulb size={19} />}
        fontSize={"10px"}
        justifyContent="flex-start"
        onClick={onOpen}

      >
        <Text margin={0} paddingTop={0.5} fontSize={"9px"}>
          DAILY MEAL SUGGESTIONS
        </Text>

      </CustomButton>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxW="320px" h={"520px"}>
          <ModalHeader justifyContent={"center"}>
            <HiOutlineLightBulb size={40} color={yellowColorButton} />
          </ModalHeader>

          <ModalBody>
            <Card maxW="xs" maxH={"xs"}>
              <CardBody overflowY={"auto"}>
                <Image
                  style={{ margin: "auto" }}
                  width={"65%"}
                  src={urlImages.concat(dailyMeal.img)}
                  alt="Chicken with Peppers"
                  borderRadius="lg"
                />
                <Stack mt="6" spacing="1" alignItems="center">
                  <Heading fontSize={"15px"}>{dailyMeal.name}</Heading>
                  <Text fontSize={"15px"}>
                    {dailyMeal.description}
                  </Text>
                </Stack>
              </CardBody>
            </Card>
          </ModalBody>

          <ModalFooter justifyContent="center" mt={2} mb={4}>
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
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DailyMealSuggestions;