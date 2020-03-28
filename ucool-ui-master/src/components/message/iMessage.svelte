<script>
  export let show = true
  export let modal = true
  export let title = '消息对话框'
  export let content = ''
  export let headerClass = 'has-background-info'
  export let iMessageStyle="z-index:40"
</script>

<style>
  .modal-card {
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }

  .modal-card-foot {
    justify-content: flex-end;
  }
  .modal-card-body {
    border: 1px solid #ebeef5;
  }
  .modal-card-foot,
  .modal-card-head {
    padding: 8px;
    border: 1px solid #ebeef5;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }
  .iconfont {
    font-size: 20px;
  }
</style>

<div class="modal" class:is-active={show} style={iMessageStyle}>
  {#if modal}
    <div class="modal-background" />
  {/if}
  <div class="modal-card">
    <header class="modal-card-head {headerClass}">
      <p class="modal-card-title" style="font-size:20px">
        <span class="icon is-small">
          <i class="iconfont iconshenpi1" />
        </span>
        {title}
      </p>
      <button
        class="delete is-danger"
        aria-label="close"
        on:click={() => (show = false)} />
    </header>
    <section class="modal-card-body">
      <slot />
      <slot name="content" />
      {@html content}
    </section>
    <footer class="modal-card-foot">
      <slot name="foot-item" />
      <button class="button is-danger is-small" on:click={() => (show = false)}>
        关闭
      </button>
    </footer>
  </div>
</div>
