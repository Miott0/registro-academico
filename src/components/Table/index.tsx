"use client"
import Link from "next/link";


interface Props {
  cursos: Curso[];
}

type Curso = {
  id: string;
  nome: string;
  ultima_grade: string;
}

export default function TableDataCurso({ cursos }: Props) {

  const data = cursos
  return (
    <div>
      <table className="w-max">
        <thead>
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Nome</th>
            <th className="px-4 py-2">Última Grade</th>
          </tr>
        </thead>
        <tbody>
          {data.map(curso => (

            <tr key={curso.id}>
              <td className="border px-4 py-2 text-blue-500">
                <Link href={`/curso/${curso.id}`}>
                  {curso.id}
                </Link>
              </td>
              <td className="border px-4 py-2">{curso.nome}</td>
              <td className="border px-4 py-2">{curso.ultima_grade}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>


  );
}