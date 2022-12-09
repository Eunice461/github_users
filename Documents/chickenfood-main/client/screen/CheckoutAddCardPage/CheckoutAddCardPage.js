import { SafeAreaView, ImageBackground,} from 'react-native'
import React from 'react'
import { assets,} from '../../Constant'
import FocusedStatusBar from '../../Component/FocusedStatusBar/FocusedStatusbar'
import AddCard from '../../Component/AddCard/AddCard'
import CheckoutAddCardPageStyles from './Styles.checkoutaddcard'


const CheckoutAddCardPage = () => {
  return (
    <SafeAreaView style={CheckoutAddCardPageStyles.CheckoutAddCardContainer}>
        <FocusedStatusBar  
            barStyle="dark-content"
            backgroundColor="transparent"
            translucent={true}
          
            />
        <ImageBackground source={assets.backgroundc} resizeMode="cover" style={CheckoutAddCardPageStyles.CheckoutAddCardIMage1}>
            <AddCard />
            
        </ImageBackground>

    </SafeAreaView>
  )
}

export default CheckoutAddCardPage