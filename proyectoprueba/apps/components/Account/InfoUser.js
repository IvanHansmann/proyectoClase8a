import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Avatar } from "react-native-elements";
import firebase from "firebase";
import * as Permissions from 'expo-permissions'
import * as ImagenPicker from 'expo-image-picker'

export default function InfoUser(props){
    const {userInfo, toastRef } = props
    const {uid, photoURL,displayName, email} = userInfo


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
            if (result.cancelled){
                toastRef.current.show({
                    type: 'info',
                    position: 'top',
                    text1: 'Cancelled',
                    text2: 'No elegiste alguna imagen de la galeria',
                    visibilityTime: 3000
                })     
            } else {
                uploadImage(result.uri).then(() =>{
                    updatePhotoUrl()
                }).catch(() => {
                    toastRef.current.show({
                        type: 'error',
                        position: 'top',
                        text1: 'Firebase error',
                        text2: 'Actualizar avatar',
                        visibilityTime: 3000
                    }); 
                })
            }
        }
    }

    const uploadImage = async (uri) => {
        console.log(uri)
        const response = await fetch(uri)
        const blob = await response.blob()
        const ref = firebase.storage().ref().child( `avatar/${uid}`)
        return ref.put(blob)
    }

    const updatePhotoUrl = () => {
        firebase.storage().ref(`avatar/${uid}`).getDownloadURL().then(async(response)=>{
            const update = {photoURL: response}
            await firebase.auth().currentUser.updateProfile(update)

        })
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