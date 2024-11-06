interface SanitizedInput {
    delimiter: string,
    normalizedString: string
}

function add(numbers: string): number {
    if (numbers === "")
        return 0

    const {delimiter, normalizedString} = sanitizeInput(numbers)

    return normalizedString.split(delimiter).map(num => parseInt(num, 10)).reduce((a, c) => a + c, 0)
}

function sanitizeInput(numbers: string): SanitizedInput {
    if (numbers.startsWith('//')) {
        const delimiterEndIndex = numbers.indexOf('\n');
        return {
            delimiter: numbers.substring(2, delimiterEndIndex),
            normalizedString: numbers.substring(delimiterEndIndex + 1)
        }
    } else {
        return {
            delimiter: ",",
            normalizedString: numbers.replace(/\n/g, ',')
        }
    }
}

export {add}