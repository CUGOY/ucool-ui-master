<script>
  export let data = []
  let selected = 0
  import XFrame from './jFrame'
  import { onMount, afterUpdate } from 'svelte'
  export let titleField = 'title'
  export let iconField = 'iconfont'
  export let contentField = 'content'
  export function selectedIndex(index) {
    selected = index
    data[index].show = true
  }
</script>

<style>

</style>

<div class="tabs is-boxed" style="margin-bottom:0rem">
  <ul>
    {#each data as row, index}
      <li
        class:is-active={selected == index}
        on:click={() => {
          console.log('tabs is-boxed margin-bottom:0rem')
          selected = index
          data.forEach(item => (item.show = false))
          if (data[index].hasOwnProperty('route') && data[index].route) {
          } else if (data[index].hasOwnProperty('component') && data[index].component) {
            data[index].component().then(function(res) {
              data[index].route = res.default
              console.log('data[index].route', data[index].route)
            })
          }
          data[index].show = true
        }}>
        <a href="#example1-tab{index}">
          <span class="icon is-small">
            <i class="iconfont {row[iconField]}" aria-hidden="true" />
          </span>
          <span>{row[titleField]}</span>
        </a>
      </li>
    {/each}
  </ul>
</div>
{#each data as row, index}
  <div class:is-hidden={!data[index].show}>
    {#if data[index].hasOwnProperty('route') && data[index].route}
      <svelte:component
        this={data[index].route}
        rowList={row.rowList}
        range={row.range} />
    {:else if data[index].hasOwnProperty('jFrame')}
      <XFrame src={row.jFrame} />
    {:else if data[index].hasOwnProperty(contentField)}{row[contentField]}{/if}
  </div>
{/each}
