<script lang='ts'>
  import { fade } from "svelte/transition";
  
  export let values: number[];
  export let fillColors: string[] = Array(values.length).fill('transparent');
  export let textColors: string[] = Array(values.length).fill('var(--text-primary)');
  export let subtitle: string = '';
  export let editable: boolean = false;

  let dispValues: number[];
  $: dispValues = values.slice();

  function handleInput(e: Event, editedIndex: number) {
    console.log(e)
    let target = (e.target as HTMLElement).firstChild as HTMLElement;
    let newValue = target.innerText;
    if (isNaN(Number(newValue))) {
      target.innerText = dispValues[editedIndex].toString();
      target.style.borderBottom = '1px dotted var(--text-primary)';
    } else {
      values[editedIndex] = Number(newValue);
    }
  }

  function handleUnfocus(e: Event, editedIndex: number) {
    let newValue = (e.target as HTMLElement)!.innerText;
    if (newValue === '') {
      (e.target as HTMLElement)!.innerText = values[editedIndex].toString();
    }
  }
</script>

<div class='container'>
  <div class='array'>
    {#if dispValues}
      {#each dispValues as value, i}
        <div
          class='cell'
          style:background-color={fillColors[i]}
          style:color={textColors[i]}
          contenteditable={editable}
          on:input={e => handleInput(e, i)}
          on:focusout={e => handleUnfocus(e, i)}
          transition:fade={{duration: 300}}>
          <div
            class='text'
            style:width='min-content'
            style:border-bottom={editable ? '1px dotted var(--text-primary)' : 'none'}>
            {value}
          </div>
        </div>
      {/each}
    {/if}
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

      .cell + .cell {
        border-left: 2px solid var(--primary);
      }
    }
  }
</style>