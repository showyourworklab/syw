import { classNames } from 'syw-common/helpers/ui'
import type { TypeBadgeProps } from 'syw-common/types/components'
import { useI18nContext } from '$src/context/i18n'
import Badge from './Badge'

const TypeBadge = ({
	value,
}: TypeBadgeProps) => {
	const { getText } = useI18nContext()
	const label = getText("type", value?.key ?? '')
	return (
		<Badge
			type={value}
			className={classNames(
				"TypeBadge"
			)}
		>
			{label}
		</Badge>
	)
}

export default TypeBadge
