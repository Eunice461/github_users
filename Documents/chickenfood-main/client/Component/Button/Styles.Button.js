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
    },

    //RADIO BUTTON STYLES
    radioButtonMian:{
        marginTop: 10,
        backgroundColor: globalColor.lightColor,
        height: 50,
        borderRadius: 5,
    },
    radioButtonContainer: {
        flexDirection: "row",
        justifyContent: "space-between", 
        marginHorizontal: 20,
        alignItems: "center",
        marginTop: 15,
    },
    radioButtonWrapper: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    radioButton: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: globalColor.primaryColor,
        justifyContent: "center",
        alignItems: "center"
    },
    radioButtonIcon: {
        width: 14,
        height: 14,
        backgroundColor: globalColor.primaryColor,
        borderRadius: 7,
    },
    radioButtonText: {
        marginLeft: 15,
        color: globalColor.textTitleColor,
        fontFamily: globalFonts.MetropolisBold,
        fontSize: globalFontsSize.font,
    },
    radioButtonImage: {
        width: 30,
        height: 20,
    },

  });
  
  export default styles