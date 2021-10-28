<script>
    import { onMount } from "svelte";
    import { machine, NEXT, PREV } from "./slide-state-machine";

    onMount(() => {
        const config = {
            ArrowLeft: () => machine.send(PREV),
            ArrowRight: () => machine.send(NEXT),
        };
        const listenerFn = ({ key }) => {
            if (!config[key]) {
                return;
            }
            config[key]();
        };
        window.addEventListener("keyup", listenerFn);
        return () => window.removeEventListener("keyup", listenerFn);
    });
</script>
