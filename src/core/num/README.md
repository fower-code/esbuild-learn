# core/num

## Example:

```js
import {U8} from "~core/num";

const a = new Uint8Array([0,2]);

const u8 = new U8().init(a.buffer, 1);
// 2
console.log(u8.get());
u8.set(15);

// 15
console.log(u8.get());

// [0, 15]
console.log([...a])
```
