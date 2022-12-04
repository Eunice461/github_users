import { View, Text, SafeAreaView, TextInput, TouchableOpacity, StatusBar } from 'react-native'
import React, { useState } from "react";
import {Button, MoveBackArrow} from '../../Component/Button/Button'
import registerPageStyles from './style.registerpage'
import { useNavigation } from '@react-navigation/native'
import FocusedStatusBar from '../../Component/FocusedStatusBar/FocusedStatusbar'
import { assets, globalColor, globalFontsSize } from '../../Constant'

const RegisterPage = () => {
    const [name, setUserName] = useState("")
    const [email, setUserEmail] = useState("")
    const [mobile, setUserMobile] = useState("")
    const [address, setUserAddress] = useState('')
    const [password, setUserPassword] = useState("")
    const [confirmPassword, setUserConfirmPassword] = useState("")

    const navigation = useNavigation();

    const handlePress = () =>{
      navigation.navigate()
    }

  return (
    <SafeAreaView style={registerPageStyles.registerPageContainer}>

    <FocusedStatusBar  
            barStyle="dark-content"
            backgroundColor="transparent"
            translucent={true}
          
            />
       <MoveBackArrow
                imgUrl={assets.left}
                handlePress={() => navigation.goBack()}
                left={0}
                top={StatusBar.currentHeight + 50}
    />
     

        <Text style={registerPageStyles.registerPageHeaderTitle}>Sign Up</Text>
        <Text style={registerPageStyles.registerPageSubHeaderTitle}>Add your details to sign up</Text>
        <View>
       <View>
       <TextInput 
       style={registerPageStyles.registerPageTextInput} 
       placeholder='Name'
       onChangeText={newText => setUserName(newText)}
       defaultValue={name}
       />
        <TextInput 
        style={registerPageStyles.registerPageTextInput} 
        placeholder='Email'
        onChangeText={newText => setUserEmail(newText)}
        defaultValue={email}
        />
        <TextInput 
        style={registerPageStyles.registerPageTextInput} 
        placeholder='Mobile No'
        onChangeText={newText => setUserMobile(newText)}
        defaultValue={mobile}
        />
        <TextInput 
        style={registerPageStyles.registerPageTextInput} 
        placeholder='Address'
        onChangeText={newText => setUserAddress(newText)}
        defaultValue={address}
        />
        <TextInput 
        style={registerPageStyles.registerPageTextInput} 
        placeholder='Password'
        secureTextEntry
        onChangeText={newText => setUserPassword(newText)}
        defaultValue={password}
        />
        <TextInput 
        style={registerPageStyles.registerPageTextInput} 
        placeholder='Comfirm Password'
        secureTextEntry
        onChangeText={newText => setUserConfirmPassword(newText)}
        defaultValue={confirmPassword}
        />
       </View>
            <Button 
             fontFamily={'MetropolisSemiBold'}
             fontSize={globalFontsSize.medium}
              text={"Sign Up"} 
              backgroundColor={globalColor.primaryColor}
              textColor={globalColor.backgroundColor}
              handlePress={() => navigation.navigate("PromoScreen1")}
            />
        </View>
        <View  style={registerPageStyles.registerPageTouchableContainer}>
            <Text style={registerPageStyles.registerPageTouchableWrapper}>Already have an Account?
                        <Text style={registerPageStyles.registerPageTouchableText} onPress={() => navigation.navigate("LoginPage")}>Login</Text>
            </Text>
        </View>
</SafeAreaView>
  )
}

export default RegisterPage