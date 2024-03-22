import React, { useState, useRef } from "react";

import QrReader from "modern-react-qr-reader";

import "../../App.css";
import { Camera } from "react-camera-pro";

import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import LvlMoneyBar from "../../utils/LvlMoneyBar";

import {
  HStack,
  Button,
  VStack,
  Box,
  Flex,
  Progress,
  Text,
  Image,
  Badge,
  Card,
} from "@chakra-ui/react";
import { UserContext } from "../../App";

import { MdHome } from "react-icons/md";

import { FaCamera } from "react-icons/fa";
import { GiConfirmed } from "react-icons/gi";
import { RiArrowGoBackFill } from "react-icons/ri";
import { TfiBackRight } from "react-icons/tfi";
import CustomButton from "../../utils/CustomButton";
import { AiOutlineClose } from "react-icons/ai";

const purpleColorButton = "#AD5983";
const whiteColorText = "#EFEFEF";
const orangeColorButton = "#F27127";
const redColorButton = "#D14C5F";
const orangeLightColorBg = "#F5E1DA";
const greenColorButton = "#98A62E";
const turquoiseColorBar = "#157DA1";

const handleBackClick = () => {
  setImage(undefined);
};

const UploadMeal = (props) => {
  const { coins, setCoins } = React.useContext(UserContext);
  const { exp, setExp } = React.useContext(UserContext);
  const { level, setLevel } = React.useContext(UserContext);
  const camera = useRef(null);

  const [data, setData] = useState(null);
  const [dataToSend, setDataToSend] = useState(null);

  const [image, setImage] = useState(null);
  const [user, setUser] = useState(null);

  const [initialLoading, setInitialLoading] = useState(true);
  const [dirty, setDirty] = useState(true);
  const [error, setError] = useState("");

  const handleScan = (data) => {
    setData(data);
  };


  const temp = "Chicken";

  return (
    <>
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
              marginBottom={3.5}
              direction="column"
              justifyContent="flex-end"
              alignItems="center"
              height="1px"
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
              <Link to={"/feedme"}>
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

          <Box w={"320px"} h={"350px"} mt={4}>
            <QrReader
              onError={(err) => console.error("Errore in QRCode Reader (UploadMeal): " + err)}
              delay={500}
              facingMode={"environment"}
              onScan={handleScan}
              style={{ width: "100%", display: "none" }}
            />

            {dataToSend === null ?

              <>
                {(data === null) ?
                  <>
                    {/*<Text fontSize={"15px"}>Frame well your food to SNAP...</Text>*/}
                    <Badge mb={3} px="3" borderRadius={"10px"} bg={purpleColorButton}>
                      <Text mb={0} pt="0" mt={0} fontSize="sm" color={whiteColorText} fontWeight={"bold"}>
                        Please, frame well your meal
                      </Text>
                    </Badge>
                    <Progress borderRadius="15px" colorScheme="turquoise" bg={turquoiseColorBar} size="md" isIndeterminate />
                  </> :
                  <>
                    <Badge mb={3} px="3" borderRadius={"10px"} bg={greenColorButton}>
                      <Text mb={0} pt="0" mt={0} fontSize="sm" color={whiteColorText} fontWeight={"bold"}>
                        Ready to snap!
                      </Text>
                    </Badge>
                    <Progress size="md" value={100} />
                  </>}
              </>
              :
              <>
                <Badge mb={3} px="3" borderRadius={"10px"} bg={turquoiseColorBar}>
                  <Text mb={0} pt="0" mt={0} fontSize="sm" color={whiteColorText} fontWeight={"bold"}>
                    Picture Preview
                  </Text>
                </Badge>
              </>
            }


            <Box>
              {!image ? (
                <Camera
                  ref={camera}
                  aspectRatio={4 / 4}
                  facingMode="environment"
                />
              ) : (
                <Image src={image} style={{ width: "100%", height: "100%" }} />
              )}
            </Box>
          </Box>

          <Flex justifyContent="center" mb="2">
            {!image ?
              <></>
              :
              <Card px="3" py={2} borderRadius={"5px"} bg={whiteColorText}>
                <Text mb={0} pt="0" mt={0} fontSize="md" color={"gray.600"} fontWeight={"bold"}>
                  Confirmation
                </Text>
                <Text px={2} mb={0} pt="0" mt={2} fontSize="sm" color={"gray.600"}>
                  Are you satisfied of the shoot?
                </Text>
              </Card>
            }{" "}
          </Flex>

          <HStack mb={7}>
            <Flex
              direction="column"
              justifyContent="flex-end"
              alignItems="flex-end"
              gap={5}
            >
              {!image ? (
                <Nav className="me-auto">
                  <Flex gap={4}>

                    <Box>
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
                          isDisabled={data === null}
                          bgColor={redColorButton}
                          txtColor={whiteColorText}
                          ml={5}
                          pl={4}
                          w={"100px"}
                          fontSize={"14px"}
                          focusBorderColor="transparent"
                          onClick={() => {
                            setImage(camera.current.takePhoto());
                            setDataToSend(data);
                          }}
                        >
                          SNAP
                        </CustomButton>
                      </Flex>
                    </Box>
                  </Flex>
                </Nav>
              ) : (
                <Box>
                  <Flex gap={4}>

                    <Flex direction={"column"} gap={3} style={{ cursor: "pointer" }}>
                      <CustomButton
                        onClick={() => {
                          setDataToSend(null);
                          setImage(null);
                        }}
                        bgColor={purpleColorButton}
                        txtColor={whiteColorText}
                        justifyContent="flex-start"
                        icon={<AiOutlineClose size={21} />}
                        w={"120px"}
                        ml={"0px"}
                      >
                        RETRY
                      </CustomButton>
                    </Flex>

                    <Link to={`/feedme-feedback/${dataToSend}`}><Flex direction={"column"} gap={3} style={{ cursor: "pointer" }}>
                      <CustomButton
                        bgColor={turquoiseColorBar}
                        txtColor={whiteColorText}
                        justifyContent="flex-start"
                        icon={<GiConfirmed size={21} />}
                        w={"120px"}
                        ml={"0px"}
                      >
                        TAKE IT
                      </CustomButton>
                    </Flex>

                    </Link>
                  </Flex>
                </Box>
              )}
            </Flex>
          </HStack>
        </VStack>
      </VStack>
    </>
  );
};

export default UploadMeal;
