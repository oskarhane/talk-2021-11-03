<div
    class="w-full h-full border rounded outer flex justify-center items-center overflow-hidden relative text-primary-700"
>
    <div class="px-10 py-2 w-full">
        <slot />
    </div>
</div>

<style>
    .outer {
        background-color: var(--bg-color, #ccc);
    }
</style>
