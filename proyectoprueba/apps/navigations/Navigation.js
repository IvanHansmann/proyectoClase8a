import React from '@react-navigation/native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Icon } from 'react-native-elements'

import RestaurantStack from './RestaurantStack'
import FavoriteStack from './FavoriteStack'
import AccountStack from './AccountStack'
import SearchStack from './SearchStack'
import TopRestaurantStack from './TopRestaurantStack'

const Tab = createBottomTabNavigator()

export default function Navigation(){
    return(
        <NavigationContainer>
            <Tab.Navigator
               initialRouteName='restaurants'
               tabBarOptions={{
                   inactiveTintColor: '#646464',
                   activeTintColor: '#00a680'
               }}
               screenOptions={({route})=> ({
                   tabBarIcon:({color})=>screenOptions(route, color)
               })} 
            >
                <Tab.Screen name= 'restaurants' 
                component={RestaurantStack}
                options={{title: "Restaruantes"}}
                />
                <Tab.Screen name= 'favorite' 
                component={FavoriteStack}
                options={{title: "Favoritos"}}
                />
                <Tab.Screen name= 'account' 
                component={AccountStack}
                options={{title: "Cuenta"}}
                />
                <Tab.Screen name= 'search' 
                component={SearchStack}
                options={{title: "Buscadores"}}
                />
                <Tab.Screen name= 'topRestaurant' 
                component={TopRestaurantStack}
                options={{title: "Top Restaruantes"}}
                />               
            </Tab.Navigator>
        </NavigationContainer>
    )
}

function screenOptions(route, color){
    let iconName
    switch (route.color) {
        case 'restaurants':
            iconName='compass-outline'        
            break

        case 'favorite':
            iconName='heart-outline'        
            break   

        case 'account':
            iconName='star-outline'        
            break

        case 'search':
            iconName='magnify' 
            break       
            
        case 'topRestaurant':
            iconName='home-outline'        
            break
    }
    return(
        <Icon type='material-community' name={iconName} size={22} color={color}/>           
    )
}