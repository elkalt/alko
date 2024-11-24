<script lang="ts">
  import { fade } from "svelte/transition";
  import Fraction from "fraction.js";
  import { k } from "$lib/scripts/katex";

  export let values: Fraction[][];
  export let fillColors: string[][] = values.map((row) =>
    Array(row.length).fill("transparent"),
  );
  export let textColors: string[][] = values.map((row) =>
    Array(row.length).fill("var(--text-primary)"),
  );
  export let subtitle: string = "";
  export let editable: boolean = false;

  let dispValues: Fraction[][];
  $: dispValues = values.map((row) => row.slice());

  const regex = /^[0-9]*((\/|.|\,)[0-9]*)?$/;
  let focusedi: number = -1;
  let focusedj: number = -1;
  let newValue: string = "";
  let offsetWidth: number;

  function inputMounter(node: HTMLElement, { i, j }: { i: number; j: number }) {
    node.focus();
    (node as HTMLInputElement).select();
    newValue = values[i][j].toFraction();

    return {
      destroy() {
        if (!regex.test(newValue)) {
          values[i][j] = new Fraction(0);
        } else {
          values[i][j] = new Fraction(newValue);
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

  function handleKeyup(e: KeyboardEvent, i: number, j: number) {
    if (e.key === "Enter" || e.key === " ") {
      let n = values[0].length;
      if (focusedj === n - 1 && focusedi === n - 1) {
        focusedi = -1;
        focusedj = -1;
        (document.activeElement as HTMLElement).blur();
      } else if (focusedj < n - 1) {
        focusedj++;
      } else {
        focusedj = 0;
        focusedi++;
      }
      (
        document.querySelectorAll(".cell")[i * n + j + 1] as HTMLElement
      ).focus();
    }
  }

  function tababble(i: number, j: number) {
    return editable && i !== focusedi && j !== focusedj;
  }
</script>

<div class="container">
  <div class="array">
    {#if dispValues}
      {#each dispValues as row, i}
        <div class="row">
          {#each row as value, j}
            <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
            <div
              class="cell"
              style:background-color={fillColors[i][j]}
              style:color={textColors[i][j]}
              role={tababble(i, j) ? "button" : ""}
              tabindex={tababble(i, j) ? 0 : -1}
              on:focus={() => {
                if (tababble(i, j)) {
                  focusedi = i;
                  focusedj = j;
                }
              }}
              transition:fade={{ duration: 300 }}
            >
              <div
                class="text"
                style:width="min-content"
                style:border-bottom={editable
                  ? "1px dotted var(--text-primary)"
                  : "none"}
              >
                {#if i === focusedi && j === focusedj}
                  <span class="hidden" bind:offsetWidth>{newValue}</span>
                  <input
                    class="input"
                    type="text"
                    style:width={offsetWidth + "px"}
                    value={value.toFraction()}
                    on:input={(e) => handleInput(e)}
                    on:keyup={(e) => handleKeyup(e, i, j)}
                    on:focusout={() => {
                      focusedi = -1;
                      focusedj = -1;
                    }}
                    use:inputMounter={{ i, j }}
                  />
                {:else}
                  {@html k(value.toLatex())}
                {/if}
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
          transition:
            background-color 0.3s,
            color 0.3s;

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

      .row + .row {
        border-top: 2px solid var(--primary);
      }
    }
  }
</style>
