import { StyleSheet } from 'react-native';
import { globalColor, globalFonts, globalFontsSize } from "../../Constant";

const loginPageStyles = StyleSheet.create({
  loginPageContainer: {
        flex: 1,
        marginHorizontal: 20,
        
      },
      loginPageHeaderTitle:{
        color: globalColor.textTitleColor,
        fontFamily: globalFonts.MetropolisExtraBold,
        fontSize: globalFontsSize.extraLarge,
        textAlign: "center",
        marginTop: 120
      }, 
      loginPageSubHeaderTitle:{
        fontFamily: globalFonts.MetropolisMedium,
        fontSize: globalFontsSize.small,
        color: globalColor.statusBarColor1,
        textAlign: 'center',
        lineHeight: 15,
        marginTop: 10
        
      },
      loginPageForgotPassword:{
        fontFamily: globalFonts.MetropolisMedium,
        fontSize: globalFontsSize.small,
        color: globalColor.statusBarColor1,
        textAlign: "center",
        marginTop: 20
      },
      loginPageTitleLoginWith:{
        fontFamily: globalFonts.MetropolisMedium,
        fontSize: globalFontsSize.small,
        color: globalColor.statusBarColor1,
        textAlign: "center",
        marginTop: 50,
      },
      loginPageTextInput: {
        color: globalColor.textTitleColor,
        padding: 14,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: globalColor.lightColor,
        borderRadius: 50,
        marginTop: 35,
        width: '100%',
      },
      loginPageTouchableContainer: {
            width: "100%",
            position: "absolute",
            bottom: 50,
            paddingVertical: 14,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(255,255,255,0.5)",
            zIndex: 1,
      },
      loginPageTouchableWrapper:{
        minWidth: 170,
        color: globalColor.subTextColor,
        fontFamily: globalFonts.MetropolisBold,
        fontSize: globalFontsSize.font,
       
      },
      loginPageTouchableText: {
        fontFamily: globalFonts.MetropolisBold,
        color: globalColor.primaryColor, 
        fontSize:globalFontsSize.font,
        
      }
  });
  
  export default loginPageStyles