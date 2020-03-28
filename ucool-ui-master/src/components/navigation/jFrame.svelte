<script>
  import { onMount } from 'svelte'
  export let src = ''
  export let title = '框架模式加载数据'
  onMount(() => {
    console.log(`参数title:${title}, src=${src}`)
  })
</script>

<iframe
  {src}
  {title}
  width="100%"
  height="calc(98vh)"
  style="width:100%; height:calc(98vh)" />
