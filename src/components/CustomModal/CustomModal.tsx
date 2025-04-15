import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Button,
  ScrollView,
} from "react-native";
import { MaterialIcons, AntDesign, FontAwesome } from '@expo/vector-icons';
import Input from "../Input";
import { TaskDatabase } from "../../database/useTaskDatabase";
import { UpTask } from "../../pages/list";
import CustomDropdown from "./CustomDropdown";
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { themas } from "../../global/themes";


interface CustomModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSave: (task: UpTask) => void;
  task: TaskDatabase | null
}

const CustomModal: React.FC<CustomModalProps> = ({ isVisible, onClose, onSave, task }) => {
  const [title, setTitle] = useState(task?.title || "");
  const [date, setDate] = useState(task?.date || "");
  const [discription, setDiscription] = useState(task?.discription || "");
  const [status, setStatus] = useState(task?.status || "EM PROCESSO");
  const [flag, setFlag] = useState(task?.flag || "URGENTE");
  const [type, setType] = useState(task?.type || "");

  const [selectedValue, setSelectedValue] = useState('opcao1');

  const slideAnim = React.useRef(new Animated.Value(300)).current;

  React.useEffect(() => {
    // console.log(task)
    setTitle(task?.title || "")
    setDate(task?.date || "");
    setDiscription(task?.discription || "");
    setStatus(task?.status || "");
    setFlag(task?.flag || "");
    setType(task?.type || "");


    if (isVisible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 300,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible]);

  const handleSave = () => {
    
    console.log(onSave);
    try {
      // console.log({ title, date, discription, status, flag, type });
      
      onSave({ title, date, discription, status, flag, type });
      
    } catch (error) {
      console.log(error)
    }
    onClose();
  };

  const [dates, setDates] = useState(new Date()); // Estado para armazenar a data selecionada
  const [shows, setShows] = useState(false); // Estado para controlar a exibição do picker

  // Função chamada quando o usuário seleciona uma data ou hora
  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    // Fecha o picker no Android
    setShows(false);

    // Atualiza a data selecionada
    if (selectedDate) {
      setDates(selectedDate);
      console.log(selectedDate);
      setDate(String(formatDate(selectedDate)))
    }
  };

  // Função para exibir o picker
  const showDatepicker = () => {
    setShows(true);
  };

  const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, '0'); // Dia (DD)
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Mês (MM)
    const year = date.getFullYear(); // Ano (YYYY)
    const hours = String(date.getHours()).padStart(2, '0'); // Horas (HH)
    const minutes = String(date.getMinutes()).padStart(2, '0'); // Minutos (MM)

    return `${day}/${month}/${year} - ${hours}:${minutes}`;
  };

  return (
    <Modal
      transparent
      animationType="none"
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.background} onPress={onClose} />
        <Animated.View style={[styles.modalContainer, { transform: [{ translateY: slideAnim }] }]}>
          
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose}>
              <MaterialIcons name="close" size={30} />
            </TouchableOpacity>
            <Text style={styles.title}>Editar tarefa</Text>
            <TouchableOpacity onPress={handleSave}>
              <AntDesign name="check" size={30} />
            </TouchableOpacity>
          </View>
          <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={{ backgroundColor: '#FFF' }}>
            <Input
              title="Titulo:"
              labelStyle={styles.label}
              value={title}
              onChangeText={setTitle}
            />
            
            {/* <Button onPress={showDatepicker} title="Selecionar Data" /> */}

            {/* Exibe o DateTimePicker apenas se `show` for true */}
            {shows && (
              <DateTimePicker
                value={dates} // Data inicial
                mode="date" // Modo: 'date', 'time' ou 'datetime'
                display="default" // Estilo do picker: 'default', 'spinner', 'calendar' (iOS), 'clock' (iOS)
                onChange={onChange} // Função chamada ao selecionar uma data/hora
              />
            )}
            </View>
            <View style={{flexDirection:"row"}}>
              <View style={{width:'85%'}}>
                <Input
                  title="Prazo:"
                  labelStyle={styles.label}
                  value={date}
                  onChangeText={setDate}
                />
              </View>
              <TouchableOpacity onPress={showDatepicker}>
                  <View  style={{width:40,height:40,gap:10, marginHorizontal:10, marginTop:39,borderColor:'#F1F1F1',borderWidth:2,borderRadius:10, backgroundColor:'#F8F8F8',marginRight:10,justifyContent:"center", alignItems:'center'}}>
                      <FontAwesome
                          name='calendar'
                          size={30}
                          style={{color: themas.colors.primary}}
                      />
                  </View>
              </TouchableOpacity>
            </View>
            <View style={{ width: '100%' }}>
              <Input
                title="Descrição:"
                height={100}
                multiline
                numberOfLines={5}
                labelStyle={styles.label}
                value={discription}
                onChangeText={setDiscription}
              />
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between" , marginTop:10}}>
              <View style={{ flex: 1, marginRight: 10 }}>
                <Text style={styles.label}>Status: </Text>
                <CustomDropdown
                  options={["EM PROCESSO", "FINALIZADO"]}
                  selectedValue={status}
                  onValueChange={setStatus}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.label}>Flag: </Text>
                <CustomDropdown
                  options={["URGENTISSIMO", "URGENTE", "PREFERENCIAL", "ROTINA"]}
                  selectedValue={flag}
                  onValueChange={setFlag}
                />
              </View>
            </View>

            <Text style={[styles.label,{marginTop:10}]}>Tipo: </Text>
            <Input
              value={type}
              onChangeText={setType}
            />
          {/* </View> */}
          </ScrollView>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
  },
  background: {
    flex: 1,
  },
  modalContainer: {
    width: "100%",
    height: "80%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    position: "absolute",
    bottom: 20,
  },
  header: {
    width: '100%',
    height: 40,
    paddingHorizontal: 40,
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  label: {
    fontWeight: 'bold',
    color: '#000',
    
  },

  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20, // Adiciona um espaço extra no final para garantir que o conteúdo não fique escondido
  },
});


const stylePicker = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    marginBottom: 16,
    textAlign: "center",
  },
  pickerContainer: {
    borderWidth: 2,
    borderColor: "#6200ee",
    borderRadius: 12,
    backgroundColor: "#fff",
  },
  picker: {
    height: 50,
    color: "#6200ee",
  },
  item: {
    fontSize: 16,
    color: "#000",
  },
  selectedText: {
    marginTop: 16,
    fontSize: 16,
    textAlign: "center",
  },
});
export default CustomModal