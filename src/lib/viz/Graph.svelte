<script>
    import { onMount } from "svelte";
    import NodeClass from "./NodeClass";
    import RelClass from "./RelClass";
    import { numberOfSharedRels } from "./utils";

    export let w = 500;
    export let h = 450;

    let ctx, canvas, activeNode;
    let relMap = {};
    const mouse = { offX: 0, offY: 0, dragging: false };
    let takenNodeIds = [];
    export let nodes = [];
    $: _nodes = [];
    $: {
        const newNodes = nodes.filter((n) => !takenNodeIds.includes(n.id)).map((n) => new NodeClass({ ...n, ctx }));
        takenNodeIds = [...takenNodeIds, ...newNodes.map((n) => n.id)];
        _nodes = _nodes.concat(newNodes);
    }
    export let relationships = [];

    $: if (relationships || nodes) {
        relMap = {};
    }
    $: _rels = relationships.map(({ fromId, toId, style, properties }) => {
        const from = _nodes.find((n) => n.id === fromId);
        const to = _nodes.find((n) => n.id === toId);
        if (!from || !to) {
            return;
        }

        // Store and calculate spreadIndex for curving rels when multiple between nodes
        if (typeof relMap[fromId] === "undefined") {
            relMap[fromId] = { [toId]: 0 };
        }
        if (typeof relMap[fromId][toId] === "undefined") {
            relMap[fromId][toId] = 0;
        }
        relMap[fromId][toId] += 1;
        const spreadIndex = numberOfSharedRels(relMap, fromId, toId)();
        return new RelClass({
            ctx,
            from,
            to,
            style,
            spreadIndex,
            numberOfSharedRels: numberOfSharedRels(relMap, fromId, toId),
            properties,
        });
    });

    onMount(() => {
        ctx = canvas.getContext("2d");
        //ctx.imageSmoothingEnabled = false;
        const scale = window.devicePixelRatio;
        w = canvas.parentElement.clientWidth;
        h = canvas.parentElement.clientHeight;
        canvas.style.width = w + "px";
        canvas.style.height = h + "px";
        canvas.width = w * scale;
        canvas.height = h * scale;
        ctx.scale(scale, scale);
        canvas.addEventListener("mousemove", movingMouse);
        canvas.addEventListener("mousedown", downMouse);
        canvas.addEventListener("mouseup", upMouse);
        canvas.addEventListener("click", clickedMouse);
        draw();
        return () => {
            canvas.removeEventListener("mousemove", movingMouse);
            canvas.removeEventListener("click", clickedMouse);
            canvas.removeEventListener("mousedown", downMouse);
            canvas.removeEventListener("mouseup", upMouse);
        };
    });
    function movingMouse({ offsetX, offsetY }) {
        if (mouse.dragging && activeNode) {
            activeNode.dragged = true;
            activeNode.moveTo(offsetX + mouse.offX, offsetY + mouse.offY);
            draw(activeNode);
        }
    }
    function downMouse({ offsetX, offsetY }) {
        mouse.dragging = true;
        for (let i = _nodes.length - 1; i >= 0; i--) {
            if (_nodes[i].isInside(offsetX, offsetY)) {
                const n = _nodes[i];
                _nodes.splice(i, 1);
                _nodes.splice(_nodes.length, 0, n);
                activeNode = _nodes[_nodes.length - 1];
                mouse.offX = activeNode.x - offsetX;
                mouse.offY = activeNode.y - offsetY;
                break;
            }
        }
        draw();
    }
    function upMouse() {
        activeNode = null;
        mouse.dragging = false;
        _nodes.forEach((n) => (n.dragged = false));
        draw();
    }
    function clickedMouse(e) {}
    function draw(filterNode) {
        ctx.clearRect(0, 0, w, h);
        _rels.forEach((rel) => {
            rel.draw(filterNode);
        });
        _nodes.forEach((n) => {
            n.draw();
        });
    }
    $: if ((_nodes || _rels) && ctx) {
        console.log("triggered to draw");
        draw();
    }
</script>

<canvas bind:this={canvas} />
