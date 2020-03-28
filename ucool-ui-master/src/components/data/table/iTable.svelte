<script>
  export let isBordered = false
  export let isStriped = false
  export let isNarrow = false
  export let isHoverable = false
  export let isFullwidth = false
  export let thead = []
  export let theadStyle = ''
  export let tbody = []
  export let tbodyStyle = ''
  export let tfoot = []
  export let tfootStyle = ''
  let defaultIsSelectedStyle =
    'color:#fff!important;background-color: #00d1b2!important'
  export let isSelectedStyle = defaultIsSelectedStyle
  //    background-color: #00d1b2; color: #fff;
  let isSelectedIndex = -1
</script>

<style>
  .container {
    width: 100%;
  }
</style>

<div class="container">
  <table
    class="table"
    class:is-bordered={isBordered}
    class:is-striped={isStriped}
    class:is-narrow={isNarrow}
    class:is-hoverable={isHoverable}
    class:is-fullwidth={isFullwidth}>
    {#if thead && thead.length > 0}
      <thead>
        {#each thead as theadRow, theadRowIndex}
          <tr style={theadStyle}>
            {#each theadRow as theadCell, theadCellIndex}
              <td style={theadCell.style}>
                {@html theadCell.content}
              </td>
            {/each}
          </tr>
        {/each}
      </thead>
    {:else}
      <slot name="thead" />
    {/if}
    {#if tfoot && tfoot.length > 0}
      <tfoot>
        {#each tfoot as tfootRow, tfootRowIndex}
          <tr style={tfootStyle}>
            {#each tfootRow as tfootCell, tfootCellIndex}
              <td style={tfootCell.style}>
                {@html tfootCell.content}
              </td>
            {/each}
          </tr>
        {/each}
      </tfoot>
    {:else}
      <slot name="tfoot" />
    {/if}
    {#if tbody && tbody.length > 0}
      <tbody>
        {#each tbody as tbodyRow, tbodyRowIndex}
          <tr
            style="{tbodyStyle}
            {tbodyRowIndex === isSelectedIndex ? isSelectedStyle || defaultIsSelectedStyle : ''}"
            on:click={() => {
              isSelectedIndex = tbodyRowIndex
            }}>
            {#each tbodyRow as tbodyCell, tbodyCellIndex}
              <td style={tbodyCell.style}>
                {@html tbodyCell.content}
              </td>
            {/each}
          </tr>
        {/each}
      </tbody>
    {:else}
      <slot name="tbody" />
    {/if}
  </table>
</div>
