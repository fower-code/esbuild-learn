import {BinaryStruct, BinaryStructController} from "~core/binary";

export default class F32 implements BinaryStruct<number> {
	get byteLength() {
		return 8;
	}

	get alignment() {
		return 8;
	}

	init(buffer: ArrayBufferLike, offset: number): BinaryStructController<number> {
		const
			a = new Float64Array(buffer, offset, 1);

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
