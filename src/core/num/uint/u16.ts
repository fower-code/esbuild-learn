import {BinaryStruct, BinaryStructController} from "~core/binary";

export default class U16 implements BinaryStruct<number> {
	get byteLength() {
		return 2;
	}

	get alignment() {
		return 2;
	}

	init(buffer: ArrayBufferLike, offset: number): BinaryStructController<number> {
		const
			a = new Uint16Array(buffer, offset, 1);

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
