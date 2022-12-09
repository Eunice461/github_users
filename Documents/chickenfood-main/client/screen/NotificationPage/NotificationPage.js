import { View, Text, SafeAreaView, FlatList, Image} from 'react-native'
import React from 'react'
import { Nofitication } from '../../Constant/Data/Data'
import NotificationCard from '../../Component/NofiticationCard/NotificationCard'
import { MoveBackArrow } from '../../Component/Button/Button'
import FocusedStatusBar from '../../Component/FocusedStatusBar/FocusedStatusbar'
import { assets } from '../../Constant'
import NotificationPageStyles from './Styles.NotificationPage'
import MainMenu from '../../Component/MainMenu/MainMenu'
import { useNavigation } from '@react-navigation/core'
import TopMeun from '../../Component/TopMeun/TopMeun'

const NotificationPage = () => {
  const navigation = useNavigation()

  return (
    <SafeAreaView style={NotificationPageStyles.notificationPageContainer}>
      <FocusedStatusBar 
            barStyle="dark-content"
            backgroundColor="transparent"
            translucent={true}
          
            />
         <TopMeun text={"Notification"} imgUrl={assets.cart}/>

      <View style={{ zIndex: 0 }}>
          <FlatList
            data={Nofitication}
            renderItem={({ item }) => <NotificationCard data={item} />}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
           
          />
        </View>

        <MainMenu />
      
    </SafeAreaView>
  )
}

export default NotificationPage