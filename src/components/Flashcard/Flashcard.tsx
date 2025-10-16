// App.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  Modal,
  SafeAreaView,
  ListRenderItem
} from 'react-native';
import { styles } from "./styles";

interface Flashcard {
  id: string;
  front: string;
  back: string;
  createdAt: string;
}


const FlashcardApp: React.FC = () => {

  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [frontText, setFrontText] = useState('');
  const [backText, setBackText] = useState('');
  const [selectedCard, setSelectedCard] = useState<Flashcard | null>(null);

  const [isFlipped, setIsFlipped] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const addFlashcard = () => {
    if (frontText.trim() === '' || backText.trim() === '') {
      Alert.alert('Erro', 'Preencha ambos os lados do flashcard');
      return;
    }

    const newCard = {
      id: Date.now().toString(),
      front: frontText,
      back: backText,
      createdAt: new Date().toLocaleDateString('pt-BR')
    };

    setFlashcards([...flashcards, newCard]);
    setFrontText('');
    setBackText('');
    Alert.alert('Sucesso', 'Flashcard adicionado!');
  };

  const deleteFlashcard = (id: string) => {
    setFlashcards(flashcards.filter(card => card.id !== id));
    setShowModal(false);
  };

  const viewFlashcard = (card: Flashcard) => {
    setSelectedCard(card);
    setIsFlipped(false);
    setShowModal(true);
  };

  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };

  const renderFlashcardItem = (item: Flashcard) => (
    <TouchableOpacity
      key={item.id}
      style={styles.cardItem}
      onPress={() => viewFlashcard(item)}
    >
      <Text style={styles.cardFrontText} numberOfLines={2}>
        {item.front}
      </Text>
      <Text style={styles.cardDate}>{item.createdAt}</Text>
    </TouchableOpacity>
  );
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎴 Criador de Flashcards</Text>
      <Text style={styles.emptyText}> EM DESENVOLVIMENTO: SEM BANCO DE DADOS</Text>
      {/* Formulário de Criação */}
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Frente do card (pergunta ou termo)"
          value={frontText}
          onChangeText={setFrontText}
          multiline
        />

        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Verso do card (resposta ou definição)"
          value={backText}
          onChangeText={setBackText}
          multiline
          numberOfLines={3}
        />

        <TouchableOpacity
          style={styles.addButton}
          onPress={addFlashcard}
        >
          <Text style={styles.addButtonText}>+ Adicionar Flashcard</Text>
        </TouchableOpacity>
      </View>

      {/* Lista de Flashcards */}
      <View style={styles.listContainer}>
        <Text style={styles.subtitle}>
          Meus Flashcards ({flashcards.length})
        </Text>
        {flashcards.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>
              Nenhum flashcard criado ainda{'\n'}
              Comece adicionando seu primeiro card!
            </Text>
          </View>
        ) : (
          <FlatList
            data={flashcards}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View key={item.id}>
                {renderFlashcardItem(item)}
              </View>
            )}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={true}
            style={styles.scrollView}
          />
        )}
      </View>

      {/* Modal de Visualização */}
      <Modal
        visible={showModal}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedCard && (
              <>
                <TouchableOpacity
                  style={styles.flashcard}
                  onPress={flipCard}
                  activeOpacity={0.9}
                >
                  <Text style={styles.flashcardText}>
                    {isFlipped ? selectedCard.back : selectedCard.front}
                  </Text>
                  <Text style={styles.flipHint}>
                    👆 Toque para {isFlipped ? 'voltar' : 'virar'}
                  </Text>
                </TouchableOpacity>

                <View style={styles.modalButtons}>
                  <TouchableOpacity
                    style={[styles.modalButton, styles.closeButton]}
                    onPress={() => setShowModal(false)}
                  >
                    <Text style={styles.modalButtonText}>Fechar</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.modalButton, styles.deleteButton]}
                    onPress={() => deleteFlashcard(selectedCard.id)}
                  >
                    <Text style={styles.modalButtonText}>Excluir</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default FlashcardApp;
