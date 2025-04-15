import { Dimensions, StyleSheet } from "react-native";
import { themas } from "../../../global/themes";


export const style = StyleSheet.create({
    container:{
        flex:1,
        alignItems: "center",

    },
    header:{
        width:'100%',
        height: Dimensions.get('window').height/6,
        backgroundColor:themas.colors.primary,
        paddingHorizontal:20,
        justifyContent: 'center',
    },
    greeting:{
        fontSize:20,
        color:'#FFF',
        marginTop:20,
    },
    boxInput:{
        width:'85%'
    },
    boxList:{
        flex:1,
        marginBottom:40,
        width:'100%',
    },
    card:{
      width:'100%',
      height:85,
      backgroundColor:'#FFF',
      marginTop:2,
      borderRadius:10,
      justifyContent:'center',
      padding:10,
      borderWidth:1,
      borderColor:themas.colors.lightgray  
    },
    rowCard:{
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    rowCardLeft:{
        width:'65%',
        flexDirection:"row",
        alignItems:'center',
        gap:10
    },
    titleCard:{
        fontSize:16,
        fontWeight:'bold'
    },
    dateCard:{
        fontSize:15,
        // fontWeight:'bold'
    },
    typeCard:{
        fontSize:14,
        // fontWeight:'bold'
    },
    descriptionCard:{
        color:themas.colors.gray
    },

    
})