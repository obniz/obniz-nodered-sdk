## node-red obniz node


This library add obniz node to your Node-RED.

It uses [obniz websocket api](https://obniz.io/doc/about_obniz_api).


## What is obniz

Obniz is system of Electronics as a Service.
You can find the documentation on [the website](https://obniz.io/doc/).



## Install
Run the following command in the root directory of your Node-RED install:
```
npm install node-red-contrib-obniz
```

or 

1. Go to "Palette Manager" menu on your Node-RED
2. Search "obniz" on Node-RED Library
3. Click "Install"



## Node type

There are two types of nodes in the obniz node.

- obniz repeat node

![](./img/obniz-repeat.png)

It is used when you want to get data periodically, for example for sensing.


- obniz function node


![](./img/obniz-function.png)

You can use it to create output via obniz, such as obniz.display.
You can also output the information obtained through obniz.


- obniz connect node


![](./img/obniz-connect.png)

Used when you want to control the connection to obniz independently of starting/stopping node-red.
When input is received, node-red connects to obniz.
If the connection succeeds, the output is number 1, and if the connection fails, the output is number 2.

- obniz close node


![](./img/obniz-close.png)

Used when you want to control the connection to obniz independently of starting/stopping node-red.
If it can be successfully closed, the output is sent to the next node.
## How to use 

### Common.

Both the obniz repeat node and the obniz function node require you to specify which obniz device to use.

Add an obniz by selecting "Add a new obniz" in the properties of each node.

![](./img/obniz-func-property.png)

Here are the settings for adding

![](./img/obniz-config.png)

The initialization process allows you to set up the parts library and more.

There are two variables defined here, obniz and obnizParts.
An instance of obniz is set in the obnizParts variable, so you can set
You can write `obniz.display.print("hello")` and so on.

The obnizParts is set to a common object in all obniz nodes.
You can store the obniz.wired parts and use them in your obniz repeat/function nodes

![](./img/sample-config.png)

### obniz repeat node

This is the code to repeat the process while obniz is online.
As with the common configuration, there are two variables defined: obniz and obnizParts.


![](./img/sample-repeat.png)

You can use this method as the function node.
Use the `return msg` in order to output the message.

Use `node.done()` and `node.send(msg)` for asynchronous processing.



### obniz function node

This is the code to repeat the process while obniz is online.
As with the common configuration, there are two variables defined: obniz and obnizParts.


! [](./img/sample-function.png)
You can use this method as the function node.
Use the `return msg` in order to output the message.

Use `node.done()` and `node.send(msg)` to perform asynchronous processing.



## LICENSE
See [LICENSE.txt](./LICENSE.txt)
