<script lang="ts">
  import Line from "./Line.svelte";

  export let breakCount: number = 0;
  export let spotlight: boolean = false;
</script>

<Line breakCount={breakCount} nester={true} spotlight={spotlight}>
  <div>
    <b>for </b>
    <slot />
    <b> do</b>
  </div>
</Line>
