import { View, Text, SafeAreaView, TextInput, StatusBar } from 'react-native'
import React, { useState } from 'react'
import FocusedStatusBar from '../../Component/FocusedStatusBar/FocusedStatusbar'
import { Button, CircleButton, MoveBackArrow } from '../../Component/Button/Button'
import ResetPasswordStyles from './Style.resetpassword'
import { useNavigation } from '@react-navigation/core'
import { assets, globalColor, globalFontsSize } from '../../Constant'

const Resetpassword = () => {
    const [email, setUserEmail] = useState('')
    const navigation = useNavigation();
    
    const handlePress = () => {
        navigation.navigate("NewPassword")
    }
  return (
    <SafeAreaView style={ResetPasswordStyles.ResetPasswordContainer}>
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
        <Text style={ResetPasswordStyles.ResetPasswordText1}>Reset Password</Text>
        <Text style={ResetPasswordStyles.ResetPasswordText2}>Please enter your email to receive a link to create a new password via email</Text>

        <View>
            <TextInput 
            style={ResetPasswordStyles.ResetPasswordTextInput} 
            placeholder='Email'
            onChangeText={newText => setUserEmail(newText)}
            defaultValue={email}
            />
            <Button 
              backgroundColor={globalColor.primaryColor}
            text={"Send"} 
            fontFamily={'MetropolisSemiBold'}
            fontSize={globalFontsSize.medium}
            textColor={globalColor.backgroundColor}
            handlePress={handlePress}/>
        </View>
    </SafeAreaView>
  )
}

export default Resetpassword