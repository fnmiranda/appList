import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { Aluno } from "../../../types/Types";


interface CustomProps {
  alunos: Aluno[];
}

const ServiceScreen: React.FC<CustomProps> = ({ alunos }) => {
  const alunosBaixados = alunos.filter((aluno) => aluno.situacao === "SERVICO" );

  return (
    <FlatList
      data={alunosBaixados}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.container}
      ListHeaderComponent={() => (
        <View style={styles.header}>
          <Text style={styles.title}>Alunos de Serviço</Text>
        </View>
      )}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Text style={styles.itemName}>{item.nome}</Text>
          <Text style={styles.itemDetails}>Número: {item.numero}</Text>
          <Text style={styles.itemDetails}>Situação: {item.situacao}</Text>
        </View>
      )}
      ListEmptyComponent={() => (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Nenhum aluno de Serviço encontrado.</Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 10,
    backgroundColor: "#f5f5f5",
    width:400
  },
  header: {
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  item: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    width: "100%",
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  itemDetails: {
    fontSize: 14,
    color: "#666",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
  },
});

export default ServiceScreen;