import { StyleSheet } from 'react-native';
import { globalColor, globalFonts, globalFontsSize } from "../../Constant";

const ThankYouPageStyles = StyleSheet.create({
    thankyouContainer:{
        flex: 1,
        backgroundColor: 'rgba(0,0,0, 0.60)'
    },
    thankyouOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0, 0.60)' 
    },
    thankyouView1: {
        height: "100%",
        marginTop: 145,
        backgroundColor: globalColor.backgroundColor,
        borderRadius: 35,
    },
    thankyouView2: {
        marginHorizontal: 20,
        marginTop: 15
    },
    thankyouView3: {
       
    },
    thankyouText1: {
        fontFamily:globalFonts.MetropolisExtraBold,
        fontSize: globalFontsSize.large,
        textColor:globalColor.textTitleColor,
        textAlign: 'center',
        justifyContent: 'center',
    },
    thankyouText2: {
        fontFamily:globalFonts.MetropolisBold,
        fontSize: globalFontsSize.small,
        textColor:globalColor.subTextColor,
        textAlign: 'center',
        justifyContent: 'center',
        marginTop: 5
    },
    thankyouText3: {
        fontFamily:globalFonts.MetropolisRegular,
        fontSize: globalFontsSize.small,
        textColor:globalColor.textTitleColor,
        textAlign: 'center',
        justifyContent: 'center',
        marginTop: 5,
        lineHeight: 15,
    },
    thankyouText4: {
        fontFamily:globalFonts.MetropolisBold,
        fontSize: globalFontsSize.font,
        textColor:globalColor.backgroundColor,
        textAlign: 'center',
        justifyContent: 'center',
        padding: 15
       
    },
    thankyouIMage1: {
        height: '100%',
        width: '100%',  
    },
    thankyouIMage2: {
            width: 25,
            height: 25,
            marginLeft: "90%"
    },
    thankyouIMage3: {
        height: '55%', 
        width: "87%",    
},
})


export default ThankYouPageStyles 