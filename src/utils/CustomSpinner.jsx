import React from "react";
import { Spinner, VStack } from '@chakra-ui/react'

const CustomSpinner = () => (
    <VStack
        className={"MAIN_VSTACK"}
        justifyContent="center"
        w={"390px"}
        h={"670px"}
        bg="white"
        padding={0}
        paddingLeft={2}
        paddingRight={2}
        margin={0}
      >
        <Spinner />

      </VStack>
  );

  export default CustomSpinner