import {BinaryStruct, BinaryStructController} from "~core/binary";

export default class I8 implements BinaryStruct<number> {
	get byteLength() {
		return 1;
	}

	get alignment() {
		return 1;
	}

	init(buffer: ArrayBufferLike, offset: number): BinaryStructController<number> {
		const
			a = new Int8Array(buffer, offset, 1);

		return {
			get() {
				return a[0];
			},

			set(val: number) {
				a[0] = val;
			}
		};
	}
};
