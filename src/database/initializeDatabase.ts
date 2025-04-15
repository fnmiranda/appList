import { type SQLiteDatabase } from "expo-sqlite";
import dadosAlunos from "../assets/dados.json"; // Carrega o JSON diretamente
import * as Crypto from 'expo-crypto'; // Para encriptar a senha

export async function initializeDatabase(database: SQLiteDatabase) {
  await database.execAsync(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        password TEXT NOT NULL
    );

    
    CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        date TEXT NOT NULL,
        discription TEXT NOT NULL,
        status TEXT NOT NULL,
        flag TEXT NOT NULL,
        type TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS alunos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        numero TEXT NOT NULL,
        nome TEXT NOT NULL,
        nome_completo TEXT,
        segmento TEXT,
        pelotao TEXT,
        turma TEXT,
        tipo_sanguineo TEXT,
        residencia TEXT,
        nascimento TEXT,
        email TEXT,
        funcao TEXT NOT NULL,
        situacao TEXT NOT NULL
    );
  `);

  // Verifica se há alunos cadastrados
  const resultadoAlunos = (await database.getFirstAsync("SELECT COUNT(*) as count FROM alunos;")) as {
    count: number;
  };

  if (resultadoAlunos.count === 0) {
    // Se não houver alunos, carrega os dados do JSON
    for (const aluno of dadosAlunos) {
      await database.runAsync(
        `INSERT INTO alunos (
          numero, nome, nome_completo, segmento, pelotao, turma, tipo_sanguineo, residencia, nascimento, email, funcao, situacao
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          aluno.numero,
          aluno.nome,
          aluno.nome_completo,
          aluno.segmento,
          aluno.pelotao,
          aluno.turma,
          aluno.tipo_sanguineo,
          aluno.residencia,
          aluno.nascimento,
          aluno.email,
          aluno.funcao,
          aluno.situacao,
        ]
      );
    }
    console.log("Dados de alunos inseridos com sucesso.");
  } else {
    console.log("A tabela alunos já possui dados.");
  }

  // Verifica se há usuários cadastrados
  const resultadoUsers = (await database.getFirstAsync("SELECT COUNT(*) as count FROM users;")) as {
    count: number;
  };

  if (resultadoUsers.count === 0) {
    // Se não houver usuários, cadastra um usuário padrão
    const nome = "Admin";
    const email = "admin@example.com";
    const senha = "admin123"; // Senha em texto plano (será encriptada)

    // Encripta a senha
    const hashedPassword = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      senha
    );

    // Insere o usuário padrão no banco de dados
    await database.runAsync(
      `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`,
      [nome, email, hashedPassword]
    );
    console.log("Usuário padrão cadastrado com sucesso.");
  } else {
    console.log("A tabela users já possui dados.");
  }
}