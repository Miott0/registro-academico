-- CreateTable
CREATE TABLE "Curso" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "ultima_grade" TEXT NOT NULL DEFAULT '2023.2',

    CONSTRAINT "Curso_pkey" PRIMARY KEY ("id")
);
