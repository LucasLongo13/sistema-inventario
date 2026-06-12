<script lang="ts">
    import { productModel } from "../products/products.svelte";
    import { userModel } from "../users/user.svelte";
    import { onMount } from "svelte";

    let { movementModel } = $props();
    let id = $props.id();

    onMount(async () => {
        await productModel.getProducts();
        await userModel.getUsers();
    });
</script>

{#if movementModel.createDialog}
    <div
        class="w-full text-black h-full fixed top-0 left-0 flex flex-col items-center bg-transparent justify-center backdrop-blur-xl"
    >
        <div class="bg-white rounded-md p-4 w-auto">
            <form onsubmit={(e) => movementModel.createMovement(e)}>
                <h2 class="text-lg font-bold">Crear Movimiento</h2>
                <hr />

                <div class="grid grid-cols-2 gap-4">
                    <div class="p-2 flex flex-col">
                        <label for="date" class="block text-sm font-bold"
                            >Fecha:</label
                        >
                        <input
                            class="border border-gray-400 rounded-md p-2"
                            placeholder="Ingrese la fecha"
                            type="date"
                            id={`date-${id}`}
                            name="date"
                        />
                    </div>
                    <div class="p-2 flex flex-col">
                        <label for="type" class="block text-sm font-bold"
                            >Tipo:</label
                        >
                        <select
                            class="border border-gray-400 rounded-md p-2"
                            id={`type-${id}`}
                            name="type"
                        >
                            <option value="INGRESO">Ingreso</option>
                            <option value="EGRESO">Egreso</option>
                        </select>
                    </div>
                    <div class="p-2 flex flex-col">
                        <label for="amount" class="block text-sm font-bold"
                            >Monto:</label
                        >
                        <input
                            class="border border-gray-400 rounded-md p-2"
                            placeholder="Ingrese el monto"
                            type="number"
                            id={`amount-${id}`}
                            name="amount"
                        />
                    </div>

                    <div class="p-2 flex flex-col">
                        <label for="priceUnit" class="block text-sm font-bold"
                            >Precio Unitario:</label
                        >
                        <input
                            class="border border-gray-400 rounded-md p-2"
                            placeholder="Ingrese el precio unitario"
                            type="number"
                            id={`priceUnit-${id}`}
                            name="priceUnit"
                        />
                    </div>

                    <div class="p-2 flex flex-col">
                        <label for="userId" class="block text-sm font-bold"
                            >Usuario:</label
                        >
                        <select
                            class="border border-gray-400 rounded-md p-2"
                            id={`userId-${id}`}
                            name="userId"
                        >
                            <option value="">Seleccione un usuario</option>
                            {#each userModel.users as user}
                                <option value={user.id}>{user.fullName}</option>
                            {/each}
                        </select>
                    </div>

                    <div class="p-2 flex flex-col">
                        <label for="productId" class="block text-sm font-bold"
                            >Producto:</label
                        >
                        <select
                            class="border border-gray-400 rounded-md p-2"
                            id={`productId-${id}`}
                            name="productId"
                        >
                            <option value="">Seleccione un producto</option>
                            {#each productModel.products as product}
                                <option value={product.id}
                                    >{product.name}</option
                                >
                            {/each}
                        </select>
                    </div>
                </div>
                <div class="p-2 flex justify-end gap-2 mt-3">
                    <button
                        class="bg-red-400 text-white px-4 py-2 rounded-md"
                        onclick={() => (movementModel.createDialog = false)}
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