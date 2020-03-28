<script>
  import { onMount, afterUpdate } from 'svelte'
  import * as t from '../toolkit/index.js'
  export let active = false
  export let small = false
  export let up = false
  export let hoverable = false
  export let right = false
  export let items = []
  export let labelField = 'label'
  export let valueField = 'value'
  export let value = ''
  export let fieldName = ''
  export let divider = false
  export let defaultTitle = '请选择一项'
  export let itemClickFun
  let title = defaultTitle

  function clickHandler() {
    active = !active
  }
  function close() {
    active = false
  }
  function clickItemHandler(selectedIndex) {
    title = items[selectedIndex][labelField]
    value = items[selectedIndex][valueField]
    if (itemClickFun) {
      let param = {}
      param[fieldName] = value
      itemClickFun(param)
    }
    close()
  }
  onMount(() => {
  })
  afterUpdate(() => {
    title = t.formatFun(value, items,"label","value",defaultTitle)
  })
</script>

<style>
.dropdown{
   margin: 2px
}
</style>

<svelte:window on:click={close} />
<div
  class="dropdown"
  class:is-active={active}
  class:is-hoverable={hoverable}
  class:is-up={up}
  class:is-right={right}
  on:click|stopPropagation>
  <div class="dropdown-trigger">
    <button
      class="button"
      class:is-small={small}
      aria-haspopup="true"
      aria-controls="dropdown-menu"
      on:click={clickHandler}>
      <span>{title}</span>
      <span class="icon is-small">
        <i
          class="iconfont"
          class:iconup-fill={active}
          class:iconxiangxia1={!active}
          aria-hidden="true" />
      </span>
    </button>
  </div>
  <div class="dropdown-menu" id="dropdown-menu" role="menu">
    <div class="dropdown-content">
      {#if items}
        {#each items as item, index}
          <a
            href="javascript:void(0)"
            class="dropdown-item"
            class:is-active={String(item[valueField]) === String(value)}
            on:click|stopPropagation={() => clickItemHandler(index)}>
            {item[labelField]}
          </a>
          {#if divider === true}
            <hr class="dropdown-divider" />
          {/if}
        {/each}
      {/if}
      <slot />
    </div>
  </div>
</div>
