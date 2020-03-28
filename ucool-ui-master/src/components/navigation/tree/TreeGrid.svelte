<script>
  import GridNode from './GridNode.svelte'
  import { onMount, afterUpdate } from 'svelte'
  export let data=[]
  export let fullwidth = false
  import city_code from './city_code.json'
  onMount(() => {
    if (data && data.length > 0) {
    } else {
      data = city_code
    }
  })
</script>

<table class="table is-bordered is-striped is-narro w is-hoverable " 
  class:is-fullwidth={fullwidth}>
  {#each data as item, itemIndex}
    <GridNode row={item} level={1} />
  {/each}

</table>
