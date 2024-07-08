<script lang='ts'>
  import Line from './Line.svelte';

  export let breakCount: number = 0;
  export let spotlight: boolean = false;
</script>

<Line breakCount={breakCount} nester={true} spotlight={spotlight}>
  <div>
    <b>if</b>
    <slot />
    <b> then</b>
  </div>
</Line>
