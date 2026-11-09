import type {IfNotAnyOrNever} from './internal/type.d.ts';
import type {_SplitOnRestElement} from './split-on-rest-element.d.ts';
import type {UnknownArray} from './unknown-array.d.ts';

/**
Extract the type of the first element of an array.

Use-case: Defining the return type of functions that extract the first element of an array, for example [`lodash.head`](https://lodash.com/docs/4.17.15#head) or [`lodash.first`](https://lodash.com/docs/4.17.15#first).

@example
```
import type {FirstArrayElement} from 'type-fest';

declare function firstOf<const V extends readonly any[]>(array: V): FirstArrayElement<V>;

const first1 = firstOf(['foo', 'bar']);
//=> 'foo'

const first2 = firstOf([10, true, false, 'baz']);
//=> 10
```

Note: When the array starts with a rest element, the first element's position becomes ambiguous. In such cases, the result is a union of the types of all elements that could potentially be the first element of the array.

@example
```
import type {FirstArrayElement} from 'type-fest';

type A = FirstArrayElement<[...string[], number]>;
//=> string | number

type B = FirstArrayElement<[...string[], number, boolean]>;
//=> string | number
```

Note: If an empty array is a valid value for the array type, the result includes an `undefined`. This aligns with the runtime behavior of `[].at(0)`.

@example
```
import type {FirstArrayElement} from 'type-fest';

type A = FirstArrayElement<[]>;
//=> undefined

// `[]` is assignable to `string[]`
type B = FirstArrayElement<string[]>;
//=> string | undefined

// `[]` is assignable to `[string?, number?]`
type C = FirstArrayElement<[string?, number?]>;
//=> string | undefined
```

@category Array
@category Template literal
*/
export type FirstArrayElement<TArray extends UnknownArray> =
	IfNotAnyOrNever<TArray, {
		ifNot: TArray extends UnknownArray // For distributing `TArray`
			? number extends TArray['length']
				? _FirstArrayElement<TArray>
				// A fixed-length tuple can be read directly from the start. A length refinement on an ordinary array has no tuple keys, so it still needs the array fallback.
				: '0' extends keyof TArray
					? BeforeRestFirstElement<TArray>
					: _FirstArrayElement<TArray>
			: never;
	}>;

type _FirstArrayElement<TArray extends UnknownArray> =
	_SplitOnRestElement<TArray, {preserveOptionalModifier: true}> extends readonly [infer BeforeRest extends UnknownArray, infer Rest extends UnknownArray, infer AfterRest extends UnknownArray]
		? '0' extends keyof BeforeRest
			? BeforeRestFirstElement<BeforeRest>
			: Rest[number] | FirstOfAfterRest<AfterRest>
		: never;

type BeforeRestFirstElement<BeforeRest extends UnknownArray> =
	BeforeRest extends readonly [infer First, ...unknown[]]
		? First
		: BeforeRest[0];

type FirstOfAfterRest<AfterRest extends UnknownArray> =
	'0' extends keyof AfterRest
		? BeforeRestFirstElement<AfterRest>
		: undefined;

export {};
