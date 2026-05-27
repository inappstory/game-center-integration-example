export function flattenObject(obj: Record<string, any>, parentKey = "", separator = "."): { key: string; value: any }[] {
    let rows: { key: string; value: any }[] = [];

    for (const [key, value] of Object.entries(obj)) {
        const newKey = parentKey ? `${parentKey}${separator}${key}` : key;

        if (value !== null && typeof value === "object" && !Array.isArray(value)) {
            rows = rows.concat(flattenObject(value, newKey, separator));
        } else if (Array.isArray(value)) {
            rows.push({ key: newKey, value: value.join(", ") });
        } else {
            rows.push({ key: newKey, value });
        }
    }

    return rows;
}
