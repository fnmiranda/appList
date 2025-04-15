// src/types/TaskTypes.ts
export type UpTask = {
    title: string;
    date: string;
    description: string;
    status: string;
    flag: string;
    type: string;
};

export type TaskDatabase = UpTask & {
    id: number;
};

export type Aluno = {
    id: number; 
    numero: string; 
    nome: string; 
    nome_completo: string;
    segmento: string; 
    pelotao: string; 
    turma: string; 
    tipo_sanguineo: string;
    residencia: string; 
    nascimento: string; 
    email: string;
    funcao: string; 
    situacao: string;
};

export type NewAluno = Omit<Aluno,"id">;

export type User = {
    id: number;
    name: string;
    email: string;
  }