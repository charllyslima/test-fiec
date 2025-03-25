import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import {registerUserSchema} from "@/utils/validators";

export async function POST(req: NextRequest) {
    try {

        const body = await req.json();

        const result = registerUserSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json(
                { error: result.error.format() },
                { status: 400 }
            );
        }

        const { name, email, password } = result.data;

        if (!name || !email || !password) {
            return NextResponse.json({ error: "Todos os campos são obrigatórios" }, { status: 400 });
        }

        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return NextResponse.json({ error: "Este email já está em uso" }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });

        return NextResponse.json({ message: "Usuário cadastrado com sucesso!" }, { status: 201 });
    } catch (error) {
        console.error("Erro ao cadastrar usuário:", error);
        return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
    }
}
