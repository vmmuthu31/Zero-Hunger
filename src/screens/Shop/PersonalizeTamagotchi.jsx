import React from "react";
import { useContext, useEffect, useState } from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import Carrot from "../../assets/GIFs/carrot.gif";

import API from "../../API";

import {
  HStack,
  Button,
  VStack,
  Box,
  Flex,
  Progress,
  Image,
  Stack,
  Heading,
  Card,
  CardBody,
  Grid,
  Spinner,
  StackDivider,
  Text,
} from "@chakra-ui/react";

import { UserContext } from "../../App";

import { AiTwotoneShop } from "react-icons/ai";

import { PiCoinsFill } from "react-icons/pi";

import { MdHome } from "react-icons/md";

import LvlMoneyBar from "../../utils/LvlMoneyBar";
import CustomButton from "../../utils/CustomButton";

const purpleColorButton = "#AD5983";
const whiteColorText = "#EFEFEF";
const orangeColorBg = "#FDD2A8";
const orangeLightColorBg = "#F5E1DA";
const greenColorButton = "#98A62E";
const turquoiseColorExp = "#0CA8C6";
const turquoiseColorBar = "#157DA1";

const PersonalizeTamagotchi = () => {
  const { coins, setCoins } = useContext(UserContext);
  const { exp, setExp } = useContext(UserContext);
  const { level, setLevel } = useContext(UserContext);
  const { user, setUser } = useContext(UserContext);
  const { activeItem, setActiveItem } = useContext(UserContext);
  const [items, setItems] = React.useState([]);

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    API.getUser().then((res) => {
      setCoins(res.coins);
    });
  }, []);


  const selectSkin = (item) => {
    API.selectItem(item)
      .then(() => {
        return API.getItems();
      })
      .then((res) => {
        console.log(item.international)
        const filteredItems = res.filter((item) => item.bought === 1);
        setItems(filteredItems);
        return API.getUser();
      })
      .then((res) => {
        setActiveItem(res.item);
      })
      .catch((error) => {
        console.error("Errore durante la selezione della skin:", error);
      });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(true);
      API.getItems().then(res => {
        setItems(res.filter(item => item.bought === 1));
        setIsLoading(false);
      });
    }, 1000); 

    return () => clearTimeout(timer);
  }, [])

  return (
    <VStack w={"390px"}
      h={"670px"}
      justifyContent="space-between"
      alignItems="flex-start"
      bgSize="cover"
      bgPosition="center"
      bg={orangeLightColorBg}
      padding={0}
      paddingLeft={2}
      paddingRight={2}
      spacing={0}
    >

      <LvlMoneyBar level={level} exp={exp} coins={coins} />

      <HStack mt={4} width={"100%"}
        justifyContent="space-between">
        <Flex
          direction="column"
          justifyContent="center"
          alignItems="center"
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

        <Link to={"/shop"}>
          <CustomButton
            bgColor={purpleColorButton}
            txtColor={whiteColorText}
            justifyContent="flex-start"
            w={"90px"}
            ml={"70px"}
            icon={<AiTwotoneShop size={19} />}
          >
            SHOP
          </CustomButton>
        </Link>
      </HStack>

      <Box
        style={{ display: "flex", justifyContent: "center" }} mt={2}
      >
        <img
          src={"src/assets/Skins/" + activeItem + "/Preview.gif"}
          alt="Image"
          style={{ width: "50%" }}
        />
      </Box>

      {isLoading ? 
      <Flex width={"100%"} justifyContent={"center"}>
        <Spinner/>
      </Flex>
       :
      <Flex direction="column" mt={4} mb={8} >
        
        <Card bg={purpleColorButton}>
          <CardBody
            mt={0}
            color={whiteColorText}
            boxShadow={"0px 3px 2px rgba(0, 0, 0, 0.1)"}
            borderRadius="lg"

          >
            <VStack divider={<StackDivider />} spacing="0">
              <Box>
                <Flex gap={0} alignItems="center" direction="column" width={"100%"} justifyContent={"center"}>
                  <Text mb={0} pt="0" mt={0} fontSize="lg" color={whiteColorText} fontWeight={"bold"}>
                    Your Skins
                  </Text>
                  {<Text mb={0} fontSize="md" color={whiteColorText}>
                    Select what you prefer!
                  </Text>}
                </Flex>
              </Box>
            </VStack>
          </CardBody>
        </Card>

        <Box width={"100%"} justifyContent={"center"} margin="auto">
          {!isLoading ?

            <Grid
              templateColumns="repeat(2, 1fr)"
              gap={6}
              maxH={"350px"}
              overflowY={"auto"}
            >
              {items.map((item, index) => (
                <Box key={index}>
                  <Card bg={item.name == activeItem ? turquoiseColorBar : ""}
                    color={item.name == activeItem ? whiteColorText : ""}
                    maxW="xs" maxH={"xs"} onClick={() => selectSkin(item)} style={{ cursor: "pointer" }}>
                    <CardBody>
                      <Image
                        src={"src/assets/Skins/" + item.name + "/Pic.png"}
                        alt={item.name + "'s Skin"}
                        borderRadius="lg"
                      />
                      <Stack mt="6" spacing="1">
                        <Heading fontSize={"13px"}>{item.name}</Heading>
                      </Stack>
                    </CardBody>
                  </Card>
                </Box>
              ))}
            </Grid>
            : <Spinner />}
        </Box>
      </Flex>}
    </VStack>
  );
};

export default PersonalizeTamagotchi;
