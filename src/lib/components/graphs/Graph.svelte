<script lang="ts">
  import { onMount } from "svelte";
  import { select, stratify, tree, linkVertical } from "d3";

  export let nodes: { id: string; name: string }[] = [];
  export let edges: { source: string; target: string }[] = [];

  let svgContainer: HTMLDivElement;
  let canvas: any;
  let font: string;
  let content: HTMLDivElement;

  function getTextWidth(text: string) {
    if (!canvas)
      canvas =
        getTextWidth.canvas ||
        (getTextWidth.canvas = document.createElement("canvas"));
    const context = canvas.getContext("2d");
    context.font = font;
    const metrics = context.measureText(text);
    return metrics.width;
  }

  onMount(() => {
    content = document.querySelector(".content")!;
    const fontWeight =
      getComputedStyle(content).getPropertyValue("--font-weight");
    const fontSize = getComputedStyle(content).getPropertyValue("--font-size");
    const fontFamily =
      getComputedStyle(content).getPropertyValue("--font-family");
    font = `${fontWeight} ${fontSize} ${fontFamily}`;

    const svg = select(svgContainer)
      .append("svg")
      .attr("transform", "translate(40,40)")
      .append("g")

    const stratifier = stratify<{ id: string; name: string }>()
      .id((d) => d.id)
      .parentId((d) => {
        const edge = edges.find((e) => e.target === d.id);
        return edge ? edge.source : null;
      });

    const root = stratifier(nodes);

    const treeLayout = tree<{ id: string; name: string }>()
      // .size([100, 100]);
      .size([1000^root.height, 100 * 2^root.height]);
    treeLayout(root);

    // svg.selectAll('path')
    //   .data(root.links())
    //   .enter().append('path')
    // .attr('d', linkVertical()
    //   .x(d => d.x)
    //   .y(d => d.y));

    const node = svg
      .selectAll(".node")
      .data(root.descendants())
      .enter()
      .append("g")
      .attr("class", "node")
      .attr("transform", (d) => `translate(${d.x},${d.y})`);

    node
      .append("circle")
      .attr("r", 10)
      .style("stroke", () => "var(--primary)")
      .style("fill", () => "var(--background)");

    node
      .append("text")
      .attr("dy", 3)
      .attr("x", (d) => -getTextWidth(d.data.name))
      .text((d) => d.data.name)
      .style("fill", () => "var(--primary)");
  });
</script>

<div bind:this={svgContainer} class="svg-container"></div>

<style lang="scss">
  .svg-container {
    width: 100%;
    height: 600px;
    border: 1px solid var(--primary);
    overflow: auto;
  }
</style>
