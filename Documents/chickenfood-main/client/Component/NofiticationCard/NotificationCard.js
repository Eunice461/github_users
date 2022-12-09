import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import NotificationCardStyles from './Styles.notificationcard'

const NotificationCard = ({ data }) => {
  return (
    <View style={NotificationCardStyles.notificationCardContainer}>

     <View style={NotificationCardStyles.notificationCardView1}>
     <TouchableOpacity style={NotificationCardStyles.notificationCardTouchable1}>
         <View style={NotificationCardStyles.notificationCardView2}>
      </View>
    </TouchableOpacity>

     <View style={NotificationCardStyles.notificationCardView3}>
        <Text style={NotificationCardStyles.notificationCardText1}>{data.name}</Text>
        <Text style={NotificationCardStyles.notificationCardText2}>{data.date}</Text>
     </View>
     </View>
<View style={NotificationCardStyles.notificationCardbrLine}></View>
    </View>
  )
}

export default NotificationCard