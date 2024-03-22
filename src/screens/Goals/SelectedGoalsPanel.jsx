import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import API from "../../API";


import {
  HStack,
  Button,
  VStack,
  Box,
  Flex,
  Text,
  Avatar,
  Heading,
  Card,
  CardBody,
  Divider,
  Badge,
  Stack,
  StackDivider,
  Progress,
} from "@chakra-ui/react";
import { UserContext } from "../../App";
import CustomButton from "../../utils/CustomButton";
import LvlMoneyBar from "../../utils/LvlMoneyBar";
import { PiCoinsFill } from "react-icons/pi";

import { MdHome } from "react-icons/md";
import { TbTargetArrow } from "react-icons/tb";

const purpleColorButton = "#AD5983";
const whiteColorText = "#EFEFEF";

const orangeLightColorBg = "#F5E1DA";
const greenColorButton = "#98A62E";
const yellowColorCoin = "#F2BA17";
const yellowColorBadge = "#E0993D";
const turquoiseColorExp = "#0CA8C6";
const turquoiseColorBar = "#157DA1";


const GoalCard = ({

  userLevel,
  goalID,
  goalDescr,
  unlockLevel,
  coins,
  xp,
  title,
  trials,
  finished,
  num_success,
  needed_success,
  isCompleted,
  food_to_eat
}) => {

  const path = isCompleted ? `/selected-goals-panel` : `/selected-goals-panel/${goalID}`;

  return (
    <Link
      to={path} //Posso vedere i dettagli del goal solo se non è completato
    >

      <Card>
        <CardBody
          borderRadius="15px"
          bg={'white'}
          boxShadow={"0px 3px 2px rgba(0, 0, 0, 0.1)"}
          pt={4}
          pb={6}
          mt={1}>
          <>
            <HStack alignItems="start">
              <VStack>
                <Flex spacing="4">
                  <Flex
                    flexDirection={"column"}
                    alignItems="center"
                    minW={"60px"}
                  >
                    <Box ml="2">
                      <Flex
                        direction={"row"}
                        justifyContent={"center"}
                        alignItems={"baseline"}
                      >

                      </Flex>
                    </Box>
                    <Avatar name={"Goal"} bg={"white"}
                      src={"/src/assets/Meals/" + food_to_eat + ".jpg"}
                      color={whiteColorText} />
                    {/* !isCompleted && <Badge borderRadius="15px" mt={1} pl={2} pr={2} bg={greenColorButton} color={whiteColorText}>ACTIVE</Badge> */}
                  </Flex>
                </Flex>
              </VStack>

              <Box mx={3} width={'100%'}>
                <Heading size="sm" minW={"60px"} textAlign={"left"} alignItems={"start"}>
                  Goal {goalID}
                  {!isCompleted && <Badge borderRadius="15px" mt={0} mb={1} ml={2} pt={.5} pb={.5} pl={2} pr={2} bg={greenColorButton} color={whiteColorText}>ACTIVE</Badge>}
                </Heading>{" "}

                <Flex alignItems={"baseline"} justifyContent={"center"} gap={4}>
                  <Text textAlign={"left"}>{goalDescr}</Text>
                </Flex>

                <Stack
                  direction="row"
                  align="center"
                  spacing={4}
                  justifyContent={"center"}
                >
                </Stack>
              </Box>
            </HStack>

            <Badge bg={purpleColorButton} color={whiteColorText} mr={2} pl={2} pr={2} borderRadius={"10px"}>
              {trials} TRIALS
            </Badge>
            <Badge bg={turquoiseColorBar} ml={2} mr={2} pl={2} pr={2} color={whiteColorText} borderRadius={"10px"}>
              + {xp} xp
            </Badge>
            <Badge bg={yellowColorBadge} ml={2} pl={2} pr={2} color={whiteColorText} borderRadius={"10px"} fontWeight={"bold"}>
              <Box display="flex" alignItems="center" gap={1}>
                + {coins} <PiCoinsFill />
              </Box>
            </Badge>

            {(isCompleted || num_success == needed_success) ?
              <Link to={`/check-goal-results/${goalID}`}>
                <CustomButton mt={5} bgColor={turquoiseColorBar} color={whiteColorText} fontSize="14px">CHECK RESULTS</CustomButton>
              </Link>
              : <><Text fontSize="sm" color="gray.600" mt={5} mb={3}>
                Success: <strong>{num_success}/{needed_success}</strong> Remaing trials: <strong>{trials}</strong>
              </Text>

                <Flex justifyContent="center" width="100%">
                  <Progress justifyContent={"center"} width="150px" borderRadius={"10px"} size='md' bg={turquoiseColorBar}
                    colorScheme="turquoise" value={(num_success * 100) / needed_success} />
                </Flex>
              </>}

          </>
        </CardBody>
      </Card>
    </Link>
  );
};

const SelectedGoalsPanel = () => {
  const { coins, setCoins } = React.useContext(UserContext);
  const { exp, setExp } = React.useContext(UserContext);
  const { level, setLevel } = React.useContext(UserContext);

  const [goals, setGoals] = useState([]);
  const [selectedGoals, setSelectedGoals] = useState([]);

  const [dirty, setDirty] = useState(false);

  useEffect(() => {



    API.getGoals().then((data) => {
      setDirty(true);
      setGoals(data);
      setSelectedGoals(data.filter((goal) => {
        return goal.selected == 1;
      }));


    });
  }, [dirty]);


  return (
    <VStack
      w={"390px"}
      h={"670px"}
      bg={orangeLightColorBg}
      padding={0}
      paddingLeft={2}
      paddingRight={2}
      margin={0}
      justifyContent="flex-first"
      alignItems="flex-start"
    >
      <LvlMoneyBar level={level} exp={exp} coins={coins} />

      <HStack mt={4} width={'100%'} justifyContent="space-between">
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

        <Link to={"/goals"}>
          <CustomButton
            bgColor={purpleColorButton}
            txtColor={whiteColorText}
            justifyContent="flex-start"
            w={"150px"}
            ml={"70px"}
            icon={<TbTargetArrow size={19} />}>
            CHOOSE A GOAL
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
          <Flex gap={1} direction="column">


            <CardBody
              color={whiteColorText}
              boxShadow={"0px 3px 2px rgba(0, 0, 0, 0.1)"}
              borderRadius="lg"
              bg={turquoiseColorBar}
            >
              <Stack divider={<StackDivider />} spacing="2">
                <Box>
                  <Flex gap={3} alignItems="center" direction="row" width={"100%"} justifyContent={"center"}>
                    <Text pt="2" fontSize="lg" color={whiteColorText} fontWeight={"bold"} mt={3}>
                      Selected Goals
                    </Text>
                  </Flex>
                </Box>
              </Stack>
            </CardBody>
            {selectedGoals.map((goal, index) => (

              <GoalCard
                key={goal.id}
                userLevel={level}
                goalID={goal.id}
                goalDescr={goal.description}
                unlockLevel={goal.unlock_at}
                coins={goal.coins}
                xp={goal.exp}
                title={goal.title}
                trials={goal.trials}
                finished={goal.finished}
                num_success={goal.num_success}
                needed_success={goal.needed_success}
                isCompleted={goal.finished}
                food_to_eat={goal.food_to_eat}

              />
            ))}
            {selectedGoals.length == 0 ?
              <Card w="100%">
                <CardBody
                  color={whiteColorText}
                  boxShadow={"0px 3px 2px rgba(0, 0, 0, 0.1)"}
                  borderRadius="lg"

                >
                  <Text mb={0} fontSize="md" color={"gray.600"}>
                    Go in the goals list and select a goal to get rewards!
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

export default SelectedGoalsPanel;
