<script>
  import Calendar, { openCalendar } from './Calendar/DayPicker.svelte'
  import { onMount, afterUpdate } from 'svelte'
  export let config = {
    size: 'is-small',
    fullwidth: false,
  }
  export let data = ''
  export let showEndButton = true
  export let inputWidth = '100%'
  let pickerTargetDom = {}
  let showCalendar = false
  let showBeginCalendar = false
  let showEndCalendar = false
  onMount(() => {})
  afterUpdate(() => {})
  let openCalendarFun
  let validSuccess = true
</script>

<div class="field has-addons">
  {#if config.title}
    <p class="control">
      <button class="button is-static {config.size}" style="width:{config.labelWidth}">
        {config.title}
      </button>
    </p>
  {/if}
  <p
    class="control"
    class:has-icons-left={config.leftIcon}
    class:has-icons-right={config.rightIcon} style="width: {config.inputWidth}">
    <input
      bind:this={pickerTargetDom}
      class="input {config.size}"
      class:is-danger={!validSuccess}
      class:is-primary={validSuccess}
      style="width: 100%"
      placeholder={config.placeholder}
      readonly
      bind:value={data}
      on:click={e => {
        openCalendarFun(pickerTargetDom)
      }} />
    <Calendar
      bind:show={showCalendar}
      bind:value={data}
      {...config}
      bind:openHandler={openCalendarFun} />
    <slot />
    {#if config.leftIcon}
      <span class="icon {config.size} is-left {config.leftIconClass}">
        <i class={config.leftIcon} />
      </span>
    {/if}
    {#if config.rightIcon}
      <span class="icon {config.size} is-right {config.rightIconClass}">
        <i class={config.rightIcon} />
      </span>
    {/if}
  </p>
  {#if showEndButton}
    <p class="control">
      <button
        class="button is-info {config.size}"
        on:click={e => {
          openCalendarFun(pickerTargetDom)
        }}>
        <span class="icon {config.size}">
          <i class="iconfont iconfolder-open" />
        </span>
      </button>
    </p>
  {/if}
</div>
