<script>
  import Calendar, * as c from './Calendar/DayPicker.svelte'
  import { onMount, beforeUpdate } from 'svelte'
  export let config = {}
  export let data = { begin: '', end: '' }
  export let begin = '2018-07-11'
  export let end = '2010-11-13'
  let showBeginCalendar = false
  let showEndCalendar = false
  let beginTargetDom = {},
    endTargetDom = {}
  onMount(() => {})
  beforeUpdate(() => {
    console.log('DateRangeInput组件里面的data:', data)
  })
</script>

<div class="field has-addons">
  <p class="control">
    <button class="button is-static" style="width:{config.labelWidth}">
      {config.title}
    </button>
  </p>
  <p
    class="control"
    class:has-icons-left={config.leftIcon}
    class:has-icons-right={config.rightIcon}>
    <input
      class="input is-primary"
      style="width: 45%;"
      placeholder={config.placeholder}
      readonly
      bind:this={beginTargetDom}
      bind:value={begin}
      on:click={e => {
        c.openCalendarFun(beginTargetDom)
      }} />
    <span>~</span>
    <input
      class="input is-primary"
      style="width: 45%;"
      placeholder={config.placeholder}
      readonly
      bind:this={endTargetDom}
      bind:value={end}
      on:click={e => {
        c.openCalendarFun(endTargetDom)
      }} />
    <Calendar {...config} bind:openHandler={c.openCalendarFun} />
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
  {#if config.hasOwnProperty('showEndButton') && config.showEndButton}
    <p class="control">
      <button
        class="button is-info"
        on:click={e => {
          c.openCalendarFun(beginTargetDom)
        }}>
        <span class="icon is-small">
          <i class="iconfont iconfolder-open" />
        </span>
      </button>
    </p>
  {/if}
</div>
