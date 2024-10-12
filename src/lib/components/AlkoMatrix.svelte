<script lang="ts">
  import { fade } from "svelte/transition";

  export let values: number[][];
  export let fillColors: string[][] = values.map(row => Array(row.length).fill('transparent'));
  export let textColors: string[][] = values.map(row => Array(row.length).fill('var(--text-primary)'));
  export let subtitle: string = '';
  export let editable: boolean = false;

  let dispValues: number[][];
  $: dispValues = values.map(row => row.slice());

  function handleInput(e: Event, i: number, j: number) {
    console.log(e)
    let target = (e.target as HTMLElement).firstChild as HTMLElement;
    let newValue = target.innerText;
    if (isNaN(Number(newValue))) {
      target.innerText = dispValues[i][j].toString();
      target.style.borderBottom = '1px dotted var(--text-primary)';
    } else {
      values[i][j] = Number(newValue);
    }
  }

  function handleUnfocus(e: Event, i: number, j: number) {
    let newValue = (e.target as HTMLElement)!.innerText;
    if (newValue === '') {
      (e.target as HTMLElement)!.innerText = values[i][j].toString();
    }
  }
</script>

<div class='container'>
  <div class='array'>
    {#if dispValues}
      {#each dispValues as row, i}
        <div class='row'>
          {#each row as value, j}
            <div
              class='cell'
              style:background-color={fillColors[i][j]}
              style:color={textColors[i][j]}
              contenteditable={editable}
              on:input={e => handleInput(e, i, j)}
              on:focusout={e => handleUnfocus(e, i, j)}
              transition:fade={{duration: 300}}>
              <div
                class='text'
                style:width='min-content'
                style:border-bottom={editable ? '1px dotted var(--text-primary)' : 'none'}>
                {value}
              </div>
            </div>
          {/each}
        </div>
      {/each}
    {/if}
  </div>
  {#if subtitle}
    {@html subtitle}
  {/if}
</div>

<style lang="scss">
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;
    width: min-content;

    .array {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin: 0 auto;
      border-radius: 0.25rem;
      border: 3px solid var(--primary);

      .row {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 auto;
        flex-direction: row;

        .cell {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 3.5rem;
          aspect-ratio: 1;
          transition: background-color 0.3s, color 0.3s;
        }
  
        .cell + .cell {
          border-left: 2px solid var(--primary);
        }
      }

      .row + .row {
        border-top: 2px solid var(--primary);
      }
    }
  }
</style>