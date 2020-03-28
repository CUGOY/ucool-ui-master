<script>
  export let config = {
    title: '',
    labelWidth: '',
    leftIcon: '',
    rightIcon: '',
    placeholder: '',
    status: '',
  }
  export let data = ''
</script>

<div class="field has-addons">
  {#if config.title}
    <p class="control">
      <button class="button is-static" style="width:{config.labelWidth}">
        {config.title}
      </button>
    </p>
  {/if}
  <p
    class="control is-expanded"
    class:has-icons-left={config.leftIcon}
    class:has-icons-right={config.rightIcon}>
    <input
      class="input {config.status}"
      placeholder={config.placeholder}
      bind:value={data} />
    {#if config.leftIcon}
      <span class="icon is-small is-left {config.leftIconClass}">
        <i class={config.leftIcon} />
      </span>
    {/if}
    {#if config.rightIcon}
      <span class="icon is-small is-right {config.rightIconClass}">
        <i class={config.rightIcon} />
      </span>
    {/if}
  </p>
</div>
