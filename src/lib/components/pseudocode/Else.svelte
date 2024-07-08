<script lang='ts'>
  import Line from './Line.svelte';

  export let breakCount: number = 0;
  export let spotlight: boolean = false;
</script>

<Line breakCount={breakCount + 1} nester={true} spotlight={spotlight}>
  <div>
    <b>else</b>
  </div>
</Line>
