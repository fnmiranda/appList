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

const Horas: React.FC = () => {
  return (
    <Text style={styles.emptyText}>EM DESENVOLVIMENTO</Text>
  )
}

export default Horas;
