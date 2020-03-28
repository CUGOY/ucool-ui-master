<script>
  export let show = false;
  export let zIndex = 41;
  export let background = "#dbdbdb";
</script>

<style>
  .modal {
    position: absolute;
    justify-content: center;
    align-items: center;
  }
</style>

<div class="modal" style="display: {show ? 'flex' : 'none'};z-index:{zIndex};">
  <div class="modal-background" style="background:{background}" />
  <div class="modal-content">
    <slot />
  </div>
  <button
    class="modal-close is-large"
    aria-label="close"
    on:click={() => (show = false)} />
</div>
