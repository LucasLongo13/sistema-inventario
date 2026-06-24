<script lang="ts">
    import Delete from "./Delete.svelte";
    import Edit from "./Edit.svelte";
    import Create from "./Create.svelte";
    import { movementModel, MovementType, MovementTypeOptions } from "./movement.svelte";
    import { onMount } from "svelte";
    import { userModel } from "@components/users/user.svelte";
    import { categoryModel } from "@components/categories/category.svelte";

    onMount(async () => {
        await movementModel.getMovements();
        await userModel.getUsers();
        await categoryModel.getCategories();
    });
</script>

<Delete {movementModel} />
<Edit {movementModel} />
<Create {movementModel} />

<div class="w-full flex justify-end mb-4">
    <button class="bg-gray-800 text-xl text-white px-2 py-1 rounded-md border border-white" onclick={() => movementModel.showCreateModal()}>
        Nuevo Movimiento
    </button>
</div>

<table class="flex-1 w-full">
    <thead>
        <tr>
            <th class="bg-gray-800 text-white text-left p-2">ID</th>
            <th class="bg-gray-800 text-white text-left p-2">Nombre del Producto</th>
            <th class="bg-gray-800 text-white text-left p-2">Fecha</th>
            <th class="bg-gray-800 text-white text-left p-2">Tipo</th>
            <th class="bg-gray-800 text-white text-left p-2">Monto</th>
            <th class="bg-gray-800 text-white text-left p-2">Precio Unitario</th>
            <th class="bg-gray-800 text-white p-2">Acciones</th>
        </tr>
    </thead>
    <tbody>
        {#each movementModel.movements as movement}
            <tr class="odd:bg-gray-100 dark:odd:bg-gray-700">
                <td class="px-2 py-1">#{movement.id}</td>
                <td class="px-2 py-1">{movement.product.name}</td>
                <td class="px-2 py-1">{movementModel.formatDate(movement.date)}</td>
                <td class="px-2 py-1">{MovementTypeOptions.find(option => option.value === movement.type)?.label}</td>
                <td class="px-2 py-1">{movement.amount}</td>
                <td class="px-2 py-1">{movementModel.formatPriceUnit(movement.priceUnit)}</td>
                <td class="px-2 py-1 text-right">
                    <div class="flex justify-center gap-2">
                        <button
                            onclick={() => movementModel.showEditModal(movement)}
                            aria-label="Editar"
                            class="bg-gray-800 text-white px-4 rounded-md"
                        >
                            Editar
                        </button>
                        <button
                            onclick={() => movementModel.showDeleteModal(movement)}
                            aria-label="Eliminar"
                            class="bg-red-500 text-white px-4 rounded-md"
                        >
                            Eliminar
                        </button>
                    </div>
                </td>
            </tr>
        {/each}
    </tbody>
</table>
