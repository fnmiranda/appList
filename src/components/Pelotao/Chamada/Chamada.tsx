import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { themas } from "../../../global/themes";
import { Aluno } from "../../../types/Types";
import CustomDropdown from "../../CustomModal/CustomDropdown";


interface CustomProps {
  alunos: Aluno[];
}

const ChamadaScreen: React.FC<CustomProps> = ({ alunos }) => {
  const [alunosPresentes, setAlunosPresentes] = useState<Aluno[]>([]);
  const [alunosFaltantes, setAlunosFaltantes] = useState<Aluno[]>(alunos);


  // Função para marcar o aluno como presente
  const marcarComoPresente = (aluno: Aluno) => {
    // Remove o aluno da lista de faltantes
    const novaListaFaltantes = alunosFaltantes.filter((a) => a.id !== aluno.id);
    setAlunosFaltantes(novaListaFaltantes);

    // Adiciona o aluno à lista de presentes
    setAlunosPresentes([...alunosPresentes, aluno]);
  };

  // Função para remover o aluno da lista de presentes
  const removerDaListaPresentes = (aluno: Aluno) => {
    // Remove o aluno da lista de presentes
    const novaListaPresentes = alunosPresentes.filter((a) => a.id !== aluno.id);
    setAlunosPresentes(novaListaPresentes);

    // Retorna o aluno à lista de faltantes
    setAlunosFaltantes([...alunosFaltantes, aluno]);
  };

  // Renderiza o cabeçalho com as informações
  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.headerText}>
        Presentes: {alunosPresentes.length} | Faltantes: {alunosFaltantes.length}
      </Text>
    </View>
  );

  // Renderiza um item da lista de alunos
  const renderItem = (item: Aluno, isPresente: boolean) => (
    <View key={item.id} style={[styles.item, isPresente && styles.itemPresente]}>
      <View style={{ flexDirection: 'column' }}>
        <View style={styles.itemContent}>
          <Text style={styles.itemName}>{item.nome}</Text>
          <Text style={styles.itemDetails}> - {item.numero}</Text>
        </View>
        {item.situacao === 'BAIXADO' ? (
          <Text style={[styles.situation, { backgroundColor: '#2a5db2' }]}>{item.situacao}</Text>
        ) : item.situacao === 'SERVICO' ? (
          <Text style={[styles.situation, { backgroundColor: '#F44E3F' }]}>{item.situacao}</Text>

        ) : (
          <></>

        )}

      </View>
      <TouchableOpacity
        style={isPresente ? styles.buttonFaltante : styles.buttonPresente}
        onPress={() =>
          isPresente ? removerDaListaPresentes(item) : marcarComoPresente(item)
        }
      >
        <Text style={styles.buttonText}>
          {isPresente ? "Remover" : "Presente"}
        </Text>
      </TouchableOpacity>
    </View>
  );

  useEffect(() => {
    setAlunosFaltantes(alunos);
    setAlunosPresentes([])
  }, [alunos])

  return (
    <View style={{ marginBottom: 40, marginHorizontal: 2 }}>
      <View style={{ padding: 5 }}>
        {renderHeader()}
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Cabeçalho com as informações */}


        <Text style={styles.title}>Lista de Alunos Faltantes</Text>
        {alunosFaltantes.length > 0 ? (
          alunosFaltantes.map((item) => renderItem(item, false))
        ) : (
          <Text style={styles.emptyText}>Todos os alunos estão presentes.</Text>
        )}

        <Text style={styles.title}>Lista de Alunos Presentes</Text>
        {alunosPresentes.length > 0 ? (
          alunosPresentes.map((item) => renderItem(item, true))
        ) : (
          <Text style={styles.emptyText}>Nenhum aluno presente ainda.</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 10,
    backgroundColor: "#f5f5f5",
  },
  header: {
    backgroundColor: "#2a5db2",
    padding: 6,
    borderRadius: 5,
    alignItems: "center",
    // marginBottom: 5,
    width: "100%", // Ocupa toda a largura
  },
  headerText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    width: "100%", // Ocupa toda a largura
  },
  item: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%", // Ocupa toda a largura
  },
  itemPresente: {
    backgroundColor: "#e0f7fa",
    borderColor: "#80deea",
  },
  itemContent: {
    flex: 1,
    flexDirection: 'row'
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  itemDetails: {
    fontSize: 16,
    color: "#666",
  },
  buttonPresente: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    minWidth: 100,
  },
  buttonFaltante: {
    backgroundColor: "#f44336",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    minWidth: 100,
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  emptyText: {
    textAlign: "center",
    color: "#666",
    marginTop: 20,
    width: "100%", // Ocupa toda a largura
  },
  situation: {
    padding: 3,
    textAlign: 'center',
    borderRadius: 10,
    // borderColor:'#2a5db2', 
    borderWidth: 1,
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
    width: 80
  },
});

export default ChamadaScreen;
