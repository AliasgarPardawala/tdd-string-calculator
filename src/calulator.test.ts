import {add} from "./calculator";

describe('Calculator', () => {
    it('should return 0 for an empty string', () => {
        expect(add('')).toBe(0);
    });

    it('should return the number when a single number is given', () => {
        expect(add("1")).toBe(1);
        expect(add("3")).toBe(3);
        expect(add("5")).toBe(5);
    });
})