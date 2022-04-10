import React from "react";
import { StyleSheet, View, Text } from "react-native-web";
import { ListItem, Icon } from "react-native-elements";

export default function AccountOptions(props){
    const {userInfo, toastRef} = props
    const selectedComponent = (key) => {

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
