<script lang="ts">
  import { Diagram, Node, GraphLinksModel, Shape, TextBlock, TreeLayout, Link, Routing, HTMLInfo, Panel, Adornment, Size, Spot, type ObjectData } from "gojs";
  import { onMount } from "svelte";
  
  let canvas: HTMLCanvasElement;
  let diagramDiv: HTMLDivElement;
  let diagram: Diagram;
  
  onMount(() => {
    canvas = document.createElement('canvas')
    let style = getComputedStyle(document.body);
    let primary = style.getPropertyValue('--primary');
    let linkColor = style.getPropertyValue('--text-secondary');
    let textColor = style.getPropertyValue('--background-secondary');
    
    diagram = new Diagram(diagramDiv, {
      allowMove: false,
    })

    diagram.layout = new TreeLayout({
      angle: 90,
      setsPortSpot: false,
      setsChildPortSpot: false,
      nodeSpacing: 100,
      layerSpacing: 20,
    });

    let primaryTextSpot = Spot.Center.copy();
    primaryTextSpot.y -= 0.1;
    let altTextSpot = Spot.Bottom.copy();
    altTextSpot.y -= 0.35;
    diagram.nodeTemplate = new Node(
      'Spot', {
        selectable: false,
      }
    ).add(
      new Shape("Circle", {
        fill: primary,
        width: 100,
        height: 100,
      }),
      new TextBlock({
        font: 'bold 20px Quattrocentro',
        stroke: textColor,
        alignment: primaryTextSpot,
      }).bind('text', 'key'),
      new Shape('RoundedRectangle', {
        fill: primary,
        alignment: altTextSpot,
        height: 25,
        strokeWidth: 0,
      }).bind('width', 'list', (list: number[]) => getTextWidth(`[${list.join(', ')}]`) + 10),
      new TextBlock({
        font: 'bold 15px Quattrocentro',
        stroke: textColor,
        alignment: altTextSpot,
      }).bind('text', 'list', (list: number[]) => `[${list.join(', ')}]`)
    );

    diagram.linkTemplate = new Link(
      { routing: Routing.Normal, fromEndSegmentLength: 0, toEndSegmentLength: 0 }
    ).add(
      new Shape({ strokeWidth: 2, stroke: linkColor })
    );

    diagram.model = new GraphLinksModel();
  });

  export function addNode(node: ObjectData, parentId: number) {
    diagram.model.addNodeData(node);
    if (parentId != 0) (diagram.model as GraphLinksModel).addLinkData({ from: parentId, to: node.key });
  }

  export function removeNode(node: ObjectData) {
    let linksToRemove = [];
    let diagramModel = diagram.model as GraphLinksModel;
    for (let link of diagramModel.linkDataArray) {
      if (link.from === node.key) return;  // Only remove leaf nodes
      if (link.to === node.key) linksToRemove.push(link);
    }
    for (let link of linksToRemove) diagramModel.removeLinkData(link);
    diagram.model.removeNodeData(node);
  }

  export function clear() {
    diagram.model = new GraphLinksModel();
  }

  export function highlightNode(nodeId: number) {
    console.log(nodeId)
    let node = diagram.findNodeForKey(nodeId);
    if (node) node.addAdornment('Highlight', new Adornment().add(new Shape('Circle', { fill: 'red', width: 200, height: 200 })));
  }

  function getTextWidth(text: string) {
    let context = canvas.getContext('2d');
    context!.font = 'bold 15px Quattrocentro';
    return context!.measureText(text).width;
  }
</script>

<div bind:this={diagramDiv} style="border: solid 1px black; width:800px; height:800px"></div>