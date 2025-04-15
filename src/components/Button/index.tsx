import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native';
import { style } from "./styles";

type Props = {
    text?: string,
    loading?: boolean,
    onPress?: () => void,
}

function Button ({...rest}: Props){
    return (
        <>
            <TouchableOpacity style={style.button} {...rest} activeOpacity={0.6} onPress={rest.onPress}>
                <Text style={style.textButton}>{rest.text}</Text>
            </TouchableOpacity>
        </>
    )
}   

export default Button;