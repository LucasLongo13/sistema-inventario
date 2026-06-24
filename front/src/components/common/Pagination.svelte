<script lang="ts">
    let { model } = $props();
</script>

<div class="flex justify-between items-center py-4 mt-4">
    <div class="text-sm text-gray-500">
        {model.pagination?.page} de {model.pagination?.totalPages} páginas
    </div>

    <div class="flex items-center gap-2">
        <div>
            <button
                class="bg-gray-800 text-white px-4 rounded-md disabled:opacity-20"
                onclick={() => model.previousPage()}
                disabled={model.pagination?.page == 1}
            >
                Anterior
            </button>
        </div>
        <div>
            <button
                class="bg-gray-800 text-white px-4 rounded-md disabled:opacity-20"
                onclick={() => model.nextPage()}
                disabled={model.pagination?.totalPages == model.pagination?.page}
            >
                Siguiente
            </button>
        </div>
    </div>
</div>
