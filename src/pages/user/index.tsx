import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native"; // Importe o useNavigation
import { style } from "./styles";
import { useUserDatabase } from "../../database/useUserDatabase";
import { useAuth } from "../../context/authContext";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../routes/index.routes";

interface Usuario {
    id: number;
    nome: string;
    email: string;
    password: string;
}
type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, "Login">;

function User() {
    const navigation = useNavigation<ProfileScreenNavigationProp>();
    const { user, logout } = useAuth();
    const { updateUser, getUserByEmail } = useUserDatabase();
    // const navigation = useNavigation(); 

    // Estado para armazenar as informações do usuário
    const [usuario, setUsuario] = useState<Usuario>({
        id: 0,
        nome: "",
        email: "",
        password: "",
    });

    // Estado para controlar o modo de edição
    const [editando, setEditando] = useState(false);
    const [loading, setLoading] = useState(false);

    // Carrega os dados do usuário ao abrir a tela
    useEffect(() => {
        carregarDadosUsuario();
        console.log(user);
    }, []);

    // Função para carregar os dados do usuário
    const carregarDadosUsuario = async () => {
        try {
            if (user) {
                const email = user.email;
                console.log(email);
                const user2 = await getUserByEmail(email);
                if (user2) {
                    setUsuario({
                        id: user2.id,
                        nome: user2.name,
                        email: user2.email,
                        password: "", // Não carregamos a senha por segurança
                    });
                }
            }
        } catch (error) {
            console.error("Erro ao carregar dados do usuário:", error);
            Alert.alert("Erro", "Não foi possível carregar os dados do usuário.");
        }
    };

    // Função para salvar as alterações
    const salvarAlteracoes = async () => {
        try {
            setLoading(true);

            // Validação dos campos
            
            // Atualiza o usuário no banco de dados
            if (user) {
                if (!usuario.nome || !usuario.email) {
                    return Alert.alert("Atenção", "Nome e e-mail são obrigatórios!");
                }
                console.log(`Senha: ${usuario.password}`)
                const success = await updateUser(
                    user.id,
                    usuario.nome,
                    usuario.email,
                    usuario.password // Senha opcional
                );

                if (success) {
                    setEditando(false);
                    Alert.alert("Sucesso", "Informações atualizadas com sucesso!");
                } else {
                    Alert.alert("Erro", "Não foi possível atualizar as informações.");
                }
            }
        } catch (error) {
            console.error("Erro ao salvar alterações:", error);
            Alert.alert("Erro", "Ocorreu um erro ao salvar as alterações.");
        } finally {
            setLoading(false);
        }
    };

    // Função para fazer logout
    const handleLogout = async () => {
        await logout(); // Chama a função de logout do authContext
        navigation.reset({ routes: [{ name: "Login" }] }); // Navega para a tela de login
    };

    useEffect(() => {
        console.log("Usuário atualizado:", user);
    }, [user]);

    return (
        <View style={style.all}>
            <ScrollView contentContainerStyle={style.container}>
                <Text style={style.infoUser}>INFORMAÇÃO DO USER</Text>

                {/* Campo: Nome */}
                <View style={style.campo}>
                    <Text style={style.label}>Nome</Text>
                    {editando ? (
                        <TextInput
                            style={style.input}
                            value={usuario.nome}
                            onChangeText={(text) => setUsuario({ ...usuario, nome: text })}
                        />
                    ) : (
                        <Text style={style.texto}>{usuario.nome}</Text>
                    )}
                </View>

                {/* Campo: Email */}
                <View style={style.campo}>
                    <Text style={style.label}>Email</Text>
                    {editando ? (
                        <TextInput
                            style={style.input}
                            value={usuario.email}
                            onChangeText={(text) => setUsuario({ ...usuario, email: text })}
                            keyboardType="email-address"
                        />
                    ) : (
                        <Text style={style.texto}>{usuario.email}</Text>
                    )}
                </View>

                {/* Campo: Senha */}
                <View style={style.campo}>
                    <Text style={style.label}>Senha</Text>
                    {editando ? (
                        <TextInput
                            style={style.input}
                            value={usuario.password}
                            onChangeText={(text) => setUsuario({ ...usuario, password: text })}
                            secureTextEntry={true}
                            placeholder="Nova senha (opcional)"
                        />
                    ) : (
                        <Text style={style.texto}>********</Text> // Exibe asteriscos para a senha
                    )}
                </View>

                {/* Botão de Editar/Salvar */}
                <TouchableOpacity
                    style={style.botao}
                    onPress={() => (editando ? salvarAlteracoes() : setEditando(true))}
                    disabled={loading}
                >
                    <Text style={style.botaoTexto}>
                        {loading ? "Salvando..." : editando ? "Salvar" : "Editar"}
                    </Text>
                </TouchableOpacity>

                {/* Botão de Logout */}
                <TouchableOpacity
                    style={style.botao}
                    onPress={handleLogout} // Chama a função de logout
                >
                    <Text style={style.botaoTexto}>Logout</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

export default User;