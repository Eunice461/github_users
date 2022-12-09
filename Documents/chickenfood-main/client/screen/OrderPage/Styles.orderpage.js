import { StyleSheet } from 'react-native';
import { globalColor, globalFonts, globalFontsSize } from "../../Constant";

const OrderPageStyles = StyleSheet.create({
    OrderPageContainer:{
        flex: 1,
        
    },
    OrderPageView1: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 35,
        marginBottom: 20
    },

    OrderPageView2: {
        width: 10,
        height: 10,
        backgroundColor: globalColor.primaryColor,
        position: "absolute",
        borderRadius: globalFontsSize.extraLarge,
        alignItems: "center",
        justifyContent: "center",
        
    },
    OrderPageView3: {
       marginLeft: 30,
    },
    OrderPageText1: {
        color: globalColor.textTitleColor,
        fontFamily: globalFonts.MetropolisBold,
        fontSize: globalFontsSize.extraLarge,
        textAlign: "center",
        marginLeft: 40
    },
    OrderPageText2: {
        color: globalColor.subTextColor,
        fontFamily: globalFonts.MetropolisRegular,
        fontSize: globalFontsSize.small,
        marginTop: 10
    },
    OrderPageImage1: {
        width: 90, 
        height: 25
    }
})

export default OrderPageStyles