import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { DICTIONARIES } from '#constants/i18n'
import { getLocaleMediaText } from '#helpers/i18n'

const MEDIA_TYPES = ['image', 'video', 'unknown'] as const

// Words that tie text to one media type, per language
const MEDIA_WORDS: Record<string, RegExp> = {
	en_US: /\b(image|images|photo|photos|photographer)\b/i,
	no_NO: /\b(bilde|bildet|bilder|bildets|foto|fotograf)\b/i,
}
// Bold tab names (i.e. the **Image** tab) name a tab, not the media
const TAB_NAMES = /\*\*(Image|Bilde)\*\*/g
// Keys ending in a media type that aren't media variants
const NOT_MEDIA_VARIANTS = ['tab_image']

const mentionsMedia = (locale: string, text: string) =>
	MEDIA_WORDS[locale].test(text.replace(TAB_NAMES, ''))

const getMediaBase = (key: string) => {
	if(NOT_MEDIA_VARIANTS.includes(key)) return null
	const media = MEDIA_TYPES.find(m => key.endsWith(`_${m}`))
	return media ? key.slice(0, -(media.length + 1)) : null
}

for(const [locale, dictionary] of Object.entries(DICTIONARIES) as [string, Record<string, string>][]) {
	describe(`${locale} dictionary`, () => {
		const keys = Object.keys(dictionary)
		// Only bases that have an _image key are media variants (i.e. not type_unknown or trust_unknown)
		const mediaBases = new Set(keys.filter(key => key.endsWith('_image')).map(getMediaBase).filter((base): base is string => !!base))

		it('has image, video and unknown versions of every media-specific text', () => {
			const incomplete = [...mediaBases].filter(base => !MEDIA_TYPES.every(m => `${base}_${m}` in dictionary))
			assert.deepEqual(incomplete, [])
		})

		it('only mentions the image in text that has video and unknown versions', () => {
			const shared = keys.filter(key => {
				if(NOT_MEDIA_VARIANTS.includes(key)) return false
				const base = getMediaBase(key)
				return !(base && mediaBases.has(base)) && mentionsMedia(locale, dictionary[key])
			})
			assert.deepEqual(shared, [], 'These keys mention the image but would also be shown for videos')
		})

		it('does not mention the image in video or unknown text', () => {
			const wrong = [...mediaBases]
				.flatMap(base => [`${base}_video`, `${base}_unknown`])
				.filter(key => key in dictionary && mentionsMedia(locale, dictionary[key]))
			assert.deepEqual(wrong, [])
		})

		it('does not keep a shared key next to media versions', () => {
			const both = [...mediaBases].filter(base => base in dictionary)
			assert.deepEqual(both, [], 'getLocaleMediaText would never show these shared keys')
		})
	})
}

describe('getLocaleMediaText', () => {
	it('uses the media version of the text when there is one', () => {
		assert.equal(getLocaleMediaText('en_US', 'video', 'provenance', 'toggle'), 'More info on this video')
		assert.equal(getLocaleMediaText('en_US', 'unknown', 'provenance', 'toggle'), 'More info on this media')
		assert.equal(getLocaleMediaText('no_NO', 'image', 'provenance', 'toggle'), 'Mer informasjon om dette bildet')
	})

	it('falls back to the shared text when it reads the same for every media type', () => {
		for(const mediaType of MEDIA_TYPES) {
			assert.equal(getLocaleMediaText('en_US', mediaType, 'timestamp', 'camera'), 'Timestamp')
		}
	})

	it('still fills in placeholders', () => {
		assert.equal(getLocaleMediaText('en_US', 'video', 'timestamp', 'camera', { unused: 'x' }), 'Timestamp')
	})
})
