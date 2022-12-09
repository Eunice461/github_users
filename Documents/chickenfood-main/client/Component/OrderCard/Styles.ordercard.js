import { StyleSheet } from 'react-native';
import { globalColor, globalFonts, globalFontsSize } from "../../Constant";

const OrderCardStyles = StyleSheet.create({
    orderCardContainer:{
        flex: 1,
        padding: 1
    },
    orderCardView1:{
        marginTop: 20,
        flexDirection: "row",
        marginLeft: 15
    },
    orderCardView2:{
        marginLeft: 10
    },
    orderCardView3:{
        flexDirection: "row",
    },
    orderCardView4:{
        flexDirection: "row",
    },
    orderCardView5:{
        marginTop: 20,
        backgroundColor: globalColor.lightColor,
        height: "35%"
    },
    orderCardView6:{
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 15,
        marginTop: 15
    },
    orderCardView7:{
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 15,
        marginTop: 15
    },
    orderCardView8:{
        marginTop: 15
    },
    orderCardView9:{
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 15,
        marginTop: 12
    },
    orderCardView10:{
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 15,
        marginTop: 25
    },
    orderCardViewbrLine:{
        borderBottomColor: globalColor.subTextColor,
        borderBottomWidth: 0.4,
        marginTop: 15
    },
    orderCardText1:{
        color: globalColor.textTitleColor,
        fontFamily: globalFonts.MetropolisExtraBold,
        fontSize: globalFontsSize.font,
    },
    orderCardText2:{
        color: globalColor.subTextColor,
        fontFamily: globalFonts.MetropolisBold,
        fontSize: globalFontsSize.small,
        marginTop: 5
    },
    orderCardText3:{
        color: globalColor.primaryColor,
        fontFamily: globalFonts.MetropolisExtraBold,
        fontSize: globalFontsSize.small,
        marginTop: 5
    },
    orderCardText4:{
        color: globalColor.subTextColor,
        fontFamily: globalFonts.MetropolisBold,
        fontSize: globalFontsSize.small,
        marginTop: 5
    },
    orderCardText5:{
        color: globalColor.subTextColor,
        fontFamily: globalFonts.MetropolisBold,
        fontSize: globalFontsSize.small,
        marginTop: 5
    },
    orderCardText6:{
        color: globalColor.textTitleColor,
        fontFamily: globalFonts.MetropolisRegular,
        fontSize: globalFontsSize.font,
    },
    orderCardText7:{
        color: globalColor.textTitleColor,
        fontFamily: globalFonts.MetropolisBold,
        fontSize: globalFontsSize.font,
    },
    orderCardText8:{
        color: globalColor.textTitleColor,
        fontFamily: globalFonts.MetropolisBold,
        fontSize: globalFontsSize.small,
    },
    orderCardText9:{
        color: globalColor.primaryColor,
        fontFamily: globalFonts.MetropolisBold,
        fontSize: globalFontsSize.small,
    },
    orderCardText10:{
        color: globalColor.textTitleColor,
        fontFamily: globalFonts.MetropolisBold,
        fontSize: globalFontsSize.small,
    },
    orderCardText11:{
        color: globalColor.primaryColor,
        fontFamily: globalFonts.MetropolisBold,
        fontSize: globalFontsSize.small,
    },
    orderCardText12:{
        color: globalColor.primaryColor,
        fontFamily: globalFonts.MetropolisBold,
        fontSize: globalFontsSize.large,
    },
    orderCardImage1:{
        width: 120, 
        height: 100,
        borderRadius: 15
    },
    orderCardImage2:{
        width: 15, 
        height: 20
    },
})

export default OrderCardStyles