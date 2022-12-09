import { View, Text, SafeAreaView, FlatList } from 'react-native'
import React from 'react'
import FocusedStatusBar from '../../Component/FocusedStatusBar/FocusedStatusbar'
import TopMeun from '../../Component/TopMeun/TopMeun'
import MainMenu from '../../Component/MainMenu/MainMenu'
import { OrderItem } from '../../Constant/Data/Data'
import OrderCard from '../../Component/OrderCard/OrderCard'
import OrderPageStyles from './Styles.orderpage'

const OrderPage = () => {
  return (
    <SafeAreaView style={OrderPageStyles.OrderPageContainer}>
      <FocusedStatusBar
            barStyle="dark-content"
            backgroundColor="transparent"
            translucent={true}
          
            />

<OrderCard />
        <MainMenu />
      
    </SafeAreaView>
  )
}

export default OrderPage