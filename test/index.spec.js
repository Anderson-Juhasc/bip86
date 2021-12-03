const BIP86 = require('../src/index');

function init(networks, slip44, pub_types, isTestnet) {
  let mnemonic = BIP86.entropyToMnemonic('00000000000000000000000000000000')
  let network;
  if(networks) {
    if (isTestnet) {
      network = networks.mainnet;
    } else {
      network = networks.testnet;
    }
  }

  let root = new BIP86.fromMnemonic(mnemonic, '', isTestnet, slip44, pub_types, network);
  let child0 = root.deriveAccount(0);
  let account0 = new BIP86.fromXPrv(child0, pub_types, networks);
  return { root, child0, account0 };
}

function initFromZpub(networks, slip44, pub_types, isTestnet) {
  let xpub = 'tpubDE9d2eQdaQrwREoNYVm63BH1TQz5XYizB3rMxeJpFsfxxzXzNGCrguxaip9shs9TLahkfvgQPNWdKXvWqCqWgKk5SxT9wuFtLQg7RQvRsTV'
  return new BIP86.fromXPub(xpub, pub_types, networks);
}

let data, account1;
describe('account0', () => {
  beforeEach(() => {
    data = init();
  });

  it("Generates correct rootPublic and rootPrivate", () => {
    expect(data.root.getRootPrivateKey()).toEqual('xprv9s21ZrQH143K3GJpoapnV8SFfukcVBSfeCficPSGfubmSFDxo1kuHnLisriDvSnRRuL2Qrg5ggqHKNVpxR86QEC8w35uxmGoggxtQTPvfUu');
    expect(data.root.getRootPublicKey()).toEqual('xpub661MyMwAqRbcFkPHucMnrGNzDwb6teAX1RbKQmqtEF8kK3Z7LZ59qafCjB9eCRLiTVG3uxBxgKvRgbubRhqSKXnGGb1aoaqLrpMBDrVxga8');
  });

  it("Generates correct root = m/86'/0'/0'", () => {
    expect(data.account0.getAccountPrivateKey()).toEqual('xprv9xgqHN7yz9MwCkxsBPN5qetuNdQSUttZNKw1dcYTV4mkaAFiBVGQziHs3NRSWMkCzvgjEe3n9xV8oYywvM8at9yRqyaZVz6TYYhX98VjsUk');
    expect(data.account0.getAccountPublicKey()).toEqual('xpub6BgBgsespWvERF3LHQu6CnqdvfEvtMcQjYrcRzx53QJjSxarj2afYWcLteoGVky7D3UKDP9QyrLprQ3VCECoY49yfdDEHGCtMMj92pReUsQ');
  });

  it("Generates correct first receiving address = m/86'/0'/0'/0/0", () => {
    expect(data.account0.getPrivateKey(0)).toEqual('KyRv5iFPHG7iB5E4CqvMzH3WFJVhbfYK4VY7XAedd9Ys69mEsPLQ');
    expect(data.account0.getPublicKey(0)).toEqual('03cc8a4bc64d897bddc5fbc2f670f7a8ba0b386779106cf1223c6fc5d7cd6fc115');
    expect(data.account0.getAddress(0)).toEqual('bc1p5cyxnuxmeuwuvkwfem96lqzszd02n6xdcjrs20cac6yqjjwudpxqkedrcr');
  });

  it("Generates correct second receiving address = m/86'/0'/0'/0/1", () => {
    expect(data.account0.getPrivateKey(1)).toEqual('L1jhNnZZAAAppoSYQuaAQEj935VpmishMomuWXgJ3Qy5HNqkhhus');
    expect(data.account0.getPublicKey(1)).toEqual('0283dfe85a3151d2517290da461fe2815591ef69f2b18a2ce63f01697a8b313145');
    expect(data.account0.getAddress(1)).toEqual('bc1p4qhjn9zdvkux4e44uhx8tc55attvtyu358kutcqkudyccelu0was9fqzwh');
  });

  it("Generates correct first change address = m/86'/0'/0'/1/0", () => {
    expect(data.account0.getPrivateKey(0, true)).toEqual('KzsCLFtWKpeNKMHFyHKT8vGRuGQxEY8CQjgLcEj14C8xK2PyEFeN');
    expect(data.account0.getPublicKey(0, true)).toEqual('02399f1b2f4393f29a18c937859c5dd8a77350103157eb880f02e8c08214277cef');
    expect(data.account0.getAddress(0, true)).toEqual('bc1p3qkhfews2uk44qtvauqyr2ttdsw7svhkl9nkm9s9c3x4ax5h60wqwruhk7');
  });
});

describe('account1', () => {
  beforeEach(() => {
    account1 = initFromZpub();
  });

  it("Generates correct root = m/86'/1'/0'", () => {
    expect(account1.getAccountPublicKey()).toEqual('tpubDE9d2eQdaQrwREoNYVm63BH1TQz5XYizB3rMxeJpFsfxxzXzNGCrguxaip9shs9TLahkfvgQPNWdKXvWqCqWgKk5SxT9wuFtLQg7RQvRsTV');
  });

  it("Generates correct first receiving address = m/86'/1'/0'/0/0", () => {
    expect(account1.getPublicKey(0)).toEqual('026f7b861432127845aac3f0685f03359d73c5009929cfa88920aaba8419e0d3fc');
    expect(account1.getAddress(0)).toEqual('tb1pw9d6svmf4zsl27qnz76fcmz9yxpeqsz0xqsed59pdh68lr4ud5vsjk506u');
  });

  it("Generates correct second receiving address = m/86'/1'/0'/0/1", () => {
    expect(account1.getPublicKey(1)).toEqual('02be3a48320efd83fb3c80c961a06b25c3049f63a0b0d9009c27ecbbca80fb2d85');
    expect(account1.getAddress(1)).toEqual('tb1p8969s4chlgj6jncd0qyqv77cha00uk7v6nnm4pzpr67u7p4jkgsqemy6yq');
  });

  it("Generates correct first change address = m/86'/1'/0'/1/0", () => {
    expect(account1.getPublicKey(0, true)).toEqual('03ee397d520b5a9e59b0813eed5f84274af42ba2fa074cd5c68ad01b1b1521ecb1');
    expect(account1.getAddress(0, true)).toEqual('tb1pk9v0nuu0cr78c9lmrl22crdjwtxhsr0ekjuv9p8hkjquwtnknxdqprjpjh');
  });

  it("Generates correct second change address = m/86'/1'/0'/1/1", () => {
    expect(account1.getPublicKey(1, true)).toEqual('0367ca30afae9d9b5374c9d34b0dc684044bf04a19c9a299b1d68bd6da173c9ccb');
    expect(account1.getAddress(1, true)).toEqual('tb1pyxakgvcv6cq2zakm599zuxs7mljfww0fj9k00w3z9e5g8uf4gujqxwws6a');
  });
});

describe('network specific', () => {
  it("Creates BTC network data", () => {
    let data = init();
    expect(data.account0.getAddress(0)).toEqual('bc1p5cyxnuxmeuwuvkwfem96lqzszd02n6xdcjrs20cac6yqjjwudpxqkedrcr');
  });
});
