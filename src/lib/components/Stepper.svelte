<script lang='ts'>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  export let endStep: number;
  export let maxStep: number;

  function setAndDispatch(step: number) {
    endStep = step;
    dispatch('step', step);
  }

  function rangeHandler(e: Event) {
    setAndDispatch((e.target as HTMLInputElement).valueAsNumber);
  }
</script>

<div class='stepper'>
  <div class='buttons'>
    <button
      class='material-symbols-outlined'
      on:click={() => setAndDispatch(0)}>
      first_page
    </button>
    <button
      class='material-symbols-outlined'
      style:border-left='1px solid var(--tertiary)'
      on:click={() => setAndDispatch(Math.max(0, endStep - 1))}>
      chevron_left
    </button>
    <button
      class='material-symbols-outlined'
      style:border-left='1px solid var(--tertiary)'
      on:click={() => setAndDispatch(Math.min(maxStep, endStep + 1))}>
      chevron_right
    </button>
    <button
      class='material-symbols-outlined'
      style:border-left='1px solid var(--tertiary)'
      on:click={() => setAndDispatch(maxStep)}>
      last_page
    </button>
  </div>
  <input type='range' min='0' max={maxStep} value={endStep} on:input={e => rangeHandler(e)} />
  <div class='center'>Step {endStep}/{maxStep}</div>
</div>

<style lang='scss'>
  .stepper {
    display: grid;
    grid-template-rows: repeat(3, 1fr);
    border-top: 1px solid var(--tertiary);
    padding: 1.5rem;

    .buttons {
      display: flex;
      justify-content: center;

      button {
        padding: 0 0.5rem;
        margin: 0;
        border: none;
        background: none;
        color: var(--text-primary);
        cursor: pointer;
      }

      .material-symbols-outlined {
        font-size: 2rem;
      }
    }
    
    input {
      width: 50%;
      margin: 0 auto;
    }
  }
</style>