import { type Category } from "@components/categories/category.svelte"
import { http } from "@core/http"
import { handleErrorToast } from "@core/utils/toast"

interface Product {
    id: number
    name: string
    priceUnit: number
    stock: number
    categoryId: number
    category: Category
}

class ProductModel {
    product = $state<Product | null>(null)
    products = $state<Product[]>([])
    categories = $state<Category[]>([])

    deleteDialog = $state(false);
    editDialog = $state(false);
    createDialog = $state(false);

    async getProducts() {
        this.products = await http.get<Product[]>(`${import.meta.env.PUBLIC_API_URL}/products`);
    }

    async deleteProduct(id: number) {
        try {
            await http.delete<Product>(`${import.meta.env.PUBLIC_API_URL}/products/${id}`);
            this.getProducts();
            this.deleteDialog = false;
        } catch (error) {
            handleErrorToast(error);
        }
    }

    async editProduct(id: number, e: Event) {
        try {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            const data = Object.fromEntries(formData);

            await http.patch<Product>(`${import.meta.env.PUBLIC_API_URL}/products/${id}`, data);
            this.getProducts();
            this.editDialog = false;
        } catch (error) {
            handleErrorToast(error);
        }
    }

    async createProduct(e: Event) {
        try {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            const data = Object.fromEntries(formData);
            await http.post<Product>(`${import.meta.env.PUBLIC_API_URL}/products`, data);
            this.getProducts();
            this.createDialog = false;
        } catch (error) {
            handleErrorToast(error);
        }
    }

    showCreateModal() {
        this.product = null;
        this.createDialog = true;
    }

    showEditModal(product: Product) {
        this.product = product;
        this.editDialog = true;
    }

    showDeleteModal(product: Product) {
        this.product = product;
        this.deleteDialog = true;
    }

    formatPriceUnit(priceUnit: number) {
        return new Intl.NumberFormat('es-AR', {
            style: 'currency',
            currency: 'ARS',
        }).format(priceUnit);
    }
}

export const productModel = new ProductModel();
