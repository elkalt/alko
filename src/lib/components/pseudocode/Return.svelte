<script lang='ts'>
  import Line from './Line.svelte';

  export let breakCount: number = 0;
  export let spotlight: boolean = false;
</script>

<Line breakCount={breakCount} spotlight={spotlight}>
  <div>
    <b>return </b>
    <slot />
  </div>
</Line>
