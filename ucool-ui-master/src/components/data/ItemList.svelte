<script>
export let listClass
export let title
export let titleIcon
export let titleIconClass
export let titleIconSize
export let dict= [{icon:"",name:"",href:""}]


</script>


<article class="panel {listClass}">
  <p class="panel-heading">
    {#if titleIcon && titleIcon.length>0}
    <span class="icon {titleIconSize} {titleIconClass}">
      <i class={titleIcon} />
    </span>
    {/if}
    {#if title && title.length>0}
    {title}
    {/if}
    <slot name="panel-title" />
  </p> 
    <slot name="panel-block-head" />
   <slot name="panel-tabs" />
  {#each dict as item,index}
  <a class="panel-block "
    href={item.href}  
  >
  {#if item.icon && item.icon.length>0}
    <span class="panel-icon">
      <i class={item.icon} aria-hidden="true"></i>
    </span>
    {item.name}
    {/if}
  </a>
  {/each}


  
    <slot name="panel-block-font" />
  
</article>

