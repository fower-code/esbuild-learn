import fs from "node:fs";
import path from "node:path";
import * as esbuild from 'esbuild'
import {htmlPlugin} from "@craftamap/esbuild-plugin-html";

function getHtmlTemplate(p: string) {
	const pathToFile = path.resolve(__dirname, p);
	return fs.readFileSync(pathToFile, {encoding: "utf-8"});
}

async function main() {
	const build = await esbuild.context({
		entryPoints: ['src/index.ts'],
		bundle: true,
		metafile: true,
		outdir: 'out',
		write: true,
		tsconfig: "tsconfig.json",
		// sourcemap: "inline",
		logLevel: "debug",
		plugins: [
			// {
			// 	name: "rebuild-notify",
			// 	setup(build) {
			// 		let
			// 			time= 0;
			//
			// 		build.onStart(() => {
			// 			time = Date.now();
			// 		});
			// 		build.onEnd(() => {
			// 			console.log('build finished in', Date.now() - time, 'ms')
			// 		});
			// 	},
			// },
			htmlPlugin({
				files: [
					{
						entryPoints: [
							"src/index.ts"
						],
						filename: "index.html",
						htmlTemplate: getHtmlTemplate("assets/templates/dev.html")
					},
				],
			})
		]
	})

	await build.watch();
	const server = await build.serve({
		servedir: "out",
	});

	console.log(`Listening on port: http://localhost:${server.port}`);
}

main();
