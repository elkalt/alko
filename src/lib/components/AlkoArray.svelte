<script lang="ts">
  import { fade } from "svelte/transition";
  import Fraction from "fraction.js";
  import { k } from "$lib/scripts/katex";

  export let values: Fraction[];
  export let fillColors: string[] = Array(values.length).fill('transparent');
  export let textColors: string[] = Array(values.length).fill('var(--text-primary)');
  export let subtitle: string = '';
  export let editable: boolean = false;

  let dispValues: Fraction[];
  $: dispValues = values.slice();

  const regex = /^[0-9]*((\/|.|\,)[0-9]*)?$/;
  let newValue: string = "";
  let focusedIndex: number = -1;
  let offsetWidth: number;

  function inputMounter(node: HTMLElement, { i }: { i: number }) {
    node.focus();
    (node as HTMLInputElement).select();
    newValue = values[i].toFraction();

    return {
      destroy() {
        if (!regex.test(newValue)) {
          values[i] = new Fraction(0);
        } else {
          values[i] = new Fraction(newValue);
        }
      },
    };
  }

  function handleInput(e: Event) {
    const target = e.target as HTMLInputElement;
    const invalidChars = target.value.split('').some(char => 
      !'0123456789/,.'.includes(char)
    );
    
    if (invalidChars) {
      target.value = newValue;
      return;
    }

    newValue = target.value;
  }

  function handleKeyup(e: KeyboardEvent, i: number) {
    if (e.key === "Enter" || e.key === " ") {
      if (i === values.length - 1) {
        focusedIndex = -1;
        (document.activeElement as HTMLElement).blur();
      } else {
        focusedIndex++;
        (document.querySelectorAll(".cell")[i + 1] as HTMLElement).focus();
      }
    }
  }

  function tababble(i: number) {
    return editable && i !== focusedIndex;
  }
</script>

<div class='container'>
  <div class='array'>
    {#if dispValues}
      {#each dispValues as value, i}
        <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
        <div
          class='cell'
          style:background-color={fillColors[i]}
          style:color={textColors[i]}
          role={tababble(i) ? "button" : ""}
          tabindex={tababble(i) ? 0 : -1}
          on:focus={() => {
            if (tababble(i)) {
              focusedIndex = i;
            }
          }}
          transition:fade={{duration: 300}}>
          <div
            class='text'
            style:width='min-content'
            style:border-bottom={editable ? '1px dotted var(--text-primary)' : 'none'}>
            {#if i === focusedIndex}
              <span class="hidden" bind:offsetWidth>{newValue}</span>
              <input
                class="input"
                type="text"
                style:width={offsetWidth + "px"}
                value={value.toFraction()}
                on:input={handleInput}
                on:keyup={(e) => handleKeyup(e, i)}
                on:focusout={() => focusedIndex = -1}
                use:inputMounter={{ i }}
              />
            {:else}
              {@html k(value.toLatex())}
            {/if}
          </div>
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
      justify-content: center;
      align-items: center;
      margin: 0 auto;
      border-radius: 0.25rem;
      border: 3px solid var(--primary);

      .cell {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 3.5rem;
        aspect-ratio: 1;
        transition: background-color 0.3s, color 0.3s;

        .input {
          min-width: 10px;
          border: none;
          background-color: transparent;
          color: var(--text-primary);
          font-size: inherit;
          text-align: center;
          caret-color: var(--primary);
          outline: none;
        }

        .hidden {
          position: absolute;
          top: -9999px;
          left: -9999px;
        }
      }

      .cell + .cell {
        border-left: 2px solid var(--primary);
      }
    }
  }
</style>