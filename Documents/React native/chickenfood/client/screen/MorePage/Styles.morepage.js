import { StyleSheet } from 'react-native';
import { globalColor, globalFonts, globalFontsSize } from "../../Constant";

const morePageStyles = StyleSheet.create({
    morePageContainer: {
        flex: 1,
    },
   morePageView1 : {
    marginHorizontal: 25,
    },
    morePageView2 : {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 20,
     },
     morePageView3 : {
        flexDirection: "row",
        width: "100%",
        marginTop: 30,
     },
     morePageView4 : {
        flexDirection: "row",
        width:"95%",
        height: 80,
        borderRadius: 10,
        backgroundColor: globalColor.lightColor,
       
     },
     morePageView31: {
        marginVertical: 25,
        width: 20,
        height: 20,
        borderRadius: 50,
        backgroundColor: globalColor.lightColor,
        alignItems: "center",
        justifyContent: "center",
        marginLeft: -5
     },
     morePageView41 : {
        marginVertical: 25,
        width: 25,
        height: 25,
        borderRadius: 35,
        marginLeft: "55%",
        backgroundColor: "red",
        alignItems: "center",
        justifyContent: "center"
      },
      morePageView41Text:{
        color: globalColor.backgroundColor,
        fontSize: globalFontsSize.small,
        fontFamily: globalFonts.MetropolisBold,
      },
     morePageView5: {
        top: "30%",
     },
     morePageText1: {
        color: globalColor.textTitleColor,
        fontFamily: globalFonts.MetropolisExtraBold,
        fontSize: globalFontsSize.extraLarge,
        textAlign: "center",
     }, 
     morePageText2:{
        marginLeft: 80,
        marginVertical: 25,
        color: globalColor.subTextColor,
        fontFamily: globalFonts.MetropolisBold,
        fontSize: globalFontsSize.font,
        textAlign: "center",
     },
     morePageImage1: {
        width: 90, 
        height: 25
     },
     morePageImage2: {
        borderRadius: 50,
        width: 15, 
        height: 15
     },

})

export default morePageStyles