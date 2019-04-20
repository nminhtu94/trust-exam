var rimraf = require('rimraf');
var fs = require('fs');
var env = process.env.NODE_ENV;

if (env === 'test') {

  const contracts = './build/contracts/';
  const abi = './build/abi/';
  const address = './build/address/';
  rimraf(abi, (er) => {
    if (er) throw er;
    fs.mkdirSync(abi);
    fs.mkdirSync(address);
    fs.readdirSync(contracts).forEach(file => {
      var contract = require(contracts + file);
      if (Object.keys(contract.networks).length > 0) {
        contract.address = contract.networks[Object.keys(contract.networks)[0]].address;
        var content = JSON.stringify(contract.address);
        fs.writeFileSync(address + file, content);
      }
      var content = JSON.stringify(contract.abi);
      fs.writeFileSync(abi + file, content);
    });
  });

} else if (env === 'production') {

  const contracts = './build/contracts/';
  const abi = './build/abi/';
  rimraf(abi, (er) => {
    if (er) throw er;
    fs.mkdirSync(abi);
    fs.readdirSync(contracts).forEach(file => {
      var contract = require(contracts + file);
      var content = JSON.stringify(contract.abi);
      fs.writeFileSync(abi + file, content);
    });
  });

} else {
  throw 'Cannot realize enviroment';
}