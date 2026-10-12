import type { SywData } from '#types/c2pa'

export const C2PA_WEB_VERSION = '0.6.1'
export const C2PA_WEB_WASM_CDN_URL = `https://cdn.jsdelivr.net/npm/@contentauth/c2pa-web@${C2PA_WEB_VERSION}/dist/resources/c2pa_bg.wasm`
export const C2PA_CREATED_IPTC = [
	"http://cv.iptc.org/newscodes/digitalsourcetype/trainedAlgorithmicMedia"
]
export const C2PA_PHASES = {
	IDLE: 'idle',
	LOADING: 'loading',
	READY: 'ready',
	ERROR: 'error',
} as const
export const C2PA_STATUSES = {
	VALIDATING: 'validating',
	UNKNOWN: 'unknown',
	TRUSTED: 'trusted',
	VALID: 'valid',
	INVALID: 'invalid',
} as const
export const C2PA_MEDIA_TYPES = {
	IMAGE: 'image',
	VIDEO: 'video',
	UNKNOWN: 'unknown',
} as const
export const C2PA_IMAGE_EXTENSIONS: readonly string[] = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'avif', 'heic', 'heif', 'tif', 'tiff', 'svg', 'bmp']
export const C2PA_VIDEO_EXTENSIONS: readonly string[] = ['mp4', 'm4v', 'mov', 'webm', 'ogv', 'avi', 'mkv']
export const C2PA_DATA_DEFAULT: SywData = {
	phase: C2PA_PHASES.IDLE,
	status: C2PA_STATUSES.VALIDATING,
	types: [],
	manifests: [],
	mediaType: C2PA_MEDIA_TYPES.UNKNOWN,
	provenance: null,
	reader: null,
	error: null,
}
export const C2PA_ADOBE_ACTIONS: Record<string, Record<string, string>> = {
	"c2pa.color_adjustments": {
		"Curve": "color_adjustments",
		"Masking": "color_adjustments",
		"Blacks2012": "color_adjustments",
		"Contrast2012": "color_adjustments",
		"Exposure2012": "color_adjustments",
		"Highlights2012": "color_adjustments",
		"Shadows2012": "color_adjustments",
		"ColorGradeMidtoneLum": "color_adjustments",
		"ColorGradeShadowLum": "Color Grade",
		"HueAdjustmentAqua": "Hue Adjustment",
		"HueAdjustmentBlue": "Hue Adjustment",
		"HueAdjustmentGreen": "Hue Adjustment",
		"HueAdjustmentRed": "Hue Adjustment",
		"HueAdjustmentYellow": "Hue Adjustment",
		"LuminanceAdjustmentAqua": "Luminance Adjustment",
		"LuminanceAdjustmentBlue": "Luminance Adjustment",
		"LuminanceAdjustmentGreen": "Luminance Adjustment",
		"LuminanceAdjustmentMagenta": "Luminance Adjustment",
		"LuminanceAdjustmentOrange": "Luminance Adjustment",
		"LuminanceAdjustmentPurple": "Luminance Adjustment",
		"LuminanceAdjustmentRed": "Luminance Adjustment",
		"LuminanceAdjustmentYellow": "Luminance Adjustment",
		"SaturationAdjustmentAqua": "",
		"SaturationAdjustmentBlue": "",
		"SaturationAdjustmentGreen": "",
		"SaturationAdjustmentMagenta": "",
		"SaturationAdjustmentOrange": "",
		"SaturationAdjustmentYellow": "",
		"ParametricHighlightSplit": "",
		"ParametricMidtoneSplit": "",
		"ParametricShadowSplit": "",
		"PerspectiveUpright": "",
	},
	"c2pa.filtered": {
	},
	"c2pa.edited": {
	},
	"c2pa.resized": {
		"Preset": "",
		"Upright": "",
		"Warp": "",
	},
	"c2pa.orientation": {

	},
	"c2pa.drawing": {

	}
}
interface LightroomAction {
	action: string
	parameters: Record<string, string>
}

const LIGHTROOM_ACTIONS: LightroomAction[] = [
	{
	"action": "c2pa.color_adjustments",
	"parameters": {
		"com.adobe.acr": "Blacks2012",
		"com.adobe.acr.value": "2"
	}
	},
	{
	"action": "c2pa.color_adjustments",
	"parameters": {
		"com.adobe.acr": "ColorGradeMidtoneLum",
		"com.adobe.acr.value": "3"
	}
	},
	{
	"action": "c2pa.color_adjustments",
	"parameters": {
		"com.adobe.acr": "ColorGradeShadowLum",
		"com.adobe.acr.value": "4",
	}
	},
	{
	"action": "c2pa.color_adjustments",
	"parameters": {
		"com.adobe.acr": "Contrast2012",
		"com.adobe.acr.value": "6"
	}
	},
	{
	"action": "c2pa.color_adjustments",
	"parameters": {
		"com.adobe.acr": "Exposure2012",
		"com.adobe.acr.value": "125"
	}
	},
	{
	"action": "c2pa.color_adjustments",
	"parameters": {
		"com.adobe.acr": "Highlights2012",
		"com.adobe.acr.value": "-36",
	}
	},
	{
	"action": "c2pa.color_adjustments",
	"parameters": {
		"com.adobe.acr": "HueAdjustmentAqua",
		"com.adobe.acr.value": "-1"
	}
	},
	{
	"action": "c2pa.color_adjustments",
	"parameters": {
		"com.adobe.acr": "HueAdjustmentBlue",
		"com.adobe.acr.value": "-1"
	}
	},
	{
	"action": "c2pa.color_adjustments",
	"parameters": {
		"com.adobe.acr": "HueAdjustmentGreen",
		"com.adobe.acr.value": "7"
	}
	},
	{
	"action": "c2pa.color_adjustments",
	"parameters": {
		"com.adobe.acr": "HueAdjustmentRed",
		"com.adobe.acr.value": "3"
	}
	},
	{
	"action": "c2pa.color_adjustments",
	"parameters": {
		"com.adobe.acr": "HueAdjustmentYellow",
		"com.adobe.acr.value": "1"
	}
	},
	{
	"action": "c2pa.color_adjustments",
	"parameters": {
		"com.adobe.acr": "LuminanceAdjustmentAqua",
		"com.adobe.acr.value": "-1"
	}
	},
	{
	"action": "c2pa.color_adjustments",
	"parameters": {
		"com.adobe.acr": "LuminanceAdjustmentBlue",
		"com.adobe.acr.value": "-6",
	}
	},
	{
	"action": "c2pa.color_adjustments",
	"parameters": {
		"com.adobe.acr": "LuminanceAdjustmentGreen",
		"com.adobe.acr.value": "-3"
	}
	},
	{
	"action": "c2pa.color_adjustments",
	"parameters": {
		"com.adobe.acr": "LuminanceAdjustmentMagenta",
		"com.adobe.acr.value": "-4"
	}
	},
	{
	"action": "c2pa.color_adjustments",
	"parameters": {
		"com.adobe.acr": "LuminanceAdjustmentOrange",
		"com.adobe.acr.value": "-2"
	}
	},
	{
	"action": "c2pa.color_adjustments",
	"parameters": {
		"com.adobe.acr": "LuminanceAdjustmentPurple",
		"com.adobe.acr.value": "-2",
	}
	},
	{
	"action": "c2pa.color_adjustments",
	"parameters": {
		"com.adobe.acr": "LuminanceAdjustmentRed",
		"com.adobe.acr.value": "-3"
	}
	},
	{
	"action": "c2pa.color_adjustments",
	"parameters": {
		"com.adobe.acr": "LuminanceAdjustmentYellow",
		"com.adobe.acr.value": "-1",
	}
	},
	{
	"action": "c2pa.color_adjustments",
	"parameters": {
		"com.adobe.acr": "Masking",
		"com.adobe.acr.value": "Masking changed"
	}
	},
	{
	"action": "c2pa.color_adjustments",
	"parameters": {
		"com.adobe.acr": "ParametricHighlightSplit",
		"com.adobe.acr.value": "-7",
	}
	},
	{
	"action": "c2pa.color_adjustments",
	"parameters": {
		"com.adobe.acr": "ParametricMidtoneSplit",
		"com.adobe.acr.value": "-6"
	}
	},
	{
	"action": "c2pa.color_adjustments",
	"parameters": {
		"com.adobe.acr": "ParametricShadowSplit",
		"com.adobe.acr.value": "-7"
	}
	},
	{
	"action": "c2pa.color_adjustments",
	"parameters": {
		"com.adobe.acr": "PerspectiveUpright",
		"com.adobe.acr.value": "1",
	}
	},
	{
	"action": "c2pa.color_adjustments",
	"parameters": {
		"com.adobe.acr": "Point Curve",
		"com.adobe.acr.value": "Point Curve Changed"
	}
	},
	{
	"action": "c2pa.color_adjustments",
	"parameters": {
		"com.adobe.acr": "SaturationAdjustmentAqua",
		"com.adobe.acr.value": "-3",
	}
	},
	{
	"action": "c2pa.color_adjustments",
	"parameters": {
		"com.adobe.acr": "SaturationAdjustmentBlue",
		"com.adobe.acr.value": "-1",
	}
	},
	{
	"action": "c2pa.color_adjustments",
	"parameters": {
		"com.adobe.acr": "SaturationAdjustmentGreen",
		"com.adobe.acr.value": "-7",
	}
	},
	{
	"action": "c2pa.color_adjustments",
	"parameters": {
		"com.adobe.acr": "SaturationAdjustmentMagenta",
		"com.adobe.acr.value": "-3"
	}
	},
	{
	"action": "c2pa.color_adjustments",
	"parameters": {
		"com.adobe.acr": "SaturationAdjustmentOrange",
		"com.adobe.acr.value": "-3",
	}
	},
	{
	"action": "c2pa.color_adjustments",
	"parameters": {
		"com.adobe.acr": "SaturationAdjustmentYellow",
		"com.adobe.acr.value": "-3",
	}
	},
	{
	"action": "c2pa.color_adjustments",
	"parameters": {
		"com.adobe.acr": "Shadows2012",
		"com.adobe.acr.value": "48",
	}
	},
	{
	"action": "c2pa.cropped",
	"parameters": {
		"com.adobe.acr": "Crop",
		"com.adobe.acr.value": "Changed Crop Area"
	}
	},
	{
	"action": "c2pa.drawing",
	"parameters": {
		"com.adobe.acr": "Masking",
		"com.adobe.acr.value": "Masking changed"
	}
	},
	{
	"action": "c2pa.filtered",
	"parameters": {
		"com.adobe.acr": "Preset",
		"com.adobe.acr.value": "None to PL02"
	}
	},
	{
	"action": "c2pa.resized",
	"parameters": {
		"com.adobe.acr": "Upright",
		"com.adobe.acr.value": "Changed Upright"
	}
	},
	{
	"action": "c2pa.resized",
	"parameters": {
		"com.adobe.acr": "Warp",
		"com.adobe.acr.value": "Changed Warp"
	}
	}
]