import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { createContext, useContext, useRef } from 'react'
import AxiosInstance, { setClientToken } from '../axios/AxiosInstance'
import { useNavigation } from '@react-navigation/native'
import { storage } from '../mmkv'
import { AuthContext } from '../context'
const Login = ({ navigation }) => {
    const auth = useContext(AuthContext)
    const user = useRef({
        username: '',
        password: ''
    })
    async function onPressLogin() {
        try {
            var response = await AxiosInstance.post('/login', {
                username: user.current.username,
                password: user.current.password
            })
            if (response.data.token) {
                storage.set('user.name', response.data.username)
                storage.set('user.id', response.data.userid)
                auth.setAuth({
                    ...response.data,
                    isAuthorization: true
                })
                setClientToken(response.data.token)
                navigation.navigate('Home')
            }
        } catch (error: any) {
            throw new Error(error)
        }
    }
    function onPressRegister() {
        navigation.navigate('Register')
    }
    return (
        <View style={{ flex: 1, paddingTop: "30%" }}>
            <Text style={styles.loginLabel}>Login</Text>
            <TextInput style={styles.input} placeholder='Username....' onChangeText={(text) => { user.current.username = text }} />
            <TextInput style={styles.input} placeholder='Password....' onChangeText={(text) => { user.current.password = text }} />
            <Button title='Login' onPress={onPressLogin} />
            <Button title='Register' onPress={onPressRegister} />
        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    loginLabel: {
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