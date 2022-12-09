import { StyleSheet } from "react-native";
import { globalColor, globalFonts, globalFontsSize } from "../../Constant";





const sliderStyles = StyleSheet.create({
        sliderMainContainer:{
            flex: 1,
            flexDirection: 'row',
            marginLeft: 5,           
        },

        sliderImageStyles:{
            width: 120, 
            height: 60,
        },
    

        sliderViewText1:{
            fontFamily: globalFonts.MetropolisMedium,
            paddingVertical: 5,
            fontSize: globalFontsSize.small,
            color: globalColor.textTitleColor
        }
});



export default sliderStyles