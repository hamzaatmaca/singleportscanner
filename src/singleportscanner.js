const net = require("node:net");

let socket = new net.Socket();

module.exports = multiportscanner = (port, host) => {
  return new Promise((resolve, reject) => {
    if (!Number.isInteger(port))
      reject({ errorMessage: "Port must be integer" });
    if (host == undefined || !host) reject({ errorMessage: "Host required" });
    if (port == undefined || port == null || !port)
      reject({ errorMessage: "Port must be required" });
    if (port < 1 || port > 65535)
      reject({ error: "port must be in between 1 - 65535]" });

    let portStatus = {
      status: null,
      error: null,
      host: host,
      port: port,
      portConnectionResult: function (params) {
        if (this.status == "connect") {
          return {
            host: this.host,
            port: this.port,
            connectionMessage: "Port connection established",
            connectionError: this.error,
            port_status: "OPEN",
          };
        }
        if (this.status == "timeout" || this.status == "close") {
          return {
            host: this.host,
            port: this.port,
            connectionMessage: `Port connection ${this.status}`,
            connectionError: this.error,
            port_status: "CLOSE",
          };
        }
        if (this.error != null) {
          return {
            host: this.host,
            port: this.port,
            connectionMessage: `Port connection ${this.status}`,
            connectionError: this.error,
            port_status: "close",
          };
        }
      },
    };

    socket.on("connect", function () {
      portStatus.status = "connect";
      resolve(portStatus.portConnectionResult());
      socket.destroy();
    });
    socket.on("timeout", function () {
      portStatus.status = "timeout";
      resolve(portStatus.portConnectionResult());
      socket.destroy();
    });
    socket.on("error", (exception) => {
      portStatus.status = "error";
      portStatus.error = exception;
      reject(portStatus.portConnectionResult());
      socket.destroy();
    });
    socket.on("close", (exception) => {
      portStatus.status = "close";
      portStatus.error = exception;
      reject(portStatus.portConnectionResult());
    });

    socket.setTimeout(200);
    socket.connect(80, host);
  });
};
