import { StyleSheet } from 'react-native';
import { globalColor, globalFonts, globalFontsSize } from "../../Constant";

const CheckoutCardStyles = StyleSheet.create({
    checkoutContainer:{
    },
    checkoutView1:{
        backgroundColor: globalColor.backgroundColor,
        padding: 25
    },
    checkoutView2:{
        flexDirection: "row",
        justifyContent: "space-between",
    },
    checkoutView3Main:{
        marginTop: 10,
        backgroundColor: globalColor.backgroundColor,
        padding: 25
    },
    checkoutView3:{
        flexDirection: "row",
        justifyContent: "space-between",
    },
    checkoutView4:{
        marginTop: 5
    },
    checkoutView5:{

    },
    checkoutView6:{

    },
    checkoutView7:{
        marginTop: 10,
        backgroundColor: globalColor.backgroundColor,
        padding: 25
    },
    checkoutView8:{
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10
    },
    checkoutView9:{
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 25
    },
    checkoutText1:{
        color: globalColor.textTitleColor,
        fontFamily: globalFonts.MetropolisRegular,
        fontSize: globalFontsSize.small,
        marginTop: 30
    },
    checkoutText2:{
        color: globalColor.textTitleColor,
        fontFamily: globalFonts.MetropolisBold,
        fontSize: globalFontsSize.font,
        lineHeight: 25,
    },
    checkoutText3:{
        color: globalColor.primaryColor,
        fontFamily: globalFonts.MetropolisBold,
        fontSize: globalFontsSize.font,
        marginTop: 25
    },
    checkoutText4:{
        color: globalColor.textTitleColor,
        fontFamily: globalFonts.MetropolisRegular,
        fontSize: globalFontsSize.small,
    },
    checkoutText5:{
        color: globalColor.primaryColor,
        fontFamily: globalFonts.MetropolisBold,
        fontSize: globalFontsSize.font,
    },
    checkoutText6:{
        
    },
    checkoutText7:{
        color: globalColor.textTitleColor,
        fontFamily: globalFonts.MetropolisBold,
        fontSize: globalFontsSize.small,
    },
    checkoutText8:{
        color: globalColor.textTitleColor,
        fontFamily: globalFonts.MetropolisBold,
        fontSize: globalFontsSize.small,
    },
    checkoutImage1:{

    },
    checkoutButton:{
        marginTop: 10,
        backgroundColor: globalColor.backgroundColor,
        padding: 15
    },

})

export default CheckoutCardStyles