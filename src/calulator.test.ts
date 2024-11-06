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

    it('should return the sum of multiple numbers separated by commas', () => {
        expect(add("1,2")).toBe(3);
        expect(add("1,2,3")).toBe(6);
        expect(add("5,10,15")).toBe(30);
    });
})