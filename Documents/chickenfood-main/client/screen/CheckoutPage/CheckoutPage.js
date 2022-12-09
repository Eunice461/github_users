import { View, Text, SafeAreaView, FlatList } from 'react-native'
import React from 'react'
import { OrderItem } from '../../Constant/Data/Data'
import FocusedStatusBar from '../../Component/FocusedStatusBar/FocusedStatusbar'
import TopMeun from '../../Component/TopMeun/TopMeun'
import CheckoutCard from '../../Component/CheckoutCard/CheckoutCard'
import MainMenu from '../../Component/MainMenu/MainMenu'
import CheckoutPageStyles from './Styles.checkoutpage'

const CheckoutPage = () => {
  return (
    <SafeAreaView style={CheckoutPageStyles.checkoutPageContainer}>
      <FocusedStatusBar
            barStyle="dark-content"
            backgroundColor="transparent"
            translucent={true}
          
            />
            
        <CheckoutCard />

        <MainMenu />
      
    </SafeAreaView>
  )
}

export default CheckoutPage