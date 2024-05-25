<script lang='ts'>
  import katex from 'katex';
  import AlkoArray from '$lib/components/AlkoArray.svelte';
  import Algorithm from '$lib/components/pseudocode/Algorithm.svelte';
  import Line from '$lib/components/pseudocode/Line.svelte';
  import If from '$lib/components/pseudocode/If.svelte';
  import Procedure from '$lib/components/pseudocode/Procedure.svelte';
  import Return from '$lib/components/pseudocode/Return.svelte';
  import Empty from '$lib/components/pseudocode/Empty.svelte';
  import While from '$lib/components/pseudocode/While.svelte';
  import Else from '$lib/components/pseudocode/ElseIf.svelte';
    import Stepper from '$lib/components/Stepper.svelte';

  let arrayLength = 5;

  let array: number[] = [3, 1, 7, 2, 6, 1, 5, 8, 3, 8];
  let slicedArray: number[];
  $: slicedArray = array.slice(0, arrayLength);

  let sortedArray: number[];
  $: if (slicedArray) mergeSortInit();

  let endStep = 0;
  let curStep = 0;
  let maxStep = 0;
  $: {
    if (slicedArray) {
      endStep = 200;
      mergeSortInit();
      maxStep = curStep;
      endStep = 0;
    }
  }
  $: {
    if (endStep != curStep) mergeSortInit();
    if (endStep == maxStep) breakpoint = -1;
  };

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
  let leftTextColors: string[];
  let rightTextColors: string[];
  $: {
    finalFillColors = slicedArray.map((_, i) => {
      if (i < currentArrayLeftIndex || i > currentArrayRightIndex) return 'var(--background-tertiary)';
      return 'transparent';
    });

    if (merging) {
      leftTextColors = [];
      rightTextColors = [];
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
      leftMergeArray = leftMergeArray ? leftMergeArray.slice(0, 1) : [1];
      rightMergeArray = rightMergeArray ? rightMergeArray.slice(0, 1) : [1];
      leftTextColors = ['transparent'];
      rightTextColors = ['transparent'];
      leftFillColors = [];
      rightFillColors = [];
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
    leftTextColors = Array(leftMergeArray.length).fill('transparent');
    rightTextColors = Array(rightMergeArray.length).fill('transparent');
    leftMergeIndex = -1;
    rightMergeIndex = -1;
    if (++curStep >= endStep) {
      breakpoint = 4;
      return
    };
    merge();
    return;
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

<div class='content'>
  <h1 id='merge_sort'>Merge sort</h1>
  <h2 id='overview'>Overview</h2>
  <p>
    Mergesort is a recursive algorithm that sorts an array by splitting its input into two smaller arrays and sorting those.
    The base case is an array of size 1, which is already sorted.
  </p>
  <p>
    The two subarrays (which are already sorted) are then merged.
    This can be done in linear time by iterating over each array and selecting the smaller element each time.
  </p>
  
  
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
    Input size {@html katex.renderToString('n=' + arrayLength)}:
    <input type='range' min='1' max='10' step='1' bind:value={arrayLength} />
  </div>
  
  <div class='center'>
    <AlkoArray
      values={sortedArray}
      fillColors={finalFillColors}
      textColors={finalTextColors}
      subtitle='\(A\)'
    />
  </div>
  
  <div class='merge-arrays'>
    <AlkoArray
      values={leftMergeArray}
      fillColors={leftFillColors}
      textColors={leftTextColors}
      subtitle='\(L\)'
    />
    <AlkoArray
      values={rightMergeArray}
      fillColors={rightFillColors}
      textColors={rightTextColors}
      subtitle='\(R\)'
    />
  </div>
  
  <Stepper endStep={endStep} maxStep={maxStep} on:step={e => endStep = e.detail} />

  <h2 id='pseudocode'>Pseudocode</h2>
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
          <Line>\(A[k] \gets L[i]\)</Line>
          <Line>\(i \gets i + 1\)</Line>
        <Else spotlight={breakpoint == 6} />
          <Line>\(A[k] \gets R[j]\)</Line>
          <Line>\(j \gets j + 1\)</Line>
        <Line breakCount={1}>\(k \gets k + 1\)</Line>
      <While breakCount={1} spotlight={breakpoint == 7}>\(i {'<'} |L|\)</While>
        <Line>\(A[k] \gets L[i]\)</Line>
        <Line>\(i \gets i + 1\)</Line>
        <Line>\(k \gets k + 1\)</Line>
      <While breakCount={1} spotlight={breakpoint == 8}>\(j {'<'} |R|\)</While>
        <Line>\(A[k] \gets R[j]\)</Line>
        <Line>\(j \gets j + 1\)</Line>
        <Line>\(k \gets k + 1\)</Line>
      <Return breakCount={1} spotlight={breakpoint == 9}>\(A\)</Return>
  </Algorithm>

  <h2 id='complexity'>Time Complexity</h2>
  <p>
    The time complexity of merge sort is \(T_n = T_{'{'}\frac{'{'}n{'}'}{'{'}2{'}'}{'}'} + n\) as at each iteration,
    we divide the problem into two subproblems of half the size and merge them in linear time.
  </p>
  <p>
    Therefore the time complexity is \(O(n \log n)\) by the master theorem.
  </p>
</div>

<style lang="scss">
  .content {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .merge-arrays {
    display: flex;
    width: 100%;
    justify-content: center;
    margin: 0 auto;
    gap: 2rem;
  }

  .input-size {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid var(--tertiary);
    margin-bottom: 0.5rem;
  }
</style>