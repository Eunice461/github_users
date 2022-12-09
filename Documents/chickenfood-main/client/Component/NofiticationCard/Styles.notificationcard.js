import { StyleSheet } from 'react-native';
import { globalColor, globalFonts, globalFontsSize } from "../../Constant";

const NotificationCardStyles = StyleSheet.create({
    notificationCardContainer:{
        flex: 1,
        margin: 8,
        marginHorizontal: 20
    },
    notificationCardView1: {
        flexDirection: "row",
        padding: 5,
        
    },
    notificationCardTouchable1: {
        margin: 2
    },
    notificationCardView2: {
        width: 10,
        height: 10,
        backgroundColor: globalColor.primaryColor,
        position: "absolute",
        borderRadius: globalFontsSize.extraLarge,
        alignItems: "center",
        justifyContent: "center",
        
    },
    notificationCardView3: {
       marginLeft: 30,
    },
    notificationCardbrLine: {
        borderBottomColor: globalColor.lightColor,
        borderBottomWidth: 1,
       
    },
    notificationCardText1: {
        olor: globalColor.textTitleColor,
        fontFamily: globalFonts.MetropolisBold,
        fontSize: globalFontsSize.font,
    },
    notificationCardText2: {
        olor: globalColor.subTextColor,
        fontFamily: globalFonts.MetropolisRegular,
        fontSize: 10,
        marginTop: 10
    },
})

export default NotificationCardStyles