<script>
	import 'syw-common/css/globals.css'
	import 'syw-docs/src/styles.css'
	import { DEMO_IMAGES } from 'syw-common/constants/demo'
	import { LOCALE_DEFAULT, DICTIONARIES } from 'syw-common/constants/i18n'
	import { VARIANT_DEFAULT, VARIANT_KEYS } from 'syw-common/constants/ui'
	const locales = Object.keys(DICTIONARIES)

	const { SywSvelte } = $props();
	let variant = $state(VARIANT_DEFAULT)
	let locale = $state(LOCALE_DEFAULT)
	let demoImage = $state(DEMO_IMAGES[0]);
	let demoImageIndex = $state(0);

	const onLocaleChange = e => {
		const { value } = e.target
		locale = value
	}

	const onVariantChange = e => {
		const { value } = e.target
		variant = value
	}

	const onImageChange = e => {
		const { value } = e.target
		demoImage = DEMO_IMAGES[Number(value)]
		demoImageIndex = Number(value)
	}

	const handleEvent = (type, event, manifest) => {
		// console.log(type, event, manifest)
	}

</script>
<section>
	<header>
		<div>
			<label
				for="select-image"
			>
				Select image to demo:
			</label>
			<select
				id="select-image"
				value={demoImageIndex}
				onchange={onImageChange}
			>
				{#each DEMO_IMAGES as image, index}
					<option
						value={index}
					>
						{image?.title?.[locale]}
					</option>
				{/each}
			</select>
		</div>
		<div>
			<label
				for="select-variant"
			>
				Select embed variant:
			</label>
			<select
				id="select-variant"
				value={variant}
				onchange={onVariantChange}
			>
				{#each VARIANT_KEYS as value}
					<option
						value={value}
					>
						{value}
					</option>
				{/each}
			</select>
		</div>
		<div>
			<label
				for="select-locale"
			>
				Select language of component:
			</label>					
			<select
				id="select-locale"
				value={locale}
				onchange={onLocaleChange}
			>
				{#each locales as value}
					<option
						value={value}
					>
						{value}
					</option>
				{/each}
			</select>
		</div>
	</header>
	<SywSvelte
		variant={variant}
		locale={locale}
		src={demoImage?.src}
		caption={demoImage?.caption?.[locale]}
		byline={demoImage?.byline}
		c2paOptions={{
			// wasmSrc
			// trustLists: "c2pa"
		}}
		onEvent={handleEvent}
	/>
</section>

<style>
	
</style>