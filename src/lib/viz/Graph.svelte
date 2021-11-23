<script>
    import { onMount, setContext } from "svelte";
    import NodeClass from "./NodeClass";
    import RelClass from "./RelClass";
    import { numberOfSharedRels } from "./utils";

    setContext("graph", {
        addNode,
        addRelationship,
    });

    export let w = 500;
    export let h = 450;
    export let nodes = [];
    export let relationships = [];

    const mouse = { offX: 0, offY: 0, dragging: false, down: false };
    let ctx, canvas, activeNode;
    let relMap = {};
    let takenNodeIds = [];

    let _nodes = [];
    $: nodes.filter((n) => !takenNodeIds.includes(n.id)).map(addNode);

    $: if (relationships || nodes) {
        relMap = {};
    }

    let _rels = [];
    $: relationships.map(addRelationship);

    function addNode(n) {
        const nodeInstance = new NodeClass({ ...n, ctx });
        takenNodeIds.push(n.id);
        _nodes = _nodes.concat(nodeInstance);
        return nodeInstance;
    }

    function addRelationship({ fromId, toId, style, properties }) {
        const from = _nodes.find((n) => n.id === fromId);
        const to = _nodes.find((n) => n.id === toId);
        if (!from || !to) {
            return null;
        }

        if (typeof relMap[fromId] === "undefined") {
            relMap[fromId] = { [toId]: 0 };
        }
        if (typeof relMap[fromId][toId] === "undefined") {
            relMap[fromId][toId] = 0;
        }
        relMap[fromId][toId] += 1;
        const spreadIndex = numberOfSharedRels(relMap, fromId, toId)();
        const rel = new RelClass({
            ctx,
            from,
            to,
            style,
            spreadIndex,
            numberOfSharedRels: numberOfSharedRels(relMap, fromId, toId),
            properties,
        });
        _rels = _rels.concat(rel);
        return rel;
    }
    // function removeRelationship(id) {
    //     const relInstance = _rels.find(rel => rel.id === id);
    //     _rels = _rels.filter(rel => rel.id === id);
    // }

    onMount(() => {
        ctx = canvas.getContext("2d");

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
        // canvas.addEventListener("click", clickedMouse);
        draw();
        return () => {
            canvas.removeEventListener("mousemove", movingMouse);
            // canvas.removeEventListener("click", clickedMouse);
            canvas.removeEventListener("mousedown", downMouse);
            canvas.removeEventListener("mouseup", upMouse);
        };
    });
    function movingMouse({ offsetX, offsetY }) {
        if (mouse.down && activeNode) {
            mouse.dragging = true;
            activeNode.dragged = true;
            activeNode.moveTo(offsetX + mouse.offX, offsetY + mouse.offY);
            draw(activeNode);
        }
    }
    function downMouse({ offsetX, offsetY }) {
        mouse.down = true;
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
        if (!mouse.dragging && activeNode) {
            clickedMouse(activeNode);
        }
        mouse.down = false;
        activeNode = null;
        mouse.dragging = false;
        _nodes.forEach((n) => (n.dragged = false));
        draw();
    }
    function clickedMouse(activeNode) {
        activeNode.clicked();
    }
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
<slot />
