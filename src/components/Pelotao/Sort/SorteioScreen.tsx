import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Clipboard } from "react-native";
import { Aluno } from "../../../types/Types";

// Defina o tipo Aluno

// Lista de alunos pré-definida
interface CustomSortProps {
  alunos: Aluno[];
}

const SorteioScreen: React.FC<CustomSortProps> = ({ alunos }) => {
  const [quantidadeGrupos, setQuantidadeGrupos] = useState<string>("");
  const [alunosPorGrupo, setAlunosPorGrupo] = useState<string>("");
  const [gruposSorteados, setGruposSorteados] = useState<Aluno[][]>([]);

  // Função para sortear os alunos
  const handleSortearGrupos = () => {
    const numGrupos = parseInt(quantidadeGrupos, 10);
    const numAlunosPorGrupo = parseInt(alunosPorGrupo, 10);

    if (isNaN(numGrupos) || numGrupos <= 0) {
      alert("Por favor, insira uma quantidade válida de grupos.");
      return;
    }

    if (isNaN(numAlunosPorGrupo) || numAlunosPorGrupo <= 0) {
      alert("Por favor, insira uma quantidade válida de alunos por grupo.");
      return;
    }

    const totalAlunosNecessarios = numGrupos * numAlunosPorGrupo;
    if (totalAlunosNecessarios > alunos.length) {
      alert(`Não há alunos suficientes. Necessário: ${totalAlunosNecessarios}, Disponível: ${alunos.length}`);
      return;
    }

    // Embaralha todos os alunos
    const alunosEmbaralhados = [...alunos].sort(() => Math.random() - 0.5);

    // Divide em grupos
    const grupos: Aluno[][] = [];
    for (let i = 0; i < numGrupos; i++) {
      const inicio = i * numAlunosPorGrupo;
      const fim = inicio + numAlunosPorGrupo;
      grupos.push(alunosEmbaralhados.slice(inicio, fim));
    }

    setGruposSorteados(grupos);
  };

  // Função para formatar e copiar os alunos sorteados
  const copiarGruposParaAreaDeTransferencia = () => {
    if (gruposSorteados.length === 0) {
      alert("Nenhum grupo foi sorteado ainda.");
      return;
    }

    let textoFormatado = `GRUPOS SORTEADOS - ${gruposSorteados.length} grupos de ${alunosPorGrupo} alunos\n\n`;

    gruposSorteados.forEach((grupo, indexGrupo) => {
      textoFormatado += `🏆 GRUPO ${indexGrupo + 1}:\n`;
      grupo.forEach((aluno, indexAluno) => {
        textoFormatado += `  ${indexAluno + 1}. ${aluno.nome} (Nº ${aluno.numero})\n`;
      });
      textoFormatado += "\n";
    });

    Clipboard.setString(textoFormatado);
    alert("Lista de grupos copiada para a área de transferência!");
  };


  // Cabeçalho da lista (título, campo de entrada e botão)
  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.title}>SORTEAR GRUPOS</Text>

      <View style={styles.inputsContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nº de grupos"
          keyboardType="numeric"
          value={quantidadeGrupos}
          onChangeText={setQuantidadeGrupos}
        />

        <TextInput
          style={styles.input}
          placeholder="Alunos por grupo"
          keyboardType="numeric"
          value={alunosPorGrupo}
          onChangeText={setAlunosPorGrupo}
        />

        <TouchableOpacity style={styles.button} onPress={handleSortearGrupos}>
          <Text style={styles.buttonText}>Sortear Grupos</Text>
        </TouchableOpacity>

        {gruposSorteados.length > 0 && (
          <TouchableOpacity style={styles.copyButton} onPress={copiarGruposParaAreaDeTransferencia}>
            <Text style={styles.copyButtonText}>Copiar Grupos</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );


  return (
    <View style={{ marginTop: 10, marginBottom: 40 }}>
      <FlatList
        data={gruposSorteados}
        keyExtractor={(_, index) => `grupo-${index}`}
        ListHeaderComponent={renderHeader}
        renderItem={({ item: grupo, index }) => (
          <View style={styles.grupoContainer}>
            <Text style={styles.grupoTitulo}>Grupo {index + 1}</Text>
            {grupo.map((aluno) => (
              <View key={aluno.id} style={styles.itemCompact}>
                <Text style={styles.itemNameCompact}>{aluno.nome}</Text>
                <Text style={styles.itemDetailsCompact}>Nº {aluno.numero}</Text>
              </View>
            ))}
          </View>
        )}
        contentContainerStyle={styles.container}
      // numColumns={2} // Exibe 2 grupos por linha (opcional)
      />


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 15,
    width: "100%",
    marginHorizontal: 10,
    backgroundColor: "#f5f5f5",
  },

  header: {
    width: "95%",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 16, // Bordas mais arredondadas
    padding: 10, // Mais padding
    marginBottom: 10,
    marginHorizontal: 1, // Pequena margem lateral

    // Sombra mais pronunciada
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4, // Sombra mais longa
    },
    shadowOpacity: 0.15, // Um pouco mais de opacidade
    shadowRadius: 6, // Sombra mais suave

    elevation: 8, // Sombra mais forte no Android

    // Borda gradiente sutil
    borderWidth: 1,
    borderColor: "#e8e8e8", // Cor ainda mais suave

    // Efeito de profundidade extra
    borderBottomWidth: 2,
    borderBottomColor: "#f8f8f8",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
    color: 'rgba(34, 72, 177, 0.88)',
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    width: "43%", // Garante que o input ocupe a largura total
  },
  button: {
    // backgroundColor: "#6200ee",
    backgroundColor: 'rgba(34, 72, 177, 0.88)',
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: 'center',
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
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    width: 100, // Garante que o botão de copiar ocupe a largura total
  },
  copyButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    alignItems: "center",
  },
  inputsContainer: {
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    padding: 10,
    flexWrap: 'wrap',
  },
  grupoLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    // color: '#6200ee',
    color: 'rgba(34, 72, 177, 0.88)',
    marginBottom: 5,
  },
  grupoContainer: {
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    width: '95%',
  },
  grupoTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    //color: '#6200ee',
    color: 'rgba(34, 72, 177, 0.88)',
    marginBottom: 10,
    textAlign: 'center',
    backgroundColor: '#e6e6fa',
    padding: 8,
    borderRadius: 5,
  },
  itemCompact: {
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 5,
    marginBottom: 5,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  itemNameCompact: {
    fontSize: 14,
    fontWeight: "bold",
  },
  itemDetailsCompact: {
    fontSize: 12,
    color: "#666",
  },
});

export default SorteioScreen;
