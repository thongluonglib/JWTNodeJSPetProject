import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../context'
import AxiosInstance from '../axios/AxiosInstance'

const Home = () => {
    const authCtx = useContext(AuthContext)
    console.log('auth', JSON.stringify(authCtx, null, 2))
    useEffect(() => {
        AxiosInstance.get('get-user-info').then((response) => {
            console.log('response', JSON.stringify(response.data, null, 2))
        })
    }, [])

    return (
        <View>
            <Text>{`Login with userID: ${authCtx.auth.userid}`}</Text>
            <Text>{`Login with account: ${authCtx.auth.username}`}</Text>
            <Button title='Get Info' onPress={() => {
                AxiosInstance.get('get-user-info').then((response) => {
                    console.log('response', JSON.stringify(response.data, null, 2))
                })
            }} />
        </View>
    )
}

export default Home

const styles = StyleSheet.create({})