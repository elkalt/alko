<script lang="ts">
  import Tree from "$lib/components/Tree.svelte";
    import { onMount } from "svelte";

  let tree: Tree;

  let nodes = [
    { key: 1, list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
    { key: 2, list: [1, 2, 3, 4, 5]},
    { key: 3, list: [6, 7, 8, 9, 10]},
    { key: 4, list: [1, 2, 3]},
    { key: 5, list: [4, 5]},
    { key: 6, list: [6, 7, 8]},
    { key: 7, list: [9, 10]}
  ]

  let edges = [
    { from: 1, to: 2 },
    { from: 1, to: 3 },
    { from: 2, to: 4 },
    { from: 2, to: 5 },
    { from: 3, to: 6 },
    { from: 3, to: 7 }
  ]

  onMount(() => {
    tree.addNode(nodes[1], nodes[0].key);
    tree.addNode(nodes[2], nodes[0].key);
    tree.addNode(nodes[3], nodes[1].key);
    tree.addNode(nodes[4], nodes[1].key);
    tree.addNode(nodes[5], nodes[2].key);
    tree.addNode(nodes[6], nodes[2].key);
  });
</script>

<Tree
  root={nodes[0]}
  bind:this={tree}
/>