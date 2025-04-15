import { useSQLiteContext } from 'expo-sqlite';
import * as Crypto from 'expo-crypto';

export function useUserDatabase() {
    const db = useSQLiteContext();

    // Função para gerar um hash da senha
    const hashPassword = async (password: string): Promise<string> => {
        const digest = await Crypto.digestStringAsync(
            Crypto.CryptoDigestAlgorithm.SHA256,
            password
        );
        return digest;
    };

    // Função para buscar um usuário pelo e-mail
    const getUserByEmail = async (email: string) => {
        try {
            const result = await db.getAllAsync<{ id: number, name: string, email: string, password: string }>(
                'SELECT * FROM users WHERE email = ?', [email]
            );
            return result[0]; // Retorna o primeiro usuário encontrado
        } catch (error) {
            console.error('Erro ao buscar usuário:', error);
            return null;
        }
    };

    // Função para verificar a senha
    const verifyPassword = async (password: string, hashedPassword: string): Promise<boolean> => {
        const hashedInput = await hashPassword(password);
        return hashedInput === hashedPassword;
    };

    // Função para atualizar os dados do usuário
    const updateUser = async (userId: number, name: string, email: string, password?: string) => {
        try {
            let query = 'UPDATE users SET name = ?, email = ?';
            const params: any[] = [name, email];

            // Se uma nova senha for fornecida, gera o hash e adiciona à query
            if (password) {
                const hashedPassword = await hashPassword(password);
                query += ', password = ?';
                params.push(hashedPassword);
            }

            query += ' WHERE id = ?';
            params.push(userId);

            await db.runAsync(query, params);
            console.log('Usuário atualizado com sucesso!');
            return true;
        } catch (error) {
            console.error('Erro ao atualizar usuário:', error);
            return false;
        }
    };

    // Função para cadastrar um novo usuário
    const createUser = async (name: string, email: string, password: string) => {
        try {
            // Verifica se o e-mail já está cadastrado
            const usuarioExistente = await getUserByEmail(email);
            if (usuarioExistente) {
                console.error('Erro: E-mail já cadastrado.');
                return false;
            }

            // Encripta a senha antes de armazenar
            const hashedPassword = await hashPassword(password);

            // Insere o novo usuário no banco de dados
            await db.runAsync(
                'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
                [name, email, hashedPassword]
            );
            console.log('Usuário cadastrado com sucesso!');
            return true;
        } catch (error) {
            console.error('Erro ao cadastrar usuário:', error);
            return false;
        }
    };

    return { getUserByEmail, verifyPassword, updateUser, createUser, hashPassword };
}