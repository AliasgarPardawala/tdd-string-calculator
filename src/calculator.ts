enum OperationTypes {
    ADD = "ADD",
    MULTIPLY = "MULTIPLY",
}

interface SanitizedInput {
    operationType: OperationTypes;
    delimiters: string[],
    normalizedString: string
}

function add(numbers: string): number {
    if (numbers === "")
        return 0

    const {operationType, delimiters, normalizedString} = sanitizeInput(numbers)
    const numberArray =
        normalizedString
            .split(new RegExp(`[${delimiters.join(",")}]`))
            .map(num => parseInt(num, 10))
            .filter(num => num <= 1000)

    const negativeNumbers = numberArray.filter(num => num < 0)

    if (negativeNumbers.length > 0) {
        throw new Error(`Negative numbers not allowed: ${negativeNumbers.join(', ')}`);
    }

    return operationType === OperationTypes.ADD ? sum(numberArray) : multiply(numberArray)
}

function sanitizeInput(numbers: string): SanitizedInput {
    if (numbers.startsWith('//[')) {
        const delimiterEndIndex = numbers.indexOf('\n');
        const delimiterPart = numbers.split("\n")[0].substring(2);
        const delimiters = extractDelimiters(delimiterPart)
        return {
            operationType: getOperationType(delimiters),
            delimiters: delimiters,
            normalizedString: numbers.substring(delimiterEndIndex + 1)
        }
    } else {
        return {
            operationType: OperationTypes.ADD,
            delimiters: [","],
            normalizedString: numbers.replace(/\n/g, ',')
        }
    }
}

function extractDelimiters(delimiterPart: string): string[] {
    return delimiterPart.split('][').map(d => d.replace('[', "").replace(']', ''))
}

const sum = (numbers: number[]): number => numbers.reduce((a, c) => a + c, 0)

const multiply = (numbers: number[]): number => numbers.reduce((a, c) => a * c, 1)

function getOperationType(delimiters: string[]): OperationTypes {

    if (delimiters.includes("*") && delimiters.length === 1)
        return OperationTypes.MULTIPLY

    return OperationTypes.ADD
}

export {add}