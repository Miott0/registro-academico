"use client"

import TableDataCurso from "@/components/Table";
import prisma from "@/lib/db";


const fetchCursos = async () => {
  const cursosData = await prisma.curso.findMany();
  return cursosData
};


export default async function Page() {
  
  const data =  await fetchCursos()
  

  return (
    <div className='p-4'> 
      <TableDataCurso cursos={data}/>
    </div>
    
  );
}


