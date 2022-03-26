import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import TopRestaurant from '../screens/TopRestaurant'

const Stack = createStackNavigator()

export default function TopRestaurantStack(){
    return(
        <Stack.Navigator>
            <Stack.Screen
            name= 'topRestauran'
            component={TopRestaurant}
            options= {{title:'Top restaurantes'}}
            />
            
        </Stack.Navigator>
    )
}