import { http } from "@core/http"

interface Product {
    id: number
    name: string
    priceUnit: number
    stock: number
    categoryId: number
}

class ProductModel {
    product = $state<Product | null>(null)
    products = $state<Product[]>([])
    deleteDialog = $state(false);
    editDialog = $state(false);
    createDialog = $state(false);

    async getProducts() {
        this.products = await http.get<Product[]>(`${import.meta.env.PUBLIC_API_URL}/products`);
    }

    async deleteProduct(id: number) {
        await http.delete<Product>(`${import.meta.env.PUBLIC_API_URL}/products/${id}`);
        this.getProducts();
        this.deleteDialog = false;
    }

    async editProduct(id: number, e: Event) {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const data = Object.fromEntries(formData);

        await http.patch<Product>(`${import.meta.env.PUBLIC_API_URL}/products/${id}`, data);
        this.getProducts();
        this.editDialog = false;
    }

    async createProduct(e: Event) {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const data = Object.fromEntries(formData);
        await http.post<Product>(`${import.meta.env.PUBLIC_API_URL}/products`, data);
        this.getProducts();
        this.createDialog = false;
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
}

export const productModel = new ProductModel();