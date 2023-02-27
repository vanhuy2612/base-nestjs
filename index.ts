import Server from "@root/libs/server";
import { ClusterService } from '@root/libs/core/cluster';

// const a = require('./build/Release/ex_util.node');
const server = new Server();
ClusterService.register(server.start);

