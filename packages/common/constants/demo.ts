import type { Locale } from '#types/i18n'

interface DemoImage {
	src: string
	title: Record<Locale, string>
	caption: Record<Locale, string>
	byline: string
}

// Hosted at https://github.com/showyourworklab/c2pa-images
export const DEMO_IMAGES: DemoImage[] = [
	// {
	// 	src: 'https://showyourworklab.github.io/c2pa-images/firefly-edit.jpg',
	// 	title: {
	// 		en_US: 'AI-edited',
	// 		no_NO: 'AI-edited',
	// 		sv_SE: 'AI-edited',
	// 	},
	// 	caption: {
	// 		en_US: '',
	// 		no_NO: '',
	// 		sv_SE: '',
	// 	},
	// 	byline: 'Nora Savosnick'
	// },
	{
		src: 'https://showyourworklab.github.io/c2pa-images/feedback-1.jpg',
		title: {
			en_US: 'Viking row (Leica)',
			no_NO: 'Viking-roingen (Leica)',
			sv_SE: 'Vikingrodden (Leica)',
		},
		caption: {
			en_US: 'More than a thousand Norwegian football fans gathered in New York’s Times Square to take part in the “Viking row” two days before Norway’s match against Brazil.',
			no_NO: 'Over tusen norske supportere samlet seg på Times Square i New York for å være med på «Viking-roingen» to dager før Norges kamp mot Brasil.',
			sv_SE: 'Över tusen norska fotbollssupportrar samlades på Times Square i New York för att delta i ”Vikingrodden” två dagar före Norges match mot Brasilien.',
		},
		byline: 'Nora Savosnick'
	},
	{
		src: 'https://showyourworklab.github.io/c2pa-images/leica-nora-6.jpg',
		title: {
			en_US: 'Opioids in Tennessee (Leica)',
			no_NO: 'Opioids in Tennessee (Leica)',
			sv_SE: 'Opioids in Tennessee (Leica)',
		},
		caption: {
			en_US: 'Deputy Zach Whaley, 27, along with several other officers, are searching for a suspect they have heard is in the motel room they are outside of.',
			no_NO: 'Politibetjent Zach Whaley (27) og flere andre betjenter leter etter en mistenkt de har hørt befinner seg på motellrommet de står utenfor.',
			sv_SE: 'Deputy Zach Whaley, 27, tillsammans med flera andra poliser letar efter en misstänkt som de har hört ska befinna sig i det här motellrummet som de står utanför.',
		},
		byline: 'Nora Savosnick / Aftonbladet'
	},
	{
		src: 'https://showyourworklab.github.io/c2pa-images/leica-nora-syria-6.jpg',
		title: {
			en_US: 'Syrian cemetery (Leica)',
			no_NO: 'Syrisk kirkegård (Leica)',
			sv_SE: 'Syrisk kyrkogård (Leica)',
		},
		caption: {
			en_US: 'At the cemetery in al-Ghouta: After the fall of Assad, it is once again possible for millions of Syrians to visit the graves of their relatives – for those who have a grave.',
			no_NO: 'På kirkegården i al-Ghouta: Etter Assads fall er det igjen mulig for millioner av syrere å besøke sine pårørendes graver – for de som har en grav.',
			sv_SE: 'På kyrkogården i al-Ghouta: Efter Assads fall är det återigen möjligt för miljontals syrier att besöka sina släktingars gravar – för de som har en grav.',
		},
		byline: 'Nora Savosnick / Morgenbladet'
	},
	{
		src: 'https://showyourworklab.github.io/c2pa-images/sora-1.mp4',
		title: {
			en_US: 'AI-generated (Sora)',
			no_NO: 'AI-generert (Sora)',
			sv_SE: 'AI-genererad (Sora)',
		},
		caption: {
			en_US: 'AI-generated video of pro-Russian ballots being destroyed in Moldova.',
			no_NO: 'AI-generert video av pro-russiske stemmesedler som blir ødelagt i Moldova.',
			sv_SE: 'AI-genererad video av pro-ryska valsedlar som förstörs i Moldavien.',
		},
		byline: 'NewsGuard'
	},
];