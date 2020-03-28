<script>
import { createEventDispatcher} from "svelte";
  const dispatch = createEventDispatcher();
  export let row
  export let level
</script>

<tr>
  <td>
    <button
      style="margin-left: calc({level}*1rem);"
      on:click={() => {
        row.show = !row.show
      }}
      class="button is-link is-small">
      <i
        class="iconfont"
        class:icon-tree-plus={!row.show}
        class:icon-tree-jian={row.show} />
    </button>
    {row.name}
  </td>
  <td>{row.code}</td>
  <td>
    
    <slot/>
  </td>
</tr>
{#if row.hasOwnProperty('children') && row.children && row.show}
  {#each row.children as node, nodeIndex}
    <svelte:self row={node} level={level + 1} />
  {/each}
{/if}
