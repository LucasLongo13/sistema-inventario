import type { Category } from "@components/categories/category.svelte"
import { http } from "@core/http"

export enum MovementType {
    IN = "INGRESO",
    OUT = "EGRESO",
}

export interface Movement {
    id: number
    type: MovementType
    date: string
    amount: number
    priceUnit: number
    productId: number
    userId: number
}

class MovementModel {
    movement = $state<Movement | null>(null)
    movements = $state<Movement[]>([])
    deleteDialog = $state(false);
    editDialog = $state(false);
    createDialog = $state(false);

    async getMovements() {
        this.movements = await http.get<Movement[]>(`${import.meta.env.PUBLIC_API_URL}/movements`);
    }

    async deleteMovement(id: number) {
        await http.delete<Movement>(`${import.meta.env.PUBLIC_API_URL}/movements/${id}`);
        this.getMovements();
        this.deleteDialog = false;
    }

    async editMovement(id: number, e: Event) {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const data = Object.fromEntries(formData);

        await http.patch<Movement>(`${import.meta.env.PUBLIC_API_URL}/movements/${id}`, data);
        this.getMovements();
        this.editDialog = false;
    }

    async createMovement(e: Event) {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const data = Object.fromEntries(formData);
        await http.post<Movement>(`${import.meta.env.PUBLIC_API_URL}/movements`, data);
        this.getMovements();
        this.createDialog = false;
    }

    showCreateModal() {
        this.movement = null;
        this.createDialog = true;
    }

    showEditModal(movement: Movement) {
        this.movement = movement;
        this.editDialog = true;
    }

    showDeleteModal(movement: Movement) {
        this.movement = movement;
        this.deleteDialog = true;
    }

    formatPriceUnit(priceUnit: number) {
        return new Intl.NumberFormat('es-AR', {
            style: 'currency',
            currency: 'ARS',
        }).format(priceUnit);
    }

    formatDate(date: string) {
        const dateObj = new Date(date);
        return new Intl.DateTimeFormat('es-AR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        }).format(dateObj);
    }
}

export const movementModel = new MovementModel();