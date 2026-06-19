<script lang="ts">
    import { categoryModel } from "@components/categories/category.svelte";

    let { productModel } = $props();
    let id = $props.id();
</script>

{#if productModel.editDialog}
    <div
        class="w-full text-black h-full fixed top-0 left-0 flex flex-col items-center bg-transparent justify-center backdrop-blur-xl"
    >
        <div class="bg-white rounded-md p-4 w-96">
            <form
                onsubmit={(e) =>
                    productModel.editProduct(productModel.product.id, e)}
            >
                <h2 class="text-lg font-bold">Editar Producto</h2>
                <hr />

                <div class="p-2 flex flex-col">
                    <label for="name" class="block text-sm font-bold"
                        >Nombre:</label
                    >
                    <input
                        class="border border-gray-400 rounded-md p-2"
                        placeholder="Ingrese el nombre"
                        type="text"
                        id={`name-${id}`}
                        name="name"
                        value={productModel.product.name}
                    />
                </div>

                <div class="p-2 flex flex-col">
                    <label for="stock" class="block text-sm font-bold"
                        >Stock:</label
                    >
                    <input
                        class="border border-gray-400 rounded-md p-2"
                        placeholder="Ingrese el stock"
                        type="text"
                        id={`stock-${id}`}
                        name="stock"
                        value={productModel.product.stock}
                    />
                </div>

                <div class="p-2 flex flex-col">
                    <label for="priceUnit" class="block text-sm font-bold"
                        >Precio Unitario:</label
                    >
                    <input
                        class="border border-gray-400 rounded-md p-2"
                        placeholder="Ingrese el precio unitario"
                        type="text"
                        min="0"
                        id={`priceUnit-${id}`}
                        name="priceUnit"
                        value={productModel.product.priceUnit}
                    />
                </div>

                <div class="p-2 flex flex-col">
                    <label for="categoryId" class="block text-sm font-bold"
                        >Categoria:</label
                    >
                    <select
                        class="border border-gray-400 rounded-md p-2"
                        id={`categoryId-${id}`}
                        name="categoryId"
                        value={productModel.product.categoryId}
                    >
                        <option value="" disabled selected
                            >Seleccione una categoria</option
                        >
                        {#each categoryModel.categories as category}
                            <option value={category.id}>{category.name}</option>
                        {/each}
                    </select>
                </div>

                <div class="p-2 flex justify-end gap-2 mt-3">
                    <button
                        class="bg-red-400 text-white px-4 py-2 rounded-md"
                        onclick={() => (productModel.editDialog = false)}
                    >
                        Cancelar
                    </button>
                    <button
                        class="bg-blue-400 text-white px-4 py-2 rounded-md"
                        type="submit"
                    >
                        Guardar
                    </button>
                </div>
            </form>
        </div>
    </div>
{/if}
