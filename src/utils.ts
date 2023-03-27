export function extract_tags(tags_array: string[][]) {
	const tags = new Set<string>(tags_array.flat())
	return tags
}
