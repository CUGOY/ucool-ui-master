<script>
  export let show = true
  export let date, height
  import { onMount, afterUpdate } from 'svelte' //挂载时执行的动作
  import * as t from '../../toolkit/index.js'
  import Dropdown from '../Dropdown.svelte'
  let hourDom, minuteDom, secondDom
  let hourArray = new Array(),
    minuteArray = new Array(),
    secondArray = new Array()
  for (let i = 0; i < 24; i++) {
    hourArray[i] = t.pad(i)
  }
  for (let i = 0; i < 60; i++) {
    minuteArray[i] = t.pad(i)
    secondArray[i] = t.pad(i)
  }
  afterUpdate(() => {
    if (show === true) {
      hourDom.scroll(0, 30 * date.getHours())
      minuteDom.scroll(0, 30 * date.getMinutes())
      secondDom.scroll(0, 30 * date.getSeconds())
    }
  })
</script>

<style>
  .message {
    position: absolute;
    z-index: 104;
    width: 15rem;
    border: 1px solid #d2d2d2;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
  }
  .message-header {
    border-radius: 1px;
    padding: 0.5em;
    border-bottom: 1px solid #e2e2e2;
    vertical-align: middle;
    text-align: center;
    word-break: break-all;
  }
  .message-body {
    padding: 0.25em;
  }
  .selected {
    background-color: #009688 !important;
    color: white;
  }
  .buttons {
    margin-bottom: 0rem;
  }
  .columns .column {
    margin-bottom: 0;
  }
  .columns .column .box {
    cursor: pointer;
    margin-bottom: 0rem;
    padding: 0rem;
    border-radius: 0px;
    height: 30px;
    text-align: center;
  }
  .columns .column .box:hover {
    background-color: #eaeaea;
  }
</style>

{#if show}
  <article class="message" style="height:{height}">
    <div
      class="message-header has-background-white"
      style="color:black;display: block;">
      <p>请选择时间</p>
    </div>
    <div class="message-body">
      <div class="columns is-gapless">
        <div
          class="column"
          bind:this={hourDom}
          style="height:210px;overflow-y:scroll">
          {#each hourArray as h, hIndex}
            <div
              class="box"
              on:click={() => {
                date.setHours(h)
                date = date
              }}
              class:selected={t.pad(date.getHours()) === h}>
              {h}
            </div>
          {/each}
        </div>
        <div
          class="column"
          bind:this={minuteDom}
          style="height:210px;overflow-y:scroll">
          {#each minuteArray as m, mIndex}
            <div
              class="box"
              on:click={() => {
                date.setMinutes(m)
                date = date
              }}
              class:selected={t.pad(date.getMinutes()) === m}>
              {m}
            </div>
          {/each}
        </div>
        <div
          class="column"
          bind:this={secondDom}
          style="height:210px;overflow-y:scroll">
          {#each secondArray as s, sIndex}
            <div
              class="box"
              on:click={() => {
                date.setSeconds(s)
                date = date
              }}
              class:selected={t.pad(date.getSeconds()) === s}>
              {s}
            </div>
          {/each}
        </div>
      </div>
    </div>
    <div class="message-header has-background-white">
      <span class="buttons is-centered" style="color:black">
        {`${t.pad(date.getHours())}:${t.pad(date.getMinutes())}:${t.pad(date.getSeconds())}`}
      </span>
      <div class="buttons has-addons is-right are-small">
        <button class="button">清空</button>
        <button class="button">现在</button>
        <button class="button" on:click={() => (show = false)}>确定</button>
      </div>
    </div>
  </article>
{/if}
