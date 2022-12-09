import { View, Text, Image, ScrollView } from 'react-native'
import React from 'react'
import TopMeun from '../TopMeun/TopMeun'
import { Button } from '../Button/Button'
import OrderCardStyles from './Styles.ordercard'
import { assets, globalColor, globalFontsSize } from '../../Constant'
import { OrderItem } from '../../Constant/Data/Data'
import { useNavigation } from '@react-navigation/core'

const OrderCard = () => {
   const navigation = useNavigation();
  return (
    <View >
     <TopMeun text={"My Order"}/>

     {OrderItem && OrderItem.map((item, Key) => {
        return <>
        <View style={OrderCardStyles.orderCardView1} Key={Key}>
        <Image 
        source={assets.chicken1}
        resizeMode='center'
        style={OrderCardStyles.orderCardImage1}
        />
        <View style={OrderCardStyles.orderCardView2}>
            <Text style={OrderCardStyles.orderCardText1}>{item.mainName}</Text>
            <View style={OrderCardStyles.orderCardView3}>
                <Image 
                resizeMode='cover'
                style={OrderCardStyles.orderCardImage2}
                />
                <Text style={OrderCardStyles.orderCardText2}>
                    <Text style={OrderCardStyles.orderCardText3}>{item.rating}</Text>  123 ratings
                </Text>
            </View>
            <Text style={OrderCardStyles.orderCardText4}>{item.desc}</Text>
            <View style={OrderCardStyles.orderCardView4}>
                <Image 
                resizeMode='cover'
                style={OrderCardStyles.orderCardImage2}
                />
            <Text style={OrderCardStyles.orderCardText5}>{item.address}</Text>
            </View>
        </View>
     </View>

     <View style={OrderCardStyles.orderCardView5}>
        <ScrollView>
        {item.orderlist.map((list, Key) => {
                        return <>
                        <View style={OrderCardStyles.orderCardView6} Key={Key}>
                        <Text style={OrderCardStyles.orderCardText6}>{list.name}</Text>
                    <Text style={OrderCardStyles.orderCardText7}>${list.price}</Text>
                    </View>
                    <View style={OrderCardStyles.orderCardViewbrLine}></View>
                        </>
                    })}
       
        </ScrollView>
     </View>

     <View style={OrderCardStyles.orderCardView7}>
        <Text style={OrderCardStyles.orderCardText8}>Delivery instrustions</Text>
        <Text style={OrderCardStyles.orderCardText9}>+ Add Notes</Text>
     </View>

     <View style={OrderCardStyles.orderCardView8}>

     <View style={OrderCardStyles.orderCardView9}>
        <Text style={OrderCardStyles.orderCardText10}>Sub Total</Text>
        <Text style={OrderCardStyles.orderCardText11}>${item.subTotal}</Text>
     </View>

     <View style={OrderCardStyles.orderCardView9}>
        <Text style={OrderCardStyles.orderCardText10}>Delivery Cost</Text>
        <Text style={OrderCardStyles.orderCardText11}>${item.DeliveryCost}</Text>
     </View>
     </View>

     <View style={OrderCardStyles.orderCardView10}>
        <Text style={OrderCardStyles.orderCardText10}>Total</Text>
        <Text style={OrderCardStyles.orderCardText12}>${item.total}</Text>
     </View>

     <Button 
     text={"Checkout"}
     fontFamily={'MetropolisSemiBold'}
      fontSize={globalFontsSize.medium}
      backgroundColor={globalColor.primaryColor}
      textColor={globalColor.backgroundColor}
      handlePress={() => navigation.navigate("CheckoutPage")}
      />

        </>
     })}
    </View>
  )
}

export default OrderCard