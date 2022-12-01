import { View, Text, SafeAreaView, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import Button from '../../components/Button/Button'
import styles from './Styles.Register'
import { useNavigation } from '@react-navigation/native'

const Register = () => {

    const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.headerTitle}>Sign Up</Text>
        <Text style={styles.subHeaderTitle}>Add your details to sign up</Text>
        <View>
       <View style={styles.wrapperInput}>
       <TextInput style={styles.input} placeholder='Name'/>
        <TextInput style={styles.input} placeholder='Email'/>
        <TextInput style={styles.input} placeholder='Mobile No'/>
        <TextInput style={styles.input} placeholder='Address'/>
        <TextInput style={styles.input} placeholder='Password'/>
        <TextInput style={styles.input} placeholder='Comfirm Password'/>
       </View>
            <Button text="Sign Up"/>
        </View>
        <View  style={styles.touchableContainer}>
            <Text style={styles.touchable}>Already have an Account?
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                        <Text style={{color: "orange", fontSize:12}}>Login</Text>
                    </TouchableOpacity>
            </Text>
        </View>
</SafeAreaView>
  )
}

export default Register