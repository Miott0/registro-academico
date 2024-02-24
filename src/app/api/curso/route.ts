import{ NextRequest, NextResponse } from 'next/server'
import prisma from "@/lib/db"

export async function GET() {
    const cursos = await prisma.curso.findMany()
    return Response.json({
        cursos
    })
}

export async function POST(req: NextRequest)  {
    try {
        const { nome, ultima_grade }: { nome: string, ultima_grade?: string } = await req.json();
        const data: any = { nome };

        if (ultima_grade !== undefined && ultima_grade !== '') {
            data.ultima_grade = ultima_grade;
        }

        const curso = await prisma.curso.create({
            data
        });

        return NextResponse.json({
            curso
        },{
            status:201
        })
    } catch (err) {
        return NextResponse.json({
            message: "Erro: ", err
        },{
            status:500
        })
    }
}

