import React from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Linking } from "react-native";
import { styles } from "./styles";
import Rancho from "../../components/Rancho/Rancho";
import {Entypo} from "@expo/vector-icons"

type EntypoIconName = "google-drive" | "text-document" | "link" | "grid" | "folder";

export type ItemMat = {
    id: number;
    nome: string;
    tipo: string;
    link: string;
    icon: EntypoIconName;
    // icon: string;
};

export default function Information() {
    const materiais: ItemMat[]  = [
        { id: 1, nome: "Drive do Damasceno", tipo: "DRIVE", link: "https://drive.google.com/drive/folders/1hLo6-Y4MqzjXlIpgdngme4EHhPgQIt4I?usp=drive_link" , icon: "google-drive"},
        { id: 2, nome: "Drive da Luana", tipo: "DRIVE", link: "https://drive.google.com/drive/folders/1EF3LWdwR8378MqliZ0_oiSpmZSj9BMHn" , icon: "google-drive"},
        { id: 3, nome: "DRIVE GERAL", tipo: "DRIVE", link: "https://drive.google.com/drive/folders/1b3qBlWcMq2bBb2yBX03X2wJxgrUSOCI7" , icon: "google-drive"},
    ];

    const util: ItemMat[] = [
        { id:1, nome: 'Arranchamento', tipo: 'IME', link: 'https://docs.google.com/spreadsheets/d/1Lb7GduQumLnJWvFgWLwOWKV8S6yLg0ZodKoAFJzYUOM/edit?gid=1363414801#gid=1363414801', icon: 'grid',},
        { id:2, nome: "RUE", tipo: "EXERCITO BRASILEIRO", link: "https://www.calameo.com/exercito-brasileiro/read/00123820630fbcfd2df8f?authid=u0poWRjmkFtY" , icon: 'text-document',},
        { id:3, nome: "EDUCA IME", tipo: "IME", link: "https://educa.ime.eb.br" , icon: 'text-document',},
        { id:4, nome: "Classificação 2° ANO", tipo: "IME", link: "https://docs.google.com/spreadsheets/d/1DDLb8laql2RLF8kEQW0wCpL1_MSmUEAKPA_Bgo8l8dI/edit?gid=0#gid=0" , icon: 'grid',},
        { id:5, nome: "EDUCA IME", tipo: "IME", link: "https://educa.ime.eb.br" , icon: 'link',},
    ]

    // Renderiza um item de material com link
    const renderMaterial = (item: ItemMat) => (
        <TouchableOpacity key={item.id} onPress={() => Linking.openURL(item.link)} style={styles.materialItem}>
            <View style={{flexDirection:'row'}}>
                <Entypo name={item.icon} size={20} color="#000" style={styles.materialIcon} />
                <Text style={styles.materialNome}>{item.nome}</Text>

            </View>
            <Text style={styles.materialTipo}>{item.tipo}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.viewAll}>
            <ScrollView contentContainerStyle={styles.container}>
                {/* Seção: Sobre o IME */}
                <View style={styles.secao}>
                    <Text style={styles.tituloSecao}>Sobre o IME</Text>
                    <Text style={styles.texto}>
                        O Instituto Militar de Engenharia (IME) é uma das instituições de ensino mais prestigiadas do Brasil,
                        reconhecida pela excelência na formação de engenheiros e líderes militares. Fundado em 1792, o IME
                        oferece cursos de graduação, pós-graduação e extensão, com foco em engenharia e ciências aplicadas.
                    </Text>
                </View>

                {/* Seção: Materiais Disponíveis */}
                <View style={styles.secao}>
                    <Text style={styles.tituloSecao}>Materiais Disponíveis</Text>
                    {materiais.map(renderMaterial)}
                </View>
                <View style={styles.secao}>
                    <Text style={styles.tituloSecao}>Materiais sobre o IME</Text>
                    {util.map(renderMaterial)}
                </View>

                <View style={{padding:0}}>
                    <Text style={styles.tituloSecao}>Horário das Refeições</Text>

                    <Rancho/>
                </View>
                {/* Seção: Contato */}
                <View style={styles.secao}>
                    <Text style={styles.tituloSecao}>Contato</Text>
                    <Text style={styles.texto}>
                        Endereço: Praça General Tibúrcio, 80 - Urca, Rio de Janeiro - RJ
                    </Text>
                    <Text style={styles.texto}>Telefone: (21) 2546-7000</Text>
                    <Text style={styles.texto}>CEP: 22290-270</Text>
                </View>
            </ScrollView>
        </View>
    );
}