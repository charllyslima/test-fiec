import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { hash } from "bcryptjs";

export async function GET() {
    const session = await getSession();

    if (!session) {
        return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    const userId = session.user?.id;
    if (!userId) {
        return NextResponse.json({ error: "ID do usuário não encontrado na sessão" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { id: true, name: true, email: true, createdAt: true },
    });

    if (!user) {
        return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 });
    }

    return NextResponse.json(user);

}

export async function PUT(req: NextRequest) {
    const session = await getSession();

    if (!session) {
        return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    const userId = session.user?.id;

    if (!userId) {
        return NextResponse.json({ error: "ID do usuário não encontrado na sessão" }, { status: 400 });
    }

    const { name, email, password } = await req.json();

    if (!name && !email && !password) {
        return NextResponse.json({ error: "Nenhum dado para atualizar" }, { status: 400 });
    }

    try {
        const dataToUpdate: any = {};
        if (name) dataToUpdate.name = name;
        if (email) dataToUpdate.email = email;
        if (password) dataToUpdate.password = await hash(password, 10);

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: dataToUpdate,
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true,
            },
        });

        return NextResponse.json(updatedUser);
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json(
                { error: "Erro ao atualizar usuário", details: error.message },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { error: "Erro desconhecido ao atualizar usuário" },
            { status: 500 }
        );
    }
}


export async function DELETE() {
    const session = await getSession();
    if (!session) {
        return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    const userId = session.user?.id;
    if (!userId) {
        return NextResponse.json({ error: "ID do usuário não encontrado na sessão" }, { status: 400 });
    }

    try {
        await prisma.user.delete({
            where: { id: userId },
        });

        return NextResponse.json({ message: "Conta excluída com sucesso" });
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: "Erro ao excluir usuário", details: error.message }, { status: 500 });
        }

        return NextResponse.json({ error: "Erro desconhecido ao excluir usuário" }, { status: 500 });
    }
}
