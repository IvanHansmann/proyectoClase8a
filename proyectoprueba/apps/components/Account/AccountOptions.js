import React, {useState} from "react";
import { StyleSheet, View, Text } from "react-native";
import { ListItem, Icon } from "react-native-elements";
import Modal from "../Modal";
import ChageDisplayNameForm from "./ChangeDisplayNameForm";
import ChangeDisplayEmailForm from "./ChangeDisplayEmailForm";
import ChangeDisplayPasswordForm from "./ChangeDisplayPasswordForm";

export default function AccountOptions(props){
    const {userInfo, toastRef, setReloadUserInfo} = props
    const [showModal, setShowModal] =useState(true)
    const [renderComponent, setRenderComponent] = useState(null)

    const selectedComponent = (key) => {
        switch(key){
            case 'displayName':
                setRenderComponent(
                <ChageDisplayNameForm
                    displayName={userInfo.displayName}
                    setShowModal={setShowModal}
                    toastRef={toastRef}
                    setReloadUserInfo={setReloadUserInfo}                   
                 />)
                setShowModal(true)
                break
            case 'displayEmail':
                setRenderComponent(
                <ChangeDisplayEmailForm
                    displayEmail={userInfo.displayEmail}
                    setShowModal={setShowModal}
                    toastRef={toastRef}
                    setReloadUserInfo={setReloadUserInfo}                      
                />
                )
                setShowModal(true)
                break
            case 'displayPassword':
                setRenderComponent(
                <ChangeDisplayPasswordForm
                displayPassword={userInfo.displayPassword}
                setShowModal={setShowModal}
                toastRef={toastRef}    
                />
                )
                setShowModal(true)
                break
            default:
                setRenderComponent(null)
                setShowModal(false)
                break
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
