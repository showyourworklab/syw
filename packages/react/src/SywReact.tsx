// Relative imports on purpose: tsc copies them into the published .d.ts files, which can't resolve the $src alias
import type { FC } from 'react'
import { LOCALE_DEFAULT } from 'syw-common/constants/i18n'
import type { SywReactProps } from './types'
import { C2paProvider, I18nProvider, DataProvider, UiProvider } from './providers'
import App from './components/App'

const SywReact: FC<SywReactProps> = ({
	locale = LOCALE_DEFAULT,
	src,
	alt = null,
	caption = null,
	byline = null,
	mediaType,
	variant,
	c2paOptions,
	mapOptions = null,
	onEvent,
	...props
}) => {

	return (
		<C2paProvider
			c2paOptions={c2paOptions}
		>
			<I18nProvider
				locale={locale}
			>
				<DataProvider
					src={src}
					alt={alt}
					caption={caption}
					byline={byline}
					mediaType={mediaType}
				>
					<UiProvider
						variant={variant}
					>
						<App
							mapOptions={mapOptions}
							onEvent={onEvent}
							{...props}
						/>
					</UiProvider>
				</DataProvider>
			</I18nProvider>
		</C2paProvider>
	)
}

export default SywReact
