// import Server from "@root/libs/server";
// import { ClusterService } from '@root/libs/core/cluster';
// import { exec } from "child_process";

const a = require('./build/Release/ex_util.node');
// const server = new Server();
// ClusterService.register(server.start);

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