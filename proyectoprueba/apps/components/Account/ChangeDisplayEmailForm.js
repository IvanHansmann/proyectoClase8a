import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Input, Button, Icon } from 'react-native-elements'
import firebase from 'firebase'
import { validateEmail } from '../../utils/validation'


export default function ChangeDisplayEmailForm(props){
    const{displayEmail, setShowModal, toastRef, setReloadUserInfo}= props
    const[newDisplayEmail, setNewDisplayEmail] = useState(null)
    const[password, setPassword] = useState(null)
    const[error, setError] = useState(null)
    const[showPassword, setShowPassword] = useState(false)
    const[isLoading, setIsLoading] = useState(false)


    const reauthenticate = (password) =>{
        var user = firebase.auth().currentUser
        var credentials = firebase.auth.EmailAuthProvider.credential(user.email, password)
        return user.reauthenticateWithCredential((credentials))    
}  

    const onSubmit= ()=>{
        
        setError(null)
        if(!password){
            setError('Escribe la contraseña actual.')
        }else{
        reauthenticate(password).then(()=>{
            if(!newDisplayEmail){
                setError('El correo no puede estar vacío')
    
            }else if(displayEmail === newDisplayEmail){
                setError('El correo no puede ser el mismo que el actual')
            }else if(!validateEmail(newDisplayEmail)){
                setError('No se reconoce el correo')
            }    else{
                setIsLoading(true)
                const update = newDisplayEmail

                firebase
                    .auth()
                    .currentUser
                    .updateEmail(update)
                    .then(()=>{      
                        toastRef.current.show({
                            type: 'success',
                            position: 'top',
                            text1: 'Email',
                            text2: 'Se ha cambiado el correo con exito',
                            visibilityTime: 3000
                        })              
                        setIsLoading(false)
                        setReloadUserInfo(true)
                        setShowModal(false)
                    })
                    .catch(()=>{
                        console.log('Error al actualizar el correo')   
                        setIsLoading(false)
                    })
            }
        }).catch((error)=>{
            setError(error.message)
        })
        
    }
}
    return(
        <View style={styles.view}>
            <Input          
                placeholder="Contraseña actual" 
                containerStyle={styles.input}                
                password={true}
                secureTextEntry={showPassword ? false : true}               
                rightIcon={
                    <Icon type='material-community' 
                    name= {showPassword ? 'eye-off-outline' : 'eye-outline'}
                    iconStyle={styles.iconRight}                    
                    onPress={()=> setShowPassword(!showPassword)}
                    />}         
                
                onChange={(e)=>setPassword(e.nativeEvent.text)}
            />
            <Input
                placeholder="Nuevo correo"
                containerStyle={styles.input}
                rightIcon={{
                    type:'material-community',
                    name:'email-outline',
                    color: '#c2c2c2'
                }}
                defaultValue={displayEmail || ''}
                onChange={(e)=>setNewDisplayEmail(e.nativeEvent.text)}
                errorMessage={error}
            />
            <Button
                title='Cambiar correo'
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={onSubmit}
                loading={isLoading}
            />
        </View>

    )
}

const styles = StyleSheet.create({
    input:{
        marginBottom: 10
    },
    view:{
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10
    },
    btnContainer:{
        marginTop:20,
        width: '95%'
    },
    btn:{
        backgroundColor: '#00a680'
    },
    iconRight:{
        color: '#c2c2c2'
    }
})
