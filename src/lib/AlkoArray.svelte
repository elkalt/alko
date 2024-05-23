<script lang="ts">
  export let values: number[];
  export let fillColors: string[];
  export let textColors: string[];
</script>

<div class="array">
  {#each values as value, i}
    <div class="cell" style="background-color: {fillColors[i]}; color: {textColors[i]}">
      {value}
    </div>
  {/each}
</div>

<style>
  .array {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    padding: 0;
  }

  .cell {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    border: 1px solid black;
  }
</style>