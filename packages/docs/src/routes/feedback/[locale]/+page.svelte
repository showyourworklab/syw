<script>
    import SsrFallback from '$src/lib/components/SsrFallback.svelte';
	import SywSvelte from 'syw-svelte'
	import 'syw-common/css/fonts.css'
	import 'syw-common/css/globals.css'
	import { DICTIONARIES } from './constants.js'

	let { params, data } = $props();
	let { locale } = $derived(params);
	let { dictionary } = $derived(data);

	const date = $derived(new Date().toLocaleDateString(locale.replace("_", "-"), {
		year: "numeric",
		month: "long",
		day: "numeric",
	}))

</script>

<svelte:head>
	<title>Show Your Work Lab | {dictionary?.title}</title>
</svelte:head>

<header id="header">
	<div id="locales">
		{#each Object.keys(DICTIONARIES) as locale}
			<a
				href={`./${locale}`}
				class={locale.toLocaleLowerCase() === locale.toLocaleLowerCase() ? "active" : null}
			>
				{DICTIONARIES[locale]?.endonym}
			</a>
		{/each}
	</div>
</header>
<main id="main">
	<article id="article">
		<hgroup id="heading">
			<h1>Lorem ipsum dolor sit amet, consectetur adipiscing elit</h1>
			<p>Duis pretium quam vel sem rhoncus, id feugiat ex eleifend. Nam suscipit, elit eu cursus lacinia, enim metus viverra massa.</p>
			<div>
				Maecenas Vulputate | {date}
			</div>
		</hgroup>
		<p>
			Praesent porta justo hendrerit sollicitudin vestibulum. Pellentesque suscipit faucibus tellus, sit amet dictum diam malesuada sed. Donec at ultrices augue. Morbi ultricies vitae dui ac tempor. Integer quis urna id ante dictum condimentum non tempor tellus. Vestibulum tristique facilisis ante.
		</p>
		<SsrFallback>
			<SywSvelte
				locale={locale}
				src={`https://showyourworklab.github.io/c2pa-images/feedback-1.jpg`}
				caption={dictionary?.caption}
				byline='Nora Savosnick'
			/>
		</SsrFallback>
		<p>
			Donec et volutpat erat, vel porttitor dui. Nulla viverra mi laoreet ex tincidunt, sit amet maximus libero congue. Vestibulum id elit leo. Integer quis sapien gravida, auctor massa nec, hendrerit est. Duis finibus mauris in justo suscipit venenatis. Aliquam rhoncus mollis ligula, quis dapibus lectus tincidunt eu. Vestibulum dapibus, tellus ut rutrum suscipit, magna velit molestie nibh, eu mollis massa leo id sapien. Nullam ullamcorper enim elit, et luctus enim ullamcorper a. Nulla molestie varius orci, eu fringilla nibh tincidunt ut. Duis vehicula, risus id dictum tempor, mi nisl sodales odio, eget gravida dolor mi eu eros. Quisque in eros sagittis, finibus erat posuere, euismod elit. Quisque eu eleifend libero. Quisque volutpat efficitur ullamcorper. Donec ut auctor metus.
		</p>
		<center>
			...
		</center>
	</article>
</main>
<footer id="footer">
	<a href={dictionary?.feedback_url} target="_blank">
		{dictionary?.feedback_prompt}
	</a>
</footer>

<style>
	@import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400..800;1,400..800&display=swap');
	:global(*) {
		box-sizing: border-box;
	}
	:global(html) {
		font-family: "EB Garamond", times, serif;
		background-color: #FFFFFD;
	}
	:global(body) {
		margin: auto;
		overflow-y: scroll;
		overflow-x: hidden;
	}
	:global(#root) {
		width: 100%;
		display: flex;
		flex-direction: column;
	}
	:global(.Syw-App) {
		margin-bottom: 1.25em;
	}
	header#header,
	footer#footer {
		width: 100%;
		position: fixed;
		right: 0;
		z-index: 2;
		padding: 5px;
		background-color: white;
		display: flex;
		justify-content: center;
		/* justify-content: space-between; */
		font-family: "Work Sans Variable", "Work Sans", Helvetica, Arial, sans-serif;
		font-size: 12px;
		border-style: solid;
		border-color: currentColor;
		border-width: 0;
	}
	header#header {
		top: 0;
		border-bottom-width: 1px;
	}
	footer#footer {
		bottom: 0;
		border-top-width: 1px;
	}
	header#header a,
	footer#footer a {
		color: black;
		text-transform: uppercase;
	}
	#locales {
		display: flex;
	}
	#locales a {
		margin: 0 5px;
	}
	#locales a.active {
		font-weight: bold;
	}
	main#main {
		width: 100vw;
		height: 100vh;
		display: flex;
	}
	article#article {
		margin: auto;
		padding: 3rem 1rem;
		max-width: 900px;
	}
	article#article > p {
		max-width: 600px;
		margin: 0 auto 1.25em auto;
		font-size: 18px;
		line-height: 1.4em;
		@media (min-width: 740px) {
			font-size: 20px;
		}
	}
	hgroup#heading {
		max-width: 600px;
		margin: 0 auto 1rem auto;
	}
	hgroup#heading h1 {
		font-size: 35px;
		line-height: 0.9em;
		@media (min-width: 740px) {
			font-size: 40px;
		}
	}
	hgroup#heading p {
		font-size: 20px;
		line-height: 1.2em;
		@media (min-width: 740px) {
			font-size: 23px;
		}
	}
</style>