import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useRef } from 'react'
import AxiosInstance from '../axios/AxiosInstance'
const Register = ({ navigation }: any) => {
  const user = useRef({
    username: '',
    password: ''
  })
  async function onPressRegister() {
    try {
      var response = await AxiosInstance.post('/register', {
        username: user.current.username,
        password: user.current.password
      })
      console.log('response', JSON.stringify(response.data, null, 2))
      if(response.data.token) {
        navigation.navigate('Login')
      }
    } catch (error: any) {
      throw new Error(error)
    }
  }

  return (
    <View style={{ flex: 1, paddingTop: "30%" }}>
      <Text style={styles.registerLabel}>Register</Text>
      <TextInput style={styles.input} placeholder='Username....' onChangeText={(text) => { user.current.username = text }} />
      <TextInput style={styles.input} placeholder='Password....' onChangeText={(text) => { user.current.password = text }} />
      <Button title='Register' onPress={onPressRegister} />
    </View>
  )
}

export default Register

const styles = StyleSheet.create({
  registerLabel: {
    fontSize: 24,
    textAlign: 'center',
    marginTop: 32,

  },
  input: {
    height: 45,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 0.5,
    paddingHorizontal: 12,
    marginHorizontal: 12,
    marginTop: 20,
    borderRadius: 8
  }
})