import Struct from "~core/struct";
import {BinaryStruct} from "~core/binary";
import {StructScheme} from "~core/struct/interfaces";

export default function Tuple(...args: BinaryStruct<unknown>[]) {
	const
		scheme: StructScheme = {};

	const
		types = [...args];

	for (let i = 0; i < types.length; i++) {
		scheme[i] = types[i];
	}

	return new Struct(scheme);
};
