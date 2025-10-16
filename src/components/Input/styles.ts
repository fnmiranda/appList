import { Dimensions, StyleSheet } from "react-native";
import {themas} from '../../global/themes'

export const style = StyleSheet.create({
    BoxInput:{
        width:'100%',
        height:40,
        borderWidth:1,
        borderRadius:10,
        marginTop: 10,
        flexDirection:'row',
        alignItems:'center',
        paddingHorizontal:5,
        backgroundColor: themas.colors.lightgray,
        borderColor: themas.colors.gray,
    },
    input:{
        height:'100%',
        width:'100%',
        borderRadius:20,
        // textAlignVertical:'top',        
    },
    titleInput:{
        marginLeft:5,
        marginTop:10,
        color: themas.colors.gray
    },

});