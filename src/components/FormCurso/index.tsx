"use client"

import { useState} from 'react';

interface Props {
    curso: Curso;
  }
  
  type Curso = {
    id: string;
    nome: string;
    ultima_grade: string;
  }

  export default function CursoForm({ curso }: Props){
  
  const [formData, setFormData] = useState<Partial<Curso>>({ nome: '', ultima_grade: '' });

    const data = curso

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await fetch(`/api/curso/${data.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      console.log('Curso atualizado com sucesso!');
      // Aqui você pode adicionar lógica para redirecionar o usuário ou exibir uma mensagem de sucesso
    } catch (error) {
      console.error('Erro ao atualizar curso:', error);
    }
  };

  if (!curso) {
    return <div>Carregando...</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nome:
        <input type="text" name="nome" value={formData.nome} onChange={handleChange} />
      </label>
      <label>
        Descrição:
        <textarea name="descricao" value={formData.ultima_grade} onChange={handleChange} />
      </label>
      <button type="submit">Atualizar Curso</button>
    </form>
  );
}
