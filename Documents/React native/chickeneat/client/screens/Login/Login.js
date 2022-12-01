import { View, Text, SafeAreaView, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import Button from '../../components/Button/Button'
import styles from './Styles.Login'
import { useNavigation } from '@react-navigation/native'

const Login = () => {
    const navigation = useNavigation();

    const loginPress = () => {}
  return (
    <SafeAreaView style={styles.container}>
            <Text style={styles.headerTitle}>Login</Text>
            <Text style={styles.subHeaderTitle}>Add your details to login</Text>
            <View>
               <View style={styles.wrapperInput}>
               <TextInput style={styles.input} placeholder='Your Email'/>
               <TextInput style={styles.input} placeholder='Password'/>
               </View>
                <Button text="Login"/>
                <Text style={styles.forgotPassword}>Forgot your password?</Text>
            </View>
            <View>
                <Text style={styles.subHeaderTitle}>or Login With</Text>
               <Button text="Login with Goggle"/>
            </View>
            <View style={styles.touchableContainer}>
                <Text style={styles.touchable}>Dont have an Account? 
                    <TouchableOpacity onPress={() => navigation.navigate("Register")} >
                        <Text style={{color: "orange", fontSize:12}}> Sign up</Text>
                    </TouchableOpacity>
                </Text>
            </View>
    </SafeAreaView>
  )
}

export default Login