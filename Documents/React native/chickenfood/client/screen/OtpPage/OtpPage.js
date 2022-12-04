import { View, Text, SafeAreaView, StatusBar } from 'react-native'
import React, { useState } from 'react'
import FocusedStatusBar from '../../Component/FocusedStatusBar/FocusedStatusbar'
import { TextInput } from 'react-native-gesture-handler'
import { assets, globalColor, globalFontsSize } from '../../Constant'
import { Button, CircleButton, MoveBackArrow } from '../../Component/Button/Button'
import OtpPageStyles from './Style.otppage'
import { useNavigation } from '@react-navigation/core'

const OtpPage = () => {
    const [num1, setNum1] = useState('')
    const [num2, setNum2] = useState('')
    const [num3, setNum3] = useState('')
    const [num4, setNum4] = useState('')

    const navigation = useNavigation()
  return (
    <SafeAreaView style={OtpPageStyles.otpContainer}>
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
        <Text style={OtpPageStyles.otpText1}>We have sent an OTP to your Mobile Number</Text>
        <Text style={OtpPageStyles.otpText2}>Please check your mobile number 071*****12 contain to reset your password </Text>

        <View style={OtpPageStyles.otpViewI}>
        <TextInput 
        style={OtpPageStyles.otpTextInput} 
        placeholder='*'
        onChangeText={newText => setNum1(newText)}
        defaultValue={num1}
        />
        <TextInput 
        style={OtpPageStyles.otpTextInput} 
        placeholder='*'
        onChangeText={newText => setNum2(newText)}
        defaultValue={num2}
        />
        <TextInput 
        style={OtpPageStyles.otpTextInput} 
        placeholder='*'
        onChangeText={newText => setNum3(newText)}
        defaultValue={num3}
        />
        <TextInput 
        style={OtpPageStyles.otpTextInput} 
        placeholder='*'
        onChangeText={newText => setNum4(newText)}
        defaultValue={num4}
        />
        </View>
        <Button 
        text={'Next'}
        fontFamily={'MetropolisSemiBold'}
        fontSize={globalFontsSize.medium}
        backgroundColor={globalColor.primaryColor}
        textColor={globalColor.backgroundColor}
        handlePress={() => navigation.navigate("NewPassword")}
        />
        <View style={OtpPageStyles.otpTouableContainer1}>
                <Text style={OtpPageStyles.otpText3}>Don't Received? 
                        <Text style={OtpPageStyles.otpText4}> Click Here</Text>
                </Text>
            </View>
    </SafeAreaView>
  )
}

export default OtpPage