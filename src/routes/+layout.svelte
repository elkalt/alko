<svelte:head>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.10/dist/katex.min.css" integrity="sha384-wcIxkf4k558AjM3Yz3BBFQUbk/zgIYC2R0QpeeYb+TwlBVMrlgLqwRjRtGZiK7ww" crossorigin="anonymous">
  <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.10/dist/katex.min.js" integrity="sha384-hIoBPJpTUs74ddyc4bFZSM1TVlQDA60VBbJS0oA934VSz82sBx1X7kSx2ATBDIyd" crossorigin="anonymous"></script>
  <!-- svelte-ignore missing-declaration -->
  <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.10/dist/contrib/auto-render.min.js" integrity="sha384-43gviWU0YVjaDtb/GhzOouOXtZMP/7XUzwPTstBeZFe/+rCMvRwr4yROQP43s0Xk" crossorigin="anonymous" on:load={renderMathInElement(document.body)}></script>
</svelte:head>

<script lang='ts'>
  import '$lib/styles/app.scss';
</script>

<header>
  <h1><a href='/'>ALKO</a></h1>
</header>

<div class='parent-container'>
  <slot />
</div>

<style lang='scss'>
  header {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    margin-bottom: 0.75rem;
    padding: 0;
    padding-bottom: 0.25rem;
    border-bottom: 1px solid var(--primary);
    
    h1 {
      margin: 0;
      font-size: 3rem;
  
      a {
        &:hover {
          color: var(--primary);
        }
      }
    }
  }

  .parent-container {
    width: 50%;
    margin-left: auto;
    margin-right: auto;

    @media screen and (max-width: 768px) {
      width: 100%;
    }
  }
</style>