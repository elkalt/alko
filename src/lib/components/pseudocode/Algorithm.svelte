<script lang='ts'>
  import { setContext } from 'svelte';
  import { writable } from 'svelte/store';

  export let name: string;
  export let number: string | undefined = undefined;

  setContext('lineCount', writable(0));
  setContext('level', writable(0));
</script>

<div class='algorithm'>
  <header>
    <b>Algorithm{number ? ' ' + number : ''}</b> {name}
  </header>
  <div class='full-content'>
    <slot />
  </div>
</div>

<style lang='scss'>
  .algorithm {
    display: flex;
    flex-direction: column;
    width: 100%;

    header {
      border-bottom: 2px solid var(--primary);
    }
  }

  .full-content {
    display: grid;
    grid-template-columns: min-content 1fr;
  }
</style>