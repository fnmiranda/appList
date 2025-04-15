import { Dimensions, StyleSheet } from "react-native";
import {themas} from '../../global/themes'

export const style = StyleSheet.create({

    

    button:{
        height:50,
        width:200,
        borderRadius:40,
        alignItems:'center',
        justifyContent: 'center',
        backgroundColor: themas.colors.primary,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,

        elevation: 24,
    },
    textButton:{
        fontSize:16,
        fontWeight:'bold',
        color: themas.colors.bgScrean,
    },


})