import { useSQLiteContext } from "expo-sqlite";
import { Aluno } from "../types/Types";

export function useAlunoDatabase() {
  const database = useSQLiteContext();

  async function create(data: Omit<Aluno, "id">) {
    const statement = await database.prepareAsync(
      `INSERT INTO alunos (
        numero, nome, nome_completo, segmento, pelotao, turma, 
        tipo_sanguineo, residencia, nascimento, email, funcao, situacao
      ) VALUES (
        $numero, $nome, $nome_completo, $segmento, $pelotao, $turma, 
        $tipo_sanguineo, $residencia, $nascimento, $email, $funcao, $situacao
      )`
    );

    try {
      const result = await statement.executeAsync({
        $numero: data.numero,
        $nome: data.nome,
        $nome_completo: data.nome_completo,
        $segmento: data.segmento,
        $pelotao: data.pelotao,
        $turma: data.turma,
        $tipo_sanguineo: data.tipo_sanguineo,
        $residencia: data.residencia,
        $nascimento: data.nascimento,
        $email: data.email,
        $funcao: data.funcao,
        $situacao: data.situacao,
      });

      const insertedRowId = result.lastInsertRowId.toLocaleString();
      return { insertedRowId };
    } catch (error) {
      throw error;
    } finally {
      await statement.finalizeAsync();
    }
  }

  async function searchByname(name: string) {
    try {
      const query = "SELECT * FROM alunos WHERE nome LIKE ?";
      const response = await database.getAllAsync<Aluno>(query, `%${name}%`);
      return response;
    } catch (error) {
      throw error;
    }
  }
  async function searchByGroup(name: string) {
    try {
        const query = "SELECT * FROM alunos WHERE turma LIKE ? OR pelotao LIKE ?";
        const response = await database.getAllAsync<Aluno>(query, [`%${name}%`, `%${name}%`]);
        return response;
    } catch (error) {
        throw error;
    }
}

  async function update(data: Aluno) {
    const statement = await database.prepareAsync(
      `UPDATE alunos SET 
        numero = $numero, 
        nome = $nome, 
        nome_completo = $nome_completo, 
        segmento = $segmento, 
        pelotao = $pelotao, 
        turma = $turma, 
        tipo_sanguineo = $tipo_sanguineo, 
        residencia = $residencia, 
        nascimento = $nascimento, 
        email = $email, 
        funcao = $funcao, 
        situacao = $situacao 
      WHERE id = $id`
    );

    try {
      await statement.executeAsync({
        $id: data.id,
        $numero: data.numero,
        $nome: data.nome,
        $nome_completo: data.nome_completo,
        $segmento: data.segmento,
        $pelotao: data.pelotao,
        $turma: data.turma,
        $tipo_sanguineo: data.tipo_sanguineo,
        $residencia: data.residencia,
        $nascimento: data.nascimento,
        $email: data.email,
        $funcao: data.funcao,
        $situacao: data.situacao,
      });
    } catch (error) {
      throw error;
    } finally {
      await statement.finalizeAsync();
    }
  }

  async function remove(id: number) {
    try {
      await database.execAsync("DELETE FROM alunos WHERE id = " + id);
    } catch (error) {
      throw error;
    }
  }

  async function show(id: number) {
    try {
      const query = "SELECT * FROM alunos WHERE id = ?";
      const response = await database.getFirstAsync<Aluno>(query, [id]);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async function getAll() {
    try {
      const response = await database.getAllAsync<Aluno>("SELECT * FROM alunos");
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  return { create, searchByname, update, remove, show, getAll , searchByGroup};
}