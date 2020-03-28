<script>
  import { createEventDispatcher} from "svelte";
  const dispatch = createEventDispatcher();
  export let btnType //submit, reset
  export let size = ''
  export let text = ''
  export let leftIcon = ''
  export let leftIconClass = ''
  export let rightIcon = ''
  export let rightIconClass = ''
  export let buttonClass = ''
  export let loading = false
  export let fullwidth = false
  export let outlined = false
  export let rounded = false
  export let clickFun
</script>

<style>
button{
  margin: 2px
}

</style>

<button on:click={()=>clickFun(dispatch)}
  class="button {buttonClass}  {size}"
  class:is-loading={loading}
  class:is-fullwidth={fullwidth}
  class:is-outlined={outlined}
  class:is-rounded={rounded}
  type={btnType}>
  {#if leftIcon && leftIcon.length > 0}
    <span class="icon {size} {leftIconClass}">
      <i class={leftIcon} />
    </span>
  {/if}
  <span >
    {#if text && text.length > 0}{text}{/if}
    <slot />
  </span>
  {#if rightIcon && rightIcon.length > 0}
    <span class="icon {size} {rightIconClass}">
      <i class={rightIcon} />
    </span>
  {/if}
</button>
