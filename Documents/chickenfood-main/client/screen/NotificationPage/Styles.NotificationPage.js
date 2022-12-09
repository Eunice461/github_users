import { StyleSheet } from 'react-native';
import { globalColor, globalFonts, globalFontsSize } from "../../Constant";

const NotificationPageStyles = StyleSheet.create({
    notificationPageContainer:{
        flex: 1,
        
    },
    notificationPageView1: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 35,
        marginBottom: 20
    },

    notificationPageView2: {
        width: 10,
        height: 10,
        backgroundColor: globalColor.primaryColor,
        position: "absolute",
        borderRadius: globalFontsSize.extraLarge,
        alignItems: "center",
        justifyContent: "center",
        
    },
    notificationPageView3: {
       marginLeft: 30,
    },
    notificationPageText1: {
        color: globalColor.textTitleColor,
        fontFamily: globalFonts.MetropolisBold,
        fontSize: globalFontsSize.extraLarge,
        textAlign: "center",
        marginLeft: 40
    },
    notificationPageText2: {
        color: globalColor.subTextColor,
        fontFamily: globalFonts.MetropolisRegular,
        fontSize: globalFontsSize.small,
        marginTop: 10
    },
    notificationPageImage1: {
        width: 90, 
        height: 25
    }
})

export default NotificationPageStyles