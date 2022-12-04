import { View, Text, TouchableOpacity, Image} from 'react-native'
import React from 'react'
import styles from './Styles.Button'

const Button = ({minWidth, fontSize, handlePress, text, fontFamily, backgroundColor,  ...props}) => {

  console.log(handlePress, 'amen')
  return (
    <TouchableOpacity style={[styles.button, {width: minWidth,backgroundColor: backgroundColor, borderColor: props.buttonBorderColor, borderWidth:props.buttonBorderWidth}]} {...props} onPress={handlePress}>
        <Text style={[styles.text, {fontFamily: fontFamily, fontSize: fontSize,color: props.textColor}]}>{text}</Text>
    </TouchableOpacity>
  )
}



const MoveBackArrow =({imgUrl, handlePress, ...props})=>{
 
  return (
  <TouchableOpacity style={[
    styles.CircleButton,
     {...props},
   ]}
   onPress={handlePress}
   >
    <Image  
        source={imgUrl}
        resizeMode='contain'
        style={styles.navigationBackImg}
      />
  </TouchableOpacity>
      
 
  )
}


const RadiusButton = ({ text, handlePress, ...props})=>{
  return (
    <TouchableOpacity   onPress={handlePress}>
         <View style={[styles.radiusButtonStyle, {backgroundColor: props.backgroundColor}]}>
          <Text>
              {text}
          </Text>
      </View>
    </TouchableOpacity>
     
  )
};

export const CircleButton = ({ imgUrl, handlePress, ...props }) => {
  return (
    <TouchableOpacity
      style={[
        styles.circleButtonStyle,
        {...props},
      ]}
      onPress={handlePress}
    >
      <Image
        source={imgUrl}
        resizeMode="contain"
        style={{ width: 24, height: 24 }}
      />
    </TouchableOpacity>
  );
};



export  {Button, MoveBackArrow, RadiusButton}