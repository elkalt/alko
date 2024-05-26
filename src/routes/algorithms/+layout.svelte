<script lang="ts">
  import { onMount, onDestroy } from 'svelte';

  let isMobile: boolean = false;
  const handleResize = () => isMobile = window.innerWidth < 768;

  let headings: Element[] = [];
  let headerHeight: number;
  let top: number;
  let originalHeight: number;
  let position: 'fixed' | 'absolute' = 'absolute';
  let headingContainer: HTMLElement;
  let lastScrollY: number = 0;

  function handleScroll() {
    if (isMobile) return;
    const rect = headingContainer.getBoundingClientRect();
    const currentScrollY = window.scrollY;

    if (rect.top <= 24 && currentScrollY > lastScrollY) {
      headingContainer.style.position = 'fixed';
      top = 24;
    } else if (rect.top + document.documentElement.scrollTop <= originalHeight) {
      headingContainer.style.position = 'absolute';
      top = headerHeight + 24;
    }

    lastScrollY = currentScrollY;
  }

  onMount(() => {
    if (typeof window !== 'undefined') {
      handleResize();

      headings = Array.from(document.querySelectorAll('h1, h2, h3')).slice(1);
      headerHeight = document.querySelector('header')!.getBoundingClientRect().height;
      top = headerHeight + 24;
      originalHeight = top;

      window.addEventListener('scroll', handleScroll);
      window.addEventListener('resize', handleResize);
    }
  });

  onDestroy(() => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    }
  });
</script>

<div bind:this={headingContainer} class='heading-container' style:top={`${top}px`} style:position={position}>
  {#if !isMobile}
    {#each headings as heading}
      {@const level = parseInt(heading.tagName.charAt(1))}
      <div
        class='line'
        style:grid-template-columns={'min-content '.repeat(level - 1) + '1fr'}>
        {#each Array.from({ length: level - 1 }) as _, i}
          <span class='tab' />
        {/each}
        <a
          href={`#${heading.id}`}>
          {heading.textContent} 
        </a>
      </div>
    {/each}
  {/if}
</div>
<div class='content'>
  <slot />
</div>

<style lang="scss">
  .content {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .heading-container {
    display: flex;
    flex-direction: column;
    position: fixed;
    left: 2rem;

    .line {
      display: grid;

      .tab {
        display: inline-block;
        width: 1rem;
        border-left: 1px solid var(--tertiary);
      }

      a {
        padding: 0.5rem 0;
      }
    }
  }
</style>