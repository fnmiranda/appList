import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Aluno } from "../../../../types/Types";
import { style } from "./ItemAlunos";
import { AntDesign, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { themas } from "../../../../global/themes";


export default function ItemAluno(item: Aluno, onOpen: (aluno: Aluno) =>void, remove: (item: number) => void){

       
    return(
    <View style={style.card}>
        <TouchableOpacity onPress={()=>{[onOpen(item)]}} style={{ flex: 1 }}>
            <View style={style.rowCard}>
                <View style={style.rowCardLeft}>
                    {/* <Ball color="red" /> */}
                    <TouchableOpacity onPress={() => remove(item.id)}>
                        <View  style={{width:40,height:40,gap:10,borderColor:'#F1F1F1',borderWidth:2,borderRadius:10, backgroundColor:'#F8F8F8',marginRight:10,justifyContent:"center", alignItems:'center'}}>
                            <FontAwesome
                                name='trash'
                                size={30}
                                style={{color: themas.colors.primary}}
                            />
                        </View>
                    </TouchableOpacity>
                    <View>
                        <Text style={style.titleCard}>{item.nome}</Text>
                        <Text style={style.dateCard}>{item.numero}</Text>
                    </View>
                </View>
                {/* <View style={{flex:1, flexDirection:'row', gap:10, alignItems:"center"}}> */}
                <View style={{flexDirection: "column", alignItems: "flex-start" }}>
                    <Text style={style.typeCard}><Text style={{fontWeight:"bold"}}>Situação: </Text> {item.situacao}</Text>
                    <Text style={style.typeCard}><Text style={{fontWeight:"bold"}}>Função: </Text> {item.funcao}</Text>
                </View>
                    

                {/* </View> */}

            </View>
        </TouchableOpacity>
    </View>
    )
}