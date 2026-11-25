<script>
	import 'syw-common/css/fonts.css'
	import 'syw-common/css/globals.css'
	import 'syw-docs/src/styles.css'
	import Header from 'syw-docs/src/lib/components/Header.svelte'
	import Heading from 'syw-docs/src/lib/components/Heading.svelte'
	import Preview from 'syw-docs/src/lib/components/Preview.svelte'
	import SywSvelte from '$lib/components/App.svelte'
</script>

<main
	id="docs"
>
	<Header />
	<Heading type="svelte" />
	<Preview SywSvelte={SywSvelte} />
</main>

<style>
	
</style>