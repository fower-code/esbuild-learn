import "assets/style/main.css";
import {U8} from "~core/num";
new EventSource('/esbuild').addEventListener('change', () => location.reload());

console.log("Golang");
const a = new Uint8Array([0]);
const u8 = new U8().init(a.buffer, 0);

