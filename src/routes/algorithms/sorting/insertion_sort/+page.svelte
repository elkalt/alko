<script lang='ts'>
  import AlkoArray from '$lib/components/AlkoArray.svelte';
  import Algorithm from '$lib/components/pseudocode/Algorithm.svelte';
  import Line from '$lib/components/pseudocode/Line.svelte';
  import If from '$lib/components/pseudocode/If.svelte';
  import Procedure from '$lib/components/pseudocode/Procedure.svelte';
  import Return from '$lib/components/pseudocode/Return.svelte';
  import Empty from '$lib/components/pseudocode/Empty.svelte';
  import While from '$lib/components/pseudocode/While.svelte';
  import Else from '$lib/components/pseudocode/Else.svelte';
  import Stepper from '$lib/components/Stepper.svelte';
  import { k } from '$lib/KatexMacro';

  let arrayLength = 5;

  let array: number[] = [9, 5, 7, 10, 2, 4, 3, 1, 8, 6];
  let slicedArray: number[];
  $: slicedArray = array.slice(0, arrayLength);

  let sortedArray: number[];
  $: if (slicedArray) insertionSortInit();

  let endStep = 0;
  let curStep = 0;
  let maxStep = 0;
  $: {
    if (slicedArray) {
      endStep = 60;
      insertionSortInit();
      maxStep = curStep;
      endStep = 0;
    }
  }
  $: if (endStep != curStep) insertionSortInit();

  let fillColors: string[];
  let textColors: string[];
  let breakpoint: number = -1;
  let sortedBound: number = -1;
  let currentInsert: number = -1;
  $: {
    fillColors = slicedArray.map((_, i) => {
      if (i > sortedBound) return 'var(--background-tertiary)';
      if (i == currentInsert) return 'var(--tertiary)';
      return 'transparent';
    });
  }

  function insertionSortInit() {
    curStep = 0;
    sortedArray = slicedArray.slice();
    breakpoint = -1;
    sortedBound = 10;
    currentInsert = -1;
    insertionSort();
  }

  function insertionSort() {
    if (curStep >= endStep) return;
    for (sortedBound = 0; sortedBound < sortedArray.length; sortedBound++) {
      currentInsert = sortedBound;
      if (++curStep >= endStep) {
        breakpoint = 0;
        return;
      };
      while (currentInsert >= 0 && sortedArray[currentInsert - 1] > sortedArray[currentInsert]) {
        let temp = sortedArray[currentInsert];
        sortedArray[currentInsert] = sortedArray[currentInsert - 1];
        sortedArray[currentInsert - 1] = temp;
        currentInsert--;
        if (++curStep >= endStep) {
          breakpoint = 1;
          return;
        };
      }
    }
    return;
  }
</script>

<svelte:head>
  <title>Insertion Sort</title>
  <meta name='description' content='Insertion sort algorithm visualization and explanation' />
</svelte:head>

<h1 id='insertion_sort'>Insertion sort</h1>
<h2 id='overview'>Overview</h2>
Insertion sort is a simple sorting algorithm that iterates over all items in the list, moving it such that it is in the correct position relative to the items before it.
<h2 id='visualization'>Visualization</h2>
<div>
  <div class='center'>
    <AlkoArray
      bind:values={slicedArray}
      editable={true}
      subtitle='Input'/>
  </div>
</div>

<div class='input-size'>
  Input size {@html k('n=' + arrayLength)}:
  <input type='range' min='1' max='10' step='1' bind:value={arrayLength} />
</div>

<div class='center'>
  <AlkoArray
    values={sortedArray}
    fillColors={fillColors}
    textColors={textColors}
    subtitle={k('A')}
  />
</div>

<Stepper endStep={endStep} maxStep={maxStep} on:step={e => endStep = e.detail} />

<h2 id='pseudocode'>Pseudocode</h2>
<Algorithm name='Insertion Sort'>
  <Procedure args={['A']}>InsertionSort</Procedure>
    <Line>{@html k('i \\gets 0')}</Line>
    <While>{@html k('i \\lt |A|')}</While>
      <Line spotlight={breakpoint == 0}>{@html k('j \\gets i')}</Line>
      <While>{@html k('j \\ge 0')} <b>and</b> {@html k('A[j-1] \\ge A[j]')}</While>
        <Line spotlight={breakpoint == 1}><span class='call'>Swap</span>{@html k('(A[j-1], A[j])')}</Line>
      <Line breakCount={1}>{@html k('i \\gets i + 1')}</Line>
</Algorithm>

<h2 id='complexity'>Time Complexity</h2>
<p>
  The worst case for insertion sort is an array that is sorted in reverse order (ie. {@html k('[3, 2, 1]')}).
  In this case, the algorithm will have to make {@html k('1 + 2 + \\ldots + n-1 = \\frac{n(n-1)}{2} = O(n^2)')} comparisons and swaps.
</p>