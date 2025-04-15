import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { style } from "./styles";
import { Aluno } from "../../../types/Types";
import ItemAluno from "./ItemAluno/ItemAluno";


interface CustomAlunoProps{
    alunos: Aluno[];
    onOpen: (aluno: Aluno) => void;
    remove: (item: number) => void;
}

const ChamadaAlunos: React.FC<CustomAlunoProps> = ({alunos, onOpen, remove}) => {
    return(
         <View style={style.boxList}>
            <FlatList
                data={alunos}
                style={{ marginTop: 15, marginBottom:15, paddingHorizontal: 20 }}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => ItemAluno(item, onOpen, remove)}
            />

            
        </View>
    )
}

export default ChamadaAlunos;