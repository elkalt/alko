<script lang="ts">
  import AlkoMatrix from '$lib/components/AlkoMatrix.svelte';
  import Algorithm from '$lib/components/pseudocode/Algorithm.svelte';
  import Line from '$lib/components/pseudocode/Line.svelte';
  import Procedure from '$lib/components/pseudocode/Procedure.svelte';
  import Stepper from '$lib/components/Stepper.svelte';
  import { k, kall } from '$lib/scripts/katex';
  import Fraction from 'fraction.js';
  import AlkoArray from '$lib/components/AlkoArray.svelte';
  import For from '$lib/components/pseudocode/For.svelte';
  import If from '$lib/components/pseudocode/If.svelte';

  let arrayLength = 3;

  let matrix: Fraction[][] = [
    [2, 1, 0, 1, 1],
    [4, 3, 1, 0, 0],
    [2, 1, 3, 1, 0],
    [0, 1, 1, 4, 2],
    [1, 0, 2, 2, 6],
  ].map((row) => row.map((value) => new Fraction(value)));

  let arrayB: Fraction[] = [4, 6, 8, 6, 2].map((value) => new Fraction(value));

  let inputMatrix: Fraction[][];
  $: inputMatrix = matrix.map((a) => a.slice(0, arrayLength)).slice(0, arrayLength);

  let inputB: Fraction[];
  $: inputB = arrayB.slice(0, arrayLength);

  let algoMatrix: Fraction[][];
  let algoB: Fraction[];
  $: if (inputMatrix) GEPPInit();

  let endStep = 0;
  let curStep = 0;
  let maxStep = 0;
  let breakpoint = -1;
  let pivotRow = -1;
  let newPivotRow = -1;
  let checkRow = -1;
  $: {
    if (inputMatrix) {
      breakpoint = -1;
      pivotRow = -1;
      newPivotRow = -1;
      checkRow = -1;
      endStep = 100;
      GEPPInit();
      maxStep = curStep;
      endStep = 0;
    }
  }
  $: if (endStep != curStep) GEPPInit();

  let AfillColors: string[][];
  let bFillColors: string[];

  $: {
    AfillColors = algoMatrix.map((_, i) => {
      if (i == pivotRow) {
        if (newPivotRow === -1 || pivotRow === newPivotRow) {
          return Array(pivotRow)
            .fill('var(--quaternary)')
            .concat(['var(--tertiary)'])
            .concat(Array(arrayLength - pivotRow - 1).fill('var(--quaternary)'));
        } else {
          return Array(arrayLength).fill('var(--background-secondary)');
        }
      } else if (i == newPivotRow) {
        return Array(pivotRow)
          .fill('var(--quaternary)')
          .concat(['var(--tertiary)'])
          .concat(Array(arrayLength - pivotRow - 1).fill('var(--quaternary)'));
      } else if (i == checkRow) {
        return Array(arrayLength).fill('var(--background-tertiary)');
      } else {
        return Array(arrayLength).fill('transparent');
      }
    });

    bFillColors = algoB.map((_, i) => {
      if (i == pivotRow) {
        if (newPivotRow === -1 || pivotRow === newPivotRow) {
          return 'var(--quaternary)';
        } else {
          return 'var(--background-secondary)';
        }
      } else if (i == newPivotRow) {
        return 'var(--quaternary)';
      } else if (i == checkRow) {
        return 'var(--background-tertiary)';
      } else {
        return 'transparent';
      }
    });
  }

  function GEPPInit() {
    curStep = 0;
    algoMatrix = inputMatrix.map((row) => row.slice());
    algoB = inputB.slice();
    breakpoint = -1;
    GEPP();
  }

  function GEPP() {
    if (curStep >= endStep) {
      breakpoint = -1;
      pivotRow = -1;
      newPivotRow = -1;
      checkRow = -1;
      return;
    }

    for (let i = 0; i < arrayLength - 1; i++) {
      let maxRow = i;

      if (++curStep >= endStep) {
        breakpoint = 0;
        pivotRow = i;
        newPivotRow = -1;
        checkRow = -1;
        return;
      }

      for (let j = i + 1; j < arrayLength; j++) {
        if (++curStep >= endStep) {
          breakpoint = 1;
          pivotRow = i;
          newPivotRow = maxRow;
          checkRow = j;
          return;
        }
        if (algoMatrix[j][i].abs() > algoMatrix[maxRow][i].abs()) {
          maxRow = j;
          if (++curStep >= endStep) {
            breakpoint = 2;
            pivotRow = i;
            newPivotRow = maxRow;
            checkRow = -1;
            return;
          }
        }
      }
      if (++curStep >= endStep) {
        breakpoint = -1;
        pivotRow = i;
        newPivotRow = maxRow;
        checkRow = -1;
        return;
      }

      if (maxRow != i) {
        [algoMatrix[i], algoMatrix[maxRow]] = [algoMatrix[maxRow], algoMatrix[i]];
        [algoB[i], algoB[maxRow]] = [algoB[maxRow], algoB[i]];
        if (++curStep >= endStep) {
          breakpoint = 3;
          pivotRow = i;
          newPivotRow = -1;
          checkRow = -1;
          return;
        }
      }

      for (let j = i + 1; j < arrayLength; j++) {
        let mult = algoMatrix[j][i].div(algoMatrix[i][i]);
        if (++curStep >= endStep) {
          breakpoint = 4;
          pivotRow = i;
          newPivotRow = -1;
          checkRow = j;
          return;
        }
        for (let k = i; k < arrayLength; k++) {
          algoMatrix[j][k] = algoMatrix[j][k].sub(mult.mul(algoMatrix[i][k]));
        }
        algoB[j] = algoB[j].sub(mult.mul(algoB[i]));
        if (++curStep >= endStep) {
          breakpoint = 5;
          pivotRow = i;
          newPivotRow = -1;
          checkRow = -1;
          return;
        }
      }
    }

    for (let i = arrayLength - 1; i >= 0; i--) {
      if (++curStep >= endStep) {
        breakpoint = -1;
        pivotRow = i;
        newPivotRow = -1;
        checkRow = -1;
        return;
      }
      for (let j = i - 1; j >= 0; j--) {
        let mult = algoMatrix[j][i].div(algoMatrix[i][i]);
        if (++curStep >= endStep) {
          breakpoint = 6;
          pivotRow = i;
          newPivotRow = -1;
          checkRow = j;
          return;
        }
        for (let k = i; k < arrayLength; k++) {
          if (algoMatrix[i][k].equals(0)) continue;
          algoMatrix[j][k] = algoMatrix[j][k].sub(mult.mul(algoMatrix[i][k]));
          algoB[j] = algoB[j].sub(mult.mul(algoB[i]));
        }
        if (++curStep >= endStep) {
          breakpoint = 7;
          pivotRow = i;
          newPivotRow = -1;
          checkRow = -1;
          return;
        }
      }
    }

    for (let i = 0; i < arrayLength; i++) {
      let mult = algoB[i].div(algoMatrix[i][i]);
      if (i !== 0 && ++curStep >= endStep) {
        breakpoint = 8;
        pivotRow = i;
        newPivotRow = -1;
        checkRow = -1;
        return;
      }
      algoMatrix[i][i] = new Fraction(1);
      algoB[i] = mult;
      if (++curStep >= endStep) {
        breakpoint = 9;
        pivotRow = i;
        newPivotRow = -1;
        checkRow = -1;
        return;
      }
    }
    if (++curStep >= endStep) {
      breakpoint = -1;
      pivotRow = -1;
      newPivotRow = -1;
      checkRow = -1;
      return;
    }
  }
</script>

<svelte:head>
  <title>Gaussian Elimination with Partial Pivoting</title>
  <meta
    name="description"
    content="Gaussian Elimination with Partial Pivoting visualization and explanation"
  />
</svelte:head>

<h1 id="Gaussian Elimination with Partial Pivoting">
  Gaussian Elimination with Partial Pivoting
</h1>
<h2 id="overview">Overview</h2>
Gaussian elimination with partial pivoting (GEPP) is an algorithm used to solve systems of
linear equations.
<h2 id="visualization">Visualization</h2>
<div>
  <div class="system">
    <AlkoMatrix bind:values={inputMatrix} editable={true} subtitle="A" />
    <span style:margin-top="-1.2em">{@html k('x = ')}</span>
    <AlkoArray bind:values={inputB} editable={true} subtitle="b" transpose={true} />
  </div>
</div>

<div class="input-size">
  Input size {@html k('n=' + arrayLength)}:
  <input type="range" min="1" max="5" step="1" bind:value={arrayLength} />
</div>

<div class="system">
  <AlkoMatrix values={algoMatrix} fillColors={AfillColors} subtitle={k('A')} />
  <span style:margin-top="-1.2em">{@html k('x = ')}</span>
  <AlkoArray values={algoB} fillColors={bFillColors} subtitle={k('b')} transpose={true} />
</div>

<Stepper {endStep} {maxStep} on:step={(e) => (endStep = e.detail)} />

<h2 id='pseudocode'>Pseudocode</h2>
<Algorithm name='Gaussian Elimination with Partial Pivoting'>
  <Procedure args={['A', 'b']}>GEPP</Procedure>
    <For>{@html k('i\\gets 1\\text{ to }n')}</For>
      <Line spotlight={[0, 1, 2].includes(breakpoint)}>{@html k('\\underset{k}{' + kall('argmax') + '}(A_{(k, i)})')}</Line>
      <If spotlight={breakpoint == 3}>{@html k('k\\ne i')}</If>
        <Line spotlight={breakpoint == 3}>{@html k(kall('swap') + '(A_{i}, A_{k})')}</Line>
        <Line spotlight={breakpoint == 3}>{@html k(kall('swap') + '(b_{i}, b_{k})')}</Line>
      <For breakCount={1} spotlight={[4, 5].includes(breakpoint)}>{@html k('j\\gets i+1\\text{ to }n')}</For>
        <Line spotlight={[4, 5].includes(breakpoint)}>{@html k('m\\; \\gets \\frac{A_{(j, i)}}{A_{(i, i)}}')}</Line>
        <Line spotlight={[4, 5].includes(breakpoint)}>{@html k('A_{j} \\gets A_{j} - mA_{i}')}</Line>
        <Line spotlight={[4, 5].includes(breakpoint)}>{@html k('b_{j}\\,\\, \\gets b_{j} - mb_{i}')}</Line>
    <For breakCount={2}>{@html k('i\\gets n\\text{ to }1')}</For>
      <For spotlight={[6, 7].includes(breakpoint)}>{@html k('j\\gets i-1\\text{ to }1')}</For>
        <Line spotlight={[6, 7].includes(breakpoint)}>{@html k('m\\; \\gets \\frac{A_{(j, i)}}{A_{(i, i)}}')}</Line>
        <Line spotlight={[6, 7].includes(breakpoint)}>{@html k('A_{j} \\gets A_{j} - m A_{i}')}</Line>
        <Line spotlight={[6, 7].includes(breakpoint)}>{@html k('b_{j}\\,\\, \\gets b_{j} - m b_{i}')}</Line>
    <For breakCount={2} spotlight={[8, 9].includes(breakpoint)}>{@html k('i\\gets 1\\text{ to }n')}</For>
      <Line spotlight={[8, 9].includes(breakpoint)}>{@html k('m\\;\\;\\;\\; \\gets \\frac{1}{A_{(i, i)}}')}</Line>
      <Line spotlight={[8, 9].includes(breakpoint)}>{@html k('A_{(i, i)} \\gets mA_{(i,i)}')}</Line>
      <Line spotlight={[8, 9].includes(breakpoint)}>{@html k('b_{i}\\;\\;\\;\\;\\, \\gets mb_{i}')}</Line>
</Algorithm>

<h2 id='complexity'>Time Complexity</h2>
<p>
  The worst case for insertion sort is an array that is sorted in reverse order (ie. {@html k('[3, 2, 1]')}).
  In this case, the algorithm will have to make {@html k('1 + 2 + \\ldots + n-1 = \\frac{n(n-1)}{2} = O(n^2)')} comparisons and swaps.
</p>

<style lang="scss">
  .system {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 1rem;
  }
</style>
