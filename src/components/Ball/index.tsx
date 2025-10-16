import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native';
import { style } from "./styles";

type Props = {
    color:string
}

function Ball ({...rest}: Props){
    return (
        <View style={[style.ball, {borderColor: rest.color || 'gray'}]}/>
    )
}   

export default Ball;