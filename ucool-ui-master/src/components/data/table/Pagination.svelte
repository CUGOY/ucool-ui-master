<script>
  export let refresh //刷新函数
  export let firstPage = true //当前是第几页
  export let lastPage = false
  export let pageNumber = 1 //当前是第几页
  export let pageSize = 10 //每页显示多少条数据
  export let total //总计多少条数据
  export let totalPage = 0 //总计多少条数据
  import Dropdown from '../../form/Dropdown.svelte'
  import { onMount, afterUpdate } from 'svelte'
  let targetPageNumber = 1
  let pageCode = 'components/data/table/Pagination.svelte'
  let pageDict = [
    { label: '005条每页', value: 5 },
    { label: '010条每页', value: 10 },
    { label: '020条每页', value: 20 },
    { label: '050条每页', value: 50 },
    { label: '100条每页', value: 100 },
  ]
  //获取需要处理的数组
  function getArray(length) {
    let result = []
    for (let i = 1; i <= length; i++) {
      result[i - 1] = i
    }
    return result
  }
  afterUpdate(() => {
    console.log(`firstPage:${firstPage},lastPage:${lastPage}`)
  })
</script>

<style>
  .pagination {
    margin: 0rem;
    padding-right: 1rem;
  }
  .field:not(:last-child) {
    margin-bottom: 0rem;
  }
  .fitWidth {
    padding-left: 0.25em;
    padding-right: 0.25em;
  }
  .pagination-selected {
    background-color: #3298dc !important;
    color: white !important;
  }
</style>

<nav class="pagination is-small" role="navigation" aria-label="pagination">
  <button
    class="button fitWidth is-small"
    on:click={() => {
      refresh({})
    }}>
    刷新
  </button>
  <div class="field has-addons">
    <p class="control">
      <button class="button is-static fitWidth is-small">跳转至</button>
    </p>
    <p class="control is-expanded">
      <input
        class="input is-small"
        style="width:2.5rem"
        bind:value={targetPageNumber} />
    </p>
    <p class="control">
      <button class="button is-small" 
      on:click={() => {
              pageNumber = targetPageNumber
              refresh({ pageNumber: pageNumber })
            }}>
        <span class="icon">
          <i class="iconfont iconrightselect" />
        </span>
      </button>
    </p>
  </div>
  <Dropdown
    items={pageDict}
    up="true"
    small
    bind:value={pageSize}
    bind:itemClickFun={refresh}
    fieldName="pageSize" />
  第{pageNumber}页,第{1 + (pageNumber - 1) * pageSize}-{pageNumber * pageSize}条，
  共{total}条
  <button
    class="pagination-previous"
    style="display:{firstPage ? 'none' : 'block'}"
    on:click={() => {
      if (!firstPage) {
        pageNumber = pageNumber - 1
        refresh({ pageNumber: pageNumber })
      }
    }}>
    上一页
  </button>
  <button
    class="pagination-next"
    style="display:{lastPage ? 'none' : 'block'}"
    on:click={() => {
      if (!lastPage) {
        pageNumber = pageNumber + 1
        refresh({ pageNumber: pageNumber })
      }
    }}>
    下一页
  </button>
  <ul class="pagination-list">
    {#if totalPage < 6}
      {#each getArray(totalPage) as pn}
        <li>
          <button
            class="pagination-link"
            class:pagination-selected={pageNumber === pn}
            on:click={() => {
              pageNumber = pn
              refresh({ pageNumber: pn })
            }}>
            {pn}
          </button>
        </li>
      {/each}
    {:else}
      {#each getArray(5) as pn}
        <li>
          <button
            class="pagination-link"
            class:pagination-selected={pageNumber === pn}
            on:click={() => {
              pageNumber = pn
              refresh({ pageNumber: pn })
            }}>
            {pn}
          </button>
        </li>
      {/each}
      ...
       <li>
          <button
            class="pagination-link"
            class:pagination-selected={true}
            style="display:{pageNumber < 6 ? 'none' : 'block'}"
            >
            {pageNumber}
          </button>
        </li>
      ...
      <li>
        <button
          class="pagination-link"
          class:pagination-selected={pageNumber === totalPage}
          on:click={() => {
            pageNumber = totalPage
            refresh({ pageNumber: pageNumber })
          }}>
          {totalPage}
        </button>
      </li>
    {/if}
  </ul>
</nav>
