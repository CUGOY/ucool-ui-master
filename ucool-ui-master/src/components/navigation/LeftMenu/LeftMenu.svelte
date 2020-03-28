<script>
  import * as t from "../../toolkit/index.js";
  import { onMount, createEventDispatcher, afterUpdate } from "svelte";
  import "./index.css";
  export let data = [];
  const dispatch = createEventDispatcher();
  onMount(() => {
    fitMenuHeight();
  });
  afterUpdate(() => {
    fitMenuHeight();
  });
  let firstLevel, secondLevel;
  let leftMenuBar, leftMenuHeightStr,marginTopStr;
  
  function fitMenuHeight() {
    let leftMenuBarH = t.getStyle(leftMenuBar, "height");
    leftMenuHeightStr = `calc(100vh - ${leftMenuBarH})`;
    marginTopStr=`${leftMenuBarH}`
  }
</script>

<nav
  bind:this={leftMenuBar}
  style="width:calc(15vw);background-color:#20222a;float: left;"
  class="navbar is-info is-fixed-top"
  role="navigation"
  aria-label="main navigation">
  <div class="navbar-brand">
    <slot name="navbar-item"></slot>
  </div>
</nav>
<div
  style="float: left;margin-top:{marginTopStr};width:calc(15vw);height:{leftMenuHeightStr};background-color: #20222a;min-height:calc(100vh - 52px)"
  class="nui-scroll">
  {#each data as item, index}
    <div class="card">
      <header
        class="card-header"
        class:is-active={firstLevel === index}
        on:click|stopPropagation={e => {
          if (item.hasOwnProperty('children')) {
            let iconDom = e.target.nextElementSibling.firstChild.firstChild;
            item.status = t.hasClass(iconDom, 'iconxiangxia1') ? 'close' : 'open';
            t.toggleClass(e.target.parentElement.nextElementSibling, 'is-hidden');
          } else {
            dispatch('message', { parent: null, item: item });
          }
          firstLevel = index;
        }}>
        <!-- t.toggleClass(iconDom, 'iconxiangxia1', 'iconup-fill'); -->
        <span class="card-header-icon" style="padding-right:0rem">
          <i class="iconfont iconshangpinmingcheng" />
        </span>
        <p class="card-header-title">{item.title}</p>
        <a
          href="javascript:void(0);"
          on:click|stopPropagation
          class="card-header-icon"
          aria-label="more options">
          {#if item.hasOwnProperty('children')}
            <span class="icon">
              <i
                class="iconfont"
                class:iconxiangxia1={item.status == 'open'}
                class:iconup-fill={!item.hasOwnProperty('status') || item.status == 'close'}
                aria-hidden="true" />
            </span>
          {/if}
        </a>
      </header>
      {#if item.hasOwnProperty('children')}
        <div
          class="card-content dropdown-content is-hidden"
          style="padding: 0.1rem;">
          {#each item.children as menu, seq}
            <!-- <hr class="dropdown-divider" style="margin: 0rem;color:black" /> -->
            <a
              href="javascript:void(0);"
              class="dropdown-item"
              class:is-active={firstLevel === index && secondLevel === seq}
              on:click|stopPropagation={() => {
                secondLevel = seq;
                dispatch('message', { parent: item, item: menu });
              }}>
              <span class="icon">
                <i class="iconfont iconmenu" />
              </span>
              {menu.title}
            </a>
          {/each}
        </div>
      {/if}
    </div>
  {/each}
</div>
