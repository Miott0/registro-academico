"use client"

import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Curso = {
  id: string;
  nome: string;
  ultima_grade: string;
};

const updateCurso = async (data: Curso) => {
  const res = await fetch(`http://localhost:3000/api/curso/${data.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nome: data.nome,
      ultima_grade: data.ultima_grade,
    }),
  });
  if (!res.ok) {
    throw new Error("Falha ao atualizar o curso");
  }
  return await res.json();
};

const deleteCurso = async (id: string) => {
  const res = await fetch(`http://localhost:3000/api/curso/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error("Falha ao excluir o curso");
  }
  return await res.json();
};

const getCursoById = async (id: string): Promise<Curso> => {
  const res = await fetch(`http://localhost:3000/api/curso/${id}`);
  if (!res.ok) {
    throw new Error("Falha ao obter os detalhes do curso");
  }
  return await res.json();
};

const EditCurso = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const [curso, setCurso] = useState<Curso | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cursoData = await getCursoById(params.id);
        setCurso(cursoData);
      } catch (error) {
        console.error("Erro ao buscar detalhes do curso:", error);
      }
    };

    fetchData();
  }, [params.id]);

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const updatedCurso: Curso = {
      id: params.id,
      nome: formData.get("nome") as string,
      ultima_grade: formData.get("ultima_grade") as string,
    };
    try {
      await updateCurso(updatedCurso);
      router.push("/curso");
    } catch (error) {
      console.error("Erro ao atualizar curso:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteCurso(params.id);
      router.push("/curso");
    } catch (error) {
      console.error("Erro ao excluir curso:", error);
    }
  };


  return (
    <Fragment>
      <div className="w-full m-auto flex my-4">
        <div className="flex flex-col justify-center items-center m-auto">
          <p className="text-2xl text-slate-200 font-bold p-3">
            Editar Curso
          </p>
          {curso && (
            <form onSubmit={handleUpdate}>
              <input
                value={curso.nome}
                name="nome"
                placeholder="Nome do curso"
                type="text"
                className="rounded-md px-4 w-full py-2 my-2"
              />
              <input
                value={curso.ultima_grade}
                name="ultima_grade"
                placeholder="Última grade"
                type="text"
                className="rounded-md px-4 py-2 w-full my-2"
              />
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="font-semibold px-4 py-2 shadow-xl bg-slate-200 rounded-lg m-auto hover:bg-slate-100"
                >
                  Atualizar
                </button>
                <button
                  onClick={handleDelete}
                  className="font-semibold px-4 py-2 shadow-xl bg-red-400 rounded-lg m-auto hover:bg-red-500"
                >
                  Excluir
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default EditCurso;
