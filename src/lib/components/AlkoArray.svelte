<script lang='ts'>
  import { fade } from "svelte/transition";
  
  export let values: number[];
  export let fillColors: string[];
  export let textColors: string[] = Array(values.length).fill('var(--text-primary)');
  export let subtitle: string = '';
</script>

<div class='container'>
  <div class='array'>
    {#each values as value, i}
      <div
        class='cell'
        style:background-color={fillColors[i]}
        style:color={textColors[i]}
        style:border-left={i == 0 ? 'none' : '2px solid var(--primary)'}
        transition:fade={{duration: 300}}>
        {value}
      </div>
    {/each}
  </div>
  {#if subtitle}
    {subtitle}
  {/if}
</div>

<style lang='scss'>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;

    .array {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0 auto 0 auto;
      width: fit-content;
      border-radius: 0.25rem;
      border: 3px solid var(--primary);

      .cell {
        display: flex;
        justify-content: center;
        align-items: center;
        padding-top: 1rem;
        padding-bottom: 1rem;
        width: 3rem;
        transition: background-color 0.3s, color 0.3s;
      }
    }
  }


</style>