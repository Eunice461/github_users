import { BackHandler, ImageBackground, StyleSheet } from "react-native";
import { globalColor, globalFonts, globalFontsSize } from "../../Constant";



const logoPageStyles = StyleSheet.create({
    safeAreaViewContainer:{
        flex: 1
    },

    logoPageView1:{
        width: '100%',
        position: 'absolute',
        bottom: 0,
        top: 0
    },

    logoPageView1Image1:{
        width: '100%',
        height: '100%',      
    },
    
    logPageView2:{
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    logoPageView2Logo:{
        width: '100%',
      
     },
 
    logoPageSubTextView:{
        width: '100%',
        flexDirection: 'row',
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        bottom: 280,
    },
   
   
    logoPageSubTextView2:{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center'
    },

    logoPageSubTextView3:{
        width: '100%',
        alignItems: 'center'
    },

    logoPageText1:{
        color: globalColor.primaryColor,
        fontFamily: globalFonts.MetropolisExtraBold,
        fontSize: globalFontsSize.extraLarge
    },

    logoPageText2:{
        color: globalColor.textTitleColor,
        fontFamily: globalFonts.MetropolisExtraBold,
        marginLeft: 5,
        fontSize: globalFontsSize.extraLarge
    },
    logoPageText3:{
        color: globalColor.subTextColor,
        fontFamily: globalFonts.MetropolisBold,
        fontSize: globalFontsSize.base,
        marginTop: 5
    }
});



export default logoPageStyles