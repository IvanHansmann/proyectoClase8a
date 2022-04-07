import React, {useState, useRef, useEffect} from "react";
import {StyleSheet,View, Text} from 'react-native'
import { Button } from "react-native-elements";
import Toast from "react-native-toast-message";
import firebase from "firebase";
import InfoUser from "../../components/Account/InfoUser";

export default function UserLogged(){
    const [userInfo, setUserInfo] = useState(null)
    const toastRef = useRef()
    useEffect(()=>{
        (async()=>{
            const user = await firebase.auth().
            currentUser
            setUserInfo(user)
        })()
    },[])
    return(
        <View style={styles.viewUserInfo}>
           { userInfo && <InfoUser userInfo={userInfo}/>}
            <Text>AccountOption</Text>
            <Button 
            title="Cerrar sesión" 
            buttonStyle={styles.btnCloseSession}
            titleStyle={styles.btnCloseSessionText}
            onPress={() =>firebase.auth().signOut()} 
            />
        </View>
    )
}

const styles = StyleSheet.create({
    viewUserInfo:{
        minHeight: '100%',
        backgroundColor: '#f2f2f2'
    },

})