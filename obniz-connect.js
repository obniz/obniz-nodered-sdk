const runScriptInVm = require("./runScriptInVm");

module.exports = function (RED) {

  function obniz(n) {
    RED.nodes.createNode(this, n);
    this.obnizNode = RED.nodes.getNode(n.obniz);
    this.name = n.name;
    this.timeout = parseInt(n.timeout);
    if(!this.timeout || isNaN(this.timeout)){
      this.timeout = 60;
    }

    if (this.obnizNode) {
      this.status(this.obnizNode.currentStatus);
      this.obnizNode.events.on("node-status", (status) => {
        this.status(status);
      });
    }


    this.on('input', function (msg, send, done) {
      // console.log("obniz-connect" , this.timeout, typeof this.timeout);
      this.obnizNode.obniz.connectWait({timeout: this.timeout }).then((results) => {
        if(results){
          send([msg, null]);
        } else{
          send([null, msg]);
        }
      }).catch((err) => {
        send([null, msg]);
      });

    });
  }
  RED.nodes.registerType("obniz-connect", obniz);
}

