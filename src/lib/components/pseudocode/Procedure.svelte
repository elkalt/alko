<script lang='ts'>
  import Line from './Line.svelte';

  export let args: string[] = [];
  export let breakCount: number = 0;
  export let spotlight: boolean = false;
</script>

<Line breakCount={breakCount} nester={true} spotlight={spotlight}>
  <div>
    <b>procedure </b>
    <span class='call'><slot /></span>\(({#each args as arg, i}{arg}{i < args.length - 1 ? ', ' : ''}{/each})\)
  </div>
</Line>