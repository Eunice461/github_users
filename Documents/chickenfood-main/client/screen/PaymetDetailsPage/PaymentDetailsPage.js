import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import FocusedStatusBar from '../../Component/FocusedStatusBar/FocusedStatusbar'
import MainMenu from '../../Component/MainMenu/MainMenu'
import PaymentDetail from '../../Component/PaymentDetail/PaymentDetail'
import PaymentDetailsPageStyles from './Styles.paymentdetailspage'
import { useNavigation } from '@react-navigation/core'

const PaymentDetailsPage = () => {
  const navigation = useNavigation()
  return (
    <SafeAreaView style={PaymentDetailsPageStyles.PaymentDetailsPageContainer}>
        <FocusedStatusBar
            barStyle="dark-content"
            backgroundColor="transparent"
            translucent={true}
          
            />
          <PaymentDetail handlePress={() => navigation.navigate("AddCardPage")}/>

                <MainMenu />
            
    </SafeAreaView>
  )
}

export default PaymentDetailsPage