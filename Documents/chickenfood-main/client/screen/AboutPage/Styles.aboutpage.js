import { StyleSheet } from 'react-native';
import { globalColor, globalFonts, globalFontsSize } from "../../Constant";

const aboutPageStyles = StyleSheet.create({
    aboutPageContainer: {
        flex: 1,
        marginHorizontal: 10
    },
    aboutPageView1:{
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 35,
        marginBottom: 20
    },
    aboutPageTouchable: {
        marginTop: 21
    },
    aboutPageView2:{
       flexDirection: 'row',
       padding: 5,
    },
    aboutPageView3:{
        width: 10,
        height: 10,
        backgroundColor: globalColor.primaryColor,
        position: "absolute",
        borderRadius: globalFontsSize.extraLarge,
        alignItems: "center",
        justifyContent: "center",
    },
    aboutPageView4:{

    },
    aboutPageText1:{
        color: globalColor.textTitleColor,
        fontFamily: globalFonts.MetropolisBold,
        fontSize: globalFontsSize.extraLarge,
        textAlign: "center",
        marginLeft: 40
    },
    aboutPageText2:{
        color: globalColor.subTextColor,
        fontFamily: globalFonts.MetropolisRegular,
        fontSize: globalFontsSize.small,
        marginTop: 17,
        marginLeft: 21,
        lineHeight: 15,
    },
    aboutPageImage1:{
        width: 90, 
        height: 25
    },
    
})

export default aboutPageStyles