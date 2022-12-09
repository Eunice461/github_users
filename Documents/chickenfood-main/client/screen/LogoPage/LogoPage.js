import React, {useContext, useEffect, useRef, useState} from "react";
import { View, Text, SafeAreaView, Image, Animated } from "react-native";
import FocusedStatusBar from "../../Component/FocusedStatusBar/FocusedStatusbar";
import { assets, globalFonts, globalColor } from "../../Constant";
import logoPageStyles from "./style.logopage";
import {AnimatedMoveY,  CustomOpacityAnimation} from "../../Component/Animations/Animation";
import { useNavigation,} from "@react-navigation/native";





//You can customize the animation component properties here per component. Just change the corresponding values to whatever you like and that would be passed to the animation component as props
const setProperties ={
    translateYInitialValue: 25,
    opacityInitialValue: 0,
    animationDuration: 500,
    opacityEndValue: 1,
    translateYEndValue: -0
}

const LogoPage = ()=>{

      
const navigation = useNavigation();

useEffect(()=>{
    
        const moveToLogin = ()=>{
            setTimeout(() => {
              navigation.navigate("Welcome")
            }, 2000);
          }
        
          moveToLogin()
      
      
    }, [])




    return (
        <SafeAreaView style={logoPageStyles.safeAreaViewContainer}>
        
           <FocusedStatusBar  
            barStyle="dark-content"
            backgroundColor="transparent"
            translucent={true}
          
            />
       

        
            <View style={logoPageStyles.logoPageView1} >
               <CustomOpacityAnimation
                opacityInitialValue={setProperties.opacityInitialValue}
                opacityEndValue={setProperties.opacityEndValue}
               >
                <Image
                        source={assets.backgrounnd1}
                        resizeMode='cover'
                        style={logoPageStyles.logoPageView1Image1}
                    />
               </CustomOpacityAnimation>
            </View>  

            <View style={logoPageStyles.logPageView2}>
              <Image
                    source={assets.logo}
                    resizeMode='center'
                    style={logoPageStyles.logoPageView2Logo}
                />
                
               
               {/* wrapp a view on the custom animation component and place your react native component elements    */}
                <View style={logoPageStyles.logoPageSubTextView}>
                        <AnimatedMoveY translateYInitialValue={setProperties.translateYInitialValue}
                            customOpacityInitialValue={setProperties.opacityInitialValue}
                            animationDuration={setProperties.animationDuration}
                            opacityEndValue={setProperties.opacityEndValue}
                            translateYEndValue={setProperties.translateYEndValue}
                        >
                            <View style={logoPageStyles.logoPageSubTextView2}>
                                <Text style={logoPageStyles.logoPageText1}>
                                    Chicken 
                                </Text>
                                <Text style={logoPageStyles.logoPageText2}>
                                Eat
                                </Text>
                            </View>

                            <View style={logoPageStyles.logoPageSubTextView3}>
                                <Text style={logoPageStyles.logoPageText3}>
                                    Food delivery service
                                </Text>
                            </View>
                        </AnimatedMoveY>
             
                  
                

                  </View>
                  
              </View>

             

        </SafeAreaView>
        
    )
}


export default LogoPage