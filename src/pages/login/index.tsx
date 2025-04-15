import React, { useEffect, useState } from "react";
import { style } from "./styles";
import Logo from '../../assets/logo.png'
import { Text, View, Image, Alert } from 'react-native'
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { MaterialIcons, Octicons } from '@expo/vector-icons';
import { useUserDatabase } from '../../database/useUserDatabase';
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useAuth } from "../../context/authContext";

export default function Login() {
    const { user,login } = useAuth();
    const navigation = useNavigation<NavigationProp<any>>();
    const { getUserByEmail, verifyPassword } = useUserDatabase();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(true);
    const [loading, setLoading] = useState(false);

    
    
    useEffect(() => {
        if (user) {
            navigation.reset({ routes: [{ name: 'BottomRoutes' }] });
        }
    }, [user]);

    const getLogin = async () => {
        try {
            setLoading(true);

            // Validação dos campos
            if (!email || !password) {
                return Alert.alert('Atenção', 'Informe os campos obrigatórios!');
            }

            // Busca o usuário pelo e-mail
            
            const user2 = await getUserByEmail(email);
            console.log(user2)
            if (user2 && await verifyPassword(password, user2.password)) {
                login(user2)
                console.log(user)

                // Login bem-sucedido
                // if(user){
                //     return navigation.reset({ routes: [{ name: 'BottomRoutes' }] });
                // }
                Alert.alert("Login Bem sucedida",` Bem vindo, ${user2?.name}!`)
            }else{
                Alert.alert('Atenção', 'E-mail ou senha inválida!')
            }

            // Login falhou
        } catch (error) {
            console.error('Erro durante o login:', error);
            Alert.alert('Erro', 'Ocorreu um erro durante o login. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        console.log("Usuário atualizado:", user);
    }, [user]);

    return (
        <View style={style.container}>
            <View style={style.boxTop}>
                <Image
                    source={Logo}
                    style={style.logo}
                    resizeMode="contain"
                />
                <Text style={style.text}>Bem vindo de volta!</Text>
            </View>
            <View style={style.boxMid}>
                <Input
                    title="ENDEREÇO E-MAIL"
                    value={email}
                    onChangeText={setEmail}
                    IconRight={MaterialIcons}
                    iconRightName="email"
                    onIconRightPress={() => console.log('OLA')}
                />
                <Input
                    title="SENHA"
                    value={password}
                    onChangeText={setPassword}
                    IconRight={Octicons}
                    iconRightName={showPassword ? "eye-closed" : "eye"}
                    onIconRightPress={() => setShowPassword(!showPassword)}
                    secureTextEntry={showPassword}
                    multiline={false}
                />
            </View>
            <View style={style.boxBottom}>
                <Button text="ENTRAR" loading={loading} onPress={getLogin} />
            </View>
            <Text style={style.textBottom}>Não tem conta? <Text style={style.textBottom}>Crie agora</Text></Text>
        </View>
    );
}