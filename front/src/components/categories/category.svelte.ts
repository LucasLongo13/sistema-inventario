import { http } from "@core/http"

export interface Category {
    id: number
    name: string
}

class CategoryModel {
    category = $state<Category | null>(null)
    categories = $state<Category[]>([])
    deleteDialog = $state(false);
    editDialog = $state(false);
    createDialog = $state(false);

    async getCategories() {
        this.categories = await http.get<Category[]>(`${import.meta.env.PUBLIC_API_URL}/categories`);
    }

    async deleteCategory(id: number) {
        await http.delete<Category>(`${import.meta.env.PUBLIC_API_URL}/categories/${id}`);
        this.getCategories();
        this.deleteDialog = false;
    }

    async editCategory(id: number, e: Event) {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const data = Object.fromEntries(formData);

        await http.patch<Category>(`${import.meta.env.PUBLIC_API_URL}/categories/${id}`, data);
        this.getCategories();
        this.editDialog = false;
    }

    async createCategory(e: Event) {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const data = Object.fromEntries(formData);
        await http.post<Category>(`${import.meta.env.PUBLIC_API_URL}/categories`, data);
        this.getCategories();
        this.createDialog = false;
    }

    showCreateModal() {
        this.category = null;
        this.createDialog = true;
    }

    showEditModal(category: Category) {
        this.category = category;
        this.editDialog = true;
    }

    showDeleteModal(category: Category) {
        this.category = category;
        this.deleteDialog = true;
    }
}

export const categoryModel = new CategoryModel();