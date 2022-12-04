import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import FocusedStatusBar from '../../Component/FocusedStatusBar/FocusedStatusbar'
import MainMenu from '../../Component/MainMenu/MainMenu'
import PaymentDetail from '../../Component/PaymentDetail/PaymentDetail'
import PaymentDetailsPageStyles from './Styles.paymentdetailspage'

const PaymentDetailsPage = () => {
  return (
    <SafeAreaView style={PaymentDetailsPageStyles.PaymentDetailsPageContainer}>
        <FocusedStatusBar
            barStyle="dark-content"
            backgroundColor="transparent"
            translucent={true}
          
            />
          <PaymentDetail />

            <View style={PaymentDetailsPageStyles.PaymentDetailsPageView2}>
                <MainMenu />
            </View>
    </SafeAreaView>
  )
}

export default PaymentDetailsPage