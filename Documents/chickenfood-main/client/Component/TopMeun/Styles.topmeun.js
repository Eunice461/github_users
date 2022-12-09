import { StyleSheet } from 'react-native';
import { globalColor, globalFonts, globalFontsSize } from "../../Constant";

const TopMeunStyles = StyleSheet.create({
    topMenuContainer: {
       marginTop: 15,
    },
    topMenuView2:{
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 5,
    },
    topMenuImage1: {
        width: 25, 
      height: 25
    },
    topMenuText1 : {
        color: globalColor.textTitleColor,
        fontFamily: globalFonts.MetropolisBold,
        fontSize: globalFontsSize.extraLarge,
        textAlign: "center",
        marginLeft: 40
    },
})

export default TopMeunStyles