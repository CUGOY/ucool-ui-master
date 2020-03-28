<script context="module">
  export function openModal() {
    console.log(`========ModelInfo里面的openModal()方法=======`);
    // filterData()
  }
</script>
<script>
  import * as t from '../../../components/toolkit/index.js'
  import { onMount, afterUpdate } from 'svelte'
  import TypeInput,{renderNow} from '../../form/TypeInput.svelte'
  export let theadData = []
  export let data = {}
  export let labelWidth = '4rem'
  let fieldList=[]
  /* 
  过滤出需要显示的field：
  行号和操作两栏不需要显示，
  showInForm=false也不显示 
  */
  function filterData() {
    fieldList = theadData.filter(
      d => d.typeInForm && d.typeInForm.length > 0 && d.typeInForm != 'pk'
    )
    fieldList.every(e => (e.labelWidth = labelWidth))
  }
  onMount(() => {
    filterData()
  })

  </script>

<style>
  .columns.is-gapless > .column {
    margin: 0;
    padding: 0 0.1rem !important;
  }
</style>
<div class="columns is-gapless is-multiline is-mobile" style="padding:0.5rem">
  {#each theadData as field, index}
    {#if field.typeInForm && field.typeInForm.length > 0 && field.typeInForm != 'pk'}
    <div
      class="column {field.width ? field.width : ''}"
      class:is-half={!field.hasOwnProperty('width')}>
      <TypeInput config={field} bind:data={data[field.field]} />
    </div>
    {/if}
  {/each}
</div>
