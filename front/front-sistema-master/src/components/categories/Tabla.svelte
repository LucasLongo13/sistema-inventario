<script lang="ts">
    import Delete from "./Delete.svelte";
    import Edit from "./Edit.svelte";
    import Create from "./Create.svelte";
    import { categoryModel } from "./category.svelte";
    import { onMount } from "svelte";

    onMount(async () => {
        await categoryModel.getCategories();
    });
</script>

<Delete {categoryModel} />
<Edit {categoryModel} />
<Create {categoryModel} />

<div class="w-full flex justify-end mb-4">
    <button class="bg-gray-800 text-xl text-white px-2 py-1 rounded-md border border-white" onclick={() => categoryModel.showCreateModal()}>
        Nueva Categoría
    </button>
</div>

<table class="flex-1 w-full">
    <thead>
        <tr>
            <th class="bg-gray-800 text-white text-left p-2">Nombre</th>
            <th class="bg-gray-800 text-white p-2">Acciones</th>
        </tr>
    </thead>
    <tbody>
        {#each categoryModel.categories as category}
            <tr class="odd:bg-gray-100 dark:odd:bg-gray-700">
                <td class="px-2 py-1">{category.name}</td>
                <td class="px-2 py-1">
                    <div class="flex justify-center gap-2">
                        <button
                            onclick={() => categoryModel.showEditModal(category)}
                            aria-label="Editar"
                            class="bg-gray-800 text-white px-4 rounded-md"
                        >
                            Editar
                        </button>
                        <button
                            onclick={() => categoryModel.showDeleteModal(category)}
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
