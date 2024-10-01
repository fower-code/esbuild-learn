import {BinaryStruct, BinaryStructController} from "~core/binary";
import {BinaryStructAlignment} from "~core/binary/interfaces";

export interface StructScheme<T = BinaryStruct<unknown>> {
	[s: string]: T;
}

export type StructMap<T> = Map<string | Symbol, StructMapItem<T> | StructMapAlignment>;

export interface StructMapItem<T> {
	get byteLength(): number;

	init(buffer: ArrayBufferLike, offset: number): BinaryStructController<T>;
}

export interface StructMapAlignment {
	get byteLength(): number;

	init(): BinaryStructAlignment;
}
