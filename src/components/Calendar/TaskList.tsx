import React from 'react';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

interface CustomTaskListProps {
  date: Date;
  tasks: {
    text: string;
    flag: string,
    done: string; // "FINALIZADO" ou "EM PROCESSO"
  }[];
}

const TaskList: React.FC<CustomTaskListProps> = ({ date, tasks }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        Tarefas para {date.toLocaleDateString()}
      </Text>

      <FlatList
        data={tasks}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }) => {
          const isFinalizada = item.done === 'FINALIZADO';
          return (
            <View
              style={[
                styles.taskItem,
                isFinalizada ? styles.taskItemFinalizada : styles.taskItemProcesso,
              ]}
            >
                <View>
                    <Text
                        style={[
                        styles.taskText,
                        isFinalizada ? styles.taskTextFinalizada : styles.taskTextProcesso,
                        ]}
                    >
                        {item.text}
                    </Text>
                    <Text
                        style={[
                        styles.status,
                        isFinalizada ? styles.statusFinalizada : styles.statusProcesso,
                        ]}
                    >
                        {item.done}
                    </Text>
                </View>
                <View style={styles.taskflag}>
                    <Text
                        style={[
                            styles.status, {fontSize:14},
                            item.flag === 'URGENTISSIMO'
                            ? styles.statusUrgentissimo
                            : item.flag === 'URGENTE'
                            ? styles.statusUrgente
                            : item.flag === 'PREFERENCIAL'
                            ? styles.statusPreferencial
                            : styles.statusRotina,
                        ]}
                        >
                        {item.flag}
                    </Text>
                </View>    
              
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    height: '47%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#f8faff',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
  },
  taskItem: {
    padding: 12,
    flexDirection:'row',
    justifyContent:'space-between',
    gap:10,

    marginBottom: 8,
    borderRadius: 8,
  },
  taskflag:{
    alignItems:'center',
    alignContent:'center',    
  },
  taskItemFinalizada: {
    backgroundColor:'#fff',
    
    borderColor: "#ccc",
    borderWidth: 1,
    //backgroundColor: '#d6eaf8', // azul claro
},
taskItemProcesso: {
    backgroundColor:'#fff',

    borderColor: "#ccc",
    borderWidth: 1,
    //backgroundColor: '#fef9e7', // amarelo suave
},
taskText: {
    fontSize: 16,
    marginBottom: 4,
  },
  taskTextFinalizada: {
    color: '#2c3e50',
    textDecorationLine: 'line-through',
  },
  taskTextProcesso: {
    color: '#2c3e50',
  },
  status: {
    fontSize: 12,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    overflow: 'hidden',
  },
  statusFinalizada: {
    backgroundColor: '#3498db',
    color: '#fff',
  },
  statusProcesso: {
    backgroundColor: '#f1c40f',
    color: '#333',
  },

  statusUrgentissimo: {
    backgroundColor: '#ff6961', // vermelho
    color: '#fff',
  },
  statusUrgente: {
    backgroundColor: '#e67e22', // laranja
    color: '#fff',
  },
  statusPreferencial: {
      backgroundColor: '#00c4ff', // verde
      color: '#fff',
    },
  statusRotina: {
    backgroundColor: '#2ecc71', // verde
    color: '#fff',
  },
});

export default TaskList;
