import {  StyleSheet } from "react-native";
import { globalColor, globalFonts, globalFontsSize } from "../../Constant";

const ResetPasswordStyles = StyleSheet.create({
    ResetPasswordContainer: {
        flex: 1,
        marginHorizontal: 30,
    },
    ResetPasswordText1: {
        color: globalColor.textTitleColor,
        fontFamily: globalFonts.MetropolisExtraBold,
        fontSize: globalFontsSize.extraLarge,
        textAlign: "center",
        marginTop: 70
    },
    ResetPasswordText2: {
        fontFamily: globalFonts.MetropolisMedium,
        fontSize: globalFontsSize.small,
        color: globalColor.statusBarColor1,
        textAlign: 'center',
        lineHeight: 15,
        marginTop: 10
    },
    ResetPasswordTextInput: {
        color: globalColor.textTitleColor,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: globalColor.lightColor,
        borderRadius: 50,
        marginTop: 35,
        width: '100%',
    }
})

export default ResetPasswordStyles