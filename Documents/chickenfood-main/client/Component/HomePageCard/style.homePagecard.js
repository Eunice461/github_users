import { StyleSheet } from "react-native";
import { globalColor, globalFonts, globalFontsSize } from "../../Constant";




const homePageComponentStyles = StyleSheet.create({
    mainView:{
        flex: 1,
      

    },
    homePageComponentImage:{
        width: '100%', 
        height: 180,
    },
    homePageComponentText:{
        fontFamily: globalFonts.MetropolisMedium,
        fontSize: globalFontsSize.medium,
        color: globalColor.textTitleColor,
       
    },
    homePageComponentSubView1:{
        width: '100%',
        paddingTop: 5,
        paddingBottom: 5,
        marginHorizontal: 20,
    },
    homePageComponentLikeBTN:{
        width: 13,
        height: 13,
       
    },
    homePageComponentSubView1SubView1:{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingBottom: 20
      
    },
    homePageComponentText2:{
        fontFamily: globalFonts.MetropolisMedium,
        color: globalColor.subTextColor,
        fontSize: globalFontsSize.small,
        marginHorizontal: 3
    },
  
});


export default homePageComponentStyles