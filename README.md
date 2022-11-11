# singleportscanner

The singleportscanner module is
an asynchronous JavaScript port scanner for Node.js.

Portscanner can check only a port,
and return port status
for 'open' or 'closed' statuses and connection info.

## Install

```
npm install singleportscanner
```

## Usage

```javascript
const singleportscanner = require("singleportscanner");

singleportscanner(80, "www.example.com")
  .then((res) => {
    console.log(res);
  })
  .catch((err) => console.log(err));
```

## License (MIT)

[MIT](LICENSE)
