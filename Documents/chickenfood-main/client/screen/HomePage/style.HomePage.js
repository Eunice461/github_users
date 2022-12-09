import { StyleSheet } from "react-native";
import { globalColor, globalFonts, globalFontsSize } from "../../Constant";




const homePageStyles = StyleSheet.create({

    safeAreaViewContainer:{
        flex:1,
       
    },
    homePageMainView:{
        width: '100%',
        height: '100%',  
        paddingBottom: 350      
    },

    homePageSubView1:{
        top: 35,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 23,
    },

    homeCartTouchOpacity:{
        width: 30,
        height: 30,
        marginRight: 3
    },

    homePageSubViewText1:{
        fontFamily: globalFonts.MetropolisExtraBold,
        fontSize: globalFontsSize.large,
        color: globalColor.textTitleColor
    },
    homePageSubViewImage1:{
        width: '80%',
        height: '60%',
        
    },
  
   homePageSubView2:{
        width: '100%',
        top: 30,
       
   },

   homePageSubViewText2:{
     marginHorizontal: 25,
     fontFamily: globalFonts.MetropolisBold,
     color: globalColor.textTitleColor,
     fontSize: globalFontsSize.large,
     marginTop: 5,
     paddingBottom: 20
   },
   homePageComponentSliderView:{
    marginVertical: 20,
    flexDirection: 'row'
}
});




export default homePageStyles