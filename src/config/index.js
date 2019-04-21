import blockchain from './blockchain.config';

const env = process.env.REACT_APP_ENV || (process.env.NODE_ENV || 'development');

export default {
  blockchain: blockchain[env],
}
