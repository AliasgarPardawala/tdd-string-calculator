interface SanitizedInput {
    delimiters: string[],
    normalizedString: string
}

function add(numbers: string): number {
    if (numbers === "")
        return 0

    const {delimiters, normalizedString} = sanitizeInput(numbers)
    const numberArray = normalizedString.split(new RegExp(delimiters.join("|"))).map(num => parseInt(num, 10))

    const negativeNumbers = numberArray.filter(num => num < 0)

    if (negativeNumbers.length > 0) {
        throw new Error(`Negative numbers not allowed: ${negativeNumbers.join(', ')}`);
    }

    return numberArray.filter(num => num <= 1000).reduce((a, c) => a + c, 0)
}

function sanitizeInput(numbers: string): SanitizedInput {
    if (numbers.startsWith('//[')) {
        const delimiterEndIndex = numbers.indexOf('\n');
        const delimiterPart = numbers.substring(2, delimiterEndIndex);
        return {
            delimiters: extractDelimiters(delimiterPart),
            normalizedString: numbers.substring(delimiterEndIndex + 1)
        }
    } else {
        return {
            delimiters: [","],
            normalizedString: numbers.replace(/\n/g, ',')
        }
    }
}

function extractDelimiters(delimiterPart: string): string[] {
    let delimiters = delimiterPart.split('][')

    delimiters = delimiters.map((d) => {
        if (d.includes("."))
            return d.replace(".", "\\.")

        if (d.includes("*"))
            return d.replace("*", "\\*")

        return d
    })

    return delimiters.map(d => d.replace('[', "").replace(']', ''))
}

export {add}