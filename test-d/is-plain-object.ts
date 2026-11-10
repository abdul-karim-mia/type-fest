import {expectTypeOf} from 'nz';
import type {IsPlainObject} from '../index.d.ts';

// Plain objects and records
expectTypeOf<IsPlainObject<{}>>().toBe<true>();
expectTypeOf<IsPlainObject<{a: 1}>>().toBe<true>();
expectTypeOf<IsPlainObject<{a: 1; b: string}>>().toBe<true>();
expectTypeOf<IsPlainObject<{a: 1} & {b: 2}>>().toBe<true>();
expectTypeOf<IsPlainObject<Record<string, unknown>>>().toBe<true>();
expectTypeOf<IsPlainObject<Record<string, any>>>().toBe<true>();
expectTypeOf<IsPlainObject<Record<number, string>>>().toBe<true>();
expectTypeOf<IsPlainObject<object>>().toBe<true>();
expectTypeOf<IsPlainObject<Object>>().toBe<true>();

// Arrays and tuples
expectTypeOf<IsPlainObject<[]>>().toBe<false>();
expectTypeOf<IsPlainObject<[1, 2, 3]>>().toBe<false>();
expectTypeOf<IsPlainObject<string[]>>().toBe<false>();
expectTypeOf<IsPlainObject<readonly number[]>>().toBe<false>();

// Functions and constructors
expectTypeOf<IsPlainObject<() => void>>().toBe<false>();
expectTypeOf<IsPlainObject<new () => unknown>>().toBe<false>();
expectTypeOf<IsPlainObject<Function>>().toBe<false>();

// Built-in instances and collections
expectTypeOf<IsPlainObject<Date>>().toBe<false>();
expectTypeOf<IsPlainObject<RegExp>>().toBe<false>();
expectTypeOf<IsPlainObject<Map<string, number>>>().toBe<false>();
expectTypeOf<IsPlainObject<Set<string>>>().toBe<false>();
expectTypeOf<IsPlainObject<WeakMap<object, number>>>().toBe<false>();
expectTypeOf<IsPlainObject<WeakSet<object>>>().toBe<false>();
expectTypeOf<IsPlainObject<Promise<void>>>().toBe<false>();
expectTypeOf<IsPlainObject<ArrayBuffer>>().toBe<false>();
expectTypeOf<IsPlainObject<DataView>>().toBe<false>();
expectTypeOf<IsPlainObject<Uint8Array>>().toBe<false>();

// Primitives
expectTypeOf<IsPlainObject<1>>().toBe<false>();
expectTypeOf<IsPlainObject<1n>>().toBe<false>();
expectTypeOf<IsPlainObject<'foo'>>().toBe<false>();
expectTypeOf<IsPlainObject<string>>().toBe<false>();
expectTypeOf<IsPlainObject<number>>().toBe<false>();
expectTypeOf<IsPlainObject<bigint>>().toBe<false>();
expectTypeOf<IsPlainObject<boolean>>().toBe<false>();
expectTypeOf<IsPlainObject<true>>().toBe<false>();
expectTypeOf<IsPlainObject<false>>().toBe<false>();
expectTypeOf<IsPlainObject<symbol>>().toBe<false>();
expectTypeOf<IsPlainObject<null>>().toBe<false>();
expectTypeOf<IsPlainObject<undefined>>().toBe<false>();
expectTypeOf<IsPlainObject<void>>().toBe<false>();

// Boundary types
expectTypeOf<IsPlainObject<any>>().toBe<false>();
expectTypeOf<IsPlainObject<never>>().toBe<false>();
expectTypeOf<IsPlainObject<unknown>>().toBe<false>();

// Unions
// Every member must be a plain object.
expectTypeOf<IsPlainObject<{a: 1} | {b: 2}>>().toBe<true>();
expectTypeOf<IsPlainObject<Record<string, number> | {a: 1}>>().toBe<true>();

// Mixed unions with non-plain-objects return false.
expectTypeOf<IsPlainObject<string | {a: 1}>>().toBe<false>();
expectTypeOf<IsPlainObject<number | {a: 1}>>().toBe<false>();
expectTypeOf<IsPlainObject<Date | {a: 1}>>().toBe<false>();
expectTypeOf<IsPlainObject<null | {a: 1}>>().toBe<false>();
expectTypeOf<IsPlainObject<undefined | {a: 1}>>().toBe<false>();
expectTypeOf<IsPlainObject<number[] | {a: 1}>>().toBe<false>();
