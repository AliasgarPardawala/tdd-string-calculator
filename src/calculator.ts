function add(numbers: string): number {
    if (numbers === "")
        return 0

    return numbers.split(",").reduce((a,c) => a + parseInt(c), 0)
}

export {add}