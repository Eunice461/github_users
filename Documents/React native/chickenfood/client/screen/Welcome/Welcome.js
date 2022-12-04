import { View, Text, SafeAreaView, Image, StyleSheet,  BackHandler, Alert} from "react-native"
import FocusedStatusBar from "../../Component/FocusedStatusBar/FocusedStatusbar";
import welcomePageStyles from "./style.welcome";
import { assets, globalColor, globalFontsSize, globalShadow,  } from "../../Constant";
import {Button} from "../../Component/Button/Button";
import { useNavigation, useRoute, useFocusEffect  } from "@react-navigation/native";
import { useEffect, useCallback } from "react";

//shodw can be adjusted per component
const shadowApply = globalShadow(-2, 4, '#171717', 0.2, 3, 4, '#171717');




const Welcome = ()=>{
    const route = useRoute();
    const routeName = route.name;


    const navigation = useNavigation();
//This useFocus alert the user when the use pressed the device hardware back button on this page, the user can confirm if to exit the page or not.
console.log(routeName, 'name')

useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
       
       Alert.alert('Hold on!', 'Are you sure you want to exit the app?', [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
          {text: 'YES', onPress: () => BackHandler.exitApp()},
        ]);
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );



    return (
      <SafeAreaView  style={welcomePageStyles.welcomePageSafeViewAreaContainer}>
        <FocusedStatusBar
             barStyle="light-content"
             backgroundColor="transparent"
             translucent={true}
        />


    <View style={[welcomePageStyles.welcomePageView1, shadowApply.customShadow]}>
        <Image style={{width: '100%', height: 440}}
            source={assets.innerDesign}
            resizeMode='cover'
        />

       <View style={welcomePageStyles.welcomePageSubView1}>

            <Image
                source={assets.logo}
                resizeMode='contain'
                style={welcomePageStyles.welcomePageImage1}
            />

       </View>

        
    </View>
    <View style={welcomePageStyles.welcomePageView2}>
            
            <View style={welcomePageStyles.welcomePageView2SubView1}>
 
                 <Text style={welcomePageStyles.welcomePageView2Text1}>
                     Chicken
                 </Text>
 
                 <Text style={welcomePageStyles.welcomePageView2Text2}>
                     Eat
                 </Text>
            </View>

                <Text style={welcomePageStyles.welcomePageView2Text3}>
                    Food Delivery Service
                </Text>

                <View style={welcomePageStyles.welcomePageView2SubView2}>
                            <Text style={welcomePageStyles.welcomePageView2Text4}>
                                We offer you all types of healthy fried chickens,noodles and chilled soft drink. We deliver to your doorstop at an affordable rate.
                                We are fast, we are reliable and we are committed to making your day a bliss. Let's get started
                            </Text>
                </View>
        </View> 

        <View style={{justifyContent: 'center', alignItems:'center', width: '100%'}}>
            
            <Button 
            backgroundColor={globalColor.primaryColor}
            minWidth={'80%'}
            text={'Login'}
            fontFamily={'MetropolisSemiBold'}
            fontSize={globalFontsSize.medium}
            textColor={globalColor.backgroundColor}
            handlePress={() => navigation.navigate("LoginPage")}
            />


            <Button 
                minWidth={'80%'}
                text={'Create an Account'}
                fontFamily={'MetropolisSemiBold'}
                fontSize={globalFontsSize.medium}
                backgroundColor={globalColor.backgroundColor}
                textColor={globalColor.primaryColor}
                buttonBorderColor={globalColor.primaryColor}
                buttonBorderWidth={2}
                handlePress={() => navigation.navigate("RegisterPage")}
                />
        </View>  
 
      </SafeAreaView>
    )
}


export default Welcome