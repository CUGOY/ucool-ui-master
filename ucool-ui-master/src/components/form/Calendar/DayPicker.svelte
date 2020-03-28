<script>
  export let show = false
  export let value = '2015-12-11 13:25:28'
  export let showTime = true
  export let inFormat = 'yyyy-MM-dd hh:mm:ss'
  export let outFormat = 'yyyy-MM-dd hh:mm:ss'
  export let field = {}
  export let size = ''
  export let fullwidth = false
  export let outlined = false
  export let rounded = false//圆角
  import * as t from '../../toolkit/index.js'
  import { onMount, afterUpdate } from 'svelte'
  import TimePicker from './HourMinutePicker.svelte'
  let showHourMinutePick = false //显示时间修改面板
  let vDate = new Date(Date.parse(value.replace(/-/g, '/')))
  let messageBodyDom, height //消息体dom对象
  let eventHandlerDom
  let dayArray = new Array()
  let thead = ['一', '二', '三', '四', '五', '六', '七']
  function showInCalendar() {
    dayArray = new Array()
    let row1 = []
    let firstDayOfSelectObject = new Date(
      vDate.getFullYear(),
      vDate.getMonth(),
      1
    )
    //目标日期所在月第一天是星期几
    let weekday = firstDayOfSelectObject.getDay() || 7
    firstDayOfSelectObject.setDate(firstDayOfSelectObject.getDate() - 1)
    //目标日期上个月的最后一天
    let lastDayOfBefore = firstDayOfSelectObject
    let nextMonth = new Date(vDate.getFullYear(), vDate.getMonth() + 1, 1)
    nextMonth.setDate(nextMonth.getDate() - 1)
    let selectObjectDays = nextMonth
    for (let i = weekday - 1; i > 0; i--) {
      row1.push(-(lastDayOfBefore.getDate() - i + 1))
    }
    for (let i = 1; i <= 7 - weekday + 1; i++) {
      row1.push(i)
    }
    dayArray.push(row1)
    for (let j = 0; j < 5; j++) {
      let row = []
      for (let i = 1; i <= 7; i++) {
        let d = 7 - weekday + 1 + i + 7 * j
        if (d <= selectObjectDays.getDate()) {
          row.push(d)
        } else {
          row.push(-(d - selectObjectDays.getDate()))
        }
      }
      dayArray.push(row)
    }
    dayArray = dayArray
  }
  onMount(() => {})
  afterUpdate(() => {
    if (show) {
      setValue()
    }
  })
  function setValue() {
    value = vDate.dateFormat(outFormat)
    eventHandlerDom.value = value
    vDate = vDate
  }
  export function openHandler(dom, param) {
    eventHandlerDom = dom
    show = true
    value = eventHandlerDom.value
    if (eventHandlerDom.value && eventHandlerDom.value.length > 0) {
      vDate = new Date(Date.parse(eventHandlerDom.value.replace(/-/g, '/')))
    } else {
      vDate = new Date()
    }
    showInCalendar()
  }
</script>

<style>
  .message {
    position: absolute;
    z-index: 103;
    width: 15rem;
    border: 1px solid #d2d2d2;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
  }
  .message-header {
    border-radius: 1px;
    padding: 0.5em;
    border-bottom: 1px solid #e2e2e2;
  }
  .message-body {
    padding: 0.25em;
  }
  .buttons .button,
  .buttons:not(:last-child),
  .buttons:last-child {
    margin-bottom: 0rem;
  }
  article.message {
    background-color: white;
  }
  article.message .message-header p {
    color: black;
    cursor: pointer;
    margin-bottom: 0em;
  }

  .table td,
  .table th {
    padding: 0em;
  }
  thead {
    font-weight: normal;
    background-color: #eff3f5;
    font-weight: normal;
    /* border-bottom: 2px solid indigo; */
  }
  table tbody tr td {
    vertical-align: middle;
    text-align: center;
    word-break: break-all;
    color: #d2d2d2;
    height: 30px;
  }
  table tbody tr td.selectObject {
    cursor: pointer;
    color: black;
    background-color: white;
  }

  tbody tr td:hover {
    background-color: #eaeaea;
    color: #339;
  }
  .selected-date {
    background-color: #009688 !important;
    color: #fff !important;
  }
</style>

{#if show}
  <article class="message" name="daypicker">
    <div class="message-header has-background-white">
      <div class="buttons has-addons is-centered are-small is-light">
        <button
          class="button"
          on:click={() => {
            vDate.setFullYear(vDate.getFullYear() - 1)
            showInCalendar()
          }}>
          <span class="icon is-small">
            <i class="iconfont icon-shangyige" />
          </span>
        </button>
        <button
          class="button"
          on:click={() => {
            vDate.setMonth(vDate.getMonth() - 1)
            showInCalendar()
          }}>
          <span class="icon is-small">
            <i
              class="iconfont iconxiangxia1"
              style="transform: rotate(90deg);" />
          </span>
        </button>
      </div>
      <p>{t.pad(vDate.getFullYear(), 4)}年</p>
      <p>{t.pad(vDate.getMonth() + 1)}月</p>
      <div class="buttons has-addons is-centered are-small">
        <button
          class="button"
          on:click={() => {
            vDate.setMonth(vDate.getMonth() + 1)
            showInCalendar()
          }}>
          <!-- vDate = vDate -->
          <span class="icon is-small">
            <i
              class="iconfont iconxiangxia1"
              style="transform: rotate(270deg);" />
          </span>
        </button>
        <button
          class="button"
          on:click={() => {
            vDate.setFullYear(vDate.getFullYear() + 1)
            showInCalendar()
          }}>
          <span class="icon is-small">
            <i class="iconfont icon-xiayige" />
          </span>
        </button>
      </div>

    </div>
    <div class="message-body" bind:this={messageBodyDom}>
      <table class="table full-width is-bordered" style="width: 100%;">
        <thead>
          <tr>
            {#each thead as cell, cellIndex}
              <td>{cell}</td>
            {/each}
          </tr>
        </thead>
        <tbody>
          {#each dayArray as row, rowIndex}
            <tr>
              {#each row as cell, cellIndex}
                {#if row[cellIndex] > 0}
                  <td
                    class="selectObject"
                    class:selected-date={t.pad(vDate.getDate()) == t.pad(row[cellIndex])}
                    on:click={() => {
                      vDate.setDate(t.pad(row[cellIndex]))
                      setValue()
                    }}>
                    {t.pad(row[cellIndex])}
                  </td>
                {:else}
                  <td>{t.pad(-row[cellIndex])}</td>
                {/if}
              {/each}
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
    <div class="message-header has-background-white">
      {#if showTime}
        <div
          class="buttons has-addons is-centered"
          style="color:black"
          on:click={() => (showHourMinutePick = true)}>
          {`${t.pad(vDate.getHours())}:${t.pad(vDate.getMinutes())}:${t.pad(vDate.getSeconds())}`}
        </div>
      {:else}
        <div class="buttons has-addons is-centered" />
      {/if}
      <div class="buttons has-addons is-right are-small">
        <button
          class="button"
          on:click={() => {
            eventHandlerDom.value = ''
            show = false
          }}>
          清空
        </button>
        <button
          class="button"
          on:click={() => {
            vDate = new Date()
            setValue()
          }}>
          现在
        </button>
        <button
          class="button"
          on:click={() => {
            setValue()
            show = false
          }}>
          确定
        </button>
      </div>
    </div>
  </article>
{/if}
<TimePicker bind:show={showHourMinutePick} bind:date={vDate} bind:height />
