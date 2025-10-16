import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import List from '../pages/list';
import User from '../pages/user';
import Pelotao from '../pages/pelotao';

import CustomTabBar from '../components/CustomTabBar'
import {AuthProvider} from '../context/authContext';
import Information from '../pages/Info';
import Portifolio from '../pages/About';

const Tab = createBottomTabNavigator();


function BottomRoutes(){
    return(

        
            <Tab.Navigator
                screenOptions={{headerShown:false}}
                tabBar={props => <CustomTabBar {...props}/>}
            >
                <Tab.Screen 
                    name='Pelotao'
                    component={Pelotao}
                />
                <Tab.Screen 
                    name='List'
                    component={List}
                />
                <Tab.Screen 
                    name='Information'
                    component={Information}
                />
                <Tab.Screen 
                    name='User'
                    component={User}
                />
                <Tab.Screen 
                    name='About'
                    component={Portifolio}
                />
            </Tab.Navigator>
        
        
    )
}

export default BottomRoutes;