import { StyleSheet } from "react-native";
import { globalColor, globalFonts, globalFontsSize } from "../../Constant";



const welcomePageStyles = StyleSheet.create({
    welcomePageSafeViewAreaContainer:{
        flex: 1,

    },

    welcomePageView1:{
        width: '100%',       
        top: 0,
        bottom: 0,
        backgroundColor: '#FC7632',
        height: 440,
        flexDirection: 'row',
        justifyContent: 'center',
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20
       
      
    },

    welcomePageImage1:{
      width: 100,
      position: 'absolute',

     
    },

    welcomePageSubView1:{
        backgroundColor: globalColor.backgroundColor,
        position: 'absolute',
        top: 320,
        borderRadius: 70,
        width: 150,
        height: 150,
        justifyContent: 'center',
        alignItems: 'center' 
    },

    welcomePageView2:{
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,    
    },

    welcomePageView2SubView1:{
        width: '100%', 
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },

    welcomePageView2Text1:{
        color: globalColor.primaryColor,
        fontFamily: globalFonts.MetropolisExtraBold,
        fontSize: globalFontsSize.extraLarge
    },

    welcomePageView2Text2:{
        color: globalColor.textTitleColor,
        fontFamily: globalFonts.MetropolisExtraBold,
        fontSize: globalFontsSize.extraLarge,
        marginLeft: 5
    },

    welcomePageView2Text3:{
        color: globalColor.subTextColor,
        fontFamily: globalFonts.MetropolisBold,
        fontSize: globalFontsSize.base,
        marginTop: 5
    },
    
    welcomePageView2SubView2:{
        width: '80%',
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },

    welcomePageView2Text4:{
        fontFamily: globalFonts.MetropolisRegular,
        fontSize: globalFontsSize.base,
        textAlign: 'center',
        lineHeight: 15
    }

})


export default welcomePageStyles