<script>
    import { fade } from "svelte/transition";
    import { tweened } from "svelte/motion";
    import { cubicOut } from "svelte/easing";
    import { machine as fss, NEXT, PREV } from "./lib/slide-state-machine";
    import KeyStepper from "./lib/KeyStepper.svelte";
    import LoadPrism from "./lib/Prism.svelte";
    import * as slidesMap from "./slides";

    const slides = Object.keys(slidesMap).map((name) => slidesMap[name]);
    fss.setMax(slides.length - 1);
    const progress = tweened(0, {
        duration: 400,
        easing: cubicOut,
    });
    $: progress.set((($fss + 1) / slides.length) * 100);
</script>

<KeyStepper />
<div class="h-full w-full flex flex-col">
    <div class="h-full w-full relative">
        {#key $fss}
            <div transition:fade={{ duration: 700 }} class="absolute top-0 left-0 right-0 bottom-0 m-4">
                <svelte:component this={slides[$fss]} />
            </div>
        {/key}
    </div>
    <div class="flex mb-4 px-4">
        <button
            disabled={$fss < 1}
            class="px-3 py-1 border rounded mr-auto disabled:text-gray-200"
            on:click={() => fss.send(PREV)}>Back</button
        >
        <div class="mx-auto text-gray-400">{$fss}</div>
        <button
            disabled={$fss >= slides.length - 1}
            class="px-3 py-1 border rounded ml-auto disabled:text-gray-200"
            on:click={() => fss.send(NEXT)}>Next</button
        >
    </div>
    <div class="h-4 bg-blue-300" style="width: {$progress}%;" />
</div>
<LoadPrism />
