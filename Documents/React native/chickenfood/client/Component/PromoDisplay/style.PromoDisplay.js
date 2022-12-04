import { StyleSheet } from "react-native";
import { globalColor, globalFonts, globalFontsSize } from "../../Constant";




const promoDisplayStyles = StyleSheet.create({

    SafeViewAreaConatainer:{
        flex: 1,
        marginHorizontal: 20
    },

    promoScreen1View1:{
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },

    promoScreen1View1Image1:{
        height: '45%', 
        width: "87%",        
    },
    promoScreen1View1SubView1:{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center'
    },

   promoScreen1View1SubView2:{
        width: '100%',
        alignItems: 'center',
        marginTop: 25,
        paddingBottom: 15
   },

   promoScreen1View1SubView2Text1:{
        fontFamily: globalFonts.MetropolisExtraBold,
        fontSize: globalFontsSize.extraLarge,
        color: globalColor.textTitleColor
   },

   promoScreen1View1SubView2Text2:{
        color: globalColor.subTextColor,
        fontFamily: globalFonts.MetropolisBold,
        fontSize: globalFontsSize.small,
        marginTop: 20,
        textAlign: 'center',
        width: '80%'
   }

});




export default promoDisplayStyles