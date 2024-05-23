<script lang="ts">
  const { url } = import.meta;
  const modules = import.meta.glob('./**/*.svelte'); // Include subfolder

  const topics = ['Sorting']
  
  function getPages(topic: string) {
    const directory = url
      .replace(/(.*?)\/src\/routes\//, '/')
      .replace(/(.*?)\/immutable\/pages\//, '/')
      .replace(/(.*?)\/var\/task\//, '/') // Vercel
      .replace(/\/([^/])*.svelte.*/, '/');
  
    const pageRegex = /\/\+page\.svelte$/;
    const topicRegex = new RegExp(`sorting\\/.+\\/\\+page\\.svelte$`);

    const paths = Object.keys(modules)
      // Convert relative path to absolute path
      .map((path) => path.replace(/^(.\/)/, directory))
      // Filter paths with dynamic parameters (e.g. /blog/[slug].svelte)
      .filter((path) => !/\[.*\]/.test(path))
      // Filter paths that end with `/+page.svelte` and contain the topic
      .filter((path) => topicRegex.test(path))
      // Remove the trailing `/+page.svelte` string
      .map((path) => path.replace(pageRegex, ''))
      // Set empty path string to '/' ('./index.svelte' is converted to '')
      .map((path) => path || '/')
      .sort();
    return paths;
  }
</script>

{#each topics as topic}
  <h2>{topic}</h2>
  <ul>
    {#each getPages(topic.toLowerCase()) as path}
      <li><a href={path}>{path}</a></li>
    {/each}
  </ul>
{/each}