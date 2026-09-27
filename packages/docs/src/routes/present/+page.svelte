<script>
	import 'syw-common/css/globals.css'
	import SywSvelte from 'syw-svelte'
</script>

<main>
	<article>
		
		<!-- <p>Kjelleretasjen i al-Mowuasat universitetssykehus i Damaskus, beliggende så langt nede at solstråler aldri trenger inn, lukter søtt og innestengt. Det er slik oppreisning og rettferdighet lukter i Syria: som lik og død.</p> -->

		<!-- <p>Mens vi står og snakker med obdusent Sara Melhem, rulles en ny mannskropp inn på en båre. Hun undersøker liket metodisk, vekten, blodet som har samlet seg på den ene siden av kroppen.</p> -->

		<p>En forhørsdommer følger med, og en assistent noterer den 28 år gamle rettsmedisinerens konklusjoner. Den nyutdannede obdusenten arbeider fokusert. Det er her, i selskap med de døde, Melhem føler seg hjemme og opplever at hun gjør en forskjell.</p>

		<SywSvelte
			locale={"en_US"}
			src={`https://showyourworklab.github.io/c2pa-images/leica-nora-syria-2.jpg`}
			byline="Nora Savosnick"
			caption='Sara Melhem, 28, works as a forensic pathologist in Damascus, Syria, examining bodies and investigating mass graves one year after the fall of Assad.'
		/>
		
		<p>Problemet er at drapene ikke stoppet da al-Assad flyktet fra landet i desember i fjor. Etter tiår med lovløshet, borgerkrig, tortur og klansamfunn er drap blitt normen i det syriske samfunnet. I tomrommet etter diktaturet har også sekteriske hevndrap blusset opp. Nøyaktig hvor mange mord og massakrer som forekommer i det nye Syria, er det få offisielle opplysninger om. Sara Melhem beskriver likene hun har sett i arbeidet sitt: mødre som dreper barna sine, barn som dreper foreldrene sine, menn som dreper konene sine.</p>

		<p>– Folk er blitt forherdet. De har mistet sitt moralske kompass. Mord er veldig enkelt. Våpen finnes overalt, og man kan slippe unna med det, sier rettsmedisineren.</p>

		<p>– Livene våre er blitt brikker i klanenes kamp. Det finnes altfor mange militser, for mange grupper. Hver og en av dem vil drepe de andre.</p>
	</article>
</main>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Rubik:ital,wght@0,300..900;1,300..900&display=swap');
	:global(html) {
		--text-base: 16px;
		--font-serif: "Libre Baskerville", "Times New Roman", times, serif;
		--font-sans-serif: "Rubik", Arial, Helvetica, sans-serif;
		--font-ui: "Work Sans", arial, sans-serif;
		--color-primary: #333;
		--color-secondary: white;
		--color-ui: #E2E5F1;
	}
	:global(body) {
		margin: auto;
		font-family: var(--font-serif);
		font-size: var(--text-base);
		overflow-y: scroll;
		overflow-x: hidden;
		color: var(--color-primary);
		background-color: var(--color-secondary);
	}
	:global(.Syw-App) {
		/* --syw-color-primary: #1A1A1A;
		--syw-color-secondary: #fdf7e6;
		--syw-color-secondary-light: #faf7f0;
		--syw-color-secondary-dark: #877a54;
		--syw-color-tertiary: rgba(255,229,217,1);
		--syw-color-quaternary: rgba(153,1,1,1);
		--syw-color-quaternary-light: rgba(250,246,245,1); */
	}
	:global(#root) {
		width: 100%;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}
	#hero {
		max-width: 40rem;
		margin: auto;
		padding: 4em 0;
		display: flex;
		position: relative;
		overflow: hidden;
	}
	#hero hgroup {
		margin: auto auto 0 auto;
		position: relative;
		z-index: 2;
	}
	#hero hgroup h1 {
		font-size: 3.5rem;
		line-height: 1.2em;
		letter-spacing: -0.05em;
	}
	#hero hgroup p {
		font-size: 1rem;
		margin: 0 auto;
	}
	#lede {
		font-size: 2.5rem;
		line-height: 1.2em;
	}
	#credit {
		margin-top: 0.5rem;
		margin-bottom: 2rem;
		font-family: var(--font-sans-serif);
	}
	#disclaimer {
		font-style: italic;
		opacity: 0.5;
	}
	#disclaimer a {
		color: inherit;
	}
	main {
		padding: 0 2rem;
	}
	main h1, main h2 {
		font-family: var(--font-sans-serif);
	}
	main p {
		line-height: 1.5em;
	}
	article p, article h2 {
		max-width: 45rem;
		margin: 1em auto;
	}
	article :global(.Syw-App) {
		max-width: 900px;
		margin-left: -1.5rem;
		margin-right: -1.5rem;
		@media (min-width: 767px) {
			margin: auto;
		}
	}
	article .caption {
		max-width: 52rem;
		margin: 0.5em auto 4em auto;
		font-size: 0.825rem;
		line-height: 20px;
	}
	:global(.Syw-ManifestPreviewCell_thumb img) {
		height: unset;
	}
	:global(.Syw-App .Syw-Caption) {
		font-family: var(--font-ui);
	}
</style>