<script lang="ts">
  import '$lib/styles/app.scss'
</script>

<header>
  <h1><a href="/">ALKO</a></h1>
</header>

<div class="parent-container">
  <slot />
</div>

<style lang="scss">
  @import '$lib/styles/variables.scss';

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