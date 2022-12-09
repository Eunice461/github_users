import { View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import FocusedStatusBar from '../../Component/FocusedStatusBar/FocusedStatusbar'
import { MoveBackArrow } from '../../Component/Button/Button'
import { assets } from '../../Constant'
import { useNavigation } from '@react-navigation/core'
import aboutPageStyles from './Styles.aboutpage'
import MainMenu from '../../Component/MainMenu/MainMenu'
import TopMeun from '../../Component/TopMeun/TopMeun'

const AboutPage = () => {
    const navigation = useNavigation()
  return (
    <SafeAreaView style={aboutPageStyles.aboutPageContainer}>
      <FocusedStatusBar
            barStyle="dark-content"
            backgroundColor="transparent"
            translucent={true}
          
            />
        <TopMeun text={"About Us"} imgUrl={assets.cart}/>
    
    <View style={aboutPageStyles.aboutPageView2}>
        <TouchableOpacity style={aboutPageStyles.aboutPageTouchable}>
         <View style={aboutPageStyles.aboutPageView3}>
      </View>
    </TouchableOpacity>
        <Text style={aboutPageStyles.aboutPageText2}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ac ipsum elit. Suspendisse hendrerit a risus non tincidunt. Nulla facilisi. In efficitur urna eget nulla fringilla, vitae tincidunt elit posuere. Aliquam in viverra tortor. Nulla viverra neque et ipsum lacinia aliquam. Cras eget arcu leo. Sed pharetra ligula sed pretium venenatis. Nunc varius augue quis aliquet malesuada. Sed suscipit nisl ut justo consequat, at maximus mi facilisis. In cursus, leo ut pulvinar viverra, massa mi auctor erat, vitae imperdiet mauris turpis vel est. Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
        </Text>
    </View>
    <View style={aboutPageStyles.aboutPageView2}>
        <TouchableOpacity style={aboutPageStyles.aboutPageTouchable}>
         <View style={aboutPageStyles.aboutPageView3}>

      </View>
    </TouchableOpacity>
        <Text style={aboutPageStyles.aboutPageText2}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ac ipsum elit. Suspendisse hendrerit a risus non tincidunt. Nulla facilisi. In efficitur urna eget nulla fringilla, vitae tincidunt elit posuere. Aliquam in viverra tortor. Nulla viverra neque et ipsum lacinia aliquam. Cras eget arcu leo. Sed pharetra ligula sed pretium venenatis. Nunc varius augue quis aliquet malesuada. Sed suscipit nisl ut justo consequat, at maximus mi facilisis. In cursus, leo ut pulvinar viverra, massa mi auctor erat, vitae imperdiet mauris turpis vel est. Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
        </Text>
    </View>

    <View style={aboutPageStyles.aboutPageView2}>
        <TouchableOpacity style={aboutPageStyles.aboutPageTouchable}>
         <View style={aboutPageStyles.aboutPageView3}>
      </View>
    </TouchableOpacity>
        <Text style={aboutPageStyles.aboutPageText2}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ac ipsum elit. Suspendisse hendrerit a risus non tincidunt. Nulla facilisi. In efficitur urna eget nulla fringilla, vitae tincidunt elit posuere. Aliquam in viverra tortor. Nulla viverra neque et ipsum lacinia aliquam. Cras eget arcu leo. Sed pharetra ligula sed pretium venenatis. Nunc varius augue quis aliquet malesuada. Sed suscipit nisl ut justo consequat, at maximus mi facilisis. In cursus, leo ut pulvinar viverra, massa mi auctor erat, vitae imperdiet mauris turpis vel est. Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
        </Text>
    </View>

    <MainMenu />


      </SafeAreaView>
  )
}

export default AboutPage