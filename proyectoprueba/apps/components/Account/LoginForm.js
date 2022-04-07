import React, {useState} from "react"
import { StyleSheet, View, Text, Image} from 'react-native'
import { Input, Icon, Button } from 'react-native-elements'
import { validateEmail } from '../../utils/validation'
import firebase from "firebase"
import {useNavigation} from '@react-navigation/native'
import Loading from "../Loading"

export default function LoginForm(props){
    const {toastRef} = props
    const[showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState(defaultFormValues())
    const navigation = useNavigation()

    const onSubmit = () => {
        if(formData.email.length===0||formData.password.length===0){
            toastRef.current.show({
                type: 'error',
                position: 'top',
                text1: 'Empty',
                text2: 'Todos los campos son requeridos',
                visibilityTime: 3000
            })
        } else if(!validateEmail(formData.email)){
            toastRef.current.show({
                type: 'error',
                position: 'top',
                text1: 'Email',
                text2: 'El email no es correcto',
                visibilityTime: 3000
            })
        } else if(formData.password.length < 6){
            toastRef.current.show({
                type: 'error',
                position: 'top',
                text1: 'Password',
                text2: 'La longitud mínima de la contraseña es 6 caracteres',
                visibilityTime: 3000
            })
        }else{
            firebase
            .auth()
            .signInWithEmailAndPassword(formData.email, formData.password)
            .then(()=>{
                // <Loading isVisible = {true} text = 'Cargando...'/>
                navigation.navigate('account')
            })
            .catch(()=>{
                toastRef.current.show({
                    type: 'error',
                    position: 'top',
                    text1: 'Cuenta',
                    text2: 'Las credenciales no son correctas',
                    visibilityTime: 3000
                })
            })
        }
    }

    const onChange = (e,type) =>{
        setFormData({...formData,[type]: e.nativeEvent.text})
    }

    
    return(
        <View style={styles.formContainer}>            
            <Input
                placeholder="Correo electronico"
                containerStyle={styles.inputForm}
                onChange={(e)=>onChange(e, 'email')}
                rightIcon={<Icon type='material-community' name= 'at' iconStyle={styles.iconRight}/>}
            />
            <Input
                placeholder="Contraseña"
                containerStyle={styles.inputForm}
                password={true}
                secureTextEntry={showPassword ? false : true}
                onChange={(e)=>onChange(e, 'password')}
                rightIcon={
                <Icon type='material-community' 
                name= {showPassword ? 'eye-off-outline' : 'eye-outline'}
                iconStyle={styles.iconRight}
                onPress={()=> setShowPassword(!showPassword)}
                />}
            />
            <Button
                title='Iniciar Sesión'
                containerStyle={styles.btnCointainerLogin}
                buttonStyle={styles.btnLogin}
                onPress={onSubmit}
            />
        </View>
    )
}

function defaultFormValues(){
    return{
        email: '',
        password: '',
        repeatPassword:''
    }     
    
}

const styles = StyleSheet.create({
    formContainer:{
        marginTop: 30
    },
    inputForm:{
        width: '100%',
        marginTop: 20
    },
    btnCointainerLogin:{
        marginTop:20,
        width: '95%',
        
    },
    btnLogin:{
        backgroundColor: '#00a680'
    },
    iconRight:{
        color: '#c1c1c1'
    },
    logo:{
        width: '100%',
        height: 150,
        marginTop: 20
    }
})