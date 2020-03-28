<script>
  export let isCheckedTitle = '选择'
  export let notCheckedTitle = '选择'
  export let isChecked = false
</script>

<button
  class="button outlined"
  class:is-info={isChecked}
  class:is-light={!isChecked}
  on:click={() => {
    isChecked = !isChecked
  }}>
  <span>{isChecked?isCheckedTitle:notCheckedTitle}</span>
  <span class="icon is-small">
    <i
      class="iconfont "
      class:icontucenggouxuan={isChecked}
      class:iconguanbi={!isChecked} />
  </span>
</button>
