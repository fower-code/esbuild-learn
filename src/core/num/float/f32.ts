import {BinaryStruct, BinaryStructController} from "~core/binary";

export default class F32 implements BinaryStruct<number> {
	get byteLength() {
		return 4;
	}

	get alignment() {
		return 4;
	}

	init(buffer: ArrayBufferLike, offset: number): BinaryStructController<number> {
		const
			a = new Float32Array(buffer, offset, 1);

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
