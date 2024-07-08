<script lang="ts">
  import { Diagram, Node, GraphLinksModel, Shape, TextBlock, TreeLayout, Link, Routing, HTMLInfo, Panel, Adornment, Size, Spot } from "gojs";
  import { onMount } from "svelte";

  export let rootNode: { key: number, text: string };

  let diagramDiv: HTMLDivElement;
  let diagram: Diagram;

  onMount(() => {
    let style = getComputedStyle(document.body);
    let primary = style.getPropertyValue('--primary');
    let linkColor = style.getPropertyValue('--text-secondary');
    let textColor = style.getPropertyValue('--background-secondary');
    
    diagram = new Diagram(diagramDiv, {
      allowMove: false,
      'toolManager.hoverDelay': 5,
    })

    diagram.layout = new TreeLayout({
      angle: 90,
      setsPortSpot: false,
      setsChildPortSpot: false,
      nodeSpacing: 100,
      layerSpacing: 20,
    });

    diagram.nodeTemplate = new Node("Spot", {
      selectionAdorned: false,
      toolTip: new Adornment().add(
        new Shape("RoundedRectangle", {
          fill: textColor,
          strokeWidth: 0,
        }),
        new TextBlock({
          margin: 5,
          font: 'bold 14px Quattrocento',
          stroke: primary
        }).bind("text")
      )
    }).add(
      new Shape("Circle", {
        fill: primary,
        width: 100,
        height: 100,
      }),
      new TextBlock({
        font: 'bold 20px Quattrocentro',
        stroke: textColor,
      }).bind("text")
    );

    diagram.linkTemplate = new Link(
      { routing: Routing.Normal, fromEndSegmentLength: 0, toEndSegmentLength: 0 }
    ).add(
      new Shape({ strokeWidth: 1, stroke: linkColor })
    )

    diagram.model = new GraphLinksModel({
      nodeDataArray: [
        { key: 1, text: "Root" },
        { key: 2, text: "Left" },
        { key: 3, text: "Right" },
        { key: 4, text: "LL" },
        { key: 5, text: "LR" },
        { key: 6, text: "RL" },
        { key: 7, text: "RR" }
      ],
      linkDataArray: [
        { from: 1, to: 2 },
        { from: 1, to: 3 },
        { from: 2, to: 4 },
        { from: 2, to: 5 },
        { from: 3, to: 6 },
        { from: 3, to: 7 }
      ]
    });
  });
</script>

<div bind:this={diagramDiv} style="border: solid 1px black; width:800px; height:800px"></div>