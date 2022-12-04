import {  StyleSheet } from "react-native";
import { globalColor, globalFonts, globalFontsSize } from "../../Constant";

const NewPasswordStyles = StyleSheet.create({
    newPasswordContainer: {
        flex: 1,
        marginHorizontal: 30,
    },
    newPasswordText1: {
        color: globalColor.textTitleColor,
        fontFamily: globalFonts.MetropolisExtraBold,
        fontSize: globalFontsSize.extraLarge,
        textAlign: "center",
        marginTop: 70
    },
    newPasswordText2: {
        fontFamily: globalFonts.MetropolisMedium,
        fontSize: globalFontsSize.small,
        color: globalColor.statusBarColor1,
        textAlign: 'center',
        lineHeight: 15,
        marginTop: 10
    },
    newPasswordTextInput: {
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

export default NewPasswordStyles