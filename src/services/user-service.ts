class UserService {
    static async createUser(name: string, email: string, password: string) {
        try {
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({name, email, password}),
            });

            if (!response.ok) {
                throw new Error("Erro ao criar usuário");
            }

            return await response.json();
        } catch (error) {
            console.error("Erro ao criar usuário:", error);
            throw error;
        }
    }

    static async updateUser( name: string, email: string, password: string) {
        try {
            const response = await fetch(`/api/user`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({name, email, password}),
            });

            if (!response.ok) {
                throw new Error("Erro ao atualizar usuário");
            }

            return await response.json();
        } catch (error) {
            console.error("Erro ao atualizar usuário:", error);
            throw error;
        }
    }

    static async deleteUser(id: string) {
        try {
            const response = await fetch(`/api/user?id=${id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("Erro ao excluir usuário");
            }

            return await response.json();
        } catch (error) {
            console.error("Erro ao excluir usuário:", error);
            throw error;
        }
    }
}

export default UserService;
