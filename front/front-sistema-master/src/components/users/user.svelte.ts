import { http } from "@core/http"

interface User {
    id: number
    fullName: string
    email: string
}

class UserModel {
    user = $state<User | null>(null)
    users = $state<User[]>([])
    deleteDialog = $state(false);
    editDialog = $state(false);
    createDialog = $state(false);

    async getUsers() {
        this.users = await http.get<User[]>(`${import.meta.env.PUBLIC_API_URL}/users`);
    }

    async deleteUser(id: number) {
        await http.delete<User>(`${import.meta.env.PUBLIC_API_URL}/users/${id}`);
        this.getUsers();
        this.deleteDialog = false;
    }

async editUser(id: number, e: Event) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    const data = {
        fullName: String(formData.get("fullName")),
        email: String(formData.get("email")),
        password: String(formData.get("password"))
    };

    await http.patch<User>(`${import.meta.env.PUBLIC_API_URL}/users/${id}`, data);
    this.getUsers();
    this.editDialog = false;
}



async createUser(e: SubmitEvent) {
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const data = {
        fullName: String(formData.get("fullName") ?? ""),
        email: String(formData.get("email") ?? ""),
        password: String(formData.get("password") ?? "")
    };

    console.log("ENVIANDO USER", data);

    await http.post<User>(`${import.meta.env.PUBLIC_API_URL}/users`, data);
    await this.getUsers();
    this.createDialog = false;
}


    showCreateModal() {
        this.user = null;
        this.createDialog = true;
    }

    showEditModal(user: User) {
        this.user = user;
        this.editDialog = true;
    }

    showDeleteModal(user: User) {
        this.user = user;
        this.deleteDialog = true;
    }
}

export const userModel = new UserModel();
