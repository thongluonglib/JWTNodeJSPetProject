import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Register from './screens/Register';
import Login from './screens/Login';
import Home from './screens/Home';
import { AuthContext } from './context';
import { storage } from './mmkv';
import { setClientToken, setResponseAxios } from './axios/AxiosInstance';
const Stack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();

const App = () => {
    const [auth, setAuth] = useState({
        username: '',
        userid: '',
        token: '',
        isAuthorization: false
    })
    useEffect(() => {
        setResponseAxios(setAuth)
    }, [])
    return (
        <NavigationContainer>
            <AuthContext.Provider value={{ auth, setAuth }}>
                {
                    auth.isAuthorization ?
                        (
                            <Stack.Navigator initialRouteName='Login'>
                                <Stack.Screen name="Home" component={Home} />
                            </Stack.Navigator>
                        )
                        : (
                            <AuthStack.Navigator initialRouteName='Login'>
                                <Stack.Screen name="Register" component={Register}
                                    options={{
                                        headerBackTitle: 'Back',
                                        // headerBackTitleStyle: { fontSize: 30 },
                                    }} />
                                <Stack.Screen name="Login" component={Login} />
                            </AuthStack.Navigator>
                        )
                }
            </AuthContext.Provider>
        </NavigationContainer>
    )
}

export default App

const styles = StyleSheet.create({})