import C2PA_TRUST_LIST from './c2pa/index.js'
import C2PA_INTERIM_TRUST_LIST from './c2pa-interim/index.js'
import IPTC_TRUST_LIST from './iptc/index.js'
export {
	C2PA_TRUST_LIST,
	C2PA_INTERIM_TRUST_LIST,
	IPTC_TRUST_LIST
}
export const TRUST_LISTS = {
	'c2pa': C2PA_TRUST_LIST,
	'c2pa-interim': C2PA_INTERIM_TRUST_LIST,
	'iptc': IPTC_TRUST_LIST
}
export default TRUST_LISTS