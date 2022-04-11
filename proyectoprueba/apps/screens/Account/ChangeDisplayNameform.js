import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Input, Button } from 'react-native-elements'

export default function ChangeDisplayNameform(props){
    const {displayName, setShowModal, toastRef} = props
    const [newDisplayName, setNewDisplayName] = useState (null)
    const [error, setError] = useState(null)

    const onSubmit= ()=>{
        setError(null)
        if(!newDisplayName){
            setError('El nombre esta vacío')
        } else if(displayName === newDisplayName){
            setError('El nombre no puede ser igual al actual')
        } else{
            console.log('Ok')
        }
    }

    return(
        <View style={styles.view}>
            <Input
               placeholder='Nombre y apellido'
               containerStyle={styles.input}
               rightIcon={{
                   type: 'material-community',
                   name: 'account-circle-outline',
                   color: '#c2c2c2'
               }}
               defaultValue={displayName || ''}
               onChange={(e)=>setNewDisplayName(e.nativeEvent.text)}
               errorMessage={error}
            />
            <Button
               title='Cambiar nombre'
               containerStyle={styles.btnContainer}
               buttonStyle= {styles.btn}
               onPress={onSubmit}
            />
        </View> 
    )
}

const styles = StyleSheet.create({
    input:{
        marginBottom:10
    },
    view:{
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10
    },
    btnContainer:{
        marginTop: 20,
        width: '95%'
    },
    btn:{
        backgroundColor: '#00a680'
    }
})