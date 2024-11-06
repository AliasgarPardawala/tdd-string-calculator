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

    it('should handle newlines as delimiters', () => {
        expect(add('1\n2,3')).toBe(6);
        expect(add('1\n2\n3')).toBe(6);
        expect(add('1,2\n3')).toBe(6);
    });

    it('should handle custom delimiters', () => {
        expect(add('//[;]\n1;2;3')).toBe(6);
        expect(add('//[:]\n4:5:6')).toBe(15);
        expect(add('//[.]\n4.5.6')).toBe(15);
    });

    it('should throw an error when negative numbers are passed', () => {
        expect(() => add('1,-2,3')).toThrowError('Negative numbers not allowed: -2');
        expect(() => add('5,-10,15,-5')).toThrowError('Negative numbers not allowed: -10, -5');
    });

    it('should ignore numbers larger than 1000', () => {
        expect(add('2,1001,3')).toBe(5);
        expect(add('1000,1001')).toBe(1000);
        expect(add('1000,5000,10')).toBe(1010);
    });

    it('should handle multiple custom delimiters', () => {
        expect(add('//[;][%]\n1;2%3')).toBe(6); // Delimiters are ';' and '%'
        expect(add('//[*][|]\n4|5*6')).toBe(15); // Delimiters are '|' and '@'
    });
})