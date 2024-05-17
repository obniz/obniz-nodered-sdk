const Obniz = require("obniz");
const EventEmitter = require("events");

const runScriptInVm = require("./runScriptInVm");

const vm = require("vm");

module.exports = function(RED) {

  function obniz(n) {
    RED.nodes.createNode(this,n);
    this.obnizId = n.obnizId;
    this.name = n.name;
    this.code = n.code;
    this.accessToken = n.accessToken;
    this.deviceType = n.deviceType;
    this.autoConnectOnDeploy = n.autoConnectOnDeploy;
    this.events = new EventEmitter();
    this.currentStatus = {};
    this.connected = false;
    this.context = vm.createContext({});

    this.changeStatus = (status)=>{
      status.text = `[${this.name}(${this.obnizId})]${status.text}`;
      this.currentStatus = status;
      this.status(status);
      this.events.emit("node-status", status);
    }


    // console.log("obniz-autoConnectOnDeploy" , this.autoConnectOnDeploy, typeof this.autoConnectOnDeploy);


    let option = {
      access_token : this.accessToken.length > 0   ? this.accessToken : undefined,
      auto_connect : this.autoConnectOnDeploy !== false // default :true
    }
    if(option.auto_connect === true){
      this.changeStatus({ fill: 'green', shape: 'ring', text: 'connecting...' });
    }else{
      this.changeStatus({ fill: 'red', shape: 'ring', text: 'disconnected' });
    }
    if(this.deviceType === "m5stickc"){
      this.obniz = new Obniz.M5StickC(this.obnizId, option);
    }else if(this.deviceType === "m5stack"){
      this.obniz = new Obniz.M5StackBasic(this.obnizId, option);
    }else{
      this.obniz = new Obniz(this.obnizId, option);
    }
    this.obnizParts = {};

    this.obniz.onconnect = () =>{
      this.connected = true;
      this.changeStatus({ fill: 'green', shape: 'ring', text: 'ping to obniz...' });
      this.obniz.pingWait().then( () => {
        this.changeStatus({ fill: 'green', shape: 'dot', text: 'connected' });
        runScriptInVm(RED, this, this.code, this.obniz, this.obnizParts);
        this.events.emit("after-connected");
      });
    };

    this.obniz.onclose = ()=>{
      this.connected = false;
      this.changeStatus({ fill: 'red', shape: 'ring', text: 'disconnected' });
    };

    this.on('close', ()=> {
      this.obniz.close();
      this.connected = false;
      this.changeStatus({ fill: 'red', shape: 'ring', text: 'disconnected' });
    });


  }
  RED.nodes.registerType("obniz",obniz);
}
