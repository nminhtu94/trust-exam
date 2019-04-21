const config = {
  development: {
    addressPath: "dist/address/development",
    endPoint: "http://localhost:8545",
    // rootPrivateKey: "2bdd21761a483f71054e14f5b827213567971c676928d9a1808cbfa4b7501200",
    // rootAddress: "0xDf08F82De32B8d460adbE8D72043E3a7e25A3B39"
  },
  staging: {
    addressPath: "dist/address/ganache_server",
    endPoint: "http://localhost:8545",
    // rootPrivateKey: "2bdd21761a483f71054e14f5b827213567971c676928d9a1808cbfa4b7501200",
    // rootAddress: "0xDf08F82De32B8d460adbE8D72043E3a7e25A3B39"
  },
  production: {
    addressPath: "dist/address/rinkeby",
    endPoint: "https://rinkeby.infura.io/V41ku14YR3nX4FYP1Zdx",
    // rootPrivateKey: "360E648F231C4867A736ED171CAF1DDD639DBD37E86FCCE42F9D905705DAF74E",
    // rootAddress: "0x348B1536B8B51A231CAE385322ca62F3b62B717e"
  },
}

export default config;