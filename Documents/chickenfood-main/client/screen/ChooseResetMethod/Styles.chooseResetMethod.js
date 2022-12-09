import {  StyleSheet } from "react-native";
import { globalColor, globalFonts, globalFontsSize } from "../../Constant";

const ChooseResetMethodStyles = StyleSheet.create({
    RestMethodContainer: {
        flex: 1,
        marginHorizontal: 30,
    },
    RestMethodText1: {
        color: globalColor.textTitleColor,
        fontFamily: globalFonts.MetropolisExtraBold,
        fontSize: globalFontsSize.extraLarge,
        textAlign: "center",
    },
    RestMethodText2: {
        fontFamily: globalFonts.MetropolisMedium,
        fontSize: globalFontsSize.small,
        color: globalColor.statusBarColor1,
        textAlign: 'center',
        lineHeight: 15,
        marginTop: 10
    },
    RestMethodViewI:{
        display: "flex",
        flexDirection: "row",
        justifyContent:"space-around"
        
    },
    
})

export default ChooseResetMethodStyles