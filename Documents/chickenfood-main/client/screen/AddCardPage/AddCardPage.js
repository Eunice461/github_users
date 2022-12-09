import { SafeAreaView, ImageBackground,} from 'react-native'
import React from 'react'
import { assets,} from '../../Constant'
import addCardPageStyles from './Styles.addcardpage'
import FocusedStatusBar from '../../Component/FocusedStatusBar/FocusedStatusbar'
import AddCard from '../../Component/AddCard/AddCard'

const AddCardPage = () => {
   
  return (
    <SafeAreaView style={addCardPageStyles.addCardContainer}>
        <FocusedStatusBar  
            barStyle="dark-content"
            backgroundColor="transparent"
            translucent={true}
          
            />
        <ImageBackground source={assets.backgroundp} resizeMode="cover" style={addCardPageStyles.addCardIMage1}>
            <AddCard />
            
        </ImageBackground>

    </SafeAreaView>
  )
}

export default AddCardPage