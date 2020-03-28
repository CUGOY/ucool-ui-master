<script context="module">
  export function renderNow() {
    typeInFormParser()
  }
</script>

<script>
  export let config = {}
  export let data
  export let disabled
  import { onMount, afterUpdate } from 'svelte'
  import BasicInput from './BasicInput'
  let component = BasicInput

  onMount(() => {
    typeInFormParser()
  })
  afterUpdate(() => {
    // typeInFormParser()
  })
  function typeInFormParser() {
    let type = config.typeInForm || '*'
    console.log(`TypeInput.svelte-->typeInFormParser()-->type:${type}`)
    switch (type.toLowerCase()) {
      case 'calendar':
        calendarParser()
        break
      case 'dialog':
        import('./DialogInput').then(m => {
          component = m.default
        })
        break
      case 'input':
        component = BasicInput
        break
      case 'select':
      case 'dropdown':
        import('./DropdownInput').then(m => {
          component = m.default
        })
        break
      case '*':
        component = BasicInput
        break
      default:
        component = BasicInput
    }
  }
  /**
   *日期组件的解析
   */
  function calendarParser() {
    if (config.hasOwnProperty('range') && config.range == true) {
      import('./DateRangeInput').then(m => {
        component = m.default
      })
    } else {
      import('./DateTimeInput').then(m => {
        component = m.default
      })
    }
  }
</script>

<svelte:component this={component} {config} bind:data />
