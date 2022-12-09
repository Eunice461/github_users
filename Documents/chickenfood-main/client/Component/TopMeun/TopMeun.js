import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { assets } from '../../Constant'
import { MoveBackArrow } from '../Button/Button'
import { useNavigation } from '@react-navigation/core'
import TopMeunStyles from './Styles.topmeun'

const TopMeun = ({text, imgUrl}) => {
    const navigation = useNavigation()
  return (
    <View style={TopMeunStyles.topMenuContainer}>
       <View style={TopMeunStyles.topMenuView2}>
      <MoveBackArrow
            imgUrl={assets.left}
            handlePress={() => navigation.goBack()}
        />
        <Text style={TopMeunStyles.topMenuText1}>{text}</Text>
            <TouchableOpacity onPress={() => navigation.navigate("OrderPage")}>
            <Image
            source={imgUrl}
            resizeMode="contain"
            style={TopMeunStyles.topMenuImage1}
            />
            </TouchableOpacity>
      </View>
    </View>
  )
}

export default TopMeun