export default class StructView {
	protected _buffer;
	protected _byteLength;
	protected _byteOffset;

	get buffer() {
		return this._buffer;
	}

	get byteLength() {
		return this._byteLength;
	}

	get offset() {
		return this._byteOffset;
	}

	constructor(
		buffer: ArrayBufferLike,
		byteLength: number,
		offset: number
	) {
		this._buffer = buffer;
		this._byteLength = byteLength;
		this._byteOffset = offset;
	}
};
