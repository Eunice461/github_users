import { View, Text, SafeAreaView, TextInput, Image } from 'react-native'
import React from 'react'
import MainMenu from '../../Component/MainMenu/MainMenu'
import profilePageStyles from './Styles.profilepage'
import { assets, globalColor, globalFontsSize } from '../../Constant'
import { Button } from '../../Component/Button/Button'
import FocusedStatusBar from '../../Component/FocusedStatusBar/FocusedStatusbar'

const ProfilePage = () => {
  return (
    <SafeAreaView style={profilePageStyles.profilePageContainer}>
        <FocusedStatusBar 
            barStyle="dark-content"
            backgroundColor="transparent"
            translucent={true}
          
            />
        <View style={profilePageStyles.profilePageView1}>
        <View style={profilePageStyles.profilePageView2}>
            <Text style={profilePageStyles.profilePageText1}>Profile</Text>
            <Image 
            source={assets.person01}
            resizeMode="contain"
            style={profilePageStyles.profilePageImage1}
            />
        </View>
        <View style={profilePageStyles.profilePageView3}>
            <Image 
            source={assets.person01}
            resizeMode="contain"
            />
           <View>
            <Image 
            resizeMode="contain"
            />
           <Text style={profilePageStyles.profilePageText2}>Edit Profile</Text>
           </View>
            <Text style={profilePageStyles.profilePageText3}>Hi there Emaila</Text>
            <Text style={profilePageStyles.profilePageText4}>sign out</Text>
        </View>
        <View style={profilePageStyles.profilePageView4}>
            <View style={profilePageStyles.profilePageView41}>
            <TextInput style={profilePageStyles.profilePageTextInput1} placeholder="Name"/>
            <Text style={profilePageStyles.profilePageText5}>Emaila Dara</Text>
            </View>
            <View style={profilePageStyles.profilePageView41}>
            <TextInput style={profilePageStyles.profilePageTextInput1} placeholder="Email"/>
            <Text style={profilePageStyles.profilePageText5}>emailadara@gmail.com</Text>
        </View>
        <View style={profilePageStyles.profilePageView41}>
            <TextInput style={profilePageStyles.profilePageTextInput1} placeholder="Mobile No"/>
            <Text style={profilePageStyles.profilePageText5}>09068998870</Text>
            </View>
        <View style={profilePageStyles.profilePageView41}>
            <TextInput style={profilePageStyles.profilePageTextInput1} placeholder="Address"/>
           <Text style={profilePageStyles.profilePageText5}>No 23, 6th Lane, Colombo 03</Text>
        </View>
        <View style={profilePageStyles.profilePageView41}>
            <TextInput style={profilePageStyles.profilePageTextInput1} placeholder="Password"/>
            <Text style={profilePageStyles.profilePageText5}>***********</Text>
        </View>
        <View style={profilePageStyles.profilePageView41}>
            <TextInput style={profilePageStyles.profilePageTextInput1} placeholder="Confirm Password"/>
            <Text style={profilePageStyles.profilePageText5}>**********</Text>
        </View>
        </View>
        <Button 
        text={'Save'}
        fontFamily={'MetropolisSemiBold'}
        fontSize={globalFontsSize.medium}
        backgroundColor={globalColor.primaryColor}
        textColor={globalColor.backgroundColor}/>
        </View>
        <View style={profilePageStyles.profilePageView5}>
        <MainMenu />
        </View>
    </SafeAreaView>
  )
}

export default ProfilePage