/**
 * Get an object's value by a key using a case-insensitive match
 * @function
 * @param key - String key of the desired value (case-insensitive)
 * @param object - Any object
 * @returns Whatever the value is
 */
export const getObjectValue = (key: string | null | undefined, object: Record<string, unknown> | null | undefined): unknown => {
	const safeKey = key && object
		? Object.keys(object).find((value, index) =>
			String(key).toLowerCase() === String(value).toLowerCase()
		) : null;
	return safeKey && object?.hasOwnProperty(safeKey) ? object[safeKey] : null;
}
