import { CardHeader, Nav, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import API from '../../API';

import {
  HStack,
  VStack,
  Box,
  Flex,
  Text,
  Avatar,
  Heading,
  Card,
  CardBody,
  Badge,
  Stack,
  StackDivider,
} from "@chakra-ui/react";
import { UserContext } from "../../App";

import { PiCoinsFill } from "react-icons/pi";

import { FaLock } from "react-icons/fa";

import { MdHome } from "react-icons/md";
import { TbRuler2Off, TbTargetArrow } from "react-icons/tb";

import CustomButton from "../../utils/CustomButton";
import LvlMoneyBar from "../../utils/LvlMoneyBar";
import { IoIosLock } from "react-icons/io";

const purpleColorButton = "#AD5983";
const whiteColorText = "#EFEFEF";
const orangeColorBg = "#FDD2A8";
const orangeLightColorBg = "#F5E1DA";
const greenColorButton = "#98A62E";
const yellowColorCoin = "#F2BA17";
const yellowColorBadge = "#E0993D";
const turquoiseColorExp = "#0CA8C6";
const turquoiseColorBar = "#157DA1";
const greyColorCard = "#DBDBDB";

const LockedCard = ({ category }) => {
  return (
    <CardBody color={whiteColorText} borderRadius="lg"
      bg={purpleColorButton}>
      <Stack divider={<StackDivider />} spacing="2">
        <Box>
          <Flex gap={3} alignItems="center" direction="row" width={"100%"} justifyContent={"center"}>
            <IoIosLock size={30} color={"gray.600"} />
            <Text pt="2" fontSize="xs" color={whiteColorText} fontWeight={"bold"} mt={3}>
              Increase your level to unlock other goals!
            </Text>
          </Flex>
        </Box>
      </Stack>
    </CardBody>
  );
};

const GoalCard = ({
  userLevel,
  goalNumber,
  goalDescr,
  unlockLevel,
  coins,
  xp,
  trials,
  finished,
  food
}) => {



  return (
    userLevel >= unlockLevel ? <Link
      to={{
        pathname: `/selected-goal/${goalNumber}`,
      }}
      color={"gray.600"}
      style={{ textDecoration: "none" }}
    >

      <Card mt={1}>
        <CardBody

          boxShadow={"0px 3px 2px rgba(0, 0, 0, 0.05)"}
          borderRadius="lg"
          pt={4}
          pb={6}
          bg={userLevel >= unlockLevel ? "white" : greyColorCard}
        >
          {userLevel >= unlockLevel ? (
            // Contenuto sbloccato
            <>
              <HStack alignItems={"start"} mt={2}>
                <VStack height={"100%"}>
                  <Flex spacing="4" >
                    <Flex
                      height={"100%"}
                      flexDirection={"column"}
                      alignItems="center"
                    >
                      <Avatar
                        name={"Goal"}
                        bg={"white"}
                        src={"/src/assets/Meals/" + food + ".jpg"}
                        color={whiteColorText}
                      />
                    </Flex>
                  </Flex>
                </VStack>

                <Box mt={0} mx={3} pt={0} width={"100%"}>
                  <Heading size="sm" textAlign={"start"} > Goal {goalNumber} </Heading>
                  <Text textAlign={"start"} hover={{ textDecoration: "none" }}>{goalDescr}</Text>
                </Box>
              </HStack>
              <Stack
                mt={2}
                direction="row"
                align="center"
                spacing={4}
                justifyContent={"center"}
              >
                <Badge
                  bg={purpleColorButton}
                  color={whiteColorText}
                  borderRadius={"10px"}
                  pl={2}
                  pr={2}
                >
                  {trials} Trials
                </Badge>
                <Badge
                  bg={turquoiseColorBar}
                  color={whiteColorText}
                  borderRadius={"10px"}
                  pl={2}
                  pr={2}
                >
                  + {xp} xp
                </Badge>
                <Badge
                  bg={yellowColorBadge}
                  color={whiteColorText}
                  fontWeight={"bold"}
                  borderRadius={"10px"}
                  pl={2}
                  pr={2}
                >
                  <Box display="flex" alignItems="center" gap={1}>
                    + {coins} <PiCoinsFill />
                  </Box>
                </Badge>
              </Stack>
            </>
          ) : (
            // Contenuto bloccato

            ""
          )}
        </CardBody>
      </Card>
    </Link> : ""
  );
};

const CompletedCard = ({
  userLevel,
  goalNumber,
  goalDescr,
  unlockLevel,
  coins,
  xp,
  trials,
  finished,
  food
}) => {



  return (

    <Card>
      <CardBody

        boxShadow={"0px 3px 2px rgba(0, 0, 0, 0.1)"}
        borderRadius="lg"
        pt={4}
        pb={6}
        bg={userLevel >= unlockLevel ? "white" : greyColorCard}
      >

        <HStack alignItems={"start"} mt={2}>
          <VStack height={"100%"}>
            <Flex spacing="4" >
              <Flex

                height={"100%"}
                flexDirection={"column"}
                alignItems="center"
              >
                <Avatar
                  name={"Goal"}
                  color={whiteColorText}
                  bg={"white"}
                  src={"/src/assets/Meals/" + food + ".jpg"}
                />
              </Flex>
            </Flex>
          </VStack>

          <Box mt={0} mx={3} pt={0} width={"100%"}>
            <Heading size="sm" textAlign={"start"} > Goal {goalNumber} </Heading>
            <Text textAlign={"start"} hover={{ textDecoration: "none" }}>{goalDescr}</Text>
          </Box>
        </HStack>
        <Stack
          mt={2}
          direction="row"
          align="center"
          spacing={4}
          justifyContent={"center"}
        >
          <Badge
            bg={greenColorButton}
            color={whiteColorText}
            borderRadius={"10px"}
            pl={2}
            pr={2}
          >
            Successfully Completed!
          </Badge>

        </Stack>

      </CardBody>
    </Card>

  );
};


const Goals = () => {
  const { coins, setCoins } = React.useContext(UserContext);
  const { exp, setExp } = React.useContext(UserContext);
  const { level, setLevel } = React.useContext(UserContext);

  const [goals, setGoals] = useState([]);
  const [unselectedGoals, setUnselectedGoals] = useState([]);
  const [completedGoals, setCompletedGoals] = useState([]);
  const [dirty, setDirty] = useState(true);

  useEffect(() => {
    API.getGoals().then((data) => {
      setGoals(data);
      setUnselectedGoals(data.filter((goal) => {
        console.log(goal.selected)
        return (goal.selected == 0 && goal.finished == 0);
      }));

      setCompletedGoals(data.filter((goal) => {
        return (goal.selected == 0 && goal.finished == 1);
      }));

      setDirty(false);
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

        <Link to={"/selected-goals-panel"}>
          <CustomButton
            bgColor={turquoiseColorBar}
            txtColor={whiteColorText}
            justifyContent="flex-start"
            w={"170px"}
            ml={"70px"}
            fontSize={"12px"}
            icon={<TbTargetArrow size={19} />}
          >
            GOALS IN PROGRESS
          </CustomButton>
        </Link>
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
              bg={purpleColorButton}
            >
              <Stack divider={<StackDivider />} spacing="2">
                <Box>
                  <Flex gap={2} alignItems="center" direction="column" width={"100%"} justifyContent={"center"}>
                    <Text mb={0} pt="2" mt={3} fontSize="lg" color={whiteColorText} fontWeight={"bold"}>
                      Available Goals
                    </Text>
                    <Text fontSize="md" color={whiteColorText}>
                      Complete the goals to get rewards!
                    </Text>
                  </Flex>
                </Box>
              </Stack>
            </CardBody>

            {unselectedGoals.map((goal, index) => (
              <GoalCard
                width={"100%"}
                key={goal.id}
                userLevel={level}
                goalNumber={goal.id}
                goalDescr={goal.description}
                unlockLevel={goal.unlock_at}
                coins={goal.coins}
                xp={goal.exp}
                trials={goal.trials}
                finished={goal.finished}
                food={goal.food_to_eat}
              />
            ))}
            <LockedCard />
          </Flex>
        </Card>


        <Card mb={2} width={"80%"} justifyContent={"center"}>


          <Flex gap={1} direction="column">

            <CardBody color={whiteColorText} borderRadius="lg"
              bg={greenColorButton}>
              <Stack divider={<StackDivider />} spacing="2">
                <Box>
                  <Flex gap={3} alignItems="center" direction="row" width={"100%"} justifyContent={"center"}>
                    <Text pt="2" fontSize="lg" color={whiteColorText} fontWeight={"bold"} mt={3}>
                      Completed
                    </Text>
                  </Flex>
                </Box>
              </Stack>
            </CardBody>

            {completedGoals.map((goal, index) => (
              <CompletedCard
                width={"100%"}
                key={goal.id}
                userLevel={level}
                goalNumber={goal.id}
                goalDescr={goal.description}
                unlockLevel={goal.unlock_at}
                coins={goal.coins}
                xp={goal.exp}
                trials={goal.trials}
                finished={goal.finished}
                food={goal.food_to_eat}
              />
            ))}
            {completedGoals.length == 0 ?
              <Card w="100%">
                <CardBody
                  color={whiteColorText}
                  boxShadow={"0px 3px 2px rgba(0, 0, 0, 0.1)"}
                  borderRadius="lg"

                >
                  <Text mb={0} fontSize="md" color={"gray.600"}>
                    Choose your first goal from the list above.
                  </Text>
                </CardBody>
              </Card>
              : ""}

          </Flex>
        </Card>

      </VStack>

    </VStack>
  );
};

export default Goals;
