<script lang='ts'>
  import { fade } from "svelte/transition";
  
  export let values: number[];
  export let fillColors: string[] = Array(values.length).fill('transparent');
  export let textColors: string[] = Array(values.length).fill('var(--text-primary)');
  export let subtitle: string = '';
  export let editable: boolean = false;

  function handleInput(e: Event, editedIndex: number) {
    let newValue = (e.target as HTMLElement)!.textContent ? parseFloat((e.target as HTMLElement).textContent!) : undefined;
    if (!newValue || typeof newValue !== 'number' || isNaN(newValue)) return;
    values[editedIndex] = newValue;
  }
</script>

<div class='container'>
  <div class='array'>
    {#each values as value, i}
      <div
        class='cell'
        style:background-color={fillColors[i]}
        style:color={textColors[i]}
        style:border-left={i == 0 ? 'none' : '2px solid var(--primary)'}
        contenteditable={editable}
        on:input={e => handleInput(e, i)}
        transition:fade={{duration: 300}}>
        <div
          style:width='min-content'
          style:border-bottom={editable ? '1px dotted var(--text-primary)' : 'none'}>
          {value}
        </div>
      </div>
    {/each}
  </div>
  {#if subtitle}
    {@html subtitle}
  {/if}
</div>

<style lang='scss'>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;
    width: min-content;

    .array {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0 auto;
      border-radius: 0.25rem;
      border: 3px solid var(--primary);

      .cell {
        display: flex;
        justify-content: center;
        padding: 1rem 0;
        width: 3rem;
        border: 0;
        border-radius: 0;
        transition: background-color 0.3s, color 0.3s;
      }
    }
  }


</style>