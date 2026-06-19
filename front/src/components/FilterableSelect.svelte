<!-- FilterableSelect.svelte -->
<script lang="ts">
  interface SelectOption {
    value: string | number;
    label: string;
    disabled?: boolean;
  }

  interface Props {
    options: SelectOption[];
    value?: string | number | null;
    placeholder?: string;
    searchPlaceholder?: string;
    disabled?: boolean;
    clearable?: boolean;
    allowCreate?: boolean;
    containerClass?: string;
    inputClass?: string;
    dropdownClass?: string;
    optionClass?: string;
    onValueChange?: (value: string | number | null) => void;
  }

  let {
    options = [],
    value = $bindable(''),
    placeholder = 'Seleccionar...',
    searchPlaceholder = 'Buscar...',
    disabled = false,
    clearable = true,
    allowCreate = false,
    containerClass = '',
    inputClass = '',
    dropdownClass = '',
    optionClass = '',
    onValueChange,
  }: Props = $props();

  let isOpen = $state(false);
  let searchTerm = $state('');
  let inputElement = $state<HTMLInputElement>();

  // Computed para opciones filtradas
  let filteredOptions = $derived(
    !searchTerm ? options : options.filter((option) => option.label.toLowerCase().includes(searchTerm.toLowerCase())),
  );

  // Computed para la opción seleccionada
  const selectedOption = $derived((): SelectOption | null => {
    return options.find((option) => option.value === value) || null;
  });

  // Computed para el placeholder del input
  const inputPlaceholder = $derived((): string => {
    if (isOpen) return searchPlaceholder;
    // Si hay una opción seleccionada, mostrar su label
    if (selectedOption()) return selectedOption()!.label;
    // Si hay un valor pero no está en las opciones (cliente creado), mostrar el valor
    if (value && value !== '' && allowCreate) return String(value);
    // Si no hay valor, mostrar el placeholder
    return placeholder;
  });

  function handleInputClick() {
    if (disabled) return;
    if (!isOpen) {
      isOpen = true;
      searchTerm = '';
      setTimeout(() => inputElement?.focus(), 0);
    }
  }

  function handleInputFocus() {
    if (disabled) return;
    if (!isOpen) {
      isOpen = true;
      searchTerm = '';
    }
  }

  function selectOption(option: SelectOption) {
    if (option.disabled) return;
    value = option.value;
    onValueChange?.(option.value);
    isOpen = false;
    searchTerm = '';
  }

  function clearValue(event: MouseEvent) {
    event.stopPropagation();
    if (disabled) return;

    value = '';
    onValueChange?.(null);
    isOpen = false;
    searchTerm = '';
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      isOpen = false;
      searchTerm = '';
      inputElement?.blur();
    }
  }

  function handleClickOutside(event: MouseEvent) {
    const target = event.target as Element;
    if (!target.closest('.filterable-select')) {
      isOpen = false;
      searchTerm = '';
    }
  }

  function createOption(newValue: string) {
    if (!allowCreate) return;
    value = newValue;
    isOpen = false;
    searchTerm = '';
    onValueChange?.(newValue);
  }

  // Efecto para manejar clics fuera del componente
  $effect(() => {
    if (!isOpen) return;

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  });
</script>

<div class="filterable-select relative w-full {containerClass}" class:opacity-50={disabled}>
  <!-- Input/Display area -->
  <div
    class="flex items-center justify-between border border-evo-soft-2 rounded-lg px-3 py-[10px] bg-evo-soft-1 dark:hover:bg-evo-4 hover:bg-evo-soft-2 focus-within:ring-2 focus-within:ring-inset focus-within:ring-evo-4/20 dark:bg-evo-3 dark:border-evo-2 {inputClass}"
    class:cursor-not-allowed={disabled}
  >
    <input
      bind:this={inputElement}
      bind:value={searchTerm}
      placeholder={inputPlaceholder()}
      class="w-0 flex-1 min-w-0 outline-none bg-transparent cursor-pointer text-sm text-evo-soft-4 {value
        ? 'placeholder:text-evo-soft-4 dark:placeholder:text-evo-text'
        : 'placeholder:text-gray-400'} capitalize dark:text-white"
      class:cursor-not-allowed={disabled}
      onkeydown={handleKeydown}
      onclick={handleInputClick}
      onfocus={handleInputFocus}
      readonly={!isOpen}
      {disabled}
    />

    <div class="flex items-center space-x-2 shrink-0 ml-1">
      {#if clearable && value !== null && value !== '' && !disabled}
        <button
          aria-label="Clear"
          type="button"
          class="text-evo-soft-4 hover:text-evo-soft-4/80 dark:text-white dark:hover:text-white/80"
          onclick={clearValue}
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      {/if}

      <button
        type="button"
        aria-label={isOpen ? 'Cerrar selección' : 'Abrir selección'}
        class="text-evo-soft-4 hover:text-evo-soft-4/80 transition-transform duration-200 dark:text-white dark:hover:text-white/80 flex items-center justify-center"
        onclick={handleInputClick}
      >
        <svg
          class="w-5 h-5"
          class:rotate-180={isOpen}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          role="img"
          aria-hidden="true"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    </div>
  </div>

  <!-- Dropdown -->
  {#if isOpen}
    <ul
      class="absolute z-1000 w-full mt-1 bg-evo-soft-1 border border-evo-soft-2 rounded-lg shadow-lg max-h-[50vh] sm:max-h-60 overflow-auto text-evo-soft-4 dark:bg-evo-3 dark:border-evo-4 dark:text-white {dropdownClass}"
      role="listbox"
    >
      {#if filteredOptions.length === 0 && allowCreate && searchTerm}
        <li class="px-3 py-2 italic text-evo-soft-4 text-sm dark:text-white/80">
          <button
            type="button"
            class="w-full text-left cursor-pointer hover:bg-gray-900/10 dark:hover:bg-white/5 px-3 py-2 rounded"
            onclick={() => createOption(searchTerm)}
          >
            Crear: {searchTerm}
          </button>
        </li>
      {:else}
        {#each filteredOptions as option (option.value)}
          <li class="px-0 py-0">
            <button
              type="button"
              class="w-full text-left px-3 py-2 text-sm capitalize hover:bg-gray-900/10 dark:hover:bg-white/5 {optionClass}"
              onclick={() => selectOption(option)}
              role="option"
              aria-selected={option.value === value}
            >
              {option.label}
            </button>
          </li>
        {:else}
          <li class="px-3 py-2 text-gray-400 text-sm">No hay coincidencias</li>
        {/each}
      {/if}
    </ul>
  {/if}
</div>