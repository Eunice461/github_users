import { View, Text, SafeAreaView, TextInput, TouchableOpacity, StatusBar } from 'react-native'
import React, { useState } from 'react'
import {Button, MoveBackArrow} from '../../Component/Button/Button'
import loginPageStyles from './style.loginpage'
import { useNavigation } from '@react-navigation/native'
import FocusedStatusBar from "../../Component/FocusedStatusBar/FocusedStatusbar";
import { assets, globalColor, globalFontsSize } from '../../Constant'

const LoginPage = () => {

    const [email, setUserEmail] = useState("");
    const [password, setUserPassword] = useState("");

    const navigation = useNavigation()

    const loginPress = (e) => {
        e.prevenDefualt
    }
  return (
    <SafeAreaView style={loginPageStyles.loginPageContainer}>

<FocusedStatusBar  
            barStyle="dark-content"
            backgroundColor="transparent"
            translucent={true}
          
            />
        <MoveBackArrow
            imgUrl={assets.left}
            top={StatusBar.currentHeight + 50}
            handlePress={() => navigation.goBack()}
        />
         
         
        

            <Text style={loginPageStyles.loginPageHeaderTitle}>Login</Text>
            <Text style={loginPageStyles.loginPageSubHeaderTitle}>Add your details to login</Text>
            <View>
               <View>
               <TextInput 
               style={loginPageStyles.loginPageTextInput} 
               placeholder='Your Email'
               onChangeText={newText => setUserEmail(newText)}
               defaultValue={email}
               />
               <TextInput 
               style={loginPageStyles.loginPageTextInput} 
               placeholder='Password' 
               secureTextEntry
               onChangeText={newText => setUserPassword(newText)}
               defaultValue={password}
               />
               </View>
                <Button 
                 text={'Login'}
                 fontFamily={'MetropolisSemiBold'}
                 fontSize={globalFontsSize.medium}
                 backgroundColor={globalColor.primaryColor}
                 textColor={globalColor.backgroundColor}
                 handlePress={() => navigation.navigate("PromoScreen1")}
                />
                <TouchableOpacity onPress={() => navigation.navigate("ChooseResetMethod")}>
                <Text style={loginPageStyles.loginPageForgotPassword}>Forgot your password?</Text>
                </TouchableOpacity>
            </View>
            <View>
                <Text style={loginPageStyles.loginPageTitleLoginWith}>or Login With</Text>
               <Button 
                fontFamily={'MetropolisSemiBold'}
                fontSize={globalFontsSize.medium}
                backgroundColor={globalColor.darkColor}
                text="G+   Login with Goggle"
                textColor={globalColor.backgroundColor}
                />
                
            </View>
            <View style={loginPageStyles.loginPageTouchableContainer}>
                <Text style={loginPageStyles.loginPageTouchableWrapper}>Dont have an Account? 
                        <Text style={loginPageStyles.loginPageTouchableText} onPress={() => navigation.navigate("RegisterPage")}> Sign up</Text>
                </Text>
            </View>
    </SafeAreaView>
  )
}

export default LoginPage