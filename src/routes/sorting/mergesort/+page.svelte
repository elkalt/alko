<script lang='ts'>
  import AlkoArray from "$lib/AlkoArray.svelte";

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
  let merging: boolean = false;
  let leftMergeArray: number[];
  let rightMergeArray: number[];
  let leftMergeIndex: number = 0;
  let rightMergeIndex: number = 0;
  let insertIndex: number = 0;
  let leftFillColors: string[];
  let rightFillColors: string[];
  $: {
    finalFillColors = slicedArray.map((_, i) => {
      if (i < currentArrayLeftIndex || i > currentArrayRightIndex) return 'gray';
      return 'white';
    });

    if (merging) {
      finalFillColors[insertIndex] = 'red';

      leftFillColors = leftMergeArray.map((_, i) => {
        if (i == leftMergeIndex) return 'red';
        return 'white';
      });

      rightFillColors = rightMergeArray.map((_, i) => {
        if (i == rightMergeIndex) return 'red';
        return 'white';
      });
    } else {
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
    mergeSort();
  }

  function mergeSort() {
    if (currentArrayLeftIndex >= currentArrayRightIndex) return;
    if (curStep >= endStep) return;
  
    let middle = currentArrayLeftIndex + Math.floor((currentArrayRightIndex - currentArrayLeftIndex) / 2);
    let oldLeft = currentArrayLeftIndex;
    let oldRight = currentArrayRightIndex;

    currentArrayRightIndex = middle;
    if (++curStep >= endStep) return;
    mergeSort();
    if (curStep >= endStep) return;

    currentArrayLeftIndex = middle + 1;
    currentArrayRightIndex = oldRight;
    if (++curStep >= endStep) return;
    mergeSort();
    if (curStep >= endStep) return;

    currentArrayLeftIndex = oldLeft;
    if (++curStep >= endStep) return;
    merge();
    if (curStep >= endStep) return;
  }

  function merge() {
    leftMergeIndex = 0;
    rightMergeIndex = 0;
    insertIndex = currentArrayLeftIndex;
    let middle = currentArrayLeftIndex + Math.floor((currentArrayRightIndex - currentArrayLeftIndex) / 2);
    leftMergeArray = sortedArray.slice(currentArrayLeftIndex, middle + 1);
    rightMergeArray = sortedArray.slice(middle + 1, currentArrayRightIndex + 1);

    merging = true;

    if (++curStep >= endStep) {
      return
    };
    while (leftMergeIndex < leftMergeArray.length && rightMergeIndex < rightMergeArray.length) {
      if (leftMergeArray[leftMergeIndex] < rightMergeArray[rightMergeIndex] || rightMergeIndex == rightMergeArray.length) {
        sortedArray[insertIndex] = leftMergeArray[leftMergeIndex];
        leftMergeIndex++;
      } else {
        sortedArray[insertIndex] = rightMergeArray[rightMergeIndex];
        sortedArray[middle + 1 + rightMergeIndex] = leftMergeArray[leftMergeIndex];
        rightMergeIndex++;
      }

      if (++insertIndex >= currentArrayRightIndex) break;

      if (++curStep >= endStep) {
        return
      };
    }
    merging = false;
    if (++curStep >= endStep) {
      return
    };

    return;
  }
</script>

<h1>Mergesort</h1>
<p>Mergesort is a recursive sorting algorithm that bla bla bla</p>

Array length:
<input type='number' min='1' max='10' step='1' bind:value={arrayLength} />
<input type='range' min='1' max='10' step='1' bind:value={arrayLength} />
<br />
Array values:
{#each {length: arrayLength} as _, i}
  <input type='number' min='0' max='100' step='1' bind:value={slicedArray[i]} />
{/each}
<br />
Current step: {endStep}
<button type='button' on:click={() => endStep = Math.min(endStep + 1, arrayLength * 10)}>Step</button>
<button type='button' on:click={() => endStep = 0}>Reset</button>

<AlkoArray
  values={sortedArray}
  fillColors={finalFillColors}
  textColors={[]}
/>
<AlkoArray
  values={leftMergeArray}
  fillColors={leftFillColors}
  textColors={[]}
/>
<AlkoArray
  values={rightMergeArray}
  fillColors={rightFillColors}
  textColors={[]}
/>

<style lang="scss">
  
</style>