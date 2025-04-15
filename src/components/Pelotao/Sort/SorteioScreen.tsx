import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Clipboard } from "react-native";
import { Aluno } from "../../../types/Types";

// Defina o tipo Aluno

// Lista de alunos pré-definida
interface CustomSortProps {
  alunos: Aluno[];
}

const SorteioScreen: React.FC<CustomSortProps> = ({ alunos }) => {
  const [quantidade, setQuantidade] = useState<string>("");
  const [sorteados, setSorteados] = useState<Aluno[]>([]);

  // Função para sortear os alunos
  const handleSortear = () => {
    const qtd = parseInt(quantidade, 10);

    if (isNaN(qtd) || qtd <= 0 || qtd > alunos.length) {
      alert("Por favor, insira uma quantidade válida.");
      return;
    }

    // Embaralha a lista de alunos
    const alunosEmbaralhados = [...alunos].sort(() => Math.random() - 0.5);

    // Seleciona os primeiros `qtd` alunos
    const alunosSorteados = alunosEmbaralhados.slice(0, qtd);

    setSorteados(alunosSorteados);
  };

  // Função para formatar e copiar os alunos sorteados
  const copiarParaAreaDeTransferencia = () => {
    if (sorteados.length === 0) {
      alert("Nenhum aluno foi sorteado ainda.");
      return;
    }

    // Formata a lista de alunos sorteados
    const textoFormatado = "ALUNOS VOLUNTÁRIOS\n" + sorteados
      .map((aluno, index) => `${index + 1} - ${aluno.nome} (Número: ${aluno.numero})`)
      .join("\n");

    // Copia o texto formatado para a área de transferência
    Clipboard.setString(textoFormatado);
    alert("Lista de alunos sorteados copiada para a área de transferência!");
  };

  // Cabeçalho da lista (título, campo de entrada e botão)
  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.title}>Sortear Alunos</Text>
      <View style={{flexDirection:"row", alignItems:'center', justifyContent:'center', gap:10, padding:10}}>
        <TextInput
          style={styles.input}
          placeholder="Quantidade de alunos a sortear"
          keyboardType="numeric"
          value={quantidade}
          onChangeText={setQuantidade}
          />

        <TouchableOpacity style={styles.button} onPress={handleSortear}>
          <Text style={styles.buttonText}>Sortear</Text>
        </TouchableOpacity>

        {sorteados.length > 0 && (
          <TouchableOpacity style={styles.copyButton} onPress={copiarParaAreaDeTransferencia}>
            <Text style={styles.copyButtonText}>Copiar Lista</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <View style={{marginTop:10,marginBottom:40}}>
      <FlatList
        data={sorteados}
        keyExtractor={(item) => item.id.toString()}
        
        ListHeaderComponent={renderHeader} // Renderiza o cabeçalho
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemName}>{item.nome}</Text>
            <Text style={styles.itemDetails}>Número: {item.numero}</Text>
          </View>
        )}
        contentContainerStyle={styles.container} // Estilo do contêiner do FlatList
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 15,
    marginHorizontal:10,
    backgroundColor: "#f5f5f5",
  },
  header: {
    width: "100%", // Garante que o cabeçalho ocupe a largura total
    flexDirection: "column", // Organiza os elementos em coluna
    alignItems: "center", // Centraliza os elementos horizontalmente
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    width: "40%", // Garante que o input ocupe a largura total
  },
  button: {
    backgroundColor: "#6200ee",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent:'center',
    width: 100,
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  item: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    width: "100%", // Garante que o item ocupe a largura total
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
  copyButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 5,
    padding:10,
    alignItems: "center",
    justifyContent:"center",
    width: 100, // Garante que o botão de copiar ocupe a largura total
  },
  copyButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    alignItems:"center",
  },
});

export default SorteioScreen;