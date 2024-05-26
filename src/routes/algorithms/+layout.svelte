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
      <a
        href={`#${heading.id}`}
        style:margin-left={level - 0.5 + 'rem'}
        style:border-left={level == 1 ? 'none' : '1px solid var(--tertiary)'}>
        {heading.textContent} 
      </a>
    {/each}
  {/if}
</div>
<slot />

<style lang="scss">
  .heading-container {
    display: flex;
    flex-direction: column;
    position: fixed;
    left: 2rem;

    a {
      padding: 0.5rem 0 0.5rem 0.5rem;
    }
  }
</style>