import Server from "./libs/server";
import { exec } from "child_process";
import * as moment from 'moment';

const a = require('./build/Release/ex_util.node');
// const server = new Server();
// server.start();

// console.log("Process path: ", process.execPath);
// const platform: NodeJS.Platform = process.platform;
// let command: string = "";
// switch (platform) {
//     default: {
//         command = `bash ./bash/run.sh`;
//     }
// }

// exec(command, (err, stdout, stderr) => {
//     if (err) {
//         console.log(err);
//         return;
//     }
//     console.log(stdout, stderr);
// });

console.log(a);