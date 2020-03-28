<script>
  import { onMount } from 'svelte'
  import MyTable from './iTable.svelte'
  import CheckButton from '../../form/CheckButton.svelte'
  import TypeInput from '../../form/TypeInput.svelte'
  import Dialog from '../../message/Dialog.svelte'
  import IMessage from '../../message/iMessage.svelte'
  export let title, theadData, currentRow, editHandler, fetchData, modelDesc
  export let showMask = false
  export let data = {}
  let showMessage = false,
    iMessageStr = ''
  let showSetTableDialog = false
  function reset() {
    console.log('调用重置函数data model的内容是:', JSON.stringify(data))
    for (let p in data) {
      if (data[p].type() != 'Function') {
        data[p] = ''
      }
    }
  }
  function setConfig(config) {
    return Object.assign({ range: true }, config, {
      typeInForm: config.searchType,
    })
  }
  onMount(() => {
    theadData
      .filter(t => t.search === true || t.searchType)
      .forEach(item => {
        data[item.field] = ''
      })
  })

  function setTable() {
    showSetTableDialog = true
  }
</script>

<nav
  class="navbar is-small"
  style="min-height: 0rem;padding-right: 1rem;"
  role="navigation"
  aria-label="dropdown navigation">
  <div class="navbar-start">
    <div class="field has-addons">
      <button
        class="button is-info"
        on:click={() => {
          title = '新建' + modelDesc
          theadData.forEach(th => {
            currentRow[th.field] = ''
          })
          editHandler(currentRow)
        }}>
        <strong>新建</strong>
      </button>
    </div>
    {#each theadData as d, index}
      {#if d.searchType && d.searchType.length > 0}
        <TypeInput
          config={setConfig(d)}
          bind:value={data[d.field]}
          bind:data={data[d.field]} />
      {/if}
    {/each}
  </div>

  <div class="navbar-end">
    <div class="navbar-item">
      <div class="buttons has-addons">
        <button
          class="button is-primary is-small"
          on:click={() => {
            console.log('searchBar里面的data内容是:', data)
            fetchData(data)
          }}>
          <span class="icon is-small">
            <i class="iconfont iconsearch" />
          </span>
          <span>查询</span>
        </button>
        <button class="button is-info is-small" on:click={reset}>
          <span class="icon is-small">
            <i class="iconfont iconqingchu" />
          </span>
          <span>重置</span>
        </button>
        <button class="button is-small is-link" on:click={setTable}>
          <span class="icon is-small">
            <i class="iconfont iconshezhi" />
          </span>
          <span>设置</span>
        </button>
      </div>
    </div>
  </div>
</nav>

<Dialog
  bind:show={showSetTableDialog}
  title={title || '表格设置'}
  headerClass="has-background-info"
  modalColor="has-background-light"
  modalStyle="opacity: 0.7;"
  cardStyle="width:25%;height:100%;margin-right:0px;border: #bbbbbb 1px solid;">
  <div slot="content">
    <MyTable isBordered="true" isStriped="true" isNarrow="true" tbody={data}>
      <thead slot="thead">
        <th>列名</th>
        <th>表格显示</th>
        <th>查询显示</th>
        <th>表单类型</th>
      </thead>
      <tbody slot="tbody">
        {#each theadData as th, thIndex}
          <tr>
            <td>{th.title}</td>
            <td>
              <CheckButton
                bind:isChecked={th.showInTable}
                isCheckedTitle="是"
                notCheckedTitle="否" />
            </td>
            <td>
              <input bind:value={th.searchType} style="width:5rem" />
            </td>
            <td>
              <input bind:value={th.typeInForm} style="width:5rem" />
            </td>
          </tr>
        {/each}
      </tbody>
    </MyTable>
  </div>

  <button
    slot="foot-item"
    class="button is-danger is-small"
    on:click={() => {
      showSetTableDialog = false
    }}>
    关闭
  </button>
</Dialog>
