<script>
  import Dialog from '../message/Dialog.svelte'
  import BlankPage from '../navigation/BlankPage.svelte'
  export let config = {dialogWidth:"25%"}
  export let data = ''
  let showDialog = false
  let component = BlankPage
  if (config.hasOwnProperty('component')) {
    config.component().then(m => {
      component = m.default
    })
  }
</script>

<Dialog
  bind:show={showDialog}
  title="请选择"
  headerClass="has-background-grey"
  modalColor="has-background-light"
  modalStyle="opacity: 0.7;"
  cardStyle="width:{config.dialogWidth||'25%'};height:100%;margin-right:0px;border: #bbbbbb 1px solid;">
  {#if config.hasOwnProperty('component')}
    <svelte:component this={component} {config} bind:data />
  {/if}
</Dialog>
<div class="field has-addons">
  <p class="control">
    <button class="button is-static" style="width:{config.labelWidth}">
      {config.title}
    </button>
  </p>
  <p
    class="control is-expanded"
    class:has-icons-left={config.leftIcon}
    class:has-icons-right={config.rightIcon}>
    <input
      class="input"
      placeholder={config.placeholder}
      readonly
      bind:value={data} />
    {#if config.leftIcon}
      <span class="icon is-small is-left">
        <i class="iconfont {config.leftIcon}" />
      </span>
    {/if}
    {#if config.rightIcon}
      <span class="icon is-small is-right">
        <i class="fas fa-check" />
      </span>
    {/if}
  </p>
  <p class="control">
    <button class="button is-info" on:click={() => (showDialog = true)}>
      <span class="icon is-small">
        <i class="iconfont iconfolder-open" />
      </span>
    </button>
  </p>
</div>
