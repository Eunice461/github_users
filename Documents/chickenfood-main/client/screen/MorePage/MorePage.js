import { View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import morePageStyles from './Styles.morepage'
import FocusedStatusBar from '../../Component/FocusedStatusBar/FocusedStatusbar'
import { assets } from '../../Constant'
import MainMenu from '../../Component/MainMenu/MainMenu'
import { CircleButton } from '../../Component/Button/Button'
import { useNavigation } from '@react-navigation/core'

const MorePage = () => {
  const navigation = useNavigation()
  return (
    <SafeAreaView style={morePageStyles.morePageContainer}>
        <FocusedStatusBar  
            barStyle="dark-content"
            backgroundColor="transparent"
            translucent={true}
          
            />

       <View style={morePageStyles.morePageView1}>

       <View style={morePageStyles.morePageView2}>
            <Text style={morePageStyles.morePageText1}>More</Text>
            <Image
            source={assets.cart}
            resizeMode="contain"
            style={morePageStyles.morePageImage1}
            />
        </View>


        <View>
          <TouchableOpacity onPress={() => navigation.navigate("PaymentDetailsPage")}>
          <View style={morePageStyles.morePageView3}>
            <View style={morePageStyles.morePageView4}>
                <CircleButton 
                imgUrl={assets.left}
                left={15}
                top={10}
                />
                <Text style={morePageStyles.morePageText2}>Payment Details</Text>
            </View>
          <View style={morePageStyles.morePageView31}>
          <Image
          source={assets.left}
          style={morePageStyles.morePageImage2}
          />
          </View>
        </View>
          </TouchableOpacity>

       <TouchableOpacity onPress={() => navigation.navigate("OrderPage")}>
       <View style={morePageStyles.morePageView3}>
            <View style={morePageStyles.morePageView4}>
                <CircleButton 
                imgUrl={assets.left}
                left={15}
                top={10}
                />
                <Text style={morePageStyles.morePageText2}>My Orders</Text>
            </View>
            <View style={morePageStyles.morePageView31}>
          <Image
          source={assets.left}
          style={morePageStyles.morePageImage2}
          />
          </View>
        </View>

       </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("NotificationPage")}>
        <View style={morePageStyles.morePageView3}>
            <View style={morePageStyles.morePageView4}>
                <CircleButton 
                imgUrl={assets.left}
                left={15}
                top={10}
                />
                <Text style={morePageStyles.morePageText2}>Notification</Text>
            </View>
            <View style={morePageStyles.morePageView31}>
          <Image
          source={assets.left}
          style={morePageStyles.morePageImage2}
          />
          </View>
        </View>

        </TouchableOpacity>
        
       <TouchableOpacity onPress={() => navigation.navigate("ChatPage")}>
       <View style={morePageStyles.morePageView3}>
            <View style={morePageStyles.morePageView4}>
                <CircleButton 
                imgUrl={assets.left}
                left={15}
                top={10}
                />
                <Text style={morePageStyles.morePageText2}>Chat</Text>
                <View style={morePageStyles.morePageView41}>
                    <Text style={morePageStyles.morePageView41Text}>15</Text>
                </View>
            </View>
            <View style={morePageStyles.morePageView31}>
          <Image
          source={assets.left}
          style={morePageStyles.morePageImage2}
          />
          </View>
        </View>
       </TouchableOpacity>

       <TouchableOpacity onPress={() => navigation.navigate("AboutPage")}>
       <View style={morePageStyles.morePageView3}>
            <View style={morePageStyles.morePageView4}>
                <CircleButton 
                imgUrl={assets.left}
                left={15}
                top={10}
                />
                <Text style={morePageStyles.morePageText2}>About Us</Text>
            </View>
          <View style={morePageStyles.morePageView31}>
          <Image
          source={assets.left}
          style={morePageStyles.morePageImage2}
          />
          </View>
        </View>
       </TouchableOpacity>

        </View>


       </View>

{/* MEUN CONTENT */}
<MainMenu />
    </SafeAreaView>
  )
}

export default MorePage