export type Locale = 'en' | 'ar';
export type Direction = 'ltr' | 'rtl';

type Prev = [never, 0, 1, 2, 3, 4, 5];

export type NestedKeyOf<T, Depth extends number = 4> = [Depth] extends [never]
  ? never
  : T extends object
  ? {
      [K in keyof T & (string | number)]: T[K] extends object
        ? `${K}` | `${K}.${NestedKeyOf<T[K], Prev[Depth]>}`
        : `${K}`;
    }[keyof T & (string | number)]
  : never;
