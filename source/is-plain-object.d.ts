import type {IsAny} from './is-any.d.ts';
import type {MapsSetsOrArrays, NonRecursiveType} from './internal/type.d.ts';

/**
Returns a boolean for whether the given type is a plain key-value object.

Useful for type guards and conditional types that should only match plain `{}`/`Record<...>` objects, excluding arrays, functions, classes, and built-in instances like `Date` or `RegExp`.

Checks unions as a whole: Every member must be a plain object. Returns `false` for `any`, `never`, and `unknown`.

@example
```
import type {IsPlainObject} from 'type-fest';

type Simple = IsPlainObject<{name: string}>;
//=> true

type RecordType = IsPlainObject<Record<string, unknown>>;
//=> true

type Empty = IsPlainObject<{}>;
//=> true

type ArrayType = IsPlainObject<string[]>;
//=> false

type FunctionType = IsPlainObject<() => void>;
//=> false

type DateInstance = IsPlainObject<Date>;
//=> false
```

@example
```
import type {IsPlainObject} from 'type-fest';

type PlainObjectProperties<Value> = {
	[Key in keyof Value as IsPlainObject<Value[Key]> extends true ? Key : never]: Value[Key];
};

type UserConfig = PlainObjectProperties<{
	id: number;
	tags: string[];
	metadata: {created: string; version: number};
	handler: () => void;
}>;
//=> {metadata: {created: string; version: number}}
```

@category Type Guard
@category Object
@category Utilities
*/
export type IsPlainObject<Value> =
	IsAny<Value> extends true
		? false
		: [Value] extends [never]
			? false
			: [Value] extends [object]
				? Extract<Value, NonRecursiveType | MapsSetsOrArrays> extends never
					? true
					: false
				: false;

export {};
