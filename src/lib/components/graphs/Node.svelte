<script lang="ts" context='module'>
  export type TreeNode = {
    value: number;
    height: number;
    left: TreeNode | null;
    right: TreeNode | null;
  }
</script>

<script lang="ts">
  export let root: TreeNode;
  
  let children: number;
  $: children = (root.left ? 1 : 0) + (root.right ? 1 : 0);

  let rootElement: HTMLElement;
  let leftElement: HTMLElement;
  let rightElement: HTMLElement;
  let leftEdgeStart: { x: number, y: number };
  let rightEdgeStart: { x: number, y: number };
  let leftEdgeAngle: number;
  let rightEdgeAngle: number;
  let leftEdgeLength: number;
  let rightEdgeLength: number;

  $: {
    if (rootElement) {
      let rect = rootElement.getBoundingClientRect();
      leftEdgeStart = { x: rect.left + rect.width / 2, y: rect.bottom };
      rightEdgeStart = { x: rect.left + rect.width / 2, y: rect.bottom };
    }
    if (leftElement) {
      let rect = leftElement.getBoundingClientRect();
      leftEdgeAngle = Math.atan2(rect.top - leftEdgeStart.y, rect.left - leftEdgeStart.x) * (180 / Math.PI);
      leftEdgeLength = Math.sqrt((rect.top - leftEdgeStart.y) ** 2 + (rect.left - leftEdgeStart.x) ** 2);
    }
    if (rightElement) {
      let rect = rightElement.getBoundingClientRect();
      rightEdgeAngle = Math.atan2(rect.top - rightEdgeStart.y, rect.right - rightEdgeStart.x);
    }
  }
</script>

<div class='subtree' style:grid-template-rows={`auto ${root.height}fr`}>
  <div class='node root'>
    <div class='circle' bind:this={rootElement}>
      {root.value}
    </div>
  </div>
  {#if children > 0}
    {#if root.left}
      <div class='line'
        style:transform={`rotate(${leftEdgeAngle}rad)`}
        style:height={leftEdgeLength}
      />
      <div bind:this={leftElement}><svelte:self root={root.left}/></div>
    {:else}
      <div class='node'></div>
    {/if}
    {#if root.right}
      <!-- <div class='line' style:transform={`rotate(${rightEdgeAngle}deg)`}></div> -->
      <div bind:this={rightElement}><svelte:self root={root.right}/></div>
    {:else}
      <div class='node'></div>
    {/if}
  {/if}
</div>

<style lang='scss'>
  .subtree {
    display: grid;
    grid-template-columns: 1fr 1fr;
    position: relative;

    .node {
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid black;

      .circle {
        display: flex;
        width: 3rem;
        height: 3rem;
        border-radius: 50%;
        background-color: var(--primary);
        justify-content: center;
        align-items: center;
      }
    }

    .line {
      position: absolute;
      width: 2px;
      background-color: white;
      top: 3rem;
      // height: calc(50% - 3rem);

      // height: 3rem;
    }

    .root {
      grid-area: 1 / 1 / 2 / 3;
    }
  }
</style>