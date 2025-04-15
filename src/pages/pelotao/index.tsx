import React, { useEffect, useState } from "react";
import { Button, FlatList, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Input from "../../components/Input";
import { AntDesign, FontAwesome, MaterialIcons } from '@expo/vector-icons';

import { style } from "./styles";
import { themas } from "../../global/themes";
import ChamadaAlunos from "../../components/Pelotao/CallAlunos/ChamadaAlunos";
import { Aluno, NewAluno } from "../../types/Types";
import { useAlunoDatabase } from "../../database/useAlunoDatabase";
import AlunoModal from "../../components/Pelotao/CallAlunos/AlunoModal/AlunoModal";
import SorteioScreen from "../../components/Pelotao/Sort/SorteioScreen";
import BaixadosScreen from "../../components/Pelotao/Sick/SickAlunos";
import ServiceScreen from "../../components/Pelotao/Service/ServiceAlunos";
import ChamadaScreen from "../../components/Pelotao/Chamada/Chamada";
import CustomDropdown from "../../components/CustomModal/CustomDropdown";

export default function Pelotao() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [search, setSearch] = useState("");
    const [alunos, setAlunos] = useState<Aluno[]>([]);
    const [alunosFull, setAlunosFull] = useState<Aluno[]>([]);
    const [alunosFiltro, setAlunosFiltro] = useState<Aluno[]>([]);
    const [selectAluno, setSelectAluno] = useState<Aluno | null>(null);
    const [upAluno, setUpAluno] = useState<Omit<Aluno, 'id'>>({
        numero: '',
        nome: '',
        nome_completo: '',
        segmento: '',
        pelotao: '',
        turma: '',
        tipo_sanguineo: '',
        residencia: '',
        nascimento: '',
        email: '',
        funcao: '',
        situacao: ''
    });
    const [filtro, setFiltro] = useState<string>('ALPHA')

    const [selectedTab, setSelectedTab] = useState("Chamada");

    const alunoDatabase = useAlunoDatabase();
 
    const handleOpenModal = (aluno: Aluno) => {
        setSelectAluno(aluno);
        setUpAluno({
            numero: aluno.numero,
            nome: aluno.nome,
            nome_completo: aluno.nome_completo,
            segmento: aluno.segmento,
            pelotao: aluno.pelotao,
            turma: aluno.turma,
            tipo_sanguineo: aluno.tipo_sanguineo,
            residencia: aluno.residencia,
            nascimento: aluno.nascimento,
            email: aluno.email,
            funcao: aluno.funcao,
            situacao: aluno.situacao
        });
        setIsModalVisible(true);
    };

    const filtroAluno =  (e: string, alunos: Aluno[]) => {
        setFiltro(e)
        
        if (e ==='ALPHA'){
            setAlunosFiltro(alunos.filter((aluno) => aluno.turma ==='A'))
        }else
        if (e ==='BRAVO'){
            setAlunosFiltro(alunos.filter((aluno) => aluno.turma ==='B'))
        }else
        if (e ==='CHARLIE'){
              setAlunosFiltro(alunos.filter((aluno) => aluno.turma ==='C'))
        }else
        
        if (e ==='1'){
              setAlunosFiltro(alunos.filter((aluno) => aluno.pelotao ==='1'))
        }else
        
        if (e ==='2'){
          setAlunosFiltro(alunos.filter((aluno) => aluno.pelotao ==='2'))
        }else{
          setAlunosFiltro(alunos)
        }
        // console.log(alunosFiltro)
        
      }

    async function remove(id: number) {
        try {
            await alunoDatabase.remove(id);
            await list();
        } catch (error) {
            console.log(error);
        }
    }

    async function handleSaveAluno(alunoUpdate: Omit<Aluno, 'id'>) {
        console.log('salvo');
        if (selectAluno?.id) {
            await alunoDatabase.update({
                id: selectAluno.id,
                ...alunoUpdate
            });
        } else {
            await alunoDatabase.create(alunoUpdate);
        }
        list();
        setIsModalVisible(false);
    }

    async function list() {
        try {
            const response = await alunoDatabase.searchByname(search);
            setAlunos(response);
        } catch (error) {
            console.log(error);
        }
    }
    async function getAllAlunos() {
        try {
            const response = await alunoDatabase.getAll();
            setAlunosFull(response);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        filtroAluno(filtro, alunosFull); 
    }, [selectedTab, alunosFull]);

    useEffect(() => {
        list();
    }, [search]);

    useEffect(() => {
        getAllAlunos();
    }, [filtro, selectedTab, alunos]);

    const navguia = ['Alunos', 'Voluntarios', 'Baixados', 'Servico', 'Chamada'];
    const navguia_acentuado = ['Alunos', 'Voluntários', 'Baixados', 'Serviço', 'Chamada'];

    return (
        <View style={style.container}>
            <View style={style.header}>
                <Text style={style.greeting}>PELOTÃO</Text>
                <View style={style.subHeader}>
                    <View style={style.boxInput}>
                        <Input
                            placeholder="Pesquisar aluno"
                            iconLeftName="search"
                            onChangeText={setSearch}
                        />
                    </View>
                    <View style={{flexDirection:'row', alignItems:"center", marginTop:5}}>
                        {/* <Text style={{fontSize:20, color:'white', fontWeight:"bold"}}>Filtro: </Text>  */}
                        <CustomDropdown
                            options={["ALPHA", "BRAVO", "CHARLIE", '1', '2', 'ALL']}
                            selectedValue={filtro}
                            onValueChange={(e) => filtroAluno(e, alunosFull)}
                            width={120}
                            height={40}
                        />
                    </View>
                </View>
                
            </View>

            <View style={{ flexDirection: "row", justifyContent: "space-between", gap: 10, borderWidth: 1, borderColor: '#D3D3D3', backgroundColor: '#D3D3D3' }}>
                {navguia.map((item, index) => (
                    <TouchableOpacity key={index} style={[style.tab, selectedTab === item && style.activeTab]} onPress={() => setSelectedTab(item)}>
                        <Text style={[style.text, selectedTab === item && style.activeText]}>
                            {navguia_acentuado[index]}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            <View style={{ marginBottom: 130 }}>
                {selectedTab === 'Alunos' ? (
                    <ChamadaAlunos alunos={alunos} onOpen={handleOpenModal} remove={remove} />
                ) : selectedTab === 'Voluntarios' ? (
                    <SorteioScreen alunos={alunosFiltro} />
                ) : selectedTab === 'Baixados' ? (
                    <BaixadosScreen alunos={alunosFiltro} />
                ) : selectedTab === 'Servico' ? (
                    <ServiceScreen alunos={alunosFiltro} />
                ) : (
                    <ChamadaScreen alunos={alunosFiltro} />
                )}
            </View>

            <TouchableOpacity
                onPress={() => {
                    setSelectAluno(null);
                    setUpAluno({
                        numero: '',
                        nome: '',
                        nome_completo: '',
                        segmento: '',
                        pelotao: '',
                        turma: '',
                        tipo_sanguineo: '',
                        residencia: '',
                        nascimento: '',
                        email: '',
                        funcao: '',
                        situacao: ''
                    });
                    setIsModalVisible(true);
                }}
                style={style.addButton}
            >
                <Text style={style.addButtonText}>+</Text>
            </TouchableOpacity>

            <AlunoModal
                isVisible={isModalVisible}
                onClose={() => setIsModalVisible(false)}
                onSave={handleSaveAluno}
                aluno={selectAluno}
            />
        </View>
    );
}