import {expectTypeOf} from 'nz';
import type {FirstArrayElement, TupleOf} from '../index.d.ts';

// Empty array
expectTypeOf<FirstArrayElement<[]>>().toBe<undefined>();
expectTypeOf<FirstArrayElement<readonly []>>().toBe<undefined>();

// Only required elements
expectTypeOf<FirstArrayElement<[number, string, boolean]>>().toBe<number>();
expectTypeOf<FirstArrayElement<readonly [number, string, boolean]>>().toBe<number>();

// Required and optional elements
expectTypeOf<FirstArrayElement<[1, 2, 3?]>>().toBe<1>();
expectTypeOf<FirstArrayElement<readonly [1, 2?, 3?]>>().toBe<1>();
expectTypeOf<FirstArrayElement<[null, string, bigint?, boolean?, number?]>>().toBe<null>();

// Required and rest element
expectTypeOf<FirstArrayElement<[1, 2, 3, ...string[]]>>().toBe<1>();
expectTypeOf<FirstArrayElement<readonly [1, ...string[]]>>().toBe<1>();
expectTypeOf<FirstArrayElement<[1, ...boolean[], 'x', 'y', 'z']>>().toBe<1>();

// Rest element at the start
expectTypeOf<FirstArrayElement<[...string[], number]>>().toBe<string | number>();
expectTypeOf<FirstArrayElement<readonly [...boolean[], string]>>().toBe<boolean | string>();
expectTypeOf<FirstArrayElement<[...bigint[], number, boolean]>>().toBe<bigint | number>();
expectTypeOf<FirstArrayElement<[...never[], 2]>>().toBe<2>();

// Only optional elements
expectTypeOf<FirstArrayElement<['a'?]>>().toBe<'a' | undefined>();
expectTypeOf<FirstArrayElement<readonly [{data: string[]}?]>>().toBe<{data: string[]} | undefined>();
expectTypeOf<FirstArrayElement<[string?, boolean?, bigint?]>>().toBe<string | undefined>();

// Explicit `undefined` in optional elements
expectTypeOf<FirstArrayElement<[(2 | undefined)?]>>().toBe<2 | undefined>();
expectTypeOf<FirstArrayElement<readonly [0, (2 | undefined)?]>>().toBe<0>();

// Labelled tuples
expectTypeOf<FirstArrayElement<[x: number, y: string]>>().toBe<number>();
expectTypeOf<FirstArrayElement<readonly [x: string, y?: number]>>().toBe<string>();
expectTypeOf<FirstArrayElement<[...rest: number[], last: string]>>().toBe<number | string>();

// Union elements
expectTypeOf<FirstArrayElement<['a' | 'b', 'c']>>().toBe<'a' | 'b'>();
expectTypeOf<FirstArrayElement<[1 | 'a', 2 | 'b', 3 | 'c']>>().toBe<1 | 'a'>();

// Unions
expectTypeOf<FirstArrayElement<[1, 2, 3] | [4, 5, 6]>>().toBe<1 | 4>();
expectTypeOf<FirstArrayElement<readonly [string, number] | bigint[]>>().toBe<string | bigint | undefined>();
expectTypeOf<FirstArrayElement<[1, 2] | [...string[], boolean]>>().toBe<1 | string | boolean>();

// Non-tuple arrays
expectTypeOf<FirstArrayElement<string[]>>().toBe<string | undefined>();
expectTypeOf<FirstArrayElement<readonly number[]>>().toBe<number | undefined>();
expectTypeOf<FirstArrayElement<ReadonlyArray<number | bigint>>>().toBe<number | bigint | undefined>();
expectTypeOf<FirstArrayElement<any[]>>().toBe<any | undefined>();
expectTypeOf({} as any as FirstArrayElement<never[]>).toBe<undefined>();

// Boundary cases
expectTypeOf<FirstArrayElement<any>>().toBe<any>();
expectTypeOf<FirstArrayElement<never>>().toBe<never>();

// Large tuples
expectTypeOf<FirstArrayElement<['first', ...TupleOf<1100>]>>().toBe<'first'>();
expectTypeOf<FirstArrayElement<readonly ['first', ...TupleOf<1100>]>>().toBe<'first'>();

// Required values keep an explicit `undefined`
expectTypeOf<FirstArrayElement<readonly [string | undefined]>>().toBe<string | undefined>();
expectTypeOf<FirstArrayElement<[undefined, 1]>>().toBe<undefined>();
expectTypeOf<FirstArrayElement<[1 | undefined, 2]>>().toBe<1 | undefined>();

// Uninhabitable elements
expectTypeOf<FirstArrayElement<[never]>>().toBe<never>();
expectTypeOf<FirstArrayElement<[never?]>>().toBe<undefined>();
expectTypeOf<FirstArrayElement<[1, ...never[]]>>().toBe<1>();
expectTypeOf<FirstArrayElement<readonly [unknown]>>().toBe<unknown>();

// Length refinement on ordinary arrays
expectTypeOf<FirstArrayElement<string[] & {length: 3}>>().toBe<string | undefined>();
expectTypeOf<FirstArrayElement<readonly string[] & {readonly length: 3}>>().toBe<string | undefined>();
expectTypeOf<FirstArrayElement<never[] & {length: 3}>>().toBe<undefined>();
expectTypeOf<FirstArrayElement<unknown[] & {length: 3}>>().toBe<unknown>();
expectTypeOf<FirstArrayElement<any[] & {length: 3}>>().toBe<any>();
