<script>
  export let config = {}
  export let data = ''
  import Dropdown from './Dropdown.svelte'
</script>

<div class="field has-addons">
  <p class="control">
    <button
      class="button is-static"
      class:is-small={config.small}
      style="width:{config.labelWidth}">
      {config.title}
    </button>
  </p>
  <p
    class="control is-expanded"
    class:has-icons-left={config.leftIcon}
    class:has-icons-right={config.rightIcon}>
    <Dropdown items={config.dict} {...config} bind:value={data} />
    {#if config.leftIcon}
      <span class="icon is-small is-left">
        <i class="fas fa-envelope" />
      </span>
    {/if}
    {#if config.rightIcon}
      <span class="icon is-small is-right">
        <i class="fas fa-check" />
      </span>
    {/if}
  </p>
</div>
