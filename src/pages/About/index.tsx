import React, { useState } from "react";
import { View, Text, ScrollView, Image ,StyleSheet, Linking, TouchableOpacity } from "react-native";

import {Entypo, FontAwesome, Ionicons} from "@expo/vector-icons"
import CalendarView from "@/src/components/Calendar/CalendarView";
import TaskList from "@/src/components/Calendar/TaskList";

type EntypoIconName = "google-drive" | "text-document" | "github" | "email" | "keyboard";

export type Contact = {
    // id: number;
    plataforma: string;
    link: string;
    icon: EntypoIconName;
    // icon: string;
};



const Portifolio = () => {

  const contatos: Contact[] =[
    { plataforma: "GitHub", link: "https://github.com/fnmiranda" , icon:"github"},
    { plataforma: "E-mail", link: "mailto:r20franciscomiranda@gmail.com", icon:"email"},
  ]
  // Dados do programador
  const programador = {
    nome: "Francisco Miranda",
    cargo: "Desenvolvedor Full Stack",
    descricao: "Responsável pelo desenvolvimento e manutenção deste aplicativo.",
    tecnologias: [
      {
        nome: 'JavaScript',
        icone: <Ionicons name="logo-javascript" size={24} color="white" />, 
      },
      {
        nome: 'React Native',
        icone: <Ionicons name="logo-react" size={24} color="white" />, 
      },
      {
        nome: 'Node.js',
        icone: <Ionicons name="logo-nodejs" size={24} color="white" />, 
      },
      {
        nome: 'Python',
        icone: <Ionicons name="logo-python" size={24} color="white" />, 
      },
      {
        nome: 'Expo',
        icone: <FontAwesome name="chevron-up" size={24} color="white" />, 
      },
      {
        nome: 'SQLite',
        icone: <Entypo name="database" size={24} color="white" />, 
      },
    ],
    contatos: contatos,
  };

  // Função para abrir links
  const abrirLink = (url: string) => {
    Linking.openURL(url).catch((err) =>
      console.error("Erro ao abrir o link:", err)
    );
  };

  let anyalink = 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.cbr.com%2Fspy-x-family-season-2-op-surpasses-2-million-views%2F&psig=AOvVaw04ERB3z6aRkahwyhkmr49t&ust=1742752235837000&source=images&cd=vfe&opi=89978449&ved=0CBcQjhxqFwoTCLCkwev3nYwDFQAAAAAdAAAAABAE'



  return (
    <View style={{ marginTop: 10 }}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Título */}
        <Text style={styles.titulo}>CRÉDITOS</Text>

       

        {/* Informações do Programador */}
        <View style={styles.secao}>
          {/* <View style={{flexDirection: 'row', alignItems:'center', alignContent:'center', gap:10}}>
            <Text style={styles.subtitulo}>Desenvolvedor</Text>
            <Entypo name="keyboard" size={28} color="#000" style={{marginBottom:12,color:'black',marginRight:5}} />

          </View> */}

          <View style={styles.card}>
            <Text style={styles.cardTextNome}>{programador.nome}</Text>
            <Text style={styles.cardTextCargo}>{programador.cargo}</Text>
            <Text style={styles.cardTextDescricao}>{programador.descricao}</Text>
          </View>
        </View>

        {/* Tecnologias Utilizadas */}
        <View style={styles.secao}>
          <Text style={styles.subtitulo}>Tecnologias Utilizadas</Text>
          <View style={styles.listaTecnologias}>
            {programador.tecnologias.map((tecnologia, index) => (
              <View key={index} style={styles.itemTecnologia}>
                {tecnologia.icone}
                <Text style={styles.itemTexto}>{tecnologia.nome}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Contato */}
        <View style={styles.secao}>
          <Text style={styles.subtitulo}>Contato</Text>
          <View style={styles.listaContatos}>
            {programador.contatos.map((contato, index) => (
              <TouchableOpacity
                key={index}
                style={styles.botaoContato}
                onPress={() => abrirLink(contato.link)}
              >
                <View style={{flexDirection: 'row'}}>
                  <Entypo name={contato.icon} size={20} color="#000" style={{color:'white',marginRight:10}} />
                  <Text style={styles.botaoTexto}>{contato.plataforma}</Text>

                </View>

              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={styles.containerImage}>
          <Image
            source={require('./anya.jpg')}// Caminho do GIF local
            style={styles.gif}
          />
        </View>
        <View style={{alignContent:"center", alignItems:'center'}}>
          <Text onPress={() => abrirLink(anyalink)} style={{color:'gray', opacity:30}}>FONTE: </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    // backgroundColor: "#ffffff", 
  },
  containerImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding:10,
  },
  gif: {
    width: 150,
    height: 100,
    // borderWidth:2,
    // borderColor:'gray',
    borderRadius:10,
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 5,
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#3c82f5", // Azul
    marginBottom: 20,
    textAlign: "center",
  },
  secao: {
    marginBottom: 25,
  },
  subtitulo: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333333", // Cinza escuro
    marginBottom: 15,
  },
  card: {
    backgroundColor: "#f0f8ff", // Azul claro
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTextNome: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333333", // Cinza escuro
    marginBottom: 5,
  },
  cardTextCargo: {
    fontSize: 16,
    color: "#555555", // Cinza médio
    marginBottom: 10,
  },
  cardTextDescricao: {
    fontSize: 14,
    color: "#777777", // Cinza claro
    lineHeight: 20,
  },
  listaTecnologias: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  itemTecnologia: {
    backgroundColor: "#3c82f5", // Azul
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    width: "30%", // Dois itens por linha
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itemTexto: {
    fontSize: 12,
    fontWeight: "bold",
    marginTop:2,
    color: "#ffffff", // Branco
  },
  listaContatos: {
    flexDirection:'row',
    flexWrap:'wrap',
    justifyContent: "space-between",
    gap:10,
  },
  botaoContato: {
    backgroundColor: "#3c82f5", // Azul
    padding: 15,
    borderRadius: 8,
    width: "48%", // Dois botões por linha
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  botaoTexto: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffffff", // Branco
  },
});

export default Portifolio;