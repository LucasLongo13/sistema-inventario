import { http } from "@core/http"
import { handleError } from "@core/utils/handle-error"
import { handleErrorToast } from "@core/utils/toast"

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
    errorMessage = $state('');

    async getUsers() {
        this.users = await http.get<User[]>(`${import.meta.env.PUBLIC_API_URL}/users`);
    }

    async deleteUser(id: number) {
        try {
            await http.delete<User>(`${import.meta.env.PUBLIC_API_URL}/users/${id}`);
            this.getUsers();
            this.deleteDialog = false;
        } catch (error) {
            handleErrorToast(error);
        }
    }

    async editUser(id: number, e: Event) {
        try {
            e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const data = Object.fromEntries(formData);

        await http.patch<User>(`${import.meta.env.PUBLIC_API_URL}/users/${id}`, data);
        this.getUsers();
        this.editDialog = false;
        } catch (error) {
            handleErrorToast(error);
        }
    }

    async createUser(e: Event) {
        try {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            const data = Object.fromEntries(formData);
            await http.post<User>(`${import.meta.env.PUBLIC_API_URL}/users`, data);
            this.getUsers();
            this.createDialog = false;
        } catch (error) {
            handleErrorToast(error);
        }
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
