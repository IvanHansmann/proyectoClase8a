import React, {useState} from "react";
import { StyleSheet, View, Text } from "react-native";
import { ListItem, Icon } from "react-native-elements";
import Modal from "../Modal";

export default function AccountOptions(props){
    const {userInfo, toastRef} = props
    const [showModal, setShowModal] =useState(true)
    const [renderComponent, setRenderComponent] = useState(null)

    const selectedComponent = (key) => {
        switch(key){
            case 'displayName':
                setRenderComponent(<Text>Cambiando nombre y apellido</Text>)
                setShowModal(true)
                break
            case 'displayEmail':
                setRenderComponent(<Text>Cambiando el correo</Text>)
                setShowModal(true)
                break
            case 'displayPassword':
                setRenderComponent(<Text>Cambiando contraseña</Text>)
                setShowModal(true)
                break
            default:
                setRenderComponent(null)
                setShowModal(false)
        }

    }
    const menuOptions = generateOptions(selectedComponent)

    return(
        <View>
            {menuOptions.map((menu, index) =>(
                <ListItem key={index} bottomDivider onPress={menu.onPress}>
                    <Icon name = {menu.iconNameLeft}/>
                    <ListItem.Content>
                        <ListItem.Title>{menu.tittle}</ListItem.Title>
                    </ListItem.Content>

                </ListItem>
            ))}
            {renderComponent && (
            <Modal isVisible={showModal} setIsVisible={setShowModal}>
                {renderComponent}
            </Modal>
            )}
        </View>
    )
}

function generateOptions(selectedComponent){
    return[
        {
            tittle: 'Cambiar nombre y apellidos',
            iconNameLeft: 'account-circle',
            onPress: () => selectedComponent('displayName')
        },
        {
            tittle: 'Cambiar email',
            iconNameLeft: 'drafts',
            onPress: () => selectedComponent('displayEmail')
        },
        {
            tittle: 'Cambiar password',
            iconNameLeft: 'lock',
            onPress: () => selectedComponent('displayPassword')
        },
    ]
}
