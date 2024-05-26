<script lang='ts'>
  import type { Writable } from 'svelte/store';
  import { getContext } from 'svelte';

  export let breakCount: number = 0;
  export let nester: boolean = false;
  export let spotlight: boolean = false;

  let lineNumber: number;
  getContext<Writable<number>>('lineCount').update(n => {
    lineNumber = n + 1;
    return n + 1;
  });

  let level: number;
  getContext<Writable<number>>('level').update(n => {
    level = n - breakCount;
    return level + (nester ? 1 : 0);
  });
</script>

<div class='line-number' style:background-color={spotlight ? 'var(--quaternary)' : ''}>
  {lineNumber}:
</div>
<div
  class='line'
  style:background-color={spotlight ? 'var(--quaternary)' : ''}
  style:grid-template-columns={'min-content '.repeat(level) + '1fr'}>
  {#each Array.from({ length: level }) as _, i}
    <span class='tab' />
  {/each}
  <span>
    <slot />
  </span>
</div>

<style lang='scss'>
  .line-number {
    display: flex;
    justify-content: flex-end;
    height: 100%;
    align-items: center;
  }

  .line {
    display: grid;
    padding-left: 0.75rem;

    .tab {
      display: inline-block;
      width: 1.3rem;
      border-left: 1px solid var(--background-tertiary);
    }
  }
</style>