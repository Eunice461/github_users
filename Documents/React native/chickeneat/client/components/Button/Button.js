import { View, Text, TouchableOpacity} from 'react-native'
import React from 'react'
import styles from './Styles.Button'

export const Button = ({minWidth, fontSize, handlePress, text, ...props}) => {
  return (
    <TouchableOpacity style={styles.button} {...props} onPress={handlePress}>
        <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  )
}

export default Button