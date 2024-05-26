<script lang='ts'>
  import { k } from '$lib/KatexMacro';
  import Call from './Call.svelte';
  import Line from './Line.svelte';

  export let args: string[] = [];
  export let breakCount: number = 0;
  export let spotlight: boolean = false;
</script>

<Line breakCount={breakCount} nester={true} spotlight={spotlight}>
  <div>
    <b>procedure </b>
    <Call><slot /></Call>{@html k('(' + args.join(', ') + ')' )}
  </div>
</Line>