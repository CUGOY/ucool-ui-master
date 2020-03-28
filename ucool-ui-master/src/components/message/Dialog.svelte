<script>
  import * as t from '../../components/toolkit/index.js'
  import { onMount, afterUpdate } from 'svelte'
  let headerDom, footerDom
  let contentHeight = 0
  export let headerClass = 'has-background-light'
  export let show = false
  export let modalColor = "has-background-light"
  export let modalStyle="opacity: 0.7"
  export let title = ''
  export let closable = true
  export let cardStyle = 'height:100%;'
  onMount(() => {})
  afterUpdate(() => {})
  //'pointer-events: none;'如果想要穿透遮罩, 加上这一句
</script>

<style>
  .modal-card {
    /* padding-top: 5px; */
    padding-right: 5px;
    width: 100%;
    max-height: calc(100vh);
  }
  .modal-card-title {
    font-size: 1.2rem;
  }
  .modal-card-head {
    border-bottom: 1px solid #dbdbdb;
    padding: 0.5rem;
  }
  .modal-card-foot {
    padding: 0rem;
    justify-content: flex-end;
  }
  .delete:hover {
    background-color: red;
  }
</style>

<div class="modal" class:is-active={show} style="position: absolute;">
  <div class="modal-background {modalColor}" style={modalStyle}/>
  <div class="modal-card" style={cardStyle}>
    {#if title}
      <header class="modal-card-head {headerClass}">
        <span class="icon">
          <i class="iconfont iconchuangkou" style="font-size: 20px;" />
        </span>
        <p class="modal-card-title" style="margin-bottom: 0em;">{title}</p>
        {#if closable}
          <button
            class="delete"
            aria-label="close"
            on:click={() => {
              show = false
            }} />
        {/if}
      </header>
    {/if}
    <section class="modal-card-body" style="padding:0rem">
      <div
        class="content"
        style="height: 100%;padding:0rem;margin-bottom: 0em;">
        <slot />
        <slot name="content" />
      </div>
    </section>
    <footer class="modal-card-foot">
      <div style="height:40px" />
      <slot name="foot-item" />
    </footer>
  </div>
  <!-- <div class="is-clearfix"></div> -->
</div>
