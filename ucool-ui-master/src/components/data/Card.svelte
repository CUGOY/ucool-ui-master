<script>
  export let title = ''
  export let cardClasses = ''
  export let cardStyle
  export let cardHeaderClasses = ''
  export let cardHeaderStyle = ''
</script>

<style>
  .card-content {
    background-color: transparent;
    padding: 0 0 1.5rem 0 !important;
  }
</style>

<div class="card {cardClasses}" style={cardStyle}>
  <header class="card-header {cardHeaderClasses}" style={cardHeaderStyle}>
    <a
      href="javascript:void(0)"
      class="card-header-icon"
      aria-label="more options">
      <span class="icon">
        <i class="iconfont iconassignment" aria-hidden="true" />
      </span>
    </a>
    <p class="card-header-title">{title}</p>
    <a
      href="javascript:void(0)"
      class="card-header-icon"
      aria-label="more options">
      <span class="icon">
        <i class="iconfont iconshensuo" aria-hidden="true" />
      </span>
    </a>
  </header>
  <div class="card-image">
    <slot name="image" />
  </div>
  <slot name="content" />
  <slot />
  <slot name="footer" />
</div>
