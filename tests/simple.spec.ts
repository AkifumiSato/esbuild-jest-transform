import { add } from './simple';

it('adds two numbers', () => {
    const expected = 3;
    expect(add(1, 2)).toEqual(expected);
});

it('passes inside all code branches', () => {
    const alwaysExpected = 3;
    expect(add(2, 500)).toEqual(alwaysExpected);
});
