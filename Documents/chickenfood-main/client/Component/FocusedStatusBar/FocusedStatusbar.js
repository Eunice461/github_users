import React from "react";
import { StatusBar } from "react-native";

import { useIsFocused } from "@react-navigation/core";





const FocusedStatusBar = (props)=>{
    const isFocused = useIsFocused();
console.log(props, 'props')

return isFocused ? <StatusBar animated={true} {...props} /> : null;
}


export default FocusedStatusBar