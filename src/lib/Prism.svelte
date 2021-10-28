<script>
    import { onMount } from "svelte";

    onMount(() => {
        let script = document.createElement("script");
        script.src = "https://tutsplus.github.io/syntax-highlighter-demos/highlighters/Prism/prism.js";
        document.head.append(script);

        script.onload = function () {
            const langs = [
                "https://prismjs.com/components/prism-json.js",
                //"https://prismjs.com/components/prism-javascript.js",
                "https://prismjs.com/components/prism-graphql.js",
                "https://prismjs.com/components/prism-cypher.js",
                "https://prismjs.com/components/prism-bash.js",
            ];
            langs.forEach((lang) => {
                const lang_script = document.createElement("script");
                lang_script.src = lang;
                lang_script.async = true;
                document.head.append(lang_script);
                lang_script.onload = () => {
                    window.Prism.highlightAll();
                };
            });
        };
    });
</script>

<svelte:head>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans:400,700" type="text/css" />
    <link
        rel="stylesheet"
        href="https://tutsplus.github.io/syntax-highlighter-demos/highlighters/Prism/prism_okaidia.css"
    />
</svelte:head>
