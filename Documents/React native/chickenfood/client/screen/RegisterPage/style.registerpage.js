import { StyleSheet } from 'react-native';
import { globalColor, globalFonts, globalFontsSize } from "../../Constant";

const registerPageStyles = StyleSheet.create({
  registerPageContainer: {
        flex: 1,
        marginHorizontal: 20,
      },
      registerPageHeaderTitle:{
        color: globalColor.textTitleColor,
        fontFamily: globalFonts.MetropolisExtraBold,
        fontSize: globalFontsSize.extraLarge,
        textAlign: "center",
        marginTop: 30
      }, 
      registerPageSubHeaderTitle:{
        fontFamily: globalFonts.MetropolisMedium,
        fontSize: globalFontsSize.small,
        color: globalColor.statusBarColor1,
        textAlign: 'center',
        lineHeight: 15,
        marginTop: 10
      },
    
      registerPageTextInput: {
        color: globalColor.textTitleColor,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: globalColor.lightColor,
        borderRadius: 50,
        marginTop: 35,
        width: '100%',
      },
      registerPageTouchableContainer: {
            width: "100%",
            position: "absolute",
            bottom: 50,
            paddingVertical: 14,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(255,255,255,0.5)",
            zIndex: 1,
      },
      registerPageTouchableWrapper:{
        minWidth: 170,
        color: globalColor.subTextColor,
        fontFamily: globalFonts.MetropolisBold,
        fontSize: globalFontsSize.font,
      },
      registerPageTouchableText: {
        fontFamily: globalFonts.MetropolisBold,
        color: globalColor.primaryColor, 
        fontSize:globalFontsSize.font,
      }
  });
  
  export default registerPageStyles