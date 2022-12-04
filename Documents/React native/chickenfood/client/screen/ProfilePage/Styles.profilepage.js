import { StyleSheet } from 'react-native';
import { globalColor, globalFonts, globalFontsSize } from "../../Constant";

const profilePageStyles = StyleSheet.create({
    profilePageContainer: {
        flex: 1,
    },
    profilePageView1:{
        marginHorizontal: 20,
    },
    profilePageView2:{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 20,
    },
    profilePageView3:{
        justifyContent:"center",
        alignItems: "center",
        marginTop: 25,
    },
    profilePageView4:{
        marginTop: 20,
    },
    profilePageView41:{
        color: globalColor.textTitleColor,
        padding: 14,
        paddingHorizontal: 30,
        paddingVertical: globalFontsSize.small - 2,
        marginTop: 15,
        justifyContent: 'center',
        backgroundColor: globalColor.lightColor,
        borderRadius: 50,
        width: '100%',
    },
    
    profilePageView5 : {
        marginTop: "30%"
    },
    profilePageImage1: {
        width: 90, 
        height: 25
    },
    profilePageImage2: {

    },
    profilePageText1 : {
        color: globalColor.textTitleColor,
        fontFamily: globalFonts.MetropolisExtraBold,
        fontSize: globalFontsSize.extraLarge,
        textAlign: "center",
    },
    profilePageText2 : {
        color: globalColor.primaryColor,
        fontFamily: globalFonts.MetropolisBold,
        fontSize: globalFontsSize.small,
        textAlign: "center",
        marginTop: 10
    },
    profilePageText3 : {
        color: globalColor.textTitleColor,
        fontFamily: globalFonts.MetropolisBold,
        fontSize: globalFontsSize.font,
        textAlign: "center",
        marginTop: 10
    },
    profilePageText4: {
        color: globalColor.textTitleColor,
        fontFamily: globalFonts.MetropolisRegular,
        fontSize: globalFontsSize.small,
        textAlign: "center",
        marginTop: 5
    },
    profilePageText5: {

    },
    profilePageTextInput1: {
        
    }
})

export default profilePageStyles