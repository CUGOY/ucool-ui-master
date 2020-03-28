<script>
  import { onMount, afterUpdate } from 'svelte'
  import axios from 'axios'
  import ModelInfo,{openModal} from './ModelInfo.svelte'
  import ModelView from './ModelView.svelte'
  import Dialog from '../../message/Dialog.svelte'
  import Modal from '../../message/Modal.svelte'
  import IMessage from '../../message/iMessage.svelte'
  import Paginataion from './Pagination.svelte'
  import SearchBar from './SearchBar.svelte'
  import * as t from '../../toolkit'
  export let theadData = []
  export let tbodyData = []
  export let total
  export let pageSize = 10
  export let pageNumber = 1
  export let firstPage
  export let lastPage
  export let totalPage = 0
  export let pkField = '' //主键字段，可以从theadData里面的pk进行确定
  /* 
  约定大于配置，采用一组restful的api风格进行设计：
  增post删delete改put查get（baseURL） 
  */
  export let labelWidth=''
  export let baseURL = ''
  export let modelDesc = ''
  let showEdit = false,
    showView = false //控制是否显示对话框的状态标志
  let showMessage = false //控制是否显示对话框的状态标志
  let currentRow = {} //传递给窗口的实体类信息
  let title = '' //弹出窗口的标题
  let iMessageStr = '',iMessageTitle="" //显示消息的内容
  let showMask = false,okFun
  let queryModel = {} //查询条件bar的实例
  
  /* 用来格式化的函数，使用字典dict将传进来的val变成对应的label */

  /* 点击行编辑按钮的动作绑定内容 */
  function editHandler(row) {
    showEdit = true
    openModal()
    currentRow = row
  }
  function deleteHandler(row,msg){
    showMessage=true
    iMessageStr=msg
    okFun=deleteDataFun
  }

  /* 数据请求的内容函数 */
  function fetchData(args) {
    showMask = true
    let p = Object.assign(
      queryModel,
      { pageSize: pageSize, pageNumber: pageNumber },
      args
    )
    t.$http
      .get(baseURL, {
        params: p,
      })
      .then(response => {
        let d = response.data
        console.log('DataTable请求的返回值是:', d)
        tbodyData = d.list
        total = d.totalRow
        totalPage = d.totalPage
        firstPage = d.firstPage
        lastPage = d.lastPage
        showMask = false
      })
      .catch(error => {
        console.log(error)
      })
  }
  function editfun(){
    showMessage = false
  }

  /* 保存数据的函数过程 */
  function saveData(data) {
    if (data[pkField]) {
      t.$http
        .put(baseURL, data)
        .then(response => {
          showMessage = true
          iMessageStr = response.data
        okFun=editfun
          console.log(JSON.stringify(response))
        })
        .catch(error => {
          console.log(error)
        })
    } else {
      t.$http
        .post(baseURL, data)
        .then(response => {
          showMessage = true
          iMessageStr = response.data
          okFun=editfun
          console.log(JSON.stringify(response))
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
  /* 
  查找主键编号对应的字段
  */
  function findPrimaryKeyField() {
    let result = theadData.filter(d => d.typeInForm === 'pk')
    if (pkField != null && pkField.length > 0) {
    }
    return result[0].field
  }
  onMount(() => {
    if (pkField != null && pkField.length > 0) {
    } else {
      pkField = findPrimaryKeyField()
    }
    fetchData()
  })
  afterUpdate(() => {})
  function deleteDataFun(){
    t.$http
        .delete(`${baseURL}?${pkField}=${currentRow[pkField]}`)
        .then(response => {
          showMessage = false
          fetchData()
        })
        .catch(error => {
          console.log(error)
        })
  }
</script>

<style>
  .box {
    padding: 0.1rem;
  }

  .box::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  /*正常情况下滑块的样式*/

  .box::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.05);
    border-radius: 10px;
    -webkit-box-shadow: inset 1px 1px 0 rgba(0, 0, 0, 0.1);
  }
  .field:not(:last-child) {
    margin-bottom: 0rem;
  }
  .xuan-zhuan {
    -webkit-transition-property: -webkit-transform;
    -webkit-transition-duration: 1s;
    -moz-transition-property: -moz-transform;
    -moz-transition-duration: 1s;
    -webkit-animation: rotate 1s linear infinite;
    -moz-animation: rotate 1s linear infinite;
    -o-animation: rotate 1s linear infinite;
    animation: rotate 1s linear infinite;
  }
  @-webkit-keyframes rotate {
    from {
      -webkit-transform: rotate(0deg);
    }
    to {
      -webkit-transform: rotate(360deg);
    }
  }
  @-moz-keyframes rotate {
    from {
      -moz-transform: rotate(0deg);
    }
    to {
      -moz-transform: rotate(359deg);
    }
  }
  @-o-keyframes rotate {
    from {
      -o-transform: rotate(0deg);
    }
    to {
      -o-transform: rotate(359deg);
    }
  }
  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(359deg);
    }
  }
</style>

<IMessage bind:show={showMessage} title={iMessageTitle}>
  {iMessageStr}
  <button slot="foot-item" class="button is-info is-small" on:click={okFun}>确定</button>
</IMessage>
<Dialog bind:show={showView} {title} headerClass="has-background-success">
  <div slot="content">
    <ModelView bind:theadData={theadData} bind:data={currentRow} {labelWidth}/>
  </div>
  <button
    slot="foot-item"
    class="button is-danger is-small"
    on:click={() => {
      showView = false
    }}>
    关闭
  </button>
</Dialog>
{#if showEdit}
<Dialog bind:show={showEdit} {title} headerClass="has-background-info">
  <div slot="content">
    <ModelInfo bind:theadData={theadData} bind:data={currentRow} {labelWidth} />
  </div>
  <button
    slot="foot-item"
    class="button is-info is-small"
    on:click={() => {
      saveData(currentRow)
      showEdit = false
      console.log(currentRow)
    }}>
    确定
  </button>
</Dialog>
{/if}
<Modal bind:show={showMask} background="#b5b5b599">
  <div style="width: auto; height: 100px;">
    <span class="icon xuan-zhuan" style="width: 50px; height: 50px;">
      <i class="iconfont icon8" style="font-size:2.5rem" />
    </span>
    数据加载中......
    <button
      class="delete"
      aria-label="delete"
      on:click={() => (showMask = false)} />
  </div>
</Modal>
<div class="box">
  <SearchBar
    bind:title
    bind:data={queryModel}
    bind:theadData={theadData}
    {currentRow}
    {editHandler}
    {fetchData}
    {modelDesc}
    {showMask} />
  <section>
    <div class="table-container">
      <table
        class="table is-bordered is-striped is-hoverable is-fullwidth"
        style="margin-bottom: 0.2rem;">
        <thead>
          <tr class="has-background-light">
            {#each theadData as column, columnIndex}
            <!--如果没传showInTable默认为显示,如果传了,只要值不等于false也显示-->
              {#if column.showInTable }
                <td >{column.title}</td>
              {/if}
            {/each}
          </tr>
        </thead>
        <tbody>
          {#each tbodyData as row, rowIndex}
            <tr>
              {#each theadData as column, columnIndex}
                {#if column.showInTable }
                  <td style="{column.style}">
                    {#if column.hasOwnProperty('dict')}
                      {t.formatFun(row[column.field], column.dict)}
                    {:else if '_rowNumber_' === column.field}
                      {rowIndex + 1 + pageSize * (pageNumber - 1)}
                    {:else if '_operate_' === column.field}
                    <div class="buttons has-addons are-small">
                      <button
                        class="button is-primary"
                        on:click={() => {
                          title = '查看' + modelDesc + '信息'
                          showView = true
                          currentRow = row
                        }}>
                        查看
                      </button>
                      <button
                        class="button is-info"
                        on:click={() => {
                          title = '编辑' + modelDesc + '信息'
                          editHandler(row)
                        }}>
                        编辑
                      </button>
                      <button class="button is-danger" on:click={() => {
                          let msg = '删除' + modelDesc + '信息'
                          currentRow = row
                          deleteHandler(row,msg)
                        }}>删除</button>
                      <slot name="operate" />
                    </div>
                    {:else}
                      {row[column.field] ? row[column.field] : ''}
                    {/if}
                  </td>
                {/if}
              {/each}
            </tr>
          {/each}
        </tbody>
      </table>
      <Paginataion
        refresh={fetchData}
        {total}
        {totalPage}
        bind:pageSize
        bind:pageNumber
        {firstPage}
        {lastPage} />
    </div>
  </section>
</div>
