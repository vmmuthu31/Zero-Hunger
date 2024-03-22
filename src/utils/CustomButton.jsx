import React from "react";
import {
  Button
} from "@chakra-ui/react";

const CustomButton = ({ children, icon, bgColor, fontSize="13px", txtColor, textAlign="left", ...props }) => (
    <Button
      paddingLeft={textAlign === "left" ? 2.5 : 4}
      bg={bgColor}
      color={txtColor}
      leftIcon={icon}
      w={"175px"}
      fontSize={fontSize}
      textAlign={textAlign}
      borderRadius={"10px"}
      boxShadow={"2px 2px 2px rgba(0, 0, 0, 0.2)"}
      _hover={{ bg: {bgColor}, color: 'none', borderColor: "transparent" }}
      {...props}
    >
      {children}
    </Button>
  );

  export default CustomButton