import { View, Text, Image, TouchableOpacity} from 'react-native'
import React, { useState } from 'react'
import { Button, RadioButton} from '../Button/Button'
import { assets, globalColor, globalFontsSize } from '../../Constant'
import TopMeun from '../TopMeun/TopMeun'
import CheckoutCardStyles from './Styles.checkoutcard'
import { useNavigation } from '@react-navigation/core'


const CheckoutCard = ({data}) => {
    const [isChecked, setChecked] = useState([
        { id: 2, value: false, name: "**** **** **** 2187", selected: false },
        { id: 1, value: true, name: "Paystack", selected: false },
    ]);

    const onRadioBtnClick = (item) => {
        let updatedState = isChecked.map((isCheckedItem) =>
        isCheckedItem.id === item.id
            ? { ...isCheckedItem, selected: true }
            : { ...isCheckedItem, selected: false }
        );
        setChecked(updatedState);
      };

      const navigation = useNavigation();

  return (
    <View style={{backgroundColor: globalColor.lightColor}}>

      <View style={CheckoutCardStyles.checkoutContainer}>

      <View style={CheckoutCardStyles.checkoutView1}>
      <TopMeun text={"Checkout"} />

        <Text style={CheckoutCardStyles.checkoutText1}>Delivery Address</Text>

        <View style={CheckoutCardStyles.checkoutView2}>
            <View style={{width: 160, marginTop: 15,}}>
            <Text style={CheckoutCardStyles.checkoutText2}>653 Nostrand Ave Brooklyn, NY 11216</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate("ChangeAddressPage")}>
            <Text style={CheckoutCardStyles.checkoutText3}>Change</Text>
            </TouchableOpacity>
        </View>
        </View>
        
        <View style={CheckoutCardStyles.checkoutView3Main}>
        <View style={CheckoutCardStyles.checkoutView3}>
            <Text style={CheckoutCardStyles.checkoutText4}>Payment method</Text>
            <TouchableOpacity style={CheckoutCardStyles.checkoutTouchable1} onPress={() => navigation.navigate("CheckoutAddCardPage")}>
                <Text style={CheckoutCardStyles.checkoutText5}>+ Add card</Text>
            </TouchableOpacity>
        </View>

        <View style={CheckoutCardStyles.checkoutView4}>
        {isChecked.map((item) => (
                    <RadioButton
                        onPress={() => onRadioBtnClick(item)}
                        selected={item.selected}
                        key={item.id}
     >
       {item.name}
     </RadioButton>
  ))}
        </View>
        </View>

        <View style={CheckoutCardStyles.checkoutView7}>
            <View style={CheckoutCardStyles.checkoutView8}>
                <Text style={CheckoutCardStyles.checkoutText7}>Sub Total</Text>
                <Text style={CheckoutCardStyles.checkoutText8}>$10</Text>
            </View>
            <View style={CheckoutCardStyles.checkoutView8}>
                <Text style={CheckoutCardStyles.checkoutText7}>Delivery Cost</Text>
                <Text style={CheckoutCardStyles.checkoutText8}>$10</Text>
            </View>
            <View style={CheckoutCardStyles.checkoutView8}>
                <Text style={CheckoutCardStyles.checkoutText7}>Discount</Text>
                <Text style={CheckoutCardStyles.checkoutText8}>$10</Text>
            </View>

            <View style={CheckoutCardStyles.checkoutView9}>
                <Text style={CheckoutCardStyles.checkoutText7}>Total</Text>
                <Text style={CheckoutCardStyles.checkoutText8}>$20</Text>
            </View>
        </View>

        <View style={CheckoutCardStyles.checkoutButton}>
        <Button
        text={"Send Order"}
        fontFamily={'MetropolisSemiBold'}
         fontSize={globalFontsSize.medium}
         backgroundColor={globalColor.primaryColor}
         textColor={globalColor.backgroundColor}
         handlePress={() => navigation.navigate("ThankyouPage")}
        />
        </View>
    </View>
    </View>
  )
}

export default CheckoutCard