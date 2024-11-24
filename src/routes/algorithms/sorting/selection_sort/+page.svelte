<script lang='ts'>
  import Fraction from 'fraction.js';
  import AlkoArray from '$lib/components/AlkoArray.svelte';
  import Algorithm from '$lib/components/pseudocode/Algorithm.svelte';
  import Line from '$lib/components/pseudocode/Line.svelte';
  import Procedure from '$lib/components/pseudocode/Procedure.svelte';
  import While from '$lib/components/pseudocode/While.svelte';
  import Stepper from '$lib/components/Stepper.svelte';
  import If from '$lib/components/pseudocode/If.svelte';
  import Else from '$lib/components/pseudocode/Else.svelte';
  import Call from '$lib/components/pseudocode/Call.svelte';
  import { k } from '$lib/scripts/katex';

  let arrayLength = 5;

  let array: Fraction[] = [9, 5, 7, 10, 2, 4, 3, 1, 8, 6].map(value => new Fraction(value));
  let slicedArray: Fraction[];
  $: slicedArray = array.slice(0, arrayLength);

  let sortedArray: Fraction[];
  $: if (slicedArray) selectionSortInit();

  let endStep = 0;
  let curStep = 0;
  let maxStep = 0;
  $: {
    if (slicedArray) {
      endStep = 100;
      selectionSortInit();
      maxStep = curStep;
      endStep = 0;
    }
  }
  $: if (endStep != curStep) selectionSortInit();

  let fillColors: string[];
  let textColors: string[];
  let breakpoint: number = -1;
  let sortedBound: number = -1;
  let smallest: number = -1;
  let check: number = -1;
  $: {
    fillColors = slicedArray.map((_, i) => {
      if (i < sortedBound) return 'var(--background-tertiary)';
      if (i == smallest) return 'var(--tertiary)';
      if (i == check) return 'var(--quaternary)';
      return 'transparent';
    });
  }

  function selectionSortInit() {
    curStep = 0;
    sortedArray = slicedArray.slice();
    breakpoint = -1;
    sortedBound = -1;
    smallest = -1;
    check = -1;
    selectionSort();
  }

  function selectionSort() {
    if (curStep >= endStep) return;
    for (sortedBound = 0; sortedBound < sortedArray.length;) {
      smallest = sortedBound;
      if (++curStep >= endStep) {
        breakpoint = 0;
        return;
      };
      for (check = sortedBound + 1; check < sortedArray.length; check++) {
        if (++curStep >= endStep) {
          breakpoint = 1;
          return;
        };
        if (sortedArray[check] < sortedArray[smallest]) {
          smallest = check;
          if (++curStep >= endStep) {
            breakpoint = 2;
            return;
          };
        }
      }
      let temp = sortedArray[smallest];
      sortedArray[smallest] = sortedArray[sortedBound];
      sortedArray[sortedBound] = temp;
      smallest = -1;
      check = -1
      sortedBound++;
      if (++curStep >= endStep) {
        breakpoint = 3;
        return;
      };
    }
    sortedBound = -1;
    smallest = -1;
    check = -1;
    curStep++;
    return;
  }
</script>

<svelte:head>
  <title>Selection Sort</title>
  <meta name='description' content='Selection sort algorithm visualization and explanation' />
</svelte:head>

<h1 id='selection_sort'>Selection sort</h1>
<h2 id='overview'>Overview</h2>
Selection sort is a simple sorting algorithm that finds the smallest element in the unsorted part of the list and swaps it with the first unsorted element.
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
<Algorithm name='Selection Sort'>
  <Procedure args={['A']}>SelectionSort</Procedure>
    <Line>{@html k('i \\gets 0')}</Line>
    <While>{@html k('i \\lt |A|')}</While>
      <Line spotlight={breakpoint == 0}>{@html k('j, k \\gets i')}</Line>
      <While>{@html k('j \\lt |A|')}</While>
        <If>{@html k('A[j] > A[k]')}</If>
          <Line spotlight={breakpoint == 1}>{@html k('j \\gets j + 1')}</Line>
        <Else></Else>
          <Line spotlight={breakpoint == 2}>{@html k('k \\gets j')}</Line>
      <Line breakCount={2} spotlight={breakpoint == 3}><Call>Swap</Call>{@html k('(A[i], A[k])')}</Line>
</Algorithm>

<h2 id='complexity'>Time Complexity</h2>
<p>
  Selection sort has the same time complexity regardless of the input.
  It takes {@html k('(n-1) + (n-2) + \\ldots + 1 = \\frac{(n-1) + 1}{2}')} comparisons to find the smallest element and {@html k('n - 1')} swaps,
  resulting in a time complexity of {@html k('\\frac{(n-1) + 1}{2}(n-1) = O(n^2)')}.
</p>