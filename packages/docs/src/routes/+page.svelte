<script>
	import 'syw-common/css/fonts.css'
	import 'syw-common/css/globals.css'
	import SywSvelte from 'syw-svelte'
	import Header from '$lib/components/Header.svelte'
	import Heading from '$lib/components/Heading.svelte'
	import Preview from '$lib/components/Preview.svelte'
	import SsrFallback from '$lib/components/SsrFallback.svelte'
	import '$src/styles.css'

	const reactUrl = import.meta.env.PROD ? '/syw/react' : '/react'
	const svelteUrl = import.meta.env.PROD ? '/syw/svelte' : '/svelte'
	const morgenbladetUrl = import.meta.env.PROD ? '/syw/article/morgenbladet' : '/article/morgenbladet'
	const aftonbladetUrl = import.meta.env.PROD ? '/syw/article/aftonbladet' : '/article/aftonbladet'
</script>

<main
	id="docs"
>
	<Header />
	
	<Heading />
	
	<SsrFallback>
		<Preview
			SywSvelte={SywSvelte}
		/>
	</SsrFallback>

	<div>
		<h2>Example Articles</h2>
		<ul>
			<li>
				<strong>Morgenbladet:</strong>&nbsp;
				<a
					href={morgenbladetUrl}
					class="button"
				>
					Livene våre er blitt brikker i klanenes kamp
				</a>
			</li>
			<li>
				<strong>Aftonbladet:</strong>&nbsp;
				<a
					href={aftonbladetUrl}
					class="button"
				>
					Delade staden: "Folk är rädda för att åka hit"
				</a>
			</li>
		</ul>
	</div>

	<section>
		<h2>
			syw-svelte
		</h2>
		<pre>
			<code>
{`<script>
	import SywSvelte from "syw-react";
</script>

<SywSvelte
	locale="en-US"
	src="https://example.com/image.jpg"
	caption="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
	byline="Nulla Dignissim"
	onEvent={handleEvent}
/>`}
			</code>
		</pre>
		<p>
			<a
				href={svelteUrl}
				class="button"
			>
				Check out the demo
			</a>
			
			<a
				href="https://github.com/showyourworklab/syw/tree/development/packages/svelte"
				target="_blank"
				rel="noopener noreferrer"
				class="button"
				data-icon="github"
			>
				View code
			</a>
		</p>
	</section>
	
	<section>
		<h2>
			syw-react
		</h2>
		<code>
{`import SywReact from "syw-react";

return (
	<SywReact
		locale="en-US"
		src="https://example.com/image.jpg"
		caption="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
		byline="Nulla Dignissim"
		onEvent={handleEvent}
	/>
);`}
		</code>
		<p>
			<a
				href={reactUrl}
				class="button"
			>
				Check out the demo
			</a>
			<a
				href="https://github.com/showyourworklab/syw/tree/development/packages/react"
				target="_blank"
				rel="noopener noreferrer"
				class="button"
				data-icon="github"
			>
				View code
			</a>
		</p>
	</section>
</main>

<style>
	
</style>