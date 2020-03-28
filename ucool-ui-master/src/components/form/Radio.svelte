<script>
  export let dict = [{ label: '男', value: '1' ,leftIcon:'',leftIconClass : '',size : ''}]
  export let name
</script>


<style>
.radio{
    padding:10px
}
</style>

<div class="control">
  {#each dict as item,index}  
  <label class="radio">
    {#if item.disabled}
        <input type="radio" bind:group={name} value="{item.value}" disabled/>
    {:else}
        <input type="radio" bind:group={name} value="{item.value}"/>
    {/if}
    {#if item.leftIcon && item.leftIcon.length > 0}
    <span class="icon {item.size} {item.leftIconClass}">
      <i class={item.leftIcon} />
    </span>
  {/if}
  <span >
    {#if item.label && item.label.length > 0}{item.label}{/if}
    <slot />

  </label>
  {/each}
</div>
