import { View, Text, Image, StatusBar, Touchable, TouchableOpacity } from 'react-native'
import React from 'react'
import { Button, MoveBackArrow } from '../Button/Button'
import { assets, globalColor, globalFontsSize, globalShadow } from '../../Constant'
import PaymentDetailStyles from './Styles.paymentdetail'
import { useNavigation } from '@react-navigation/core'
import TopMeun from '../TopMeun/TopMeun'
const shadowApply = globalShadow(-2, 4, '#1B2631', 0.2, 3, 10, '#1B2631', );

const PaymentDetail = ({handlePress, handleDelete, backgroundColor, ...props}) => {

  const navigation = useNavigation()

  return (
    <View style={[PaymentDetailStyles.PaymentDetailontainer, {backgroundColor: backgroundColor, ...props}]}>

      <View style={PaymentDetailStyles.PaymentDetailView1}>
      <TopMeun text={"Payment Details"} imgUrl={assets.cart}/>
      <View style={PaymentDetailStyles.PaymentDetailView3}>
        <Text style={PaymentDetailStyles.PaymentDetailText2}>Customize your payment method</Text>
        <View style={PaymentDetailStyles.PaymentDetailBrLine}></View>
      </View>

      </View>

      <View style={[PaymentDetailStyles.PaymentDetailView4, shadowApply.customShadow]}>

        <View style={[PaymentDetailStyles.PaymentDetailView41, shadowApply.customShadow]}>
        <View style={PaymentDetailStyles.PaymentDetailView5}>
            <Text style={PaymentDetailStyles.PaymentDetailText3}>Cash/Card on delivery</Text>
            <Image />
        </View>
        <View style={PaymentDetailStyles.PaymentDetailBrLine}></View>
        <View style={PaymentDetailStyles.PaymentDetailView6}>
            <Text style={{color: "blue"}}>VISA</Text>
            <Text style={PaymentDetailStyles.PaymentDetailText4}>**** **** **** 2187</Text>
           <TouchableOpacity style={PaymentDetailStyles.PaymentDetailTouchable1} onPress= {handleDelete}>
            <Text style={{color: globalColor.primaryColor}}>Delete Card</Text>
           </TouchableOpacity>
        </View>

        <Text style={PaymentDetailStyles.PaymentDetailText5}>Other Methods</Text>
        </View>

      </View>

     <View style={PaymentDetailStyles.PaymentDetailView1}>
     <View style={PaymentDetailStyles.PaymentDetailView7}>
        <Button 
         fontFamily={'MetropolisSemiBold'}
         fontSize={globalFontsSize.medium}
         backgroundColor={globalColor.primaryColor}
         text={'+ Add Another Credit/Debit Card'}
         textColor={globalColor.backgroundColor}
         handlePress={handlePress}
        />
      </View>
     </View>



    </View>
  )
}

export default PaymentDetail