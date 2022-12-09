import { View, Text, SafeAreaView, Image, StyleSheet, StatusBar } from "react-native";
import FocusedStatusBar from "../../Component/FocusedStatusBar/FocusedStatusbar";
import promoDisplayStyles from "./style.PromoDisplay";
import { assets, globalColor, globalFontsSize,} from "../../Constant";
import { Button, MoveBackArrow, RadiusButton } from "../../Component/Button/Button";
import { useNavigation } from "@react-navigation/native";





const PromoDisplay = (props)=>{
    const navigation = useNavigation();

  


    return (
        <SafeAreaView style={promoDisplayStyles.SafeViewAreaConatainer}>
            <FocusedStatusBar
                 barStyle="dark-content"
                 backgroundColor="transparent"
                 translucent={true}
            />
        
        <MoveBackArrow
            imgUrl={assets.left}
            top={StatusBar.currentHeight + 30}
            handlePress={props.handlePress}
           
        />
       
        
          <View style={promoDisplayStyles.promoScreen1View1}>
            
                <Image r
                    source={props.promoScreen1Image}
                    resizeMode='contain'
                    style={[promoDisplayStyles.promoScreen1View1Image1, {marginRight: props.marginRight, marginLeft: props.marginLeft, ...props}]}
                />

                <View style={promoDisplayStyles.promoScreen1View1SubView1}>
                   <RadiusButton backgroundColor={props.focusedColor}
                      
                   />
                   <RadiusButton backgroundColor={props.nextFocusedColor}
                    handlePress={() => navigation.goBack()}
                   />
                   <RadiusButton backgroundColor={props.lastFocusedColor}
                    handlePress={() => navigation.goBack()}
                   />
                </View>

               <View style={promoDisplayStyles.promoScreen1View1SubView2}>
                    <Text style={promoDisplayStyles.promoScreen1View1SubView2Text1} >
                        {props.pageTitle}
                    </Text>

                    <Text style={promoDisplayStyles.promoScreen1View1SubView2Text2} >
                      {props.description}
                    </Text>
               </View>

               <Button
                minWidth={'80%'}
                text={props.text}
                fontFamily={'MetropolisSemiBold'}
                fontSize={globalFontsSize.medium}
                textColor={globalColor.backgroundColor}
                backgroundColor={globalColor.primaryColor}
                handlePress={() => navigation.navigate(props.navigate)}
               />
          </View>


        </SafeAreaView>
    )
}


export default PromoDisplay