import { StyleSheet } from "react-native";
import { globalColor, globalFonts, globalFontsSize } from "../../Constant";




const recentPostStyles = StyleSheet.create({
    mainContainer:{
        with:  '100%',
        flexDirection: 'row',
        height: 100,
       
    },
    recentImage:{
        width: '30%',
        height: '80%',
        borderRadius: 10,
        marginLeft: 20
    },

    recentPostText1:{
        fontFamily: globalFonts.MetropolisMedium,
        fontSize: globalFontsSize.medium,
        color: globalColor.textTitleColor,
        marginLeft: 15
       
    },

    recentPostLikeBTN:{
        width: 13,
        height: 13,
        marginLeft: 15,
       
    },
    recentPostView2:{
       flexDirection: 'column',
        width: '100%',
    },

    recentPostView2Subview1:{
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5

    },

    recentPostText2:{
        fontFamily: globalFonts.MetropolisMedium,
        color: globalColor.subTextColor,
        fontSize: globalFontsSize.small,
        marginHorizontal: 3
    },
});


export default recentPostStyles