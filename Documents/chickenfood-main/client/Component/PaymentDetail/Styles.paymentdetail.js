import { StyleSheet } from 'react-native';
import { globalColor, globalFonts, globalFontsSize } from "../../Constant";

const PaymentDetailStyles = StyleSheet.create({
    PaymentDetailontainer: {
        flex: 1,
    },
    PaymentDetailView1:{
        marginHorizontal: 20,
    },
    PaymentDetailView2:{
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 25,
    },
    PaymentDetailView3:{
        marginTop: 15
    },
    PaymentDetailView4:{  
        backgroundColor: globalColor.lightColor,
        marginTop: 30,
    },
    PaymentDetailView41:{  
        padding: 20,
        marginHorizontal: 30,
    },
    PaymentDetailView5:{
        flexDirection: "row",
        marginTop: 20,
    },
    PaymentDetailView6:{
        height: 90,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"
    },
    PaymentDetailView7:{
        
        marginTop: 20,
    },
    PaymentDetailBrLine:{
        borderBottomColor: globalColor.subTextColor,
        borderBottomWidth: 1,
        marginTop: 25
        
    }, 
    PaymentDetailImage1: {
        width: 90, 
        height: 25
    },
    PaymentDetailImage2: {

    },
    PaymentDetailText1 : {
        color: globalColor.textTitleColor,
        fontFamily: globalFonts.MetropolisBold,
        fontSize: globalFontsSize.extraLarge,
        textAlign: "center",
        marginLeft: 40
    },
    PaymentDetailText2 : {
        color: globalColor.textTitleColor,
        fontFamily: globalFonts.MetropolisRegular,
        fontSize: globalFontsSize.font,
        marginTop: 10,
    
    },
    PaymentDetailText3 : {
        color: globalColor.textTitleColor,
        fontFamily: globalFonts.MetropolisBold,
        fontSize: globalFontsSize.font,
        // marginLeft: 25
    },
    PaymentDetailText4: {
        color: globalColor.textTitleColor,
        fontFamily: globalFonts.MetropolisRegular,
        fontSize: globalFontsSize.small,
        textAlign: "center",
        marginTop: 5,
    },
    PaymentDetailText5: {
        color: globalColor.textTitleColor,
        fontFamily: globalFonts.MetropolisBold,
        fontSize: globalFontsSize.font,
        // marginLeft: 25
    },
    PaymentDetailTouchable1: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        fontFamily:'MetropolisSemiBold',
        fontSize:globalFontsSize.medium,
        textColor:globalColor.primaryColor,
        borderColor:globalColor.primaryColor,
        borderWidth:2,
        borderRadius: 35,
    }
})

export default PaymentDetailStyles