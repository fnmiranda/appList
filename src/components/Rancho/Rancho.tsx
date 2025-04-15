import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AntDesign, FontAwesome, MaterialIcons } from '@expo/vector-icons';

const Rancho = () => {
  return (
    <View style={styles.container}>
      {/* Card para Segunda a Sexta */}
      <View style={styles.card}>
        <Text style={styles.title}>
          <FontAwesome name="calendar" size={18} color="#000" /> Segunda a Sexta
        </Text>
        <View style={styles.row}>
          <FontAwesome name="coffee" size={20} color="#000" />
          <Text style={styles.text}>Café: 6:00 - 7:00</Text>
        </View>
        <View style={styles.row}>
          <MaterialIcons name="lunch-dining" size={20} color="#000" />
          <Text style={styles.text}>Almoço: 12:00 - 13:45</Text>
        </View>
        <View style={styles.row}>
          <MaterialIcons name="dinner-dining" size={20} color="#000" />
          <Text style={styles.text}>Jantar: 18:00 - 19:00</Text>
        </View>
      </View>

      {/* Card para Sábado, Domingo e Feriados */}
      <View style={styles.card}>
        <Text style={styles.title}>
          <FontAwesome name="calendar" size={18} color="#000" /> Sábado, Domingo e Feriados
        </Text>
        <View style={styles.row}>
          <FontAwesome name="coffee" size={20} color="#000" />
          <Text style={styles.text}>Café: 7:00 - 8:00</Text>
        </View>
        <View style={styles.row}>
          <MaterialIcons name="lunch-dining" size={20} color="#000" />
          <Text style={styles.text}>Almoço: 11:30 - 12:00</Text>
        </View>
        <View style={styles.row}>
          <MaterialIcons name="dinner-dining" size={20} color="#000" />
          <Text style={styles.text}>Jantar: 18:00 - 19:00</Text>
        </View>
        <View style={styles.row}>
          <AntDesign name="staro" size={20} color="#000" />
          <Text style={styles.text}>Ceia: 20:30 - 21:00</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  card: {
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
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  text: {
    marginLeft: 8,
    fontSize: 16,
  },
});

export default Rancho;