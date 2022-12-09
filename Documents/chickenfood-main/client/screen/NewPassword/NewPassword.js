import { View, Text, SafeAreaView, TextInput, StatusBar } from 'react-native'
import React, { useState } from 'react'
import FocusedStatusBar from '../../Component/FocusedStatusBar/FocusedStatusbar'
import { Button, CircleButton, MoveBackArrow } from '../../Component/Button/Button'
import NewPasswordStyles from './Style.newpassword'
import { assets, globalColor, globalFontsSize } from '../../Constant'
import { useNavigation } from '@react-navigation/core'

const NewPassword = () => {
    const [newPassword, setUserNewPassword] = useState("")
    const [confirmPassword, setUserConfirmPassword] = useState("")

    const navigation = useNavigation
    ()
  return (
    <SafeAreaView style={NewPasswordStyles.newPasswordContainer}>
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
        <Text style={NewPasswordStyles.newPasswordText1}>New Password</Text>
        <Text style={NewPasswordStyles.newPasswordText2}>Please enter a new password</Text>

        <View>
            <TextInput 
            style={NewPasswordStyles.newPasswordTextInput} 
            placeholder='New Password'
            onChangeText={newText => setUserNewPassword(newText)}
            defaultValue={newPassword}
            />
            <TextInput 
            style={NewPasswordStyles.newPasswordTextInput} 
            placeholder='Confirm Password'
            onChangeText={newText => setUserConfirmPassword(newText)}
            defaultValue={confirmPassword}
            />
            <Button 
              backgroundColor={globalColor.primaryColor}
             fontFamily={'MetropolisSemiBold'}
             fontSize={globalFontsSize.medium}
             textColor={globalColor.backgroundColor}
            text={"Next"}/>
            
        </View>
    </SafeAreaView>
  )
}

export default NewPassword