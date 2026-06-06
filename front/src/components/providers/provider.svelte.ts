import { http } from "@core/http"

interface Provider {
    id: number
    name: string
}

class ProviderModel {
    provider = $state<Provider | null>(null)
    providers = $state<Provider[]>([])
    deleteDialog = $state(false);
    editDialog = $state(false);
    createDialog = $state(false);

    async getProviders() {
        this.providers = await http.get<Provider[]>(`${import.meta.env.PUBLIC_API_URL}/providers`);
    }

    async deleteProvider(id: number) {
        await http.delete<Provider>(`${import.meta.env.PUBLIC_API_URL}/providers/${id}`);
        this.getProviders();
        this.deleteDialog = false;
    }

    async editProvider(id: number, e: Event) {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const data = Object.fromEntries(formData);

        await http.patch<Provider>(`${import.meta.env.PUBLIC_API_URL}/providers/${id}`, data);
        this.getProviders();
        this.editDialog = false;
    }

    async createProvider(e: Event) {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const data = Object.fromEntries(formData);
        await http.post<Provider>(`${import.meta.env.PUBLIC_API_URL}/providers`, data);
        this.getProviders();
        this.createDialog = false;
    }

    showCreateModal() {
        this.provider = null;
        this.createDialog = true;
    }

    showEditModal(provider: Provider) {
        this.provider = provider;
        this.editDialog = true;
    }

    showDeleteModal(provider: Provider) {
        this.provider = provider;
        this.deleteDialog = true;
    }
}

export const providerModel = new ProviderModel();