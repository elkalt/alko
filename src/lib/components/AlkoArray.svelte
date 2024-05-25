<script lang='ts'>
  export let values: number[];
  export let fillColors: string[];
  export let textColors: string[] = Array(values.length).fill('var(--text-primary)');
</script>

<div class='array'>
  {#each values as value, i}
    <div class='cell' style:background-color={fillColors[i]} style:color={textColors[i]}>
      {value}
    </div>
  {/each}
</div>

<style lang='scss'>
  .array {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto 0 auto;
    width: fit-content;
    border-radius: 0.25rem;
    border: 1px solid var(--primary);
  }

  .cell {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 1rem;
    padding-bottom: 1rem;
    width: 3rem;
    border: 2px solid var(--primary);
  }
</style>