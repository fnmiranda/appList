import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  ScrollView,
} from "react-native";
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import { Aluno } from "../../../../types/Types";
import Input from "../../../Input";
import CustomDropdown from "../../../CustomModal/CustomDropdown";

interface AlunoModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSave: (aluno: Omit<Aluno, 'id'>) => void;
  aluno: Aluno | null;
}

const AlunoModal: React.FC<AlunoModalProps> = ({ isVisible, onClose, onSave, aluno }) => {
  const [id, setId] = useState(aluno?.id || '');
  const [numero, setNumero] = useState(aluno?.numero || '');
  const [nome, setNome] = useState(aluno?.nome || '');
  const [nomeCompleto, setNomeCompleto] = useState(aluno?.nome_completo || '');
  const [segmento, setSegmento] = useState(aluno?.segmento || '');
  const [pelotao, setPelotao] = useState(aluno?.pelotao || '');
  const [turma, setTurma] = useState(aluno?.turma || '');
  const [tipoSanguineo, setTipoSanguineo] = useState(aluno?.tipo_sanguineo || '');
  const [residencia, setResidencia] = useState(aluno?.residencia || '');
  const [nascimento, setNascimento] = useState(aluno?.nascimento || '');
  const [email, setEmail] = useState(aluno?.email || '');
  const [funcao, setFuncao] = useState(aluno?.funcao || '');
  const [situacao, setSituacao] = useState(aluno?.situacao || 'SAUDAVEL');

  const slideAnim = React.useRef(new Animated.Value(300)).current;

  // Efeito para animar o modal quando visível
  useEffect(() => {
    setNumero(aluno?.numero || '');
    setNome(aluno?.nome || '');
    setNomeCompleto(aluno?.nome_completo || '');
    setSegmento(aluno?.segmento || '');
    setPelotao(aluno?.pelotao || '');
    setTurma(aluno?.turma || '');
    setTipoSanguineo(aluno?.tipo_sanguineo || '');
    setResidencia(aluno?.residencia || '');
    setNascimento(aluno?.nascimento || '');
    setEmail(aluno?.email || '');
    setFuncao(aluno?.funcao || '');
    setSituacao(aluno?.situacao || 'SAUDAVEL');

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
    const updatedAluno: Omit<Aluno, 'id'> = {
      numero,
      nome,
      nome_completo: nomeCompleto,
      segmento,
      pelotao,
      turma,
      tipo_sanguineo: tipoSanguineo,
      residencia,
      nascimento,
      email,
      funcao,
      situacao,
    };
    onSave(updatedAluno);
    onClose();
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
            <Text style={styles.title}>Editar Aluno</Text>
            <TouchableOpacity onPress={handleSave}>
              <AntDesign name="check" size={30} />
            </TouchableOpacity>
          </View>

          <ScrollView contentContainerStyle={styles.scrollContent}>
            <Input
              title="Número:"
              labelStyle={styles.label}
              keyboardType="numeric"
              value={numero}
              onChangeText={setNumero}
            />
            <Input
              title="Nome de GUERRA:"
              labelStyle={styles.label}
              value={nome}
              onChangeText={setNome}
            />
            <Input
              title="Nome Completo:"
              labelStyle={styles.label}
              value={nomeCompleto}
              onChangeText={setNomeCompleto}
            />
            <View style={{flexDirection:'row', gap:3}}>
              <View style={{flexDirection:'column'}}>
                <Text style={[styles.label, {marginTop:10}]}>Função:</Text>
                <CustomDropdown
                  options={["NENHUMA","AuxCom", "Furriel", "Sargenteante", "EncMat","Chefe","Xerife"]}
                  selectedValue={funcao}
                  onValueChange={setFuncao}
                  width={180}
                />
              </View>
              <View style={{flexDirection:'column'}}>
                <Text style={[styles.label, {marginTop:10}]}>Situação</Text>
                <CustomDropdown
                  options={["SAUDAVEL", "BAIXADO", "SERVICO"]}
                  selectedValue={situacao}
                  onValueChange={setSituacao}
                  width={180}
                />
              </View>
            </View>
            
            <View style={{flexDirection:'row', gap:3}}>
              <View style={{flexDirection:'column'}}>
                <Text style={[styles.label, {marginTop:10, marginBottom:4}]}>Tipo Sanguíneo:</Text>
                <CustomDropdown
                  options={["A+","A-", "B+","B-", "AB+","AB-", "O+", "O-"]}
                  selectedValue={tipoSanguineo}
                  onValueChange={setTipoSanguineo}
                  width={120}
                />
              </View>
              <View style={{width:'32%'}}>
                <Input
                  title="Nascimento:"
                  labelStyle={styles.label}
                  value={nascimento}
                  onChangeText={setNascimento}
                />

              </View>
              <View style={{flexDirection:'column'}}>
                <Text style={[styles.label, {marginTop:10, marginBottom:4}]}>Residência:</Text>
                <CustomDropdown
                  options={["R", "SR", "NR"]}
                  selectedValue={residencia}
                  onValueChange={setResidencia}
                  width={120}
                />              

              </View>
            </View>


            <View style={{flexDirection:'row', gap:3}}>
              <View style={{flexDirection:'column'}}>
                <Text style={[styles.label, {marginTop:10}]}>Pelotao:</Text>
                <CustomDropdown
                  options={["1", "2", "Reserva"]}
                  selectedValue={pelotao}
                  onValueChange={setPelotao}
                  width={100}
                />
              </View>
              <View style={{flexDirection:'column'}}>
                <Text style={[styles.label, {marginTop:10}]}>Turma:</Text>
                <CustomDropdown
                  options={["A", "B", "C"]}
                  selectedValue={turma}
                  onValueChange={setTurma}
                  width={120}
                />

              </View>
              <View style={{flexDirection:'column'}}>
                <Text style={[styles.label, {marginTop:10}]}>Segmento:</Text>
                <CustomDropdown
                  options={["MASCULINO", "FEMININO"]}
                  selectedValue={segmento}
                  onValueChange={setSegmento}
                  width={140}
                />              

              </View>
            </View>
            {/* <View style={{flexDirection:'row', gap:3}}>
              <View style={{flexDirection:'column'}}>

              </View>
              <View style={{flexDirection:'column'}}>

              </View>
            </View> */}

            <Input
              title="Email:"
              labelStyle={styles.label}
              value={email}
              onChangeText={setEmail}
            />
            
          
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
    height: "100%",
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
    color: '#000'
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20, // Adiciona um espaço extra no final para garantir que o conteúdo não fique escondido
  },
});

export default AlunoModal;