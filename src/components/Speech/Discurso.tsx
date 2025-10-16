import React from 'react';
import { View, Text, ScrollView, StyleSheet, TextStyle, ViewStyle } from 'react-native';

interface SpeechStyle {
  fontSize: number;
  textAlign: 'auto' | 'left' | 'right' | 'center' | 'justify';
  padding: number;
}

interface Speech {
  title: string;
  text: string;
  style: SpeechStyle;
}

interface SpeechScreenProps {
  speechData?: Speech; // Opcional, usa o default se não fornecido
}

const SpeechScreen: React.FC<SpeechScreenProps> = ({ speechData }) => {
  const defaultSpeechData: Speech = {
    "title": "Discurso de Agradecimento",
    "text": "Permissão, Cel.\n\nAo Coronel... ao nome do qual estendo meus comprimentos ao Comandante e Subcomandante, demais oficiais e companheiros de turma aqui presentes.\n\nGostaria de agradecer, em nome do comandante do IME, pela ímpar oportunidade que tivemos no dia de hoje.\n\nÉ de suma importância para nós, futuros engenheiros militares e que em breve escolheremos nossa especialização, ter a possibilidade de conhecer tão de perto as instalações e trabalhos de um engenheiro militar, bem como sua importância.\n\nSabemos que as atividades são corridas e o tempo é escasso e fomos recebidos com tamanha receptividade e brio.\n\nPortanto, trazendo do abstrato para o concreto, gostaria de entregar ao senhor este singelo diploma e solicitar a assistência uma calorosa salva de palmas.",
    "style": {
      "fontSize": 16,
      "textAlign": "justify",
      "padding": 20
    }
  };

  const data = speechData || defaultSpeechData;
  const textLines = data.text.split('\n');

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <View style={[styles.content, { padding: data.style.padding }]}>
        <View style={styles.textContainer}>
          {textLines.map((line, index) => (
            <Text
              key={index}
              style={[
                styles.text,
                {
                  fontSize: data.style.fontSize,
                  textAlign: data.style.textAlign,
                  marginBottom: line === '' ? 12 : 0
                }
              ]}
            >
              {line}
            </Text>

          ))}
        </View>
        <Text style={[styles.text, { fontSize: 16, textAlign: 'right' }]}>By: Siciliano</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,

  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold' as 'bold',
    textAlign: 'center' as 'center',
    marginBottom: 20,
    color: '#333',
  },
  text: {
    lineHeight: 24,
    color: '#444',
  },
  textContainer: {
    flex: 1,
  }
});

export default SpeechScreen;

