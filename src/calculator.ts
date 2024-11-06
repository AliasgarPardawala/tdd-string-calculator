function add(numbers: string): number {
    if (numbers === "")
        return 0

    const normalizedString = numbers.replace(/\n/g, ',');


    return normalizedString.split(",").reduce((a, c) => a + parseInt(c), 0)
}

export {add}