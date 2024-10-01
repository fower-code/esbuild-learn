export interface BinaryStruct<T> {
	get byteLength(): number;

	get alignment(): number;

	init(buffer: ArrayBufferLike, offset: number): BinaryStructController<T>;
}

export interface BinaryStructController<T> {
	get(): T;
	set(val: T): void;
}

export interface BinaryStructAlignment {
	get(): void;
	set(val: unknown): void;
}
