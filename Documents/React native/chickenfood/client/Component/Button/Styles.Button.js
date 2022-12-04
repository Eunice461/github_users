import { StyleSheet } from 'react-native';
import { globalColor, globalFonts, globalFontsSize } from "../../Constant";

const styles = StyleSheet.create({
    button: {
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: globalColor.primaryColor,
    borderRadius: 50,
    marginTop: 35,
   
    },
    text: {
        textAlign: "center",
        color: globalColor.backgroundColor,
        fontSize: globalFontsSize.font,
        fontFamily: globalFonts.latoBold,

    },
    CircleButton:{
        width: 25,
        height: 25,
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
    },
    navigationBackImg: {
        width: 25, 
        height: 25,
        color: globalColor.backgroundColor,
    },

    radiusButtonStyle:{
        width: 13,
        height: 13,
        borderRadius: 35,
        marginLeft: 5
    },
    circleButtonStyle:{
        width: 50,
        height: 50,
        backgroundColor: "#B6B7B7",
        position: "absolute",
        borderRadius: globalFontsSize.extraLarge,
        alignItems: "center",
        justifyContent: "center",
    }
  });
  
  export default styles