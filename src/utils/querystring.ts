export const parseParams = (string: string): any => {
    // Set up a new URLSearchParams object using the string.
    const params = new URLSearchParams(string)

    // Get an iterator for the URLSearchParams object.
    const entries = params.entries()

    const result = {}

    // Loop through the URLSearchParams object and add each key/value
    for (const [key, value] of entries) {
        // Split comma-separated values into an array.
        if (value.includes(',')) {
            result[key] = value.split(',')
        } else {
            result[key] = [value]
        }

        // If a key does not have a value, delete it.
        if (!value) {
            delete result[key]
        }
    }

    return result
}
export const stringifyParams = (params: ArrayLike<string>) => {
    // Set up a new URLSearchParams object.
    const searchParams = new URLSearchParams()

    // Loop through the params object and append each key/value
    // pair to the URLSearchParams object.
    for (const [key, value] of Object.entries(params)) {
        searchParams.append(key, value)

        // If a key does not have a value, delete it.
        if (!searchParams.get(key)) {
            searchParams.delete(key)
        }
    }

    // Convert the URLSearchParams object to a string.
    const searchParamsString = searchParams.toString()

    // Replace the encoded commas with commas.
    const decodedSearchParamsString = searchParamsString.replace(/%2C/g, ',')

    return decodedSearchParamsString
}