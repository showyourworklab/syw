import type { IptcDigitalSourceType } from "#constants/iptc";
import { IPTC_DIGITAL_SOURCE_TYPES, IPTC_DIGITAL_SOURCE_TYPES_AI, IPTC_DIGITAL_SOURCE_TYPES_BASE_URI, IPTC_DIGITAL_SOURCE_TYPES_CAMERA } from "#constants/iptc";

// export const getIptcDigitalSourceType = (value: string | null | undefined): IptcDigitalSourceType | undefined => {
// 	const iptcDigitalSourceType = getIptcDigitalSourceTypeData(value)
// 	// const iptcTypeKey = getIptcDigitalSourceTypeKey(iptcDigitalSourceType)
// 	// const iptcTypeLabel = getIptcDigitalSourceTypeLabel(iptcDigitalSourceType)
// 	// const iptcTypeDefinition = getIptcDigitalSourceTypeDefinition(iptcDigitalSourceType)
// 	// return {
// 		// key: iptcTypeKey,
// 		// label: iptcTypeLabel,
// 		// definition: iptcTypeDefinition
// 	// }
// }
export const getIptcDigitalSourceTypeData = (value: string | null | undefined): IptcDigitalSourceType | undefined => {
	const uri = value?.includes(IPTC_DIGITAL_SOURCE_TYPES_BASE_URI)
		? value
		: `${IPTC_DIGITAL_SOURCE_TYPES_BASE_URI}/${value}`
	return IPTC_DIGITAL_SOURCE_TYPES.find(n =>
		n.uri === uri
	)
}
export const getIptcDigitalSourceTypeKey = (uri: string | null | undefined) => uri && String(uri).replace(`${IPTC_DIGITAL_SOURCE_TYPES_BASE_URI}/`, "") || undefined

export const getIptcDigitalSourceTypeLabel = (digitalSourceType: IptcDigitalSourceType | null | undefined) => digitalSourceType?.prefLabel[`en-GB`]

export const getIptcDigitalSourceTypeDefinition = (digitalSourceType: IptcDigitalSourceType | null | undefined) => digitalSourceType?.definition[`en-GB`]

export const isIptcDigitalSourceTypeCamera = (digitalSourceTypeKey?: string | null) =>
	digitalSourceTypeKey && IPTC_DIGITAL_SOURCE_TYPES_CAMERA.includes(digitalSourceTypeKey)

export const isIptcDigitalSourceTypeAi = (digitalSourceTypeKey?: string | null) =>
	digitalSourceTypeKey && IPTC_DIGITAL_SOURCE_TYPES_AI.includes(digitalSourceTypeKey)