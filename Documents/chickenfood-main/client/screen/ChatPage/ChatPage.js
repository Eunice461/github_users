import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import FocusedStatusBar from '../../Component/FocusedStatusBar/FocusedStatusbar'
import TopMeun from '../../Component/TopMeun/TopMeun'
import { assets } from '../../Constant'

const ChatPage = () => {
  return (
    <SafeAreaView>
        <FocusedStatusBar />
        <TopMeun text={"Chat"} imgUrl={assets.cart}/>

        <View>
            <View></View>
            <View></View>
        </View>
    </SafeAreaView>
  )
}

export default ChatPage