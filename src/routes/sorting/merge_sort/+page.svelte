<script lang='ts'>
  import AlkoArray from '$lib/components/AlkoArray.svelte';
  import Algorithm from '$lib/components/pseudocode/Algorithm.svelte';
  import Line from '$lib/components/pseudocode/Line.svelte';
  import If from '$lib/components/pseudocode/If.svelte';
  import Procedure from '$lib/components/pseudocode/Procedure.svelte';
  import Return from '$lib/components/pseudocode/Return.svelte';
  import Empty from '$lib/components/pseudocode/Empty.svelte';
  import While from '$lib/components/pseudocode/While.svelte';
  import ElseIf from '$lib/components/pseudocode/ElseIf.svelte';

  let arrayLength = 5;

  let array: number[] = [3, 1, 7, 2, 6, 1, 5, 8, 3, 8];
  let slicedArray: number[];
  $: slicedArray = array.slice(0, arrayLength);

  let sortedArray: number[];
  $: if (slicedArray) mergeSortInit();

  let endStep = 0;
  let curStep = 0;
  $: if (endStep != curStep) mergeSortInit();

  let currentArrayLeftIndex: number = 0;
  let currentArrayRightIndex: number = arrayLength - 1;
  let finalFillColors: string[];
  let finalTextColors: string[];
  let merging: boolean = false;
  let leftMergeArray: number[];
  let rightMergeArray: number[];
  let leftMergeIndex: number = 0;
  let rightMergeIndex: number = 0;
  let insertIndex: number = 0;
  let leftFillColors: string[];
  let rightFillColors: string[];
  let breakpoint: number = -1;
  $: {
    finalFillColors = slicedArray.map((_, i) => {
      if (i < currentArrayLeftIndex || i > currentArrayRightIndex) return 'var(--background-secondary)';
      return 'transparent';
    });

    if (merging) {
      if (insertIndex <= currentArrayRightIndex) {
        finalFillColors[insertIndex] = 'var(--tertiary)';
      }
      finalTextColors = sortedArray.map((_, i) => {
        if (currentArrayRightIndex < i || i < insertIndex) return 'var(--text-primary)';
        return 'transparent';
      });

      leftFillColors = leftMergeArray.map((_, i) => {
        if (i == leftMergeIndex) return 'var(--tertiary)';
        return 'transparent';
      });

      rightFillColors = rightMergeArray.map((_, i) => {
        if (i == rightMergeIndex) return 'var(--tertiary)';
        return 'transparent';
      });
    } else {
      finalTextColors = Array(arrayLength).fill('var(--text-primary)');
      leftMergeArray = [];
      rightMergeArray = [];
    }
  }

  function mergeSortInit() {
    curStep = 0;
    currentArrayLeftIndex = 0;
    currentArrayRightIndex = arrayLength - 1;
    merging = false;
    sortedArray = slicedArray.slice();
    breakpoint = -1;
    mergeSort();
  }

  function mergeSort() {
    if (currentArrayLeftIndex >= currentArrayRightIndex) return;
    if (curStep >= endStep) return;
  
    let middle = currentArrayLeftIndex + Math.floor((currentArrayRightIndex - currentArrayLeftIndex) / 2);
    let oldLeft = currentArrayLeftIndex;
    let oldRight = currentArrayRightIndex;

    currentArrayRightIndex = middle;
    if (++curStep >= endStep) {
      if (currentArrayRightIndex == currentArrayLeftIndex) breakpoint = 1;
      else breakpoint = 2;
      return
    };
    mergeSort();
    if (curStep >= endStep) return;

    currentArrayLeftIndex = middle + 1;
    currentArrayRightIndex = oldRight;
    if (++curStep >= endStep) {
      if (currentArrayRightIndex == currentArrayLeftIndex) breakpoint = 1;
      else breakpoint = 3;
      return
    };
    mergeSort();
    if (curStep >= endStep) return;

    currentArrayLeftIndex = oldLeft;
    // For rendering
    merging = true;
    insertIndex = arrayLength;
    leftMergeArray = sortedArray.slice(currentArrayLeftIndex, middle + 1);
    rightMergeArray = sortedArray.slice(middle + 1, currentArrayRightIndex + 1);
    leftMergeIndex = -1;
    rightMergeIndex = -1;
    if (++curStep >= endStep) {
      breakpoint = 4;
      return
    };
    merge();
    if (curStep >= endStep) return;
  }

  function merge() {
    leftMergeIndex = 0;
    rightMergeIndex = 0;
    insertIndex = currentArrayLeftIndex;

    finalTextColors = sortedArray.map((_, i) => {
      if (i < currentArrayLeftIndex || i > currentArrayRightIndex) return 'var(--text-primary)';
      return 'transparent';
    });

    while (leftMergeIndex < leftMergeArray.length && rightMergeIndex < rightMergeArray.length) {
      if (++curStep >= endStep) {
        if (leftMergeArray[leftMergeIndex] < rightMergeArray[rightMergeIndex]) breakpoint = 5;
        else breakpoint = 6;
        return
      };
      if (leftMergeArray[leftMergeIndex] < rightMergeArray[rightMergeIndex]) {
        sortedArray[insertIndex] = leftMergeArray[leftMergeIndex];
        leftMergeIndex++;
      } else {
        sortedArray[insertIndex] = rightMergeArray[rightMergeIndex];
        rightMergeIndex++;
      }

      insertIndex++;
    }

    while (leftMergeIndex < leftMergeArray.length) {
      if (++curStep >= endStep) {
        breakpoint = 7;
        return
      };
      sortedArray[insertIndex] = leftMergeArray[leftMergeIndex];
      insertIndex++;
      leftMergeIndex++;
    }

    while (rightMergeIndex < rightMergeArray.length) {
      if (++curStep >= endStep) {
        breakpoint = 8;
        return
      };
      sortedArray[insertIndex] = rightMergeArray[rightMergeIndex];
      insertIndex++;
      rightMergeIndex++;
    }

    merging = false;
    curStep++;
    breakpoint = 9;
    return;
  }
</script>

<div class='content-container'>
  <h1>Mergesort</h1>
  <p>
    Mergesort is a recursive algorithm that sorts an array by splitting its input into two smaller arrays and sorting those.
    The sorted arrays are then merged back together. The base case is an array of size 1, which is already sorted.
  </p>

  <div>
    Array length:
    <input type='number' min='1' max='10' step='1' bind:value={arrayLength} />
    <input type='range' min='1' max='10' step='1' bind:value={arrayLength} />
  </div>

  <div>
    Array values:
    {#each {length: arrayLength} as _, i}
      <input type='number' min='0' max='100' step='1' bind:value={slicedArray[i]} />
    {/each}
  </div>

  <div>
    Current step: {endStep}
    <button type='button' on:click={() => endStep = Math.min(endStep + 1, arrayLength * 10)}>Step</button>
    <button type='button' on:click={() => endStep = 0}>Reset</button>
  </div>

  <AlkoArray
    values={sortedArray}
    fillColors={finalFillColors}
    textColors={finalTextColors}
  />

  {#if merging}
    <p>Merging:</p>
    <AlkoArray
      values={leftMergeArray}
      fillColors={leftFillColors}
    />
    <AlkoArray
      values={rightMergeArray}
      fillColors={rightFillColors}
    />
  {/if}

  <Algorithm name='Merge Sort'>
    <Procedure args={['A']}>MergeSort</Procedure>
      <If>\(|A| = 1\)</If>
        <Return spotlight={breakpoint == 1}>\(A\)</Return>
      <Line breakCount={1}>\(m \gets \left\lfloor\frac{'{'}|A|{'}'}{2}\right\rfloor\)</Line>
      <Line spotlight={breakpoint == 2}>\(L \gets\) <span class='call'>MergeSort</span>\((A[...m])\)</Line>
      <Line spotlight={breakpoint == 3}>\(R \gets\) <span class='call'>MergeSort</span>\((A[m+1...])\)</Line>
      <Return><span class='call'>Merge</span>\((L, R)\)</Return>
    <Empty />
    <Procedure breakCount={1} spotlight={breakpoint == 4} args={['L', 'R']}>Merge</Procedure>
      <Line>\(i \gets 0\)</Line>
      <Line>\(j \gets 0\)</Line>
      <Line>\(k \gets 0\)</Line>
      <While>\(i {'<'} |L|\) <b>and</b> \(j {'<'} |R|\)</While>
        <If spotlight={breakpoint == 5}>\(l[i] {'<'} r[j]\)</If>
          <Line>\(M[k] \gets L[i]\)</Line>
          <Line>\(i \gets i + 1\)</Line>
        <ElseIf spotlight={breakpoint == 6}>\(l[i] {'>'} r[j]\)</ElseIf>
          <Line>\(M[k] \gets R[j]\)</Line>
          <Line>\(j \gets j + 1\)</Line>
        <Line breakCount={1}>\(k \gets k + 1\)</Line>
      <While breakCount={1} spotlight={breakpoint == 7}>\(i {'<'} |L|\)</While>
        <Line>\(M[k] \gets L[i]\)</Line>
        <Line>\(i \gets i + 1\)</Line>
        <Line>\(k \gets k + 1\)</Line>
      <While breakCount={1} spotlight={breakpoint == 8}>\(j {'<'} |R|\)</While>
        <Line>\(M[k] \gets R[j]\)</Line>
        <Line>\(j \gets j + 1\)</Line>
        <Line>\(k \gets k + 1\)</Line>
      <Return breakCount={1} spotlight={breakpoint == 9}>\(M\)</Return>
  </Algorithm>
</div>