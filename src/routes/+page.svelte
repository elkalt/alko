<script lang='ts'>
  const { url } = import.meta;
  const modules = import.meta.glob('./**/*.svelte'); // Include subfolder

  const topics = ['Sorting']
  
  function getPages(topic: string) {
    // https://github.com/sveltejs/kit/issues/923#issuecomment-1567052262
    const directory = url
      .replace(/(.*?)\/src\/routes\//, '/')
      .replace(/(.*?)\/immutable\/pages\//, '/')
      .replace(/(.*?)\/var\/task\//, '/') // Vercel
      .replace(/\/([^/])*.svelte.*/, '/');
  
    const pageRegex = /\/\+page\.svelte$/;
    const topicRegex = new RegExp(`\\/algorithms\\/${topic}\\/.+\\/\\+page\\.svelte$`);

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
      // Remove everything before /algorithms (due to Vercel deployment)
      .map((path) => path.replace(/.*\/algorithms/, '/algorithms'))   
      .sort();
    return paths;
  }
</script>

<div class='parent-container'>
  {#each topics as topic}
    <h1>{topic}</h1>
    <ul>
      {#each getPages(topic.toLowerCase()) as path}
        <!-- truncate path, capitalize first letter, replace _ with space -->
        {@const i = path.lastIndexOf('/') + 1}
        <li><a href={path}>{(path.charAt(i).toLocaleUpperCase() + path.slice(i + 1)).replaceAll('_', ' ')}</a></li>
      {/each}
    </ul>
  {/each}
</div>

<style lang="scss">
  .parent-container {
    width: 50%;
    margin-left: auto;
    margin-right: auto;

    @media screen and (max-width: 768px) {
      width: 100%;
    }
  }
</style>