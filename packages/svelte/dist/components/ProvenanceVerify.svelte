<script lang="ts">
    import { classNames } from 'syw-common/helpers/ui'
    import { getVerifyUrl } from 'syw-common/helpers/data'
    import { VERIFY_BASE_URL } from 'syw-common/constants/ui'
    import { getI18nContext } from '../store/i18n.js'
    import { getDataContext } from '../store/data.js'

	const {
		locale,
		getText,
	} = getI18nContext()
	const { src } = getDataContext();

	const verifyUrl = $derived(getVerifyUrl($src ?? ''))
</script>

<div class={classNames('ProvenanceVerify')}>
	{getText($locale, 'verify', 'pre')}
	<a
		href={verifyUrl}
		target='_blank'
	>
		{VERIFY_BASE_URL}
	</a>
</div>