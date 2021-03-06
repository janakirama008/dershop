import { CorejamServer } from "@corejam/base/dist/Server";
const { send } = require("micro");
const cors = require("micro-cors")();

try {
  require("../../resolvers.js");
} catch (e) {
  console.log("runtime generation");
}

export const config = {
  api: {
    bodyParser: false,
  },
};

let corejam;

const server = async () => {
  if (!corejam) {
    corejam = await CorejamServer();
  }

  return corejam
}

const handler = async (req, res) => {
  if (req.method === "OPTIONS") {
    return send(res, 200, "ok!");
  }

  return (await server()).createHandler({ path: "/api/graphql" })(req, res);
};

export default cors(handler);
