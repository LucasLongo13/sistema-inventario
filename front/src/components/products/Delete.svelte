<script lang="ts">
    let { productModel } = $props();
</script>

{#if productModel.deleteDialog}
<div class="w-full h-full fixed top-0 left-0 flex items-center justify-center backdrop-blur-xl">
    <div class="bg-white p-4 rounded-md w-80">
        <h2 class="text-lg font-bold">Eliminar Producto</h2>
        <p>¿Seguro que desea eliminar este producto?</p>

        <div class="flex justify-end gap-2 mt-3">
            <button class="bg-gray-400 text-white px-4 py-2 rounded-md"
                on:click={() => (productModel.deleteDialog = false)}>
                Cancelar
            </button>

            <button class="bg-red-500 text-white px-4 py-2 rounded-md"
                on:click={() => productModel.deleteProductAction(productModel.selectedProduct.id)}>
                Eliminar
            </button>
        </div>
    </div>
</div>
{/if}
