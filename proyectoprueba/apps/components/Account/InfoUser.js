import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Avatar } from "react-native-elements";
import firebase from "firebase";
import * as Permissions from 'expo-permissions'
import * as ImagenPicker from 'expo-image-picker'

export default function InfoUser(props){
    const {userInfo: {photoURL, displayName, email}} = props

    const changeAvatar= async ()=>{
        const resultPermissions = await Permissions.askAsync(Permissions.MEDIA_LIBRARY)
        const resultPermissionsCamara = resultPermissions.permissions.mediaLibrary.status

        if(resultPermissionsCamara === 'denied'){
            toastRef.current.show({
                type: 'info',
                position: 'top',
                text1: 'Permissions',
                text2: 'Es necesario aceptar los permisos de la galeria',
                visibilityTime: 3000
            });
        } else {
            const result = await ImagenPicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [4,3]
            })
            console.log(result)
        }
    }

    return(
        <View style={styles.viewUserInfo}>
            <Avatar
            title="Carlos"
            rounded
            size= 'large'
            onPress={changeAvatar}
            containerStyle={styles.userInfoAvatar}
            source={
                photoURL ? {uri:photoURL} : require('../../../assets/img/avatar-default.jpg')
            }
            />
            <View>
                <Text style={styles.displayName}>
                    {displayName ? displayName : 'Invitado'}
                </Text>
                <Text> {email ? email : 'Entrada por SSO' } </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    viewUserInfo:{
        alignItems: 'center',
        justifyContent: 'center',
        // flexBasis: 'row',
        backgroundColor: '#f2f2f2',
        paddingTop: 10,
        paddingBottom: 30
    },
    userInfoAvatar:{
        marginTop: 20,
        backgroundColor: '#00a680'
    },
    displayName:{
        fontWeight: 'bold',
        paddingBottom: 5
    }
})