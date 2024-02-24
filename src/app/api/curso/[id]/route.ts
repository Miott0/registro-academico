import{ NextRequest, NextResponse } from 'next/server'
import prisma from "@/lib/db"

export const GET = async (req: Request, res: NextResponse) => {
    try {
      const id = req.url.split("/blog/")[1];
      const data = await prisma.curso.findFirst({ where: { id } });
      if (!data)
        return NextResponse.json({ message: "Not Found" }, { status: 404 });
      return NextResponse.json({ data }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ message: "Error", error }, { status: 500 });
    } finally {
      await prisma.$disconnect();
    }
};

export const PUT = async (req: Request, res: NextResponse) => {
  try {
    const id = req.url.split("/curso/")[1];
    const { nome, ultima_grade } = await req.json();
    
    const data = await prisma.curso.update({
      data: { nome, ultima_grade },
      where: { id },
    });
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
};

export const DELETE = async (req: Request, res: NextResponse) => {
  try {
    const id = req.url.split("/curso/")[1];
    const data = await prisma.curso.delete({ where: { id } });
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
};