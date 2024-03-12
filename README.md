# MyInfo
Displays information about your system, device and network.

![Lib Name](https://img.shields.io/static/v1?label=Librairy&message=MyInfo&color=blue) ![Version](https://img.shields.io/npm/v/myinfo.svg?logo=npm) ![Stars](https://img.shields.io/github/stars/GsLKS/MyInfo)

### Command Usage (INSTALLING):

**NPM**
```shell
npm install -g myinfo
```
### Command Usage (Using)

Use `MyInfo` easily with just a command:
```
myinfo
```

**WARNING:** If your `MyInfo` is broken, try running the command down below:
```
mifix
```

### Usage (API)

You can also use `MyInfo` as a librairy normaly.

**Importing 'MyInfo'**

```js
const mi = require("myinfo");
```

**Basic Script**

* This is similar to using the normal command.

```js
async function MyInfoNormal() {
    // normal output
  try {
    // do something...
    const Mi = await mi({ output: "normal" });
    return await Mi;
  } catch (error) {
    return;
  }
}

MyInfoNormal();
```

* Using json allows for easy integration into applications

```js
async function MyInfoJson() {
  // json usage
  try {
    const Mi = await mi({ output: "json" });
    // do somenthing
    // example
    console.log(JSON.parse(Mi));
    // example: console.log(JSON.parse(Mi).ip); 
    // shows ip
  } catch (error) {
    return;
  }
}
```

### Info
`'MyInfo'` displays system information, allowing general use of the informations.
