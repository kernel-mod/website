export function groupBy(array: any[], predicate: (v: any) => string) {
	return array.reduce((acc, value) => {
		(acc[predicate(value)] ||= []).push(value);
		return acc;
	}, {});
}