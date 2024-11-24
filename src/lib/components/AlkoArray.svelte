<script lang="ts">
  import AlkoMatrix from "./AlkoMatrix.svelte";
  import Fraction from "fraction.js";

  export let values: Fraction[];
  export let fillColors: string[] = Array(values.length).fill("transparent");
  export let textColors: string[] = Array(values.length).fill("var(--text-primary)");
  export let subtitle: string = "";
  export let editable: boolean = false;
  export let transpose: boolean = false;

  let matrixValues: Fraction[][];
  $: {
    if (transpose) {
      matrixValues = values.map((value, i) => [value]);
    } else {
      matrixValues = [values];
    }
  }

  let matrixFill: string[][];
  $: {
    if (fillColors) {
      if (transpose) {
        matrixFill = fillColors.map((color) => [color]);
      } else {
        matrixFill = [fillColors];
      }
    }
  }

  let matrixText: string[][];
  $: {
    if (transpose) {
      matrixText = textColors.map((color) => [color]);
    } else {
      matrixText = [textColors];
    }
  }
</script>

<AlkoMatrix
  values={matrixValues}
  fillColors={matrixFill}
  textColors={matrixText}
  {subtitle}
  {editable}
/>
