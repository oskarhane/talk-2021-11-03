<script>
    import { onMount } from "svelte";
    export let language;
    export let code;
    export let header = null;

    onMount(() => {
        if (window.Prism) {
            window.Prism.highlightAll();
        }
    });
</script>

<div>
    {#if header}
        <h2>{header}</h2>
    {/if}
    <pre>
		<code class="language-{language}">{code}</code>
	</pre>
</div>
