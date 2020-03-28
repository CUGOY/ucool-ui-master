<script>
  import * as t from '../../../components/toolkit/index.js'
  import { onMount, afterUpdate } from 'svelte'
  import TypeInput from '../../form/TypeInput.svelte'
  export let theadData = []
  export let data = {}
  export let labelWidth = '4rem'
  /* 
  过滤出需要显示的field：
  行号和操作两栏不需要显示，
  showInForm=false也不显示 
  */
  function filterData() {
    let result = theadData.filter(
      d =>
        d.field != '_rowNumber_' &&
        d.field != '_operate_' &&
        d.showInForm != false
    )
    result.every(e => (e.labelWidth = labelWidth))

    return result
  }
  onMount(() => {})
</script>

<style>
  .columns.is-gapless > .column {
    margin: 0;
    padding: 0 0.1rem !important;
  }
</style>

<div class="columns is-gapless is-multiline is-mobile" style="padding:0.5rem">
  <div class="modal is-active" style="top:50px;bottom:50px"></div>
  {#each filterData() as field, index}
    <!-- showInForm==false,强制不显示，否则show in form -->
    {#if field.showInForm != false}
      <div
        class="column {field.width ? field.width : ''}"
        class:is-half={!field.hasOwnProperty('width')}>
        <TypeInput config={field} bind:data={data[field.field]} disabled/>
      </div>
    {/if}
  {/each}
</div>
