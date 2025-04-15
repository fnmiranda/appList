import React,{ useContext }  from 'react'
import { style } from "./styles";
import { Text, TouchableOpacity, View } from 'react-native';
import {AntDesign, Entypo, FontAwesome, MaterialIcons} from '@expo/vector-icons'
import { themas } from '../../global/themes';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
// import { AuthContext } from '../../context/authContext';

const CustomTabBar: React.FC<BottomTabBarProps>  = ({ state, navigation }) => {

    // const {onOpen} = useContext<any>(AuthContext)

    const go = (screenName: string) => {
        navigation.navigate(screenName)
    }

    return (
        <View style={style.tabArea}>
            <TouchableOpacity style={style.tabItem} onPress={() => go('Pelotao')}>
                <AntDesign
                    name='table'
                    size={32}
                    style={{opacity:state.index ===0?1:0.3, color: themas.colors.primary}}
                />
            </TouchableOpacity >
            <TouchableOpacity style={style.tabItem} onPress={() => go('List')}>
                <FontAwesome
                    name='sticky-note'
                    size={32}
                    style={{opacity:state.index ===1?1:0.3, color: themas.colors.primary}}
                />
            </TouchableOpacity >
            <TouchableOpacity style={style.tabItem} onPress={() => go('Information')}>
                <FontAwesome
                    name='newspaper-o'
                    size={32}
                    style={{opacity:state.index ===2?1:0.3, color: themas.colors.primary}}

                />
            </TouchableOpacity>
            <TouchableOpacity style={style.tabItem} onPress={() => go('User')}>
                <FontAwesome
                    name='user'
                    size={32}
                    style={{opacity:state.index ===3?1:0.3, color: themas.colors.primary}}

                />
            </TouchableOpacity>
            <TouchableOpacity style={style.tabItem} onPress={() => go('About')}>
                <FontAwesome
                    name='coffee'
                    size={32}
                    style={{opacity:state.index ===4?1:0.3, color: themas.colors.primary}}

                />
            </TouchableOpacity>
        </View>
    )
};

export default CustomTabBar;