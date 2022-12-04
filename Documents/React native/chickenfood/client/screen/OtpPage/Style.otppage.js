import {  StyleSheet } from "react-native";
import { globalColor, globalFonts, globalFontsSize } from "../../Constant";

const OtpPageStyles = StyleSheet.create({
    otpContainer: {
        flex: 1,
        marginHorizontal: 30,
    },
    otpText1: {
        color: globalColor.textTitleColor,
        fontFamily: globalFonts.MetropolisExtraBold,
        fontSize: globalFontsSize.extraLarge,
        textAlign: "center",
        marginTop: 80
    },
    otpText2: {
        fontFamily: globalFonts.MetropolisMedium,
        fontSize: globalFontsSize.small,
        color: globalColor.statusBarColor1,
        textAlign: 'center',
        lineHeight: 15,
        marginTop: 10
    },
    otpViewI:{
        display: "flex",
        flexDirection: "row",
        justifyContent:"space-around"
        
    },
    otpTextInput: {
        paddingHorizontal: globalFontsSize.extraLarge,
        paddingVertical: 15,
        backgroundColor: globalColor.lightColor,
        borderRadius: globalFontsSize.font,
        justifyContent: "center",
        alignItems: "center",
        elevation: 1,
        maxWidth: "50%",
        marginTop: 50,
        fontSize: globalFontsSize.large,
        color: globalColor.textTitleColor,
    },
    otpTouableContainer1:{
        width: "100%",
       marginTop: 30,
        paddingVertical: 14,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(255,255,255,0.5)",
        zIndex: 1,
    },
    otpText3: {
        minWidth: 170,
        color: globalColor.subTextColor,
        fontFamily: globalFonts.MetropolisBold,
        fontSize: globalFontsSize.font,
       
    },
    otpText4: {
        fontFamily: globalFonts.MetropolisBold,
        color: globalColor.primaryColor, 
        fontSize:globalFontsSize.font,
    }
})

export default OtpPageStyles