import { View, Text, SafeAreaView, ImageBackground, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { assets, globalColor, globalFontsSize } from '../../Constant'
import FocusedStatusBar from '../../Component/FocusedStatusBar/FocusedStatusbar'
import ThankYouPageStyles from './Styles.thankyoupage'
import { Button } from '../../Component/Button/Button'
import { useNavigation } from '@react-navigation/core'

const ThankyouPage = () => {
    const navigation = useNavigation();
  return (
    <SafeAreaView style={ThankYouPageStyles.thankyouContainer}>
        <FocusedStatusBar
            barStyle="dark-content"
            backgroundColor="transparent"
            translucent={true}
          
            />
        <ImageBackground source={assets.backgroundc} resizeMode="cover"  style={ThankYouPageStyles.thankyouIMage1} >
        <View style={ThankYouPageStyles.thankyouOverlay}>
                <View style={ThankYouPageStyles.thankyouView1}>
                    <View style={ThankYouPageStyles.thankyouView2}>
                       <TouchableOpacity  onPress={() => navigation.goBack()}>
                       <Image 
                        style={ThankYouPageStyles.thankyouIMage2} 
                        source={assets.left}
                        />
                       </TouchableOpacity>

                       <Image 
                       source={assets.promoScreen1Image}
                       resizeMode='contain'
                       style={ThankYouPageStyles.thankyouIMage3} 
                       />
                       
                       <View style={ThankYouPageStyles.thankyouView3}>
                        <Text style={ThankYouPageStyles.thankyouText1}>Thank You!</Text>
                        <Text style={ThankYouPageStyles.thankyouText2}>for your order</Text>
                        <Text style={ThankYouPageStyles.thankyouText3}>your Order is now being processed.we will let you know once the order is picked from the outlet.
                        Check the status of your Order</Text>
                       </View>

                      <Button 
                      text={'Track My Order'}
                      fontFamily={'MetropolisSemiBold'}
                      fontSize={globalFontsSize.medium}
                      backgroundColor={globalColor.primaryColor}
                      textColor={globalColor.backgroundColor}
                      handlePress={() => navigation.navigate("HomePage")}
                      />
                      
                      <TouchableOpacity onPress={() => navigation.navigate("HomePage")}>
                        <Text style={ThankYouPageStyles.thankyouText4}>Back To Home</Text>
                      </TouchableOpacity>

                       </View>
                       </View>
                       </View>
        </ImageBackground>

    </SafeAreaView>
  )
}

export default ThankyouPage