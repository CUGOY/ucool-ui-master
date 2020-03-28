<script>
  export let id = ''
  export let fieldName = ''
  export let value = ''
  export let rounded = false //圆边
  export let loading = false //加载中
  export let size = '' //is-small......
  export let leftIcon = ''
  export let leftIconClass = ''
  export let dictData = []
  export let labelField = 'title'
  export let valueField = 'value'
  let selected
</script>

<div class="control " class:has-icons-left={leftIcon && leftIcon.length > 0}>
  <div class="select {size}" class:is-rounded={rounded} class:is-loading={loading}>
    {#if leftIcon && leftIcon.length > 0}
      <span class="icon {size} is-left {leftIconClass}">
        <i class={leftIcon} />
      </span>
    {/if}
    <select name={fieldName} bind:value {id} >
      {#each dictData as dict, index}
        {#if String(dict.value) === String(value)}
          <option value={dict[valueField]} selected>{dict[labelField]}</option>
        {:else}
          <option value={dict[valueField]}>{dict[labelField]}</option>
        {/if}
      {:else}
        <option value="-1">请选择</option>
      {/each}
    </select>
  </div>
</div>
