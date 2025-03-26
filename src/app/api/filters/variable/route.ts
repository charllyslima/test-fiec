import {NextResponse} from "next/server";
import prisma from "@/lib/prisma";
import {getSession} from "@/lib/auth";

export async function GET() {
    const session = await getSession();

    if (!session) {
        return NextResponse.json({error: "Não autenticado"}, {status: 401});
    }

    const userId = session.user?.id;
    if (!userId) {
        return NextResponse.json({error: "ID do usuário não encontrado na sessão"}, {status: 400});
    }

    try {
        const variableFilters1 = await prisma.variable_filter.findMany({
            orderBy: [
                {
                    sidraId: 'asc',
                },
            ],
        });

        return NextResponse.json(
            variableFilters1
        );
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({error: "Erro ao buscar filtros", details: error.message}, {status: 500});
        }
        return NextResponse.json({error: "Erro ao buscar filtros"}, {status: 500});
    }
}
