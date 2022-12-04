import { View, Text, SafeAreaView, StatusBar } from 'react-native'
import React from 'react'
import FocusedStatusBar from '../../Component/FocusedStatusBar/FocusedStatusbar'
import { Button, CircleButton, MoveBackArrow } from '../../Component/Button/Button'
import { assets, globalColor, globalFontsSize } from '../../Constant'
import ChooseResetMethodStyles from './Styles.chooseResetMethod'
import { useNavigation } from '@react-navigation/core'

const ChooseResetMethod = () => {
    const navigation = useNavigation();
  return (
    <SafeAreaView style={ChooseResetMethodStyles.RestMethodContainer}>
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
    <Text style={ChooseResetMethodStyles.RestMethodText1}>Reset Password</Text>
    <Text style={ChooseResetMethodStyles.RestMethodText2}>Please select a method below to a get link to reset your password</Text>

    <View style={{justifyContent: 'center', alignItems:'center', width: '100%'}} >
        <Button backgroundColor={globalColor.primaryColor}
            minWidth={'80%'}
            text={'Send to Email'}
            fontFamily={'MetropolisSemiBold'}
            fontSize={globalFontsSize.medium}
            textColor={globalColor.backgroundColor}
            handlePress={() => navigation.navigate("ResetPassword")}/>

        <Button backgroundColor={globalColor.primaryColor}
            minWidth={'80%'}
            text={'Send to Mobile Number'}
            fontFamily={'MetropolisSemiBold'}
            fontSize={globalFontsSize.medium}
            textColor={globalColor.backgroundColor}
            handlePress={() => navigation.navigate("OtpPage")}/>
    </View>
    </SafeAreaView>
  )
}

export default ChooseResetMethod