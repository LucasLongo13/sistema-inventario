<script lang="ts">
import FilterableSelect from "./FilterableSelect.svelte";


let options = $state([{ value: '1', label: 'Option 1' }, { value: '2', label: 'Option 2' }, { value: '3', label: 'Option 3' }]);



</script>


<FilterableSelect options={options} />
