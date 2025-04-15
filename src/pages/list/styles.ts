import { Dimensions, StyleSheet } from "react-native";
import { themas } from "../../global/themes";


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
    subHeader:{
        alignItems: "center",
        flexDirection:'row',
        alignContent:'center',
        gap:10
      },
    greeting:{
        fontSize:20,
        color:'#FFF',
        marginTop:10,
        fontWeight:'800'
    },
    boxInput:{
        width:'55%'
    },
    boxList:{
        flex:1,
        width:'100%'
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
        justifyContent: 'space-between',
        
    },
    rowCardLeft:{
        width:'58%',
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

    addButton: {
        position: "absolute",
        bottom: 20,
        right: 20,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: themas.colors.blueLight,
        justifyContent: "center",
        alignItems: "center",
        elevation: 5,
      },
      addButtonText: {
        fontSize: 30,
        color: themas.colors.primary,
      }

    
})