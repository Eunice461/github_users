import { View, Text, SafeAreaView, ImageBackground, TextInput, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { assets, globalColor, globalFontsSize } from '../../Constant'
import { Button } from '../../Component/Button/Button'
import { useNavigation } from '@react-navigation/core'
import addCardStyles from './Styles.addcard'

const AddCard = () => {
    const navigation = useNavigation()
  return (
    <View style={addCardStyles.addCardOverlay}>
                <View style={addCardStyles.addCardView1}>
                    <View style={addCardStyles.addCardView2}>
                       <TouchableOpacity  onPress={() => navigation.goBack()}>
                       <Image 
                        style={addCardStyles.addCardIMage2} 
                        source={assets.left}
                        />
                       </TouchableOpacity>
                    <View style={addCardStyles.addCardView3}>
                    <Text style={addCardStyles.addCardText1}>Add Credit/Debit Card</Text>
                </View>
                <View style={addCardStyles.addCardBrLine}></View>
                <View style={addCardStyles.addCardView4}>
                    <TextInput placeholder=' Card Number' style={addCardStyles.addCardTextInput1}/>
                    <View style={addCardStyles.addCardView5}>
                        <Text style={addCardStyles.addCardText2}>Expiry</Text>
                        <View style={addCardStyles.addCardView51}>
                        <TextInput style={addCardStyles.addCardTextInput2} placeholder='MM'/>
                        <TextInput style={addCardStyles.addCardTextInput2} placeholder='YY'/>
                        </View>
                    </View>
                    <TextInput style={addCardStyles.addCardTextInput1} placeholder='Security Code'/>
                    <TextInput style={addCardStyles.addCardTextInput1} placeholder='First Name'/>
                    <TextInput style={addCardStyles.addCardTextInput1} placeholder='Last Name'/>
                </View>

                <View style={addCardStyles.addCardView6}>
                    <View>
                    <Text style={addCardStyles.addCardText3}>You can remove this card</Text>
                    <Text style={addCardStyles.addCardText3}>at anytime</Text>
                    </View>
                    <Image style={addCardStyles.addCardIMage3} source={assets.left}/>
                </View>

                <Button 
                text={"+   Add Card"}
                fontFamily={'MetropolisSemiBold'}
                 fontSize={globalFontsSize.medium}
                 backgroundColor={globalColor.primaryColor}
                 textColor={globalColor.backgroundColor}
                 handlePress={() => navigation.navigate("PaymentDetailsPage")}
                />
                </View>
                </View>
                </View>
  )
}

export default AddCard