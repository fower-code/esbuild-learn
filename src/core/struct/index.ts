import {
	StructMap,
	StructMapAlignment,
	StructMapItem,
	StructScheme

} from "~core/struct/interfaces";
import {BinaryStruct, BinaryStructController} from "~core/binary";
import StructView from "~core/struct/view";

export default class Struct<T> {
	protected scheme: StructMap<unknown>;
	protected byteLength;

	constructor(scheme: StructScheme<BinaryStruct<unknown>>) {
		let totalLength = 0;

		// const m: Map<(string | Symbol), (StructMapItem<unknown> | StructMapAlignment)> = new Map(
		// const m: Map<string | Symbol, any> = new Map(
		this.scheme = new Map(
			Object.entries(scheme).flatMap(([key, type]) => {
				const
					alignment = this.#getAlignment(totalLength, type.alignment ?? 1);

				const
					res: [(string | Symbol), StructMapItem<unknown> | StructMapAlignment][] = [];

				if (alignment !== 0) {
					res.push([
						Symbol('Alignment'),

						{
							byteLength: alignment,
							init: () => {
								return {
									get() {
										return 0;
									},
									set(_value: unknown) {
									}
								};
							}
						}
					]);

					totalLength += alignment;
				}

				res.push([
					key,

					{
						byteLength: type.byteLength,
						init: type.init.bind(type)
					}
				]);

				totalLength += type.byteLength;
				return res;
			})
		);

		this.byteLength = totalLength;
	}

	create(
		data: StructScheme<unknown>,
		buffer = new ArrayBuffer(this.byteLength),
		offset = 0
	) {
		const
			view = new StructView(buffer, this.byteLength, offset);

		this.scheme.forEach((type, key) => {
			const {get, set} = type.init(buffer, offset);

			offset += type.byteLength;

			if (typeof key === "string") {
				set(data[key]);

				Object.defineProperty(view, key, {
					enumerable: true,
					configurable: true,
					get,
					set,
				});
			}
		});

		return view;
	}

	from(buffer: ArrayBufferLike, offset = 0) {
		const
			view = new StructView(buffer, this.byteLength, offset);

		this.scheme.forEach((type, key) => {
			const currentOffset = offset;
			offset += type.byteLength;

			let
				accessors: CanNull<BinaryStructController<unknown>> = null;

			if (typeof key === "string") {
				Object.defineProperty(view, key, {
					enumerable: true,
					configurable: true,

					get: () => init().get(),

					set: (value) => {
						init().set(value);
					},
				})
			}

			function init() {
				if (accessors == null) {
					accessors = type.init(buffer, currentOffset);
				}

				return accessors;
			}
		});

		return view;
	}

	init(buffer: ArrayBufferLike, offset: number) {
		let view = this.from(buffer, offset);

		return {
			get: () => view,

			set: (data: StructScheme<BinaryStruct<unknown>>) => {
				view = this.create(data, buffer, offset);
			}
		};
	}

	#getAlignment(offset: number, size: number) {
		const remainder = offset % size;

		if (remainder === 0) {
			return 0;
		}

		return size - remainder;
	}
};
