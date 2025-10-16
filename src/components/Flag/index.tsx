import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native';
import { style } from "./styles";

type Props = {
    caption?:string,
    color:string
}

function Flag ({...rest}: Props){
    return (
        <TouchableOpacity style={[style.container, {backgroundColor:rest?.color}]}>
            <Text style={{color:'#FFF',fontSize:12, marginTop:3}}>{rest.caption}</Text>
        </TouchableOpacity>
    )
}   

export default Flag;