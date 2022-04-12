import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Input, Button, Icon } from 'react-native-elements'
import firebase from 'firebase'

export default function ChangeDisplayPasswordForm(props){
    const{displayPassword, setShowModal, toastRef}= props
    const[newDisplayPassword, setNewDisplayPassword] = useState(null)
    const[password, setPassword] = useState(null)
    const[confirmPassword, setConfirmPassword] = useState(null)
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
            if(!newDisplayPassword){
                setError('No se ha escrito la nueva contraseña.')
    
            }else if(displayPassword === newDisplayPassword){
                setError('La nueva contraseña es la misma que la actual.')

            }else if(newDisplayPassword <6){
                setError('La nueva contraseña debe de ser de minimo 6 caracteres.')

            }else if(confirmPassword <6){
                setError('La confirmacion de la nueva contraseña debe de tener minimo de 6 caracteres.')
                
            }else if(newDisplayPassword  !== confirmPassword){
                setError('Las contraseñas deben de ser las mismas')



            }    else{
                setIsLoading(true)
                const update = newDisplayPassword

                firebase
                    .auth()
                    .currentUser
                    .updatePassword(update)
                    .then(()=>{      
                        toastRef.current.show({
                            type: 'success',
                            position: 'top',
                            text1: 'Password',
                            text2: 'Se ha cambiado la contraseña con exito',
                            visibilityTime: 3000
                        })              
                        setIsLoading(false)
                        setReloadUserInfo(true)
                        setShowModal(false)
                    })
                    .catch(()=>{
                        console.log('Error al actualizar la contraseña')   
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
                defaultValue={password}
                errorMessage={error}                
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
                placeholder="Nueva contraseña" 
                containerStyle={styles.input}
                defaultValue={newDisplayPassword}
                errorMessage={error}                
                password={true}
                secureTextEntry={showPassword ? false : true}               
                rightIcon={
                    <Icon type='material-community' 
                    name= {showPassword ? 'eye-off-outline' : 'eye-outline'}
                    iconStyle={styles.iconRight}                    
                    onPress={()=> setShowPassword(!showPassword)}
                    />}         
                
                onChange={(e)=>setNewDisplayPassword(e.nativeEvent.text)}
            />
            <Input          
                placeholder="Confirmar nueva contraseña" 
                containerStyle={styles.input}
                defaultValue={confirmPassword}
                errorMessage={error}                 
                password={true}
                secureTextEntry={showPassword ? false : true}               
                rightIcon={
                    <Icon type='material-community' 
                    name= {showPassword ? 'eye-off-outline' : 'eye-outline'}
                    iconStyle={styles.iconRight}                    
                    onPress={()=> setShowPassword(!showPassword)}
                    />}         
                
                onChange={(e)=>setConfirmPassword(e.nativeEvent.text)}
            />
            <Button
                title='Cambiar contraseña'
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
