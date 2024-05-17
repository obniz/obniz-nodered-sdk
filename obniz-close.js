const runScriptInVm = require("./runScriptInVm");

module.exports = function (RED) {

  function obniz(n) {
    RED.nodes.createNode(this, n);
    this.obnizNode = RED.nodes.getNode(n.obniz);
    this.name = n.name;

    if (this.obnizNode) {
      this.status(this.obnizNode.currentStatus);
      this.obnizNode.events.on("node-status", (status) => {
        this.status(status);
      });
    }


    this.on('input', function (msg, send, done) {
      this.obnizNode.obniz.closeWait().then(() => {
        send(msg);
        // if (done) {
        //   done();
        // }
      }).catch((err) => {
        // if (done) {
        //   done(err);
        // }
      });

    });
  }

  RED.nodes.registerType("obniz-close", obniz);
}
