import { http } from "@core/http"
import type { ResponseData, Pagination } from "@core/interfaces/response"
import { handleErrorToast } from "@core/utils/toast"

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
    pagination = $state<Pagination | null>(null)
    query = $state<Pick<Pagination, 'page' | 'limit'>>({
        page: 1,
        limit: 5,
    });

    async getCategories() {
        const { data, pagination } = await http.get<ResponseData<Category[]>>(`${import.meta.env.PUBLIC_API_URL}/categories?page=${this.query.page}&limit=${this.query.limit}`);
        this.categories = data;
        this.pagination = pagination;
    }

    async deleteCategory(id: number) {
        try {
            await http.delete<Category>(`${import.meta.env.PUBLIC_API_URL}/categories/${id}`);
            this.getCategories();
            this.deleteDialog = false;
        } catch (error) {
            handleErrorToast(error);
        }
    }

    async editCategory(id: number, e: Event) {
        try {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            const data = Object.fromEntries(formData);

            await http.patch<Category>(`${import.meta.env.PUBLIC_API_URL}/categories/${id}`, data);
            this.getCategories();
            this.editDialog = false;
        } catch (error) {
            handleErrorToast(error);
        }
    }

    async createCategory(e: Event) {
        try {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            const data = Object.fromEntries(formData);
            await http.post<Category>(`${import.meta.env.PUBLIC_API_URL}/categories`, data);
            this.getCategories();
            this.createDialog = false;
        } catch (error) {
            handleErrorToast(error);
        }
    }

    async nextPage() {
        if (this.pagination?.nextPage) {
            this.query.page++;
        }
        await this.getCategories();
    }

    async previousPage() {
        if (this.pagination?.previousPage) {
            this.query.page--;
        }
        await this.getCategories();
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
