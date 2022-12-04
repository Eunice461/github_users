import { StyleSheet } from "react-native"
//controls color globally


export const globalColor={
    primaryColor: "#FC6011",
    backgroundColor: '#FFFFFF',
    textTitleColor: '#4A4B4D',
    subTextColor: '#7C7D7E',
    statusBarColor1: "#545557",
    statusBarColor2: "#FEFEFE",
    statusBarColor3: "#D35400",
    placeHolderColor: "#B6B7B7",
    lightColor: "#F2F2F2",
    darkColor: "#DD4938"

}



export const globalFonts = {
    MetropolisExtraBold: "MetropolisExtraBold",
    MetropolisBold: "MetropolisBold",
    MetropolisMedium: "MetropolisMedium",
    MetropolisRegular: "MetropolisRegular",
    MetropolisSemiBold: " MetropolisSemiBold"
}


export const globalFontsSize={
    base: 8,
    small: 12,
    font: 14,
    medium: 16,
    large: 18,
    extraLarge: 24,
}


//for shadow application on andriod and ios
export const globalShadow =(

    xOffset,
    yOffset,
    shadowColorIos,
    shadowOpacity,
    shadowRadius,
    elevation,
    shadowColorAndroid,
 
)=>{
    if (Platform.OS === 'ios'){
       const shadowNow = StyleSheet.create({
            customShadow:{
                shadowColor: shadowColorIos,
                shadowOffset: {width: xOffset, height: yOffset},
                shadowOpacity,
                shadowRadius,
            }
        })
    
        return shadowNow
    }
    else{
        if (Platform.OS === 'android'){
            const shadowNow = StyleSheet.create({
                customShadow:{
                    elevation,
                    shadowColor: shadowColorAndroid,
                   
                }
            })

            return shadowNow
        }
    }
}



