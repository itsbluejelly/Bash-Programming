/**
 * A generic that flattens out any complex object type so as to inspect all of its properties
 * @param ObjectType The type of object to work with, extends `Object` type
 */
export type Prettier<ObjectType extends Object> = {
	[key in keyof ObjectType]: ObjectType[key]
} & {}

/**
 * A generic that removes the specified key from the object type at top level
 * @param ObjectType The type of object to work with
 * @param KeyType The key of the object to remove
 */
export type RemoveKey<
	ObjectType extends Object,
	KeyType extends keyof ObjectType
> = {
	[key in keyof ObjectType as key extends KeyType
		? never
		: key]: ObjectType[key]
}

/**
 * A generic type that acts as `RemoveKey` recursively in the object, removing all instances at all levels
 * @param ObjectType The type of object to work with
 * @param KeyType The key to remove in the whole object
 */
export type DeeplyRemoveKey<
	ObjectType extends Object,
	KeyType extends string | number | symbol
> = {
	[key in keyof ObjectType as key extends KeyType
		? never
		: key]: ObjectType[key] extends object
		? Prettier<DeeplyRemoveKey<ObjectType[key], KeyType>>
		: ObjectType[key]
}

/**
 * A generic alternative to `Pick` that is type safe
 * @param UnionType The union to work with
 * @param ValidType The type to pick from the union
 */
export type PickFromUnion<
	UnionType extends string | number | boolean,
	ValidType extends UnionType
> = UnionType extends ValidType ? ValidType : never
