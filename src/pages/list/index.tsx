import React, { useEffect, useState } from "react";
import { Alert, FlatList, Text, TouchableOpacity, View } from "react-native";
import { style } from "./styles";
import Input from "../../components/Input";
import { AntDesign, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import Ball from "../../components/Ball";
import Flag from "../../components/Flag";
import { themas } from "../../global/themes";
import CustomModal from "../../components/CustomModal/CustomModal";
import { TaskDatabase, useTaskDatabase } from "../../database/useTaskDatabase";
import Button from "../../components/Button";
import CustomDropdown from "../../components/CustomModal/CustomDropdown";

export type UpTask = {
    title: string;
    date: string;
    discription: string;  // Corrigido: discription<task className="discription"></task> para discription
    status: string;
    flag: string;
    type: string;
};

function List() {
    const [selectedTask, setSelectedTask] = useState<TaskDatabase | null>(null);
    const [filtro, setFiltro] = useState('ALL');
    const [upTask, setUpTask] = useState<UpTask>({
        title: "",
        date: "",
        discription: "",
        status: "",
        flag: "",
        type: ""
    });
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [search, setSearch] = useState("");
    const [tasks, setTasks] = useState<TaskDatabase[]>([]);
    const [filteredTasks, setFilteredTasks] = useState<TaskDatabase[]>([]);
    const taskDatabase = useTaskDatabase();

  
    const filterTasks = (tasks: TaskDatabase[], searchText: string, filterValue: string) => {
        return tasks.filter(task => {
          // Filtro pelo texto da pesquisa (título da tarefa)
          const matchesSearch = task.title.toLowerCase().includes(searchText.toLowerCase());
      
          // Filtro pelo valor do dropdown
          let matchesFilter = true;
          if (filterValue !== "ALL") {
            matchesFilter = task.status === filterValue || task.flag === filterValue || task.type === filterValue;
          }
      
          // Retorna true apenas se ambos os filtros forem atendidos
          return matchesSearch && matchesFilter;
        });
      };

    async function remove(id: number) {
        try {
            await taskDatabase.remove(id);
            await list();
        } catch (error) {
            console.log(error);
        }
    }

    const handleOpenModal = (task: TaskDatabase) => {
        setSelectedTask(task);
        console.log(task)
        setUpTask({
            title: task.title,
            date: task.date,
            discription: task.discription,  
            status: task.status,
            flag: task.flag,
            type: task.type
        });
        setIsModalVisible(true);
    };

    // async function list() {
    //     try {
    //         const response = await taskDatabase.searchByTitle(search);
    //         setTasks(response);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    async function list() {
        try {
          const response = await taskDatabase.searchByTitle(search);
          setTasks(response);
          const filtered = filterTasks(response, search, filtro);
          setFilteredTasks(filtered);
        } catch (error) {
          console.log(error);
        }
      }

      async function getAllTasks() {
        try {
          const response = await taskDatabase.getAll();
          setTasks(response);
          const filtered = filterTasks(response, search, filtro);
          setFilteredTasks(filtered);
        } catch (error) {
          console.log(error);
        }
      }

    useEffect(() => {
        const filtered = filterTasks(tasks, search, filtro);
        setFilteredTasks(filtered);
      }, [tasks, search, filtro]);

    useEffect(() => {
        list();
    }, [search]);

    async function handleSaveTask(updatedTask: UpTask) {
        if (selectedTask?.id) {
          await taskDatabase.update({
            id: Number(selectedTask.id),
            ...updatedTask, 
          });
        } else {
          await taskDatabase.create(updatedTask); 
        }
      
        await list(); 
        setIsModalVisible(false); 
      }

    const renderCard = (item: TaskDatabase) => {

        const getBallColor = (flag: string) => {
            if (flag === "URGENTISSIMO") {
                return "#ee4a4a"; //vermelho
            } else if(flag ==="URGENTE"){
                return 'orange'
            } else if (flag === "ROTINA") {
                return "#73c46a"; //verde
            } else {
                return "#4a88ee"; //azul
            }
        };
        return (
            <View style={style.card}>
                <TouchableOpacity onPress={() => handleOpenModal(item)} style={{ flex: 1 }}>
                    <View style={style.rowCard}>
                        <View style={style.rowCardLeft}>
                            <Ball color={getBallColor(item.flag)} />
                            <View>
                                <Text style={style.titleCard}>{item.title}</Text>
                                <Text style={style.dateCard}>{item.date}</Text>
                                <Text style={style.typeCard}>{item.status}</Text>
                            </View>
                        </View>
                        <View style={{flex:1, flexDirection:'row', gap:10, alignItems:"center"}}>
                            <View style={{flexDirection: "column", alignItems: "center" , gap:5}}>
                                <Flag color={getBallColor(item.flag)} caption={item.flag} />
                                <Text style={style.typeCard}>{item.type}</Text>
                            </View>
                            <TouchableOpacity onPress={() => remove(item.id)}>
                                <View  style={{width:40,height:40,gap:10,borderColor:'#F1F1F1',borderWidth:2,borderRadius:10, backgroundColor:'#F8F8F8',marginRight:10,justifyContent:"center", alignItems:'center'}}>
                                    <FontAwesome
                                        name='trash'
                                        size={30}
                                        style={{color: themas.colors.primary}}
                                    />
                                </View>
                            </TouchableOpacity>

                        </View>

                    </View>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <View style={style.container}>
            <View style={style.header}>
                <Text style={style.greeting}>LISTA de ATIVIDADES</Text>
                <View style={style.subHeader}>
                    <View style={style.boxInput}>
                        <Input
                            iconLeftName="search"
                            IconLeft={MaterialIcons}
                            onChangeText={setSearch}
                        />
                    </View>
                    <View style={{flexDirection:'row', alignItems:"center", marginTop:5}}>
                            {/* <Text style={{fontSize:20, color:'white', fontWeight:"bold"}}>Filtro: </Text>  */}
                            <CustomDropdown
                                options={["EM PROCESSO", "FINALIZADO", "URGENTISSIMO", 'URGENTE', 'PREFERENCIAL', 'ROTINA','ALL']}
                                selectedValue={filtro}
                                onValueChange={setFiltro}
                                // onValueChange={(e) => filtroAluno(e, alunosFull)}
                                width={154}
                                height={40}
                            />
                    </View>
                </View>
            </View>
            <View style={style.boxList}>
                <FlatList
                    data={filteredTasks}
                    style={{ marginTop: 10, paddingHorizontal: 20 }}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => renderCard(item)}
                />
            </View>

            <TouchableOpacity
                style={style.addButton}
                onPress={() => {
                setSelectedTask(null); // Define selectedTask como null para criar uma nova tarefa
                setUpTask({
                    title: "",
                    date: "",
                    discription: "",
                    status: "",
                    flag: "",
                    type: "",
                });
                setIsModalVisible(true); // Abre o modal
                }}
            >
                <Text style={style.addButtonText}>+</Text>
            </TouchableOpacity>
            <CustomModal
                isVisible={isModalVisible}
                onClose={() => setIsModalVisible(false)}
                onSave={(vetor) => handleSaveTask(vetor)}
                task={selectedTask}
            />
        </View>
    );
}

export default List;
