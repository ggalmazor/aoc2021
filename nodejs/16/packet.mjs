import {pad} from "../lib/strings.mjs";
import {max, min, product, sum} from "../lib/numbers.mjs";

function hex2bin(hexString) {
  return hexString.split('').map(char => pad(4, parseInt(char, 16).toString(2), '0')).join('');
}

export default class Packet {
  static fromHex(hexString) {
    return Packet.fromBin(hex2bin(hexString));
  }

  static fromBin(binaryString) {
    const version = parseInt(binaryString.substr(0, 3), 2);
    const type = parseInt(binaryString.substr(3, 3), 2);

    let rest = binaryString.substr(6);
    switch (type) {
      case 4:
        return LiteralNumber.fromBin(version, rest);
      default:
        const pair = Operator.parseSubpackets(rest)
        const subpackets = pair[0];
        rest = pair[1];
        return [Operator.of(version, type, subpackets), rest];
    }
  }

  versionSum() {
  }

  value() {
  }
}

export class LiteralNumber extends Packet {
  _value;
  version;

  constructor(version, _value) {
    super();
    this.version = version;
    this._value = _value;
  }

  static fromBin(version, binaryString) {
    const chars = binaryString.split('');
    let binaryValue = '';
    let part;
    do {
      part = chars.splice(0, 5);
      binaryValue += part.slice(1).join('');
    } while (part[0] === '1')
    return [new LiteralNumber(version, parseInt(binaryValue, 2)), chars.join('')]
  }

  versionSum() {
    return this.version;
  }

  value() {
    return this._value;
  }
}

export class Operator extends Packet {
  version;
  subpackets;
  operation;

  constructor(version, subpackets, operation) {
    super();
    this.version = version;
    this.subpackets = subpackets;
    this.operation = operation;
  }

  static parseSubpackets(binaryString) {
    if (binaryString[0] === '1')
      return Operator.parseSubpacketsByCount(binaryString);

    return Operator.parseSubpacketsByTotalLength(binaryString);
  }

  static parseSubpacketsByCount(binaryString) {
    const subpacketCount = parseInt(binaryString.substr(1, 11), 2)
    const subpackets = [];
    let rest = binaryString.substr(12);
    do {
      const pair = Packet.fromBin(rest);
      subpackets.push(pair[0]);
      rest = pair[1];
    } while (subpackets.length < subpacketCount)
    return [subpackets, rest];
  }

  static parseSubpacketsByTotalLength(binaryString) {
    const totalLength = parseInt(binaryString.substr(1, 15), 2);
    const subpackets = [];
    let rest = binaryString.substr(16, totalLength);
    do {
      const pair = Packet.fromBin(rest);
      subpackets.push(pair[0]);
      rest = pair[1];
    } while (rest.length > 0)
    return [subpackets, rest + binaryString.substr(16 + totalLength)];
  }

  static of(version, type, subpackets) {
    switch (type) {
      case 0:
        return new Operator(version, subpackets, values => values.reduce(sum, 0));
      case 1:
        return new Operator(version, subpackets, values => values.reduce(product, 1));
      case 2:
        return new Operator(version, subpackets, values => values.reduce(min, Number.MAX_SAFE_INTEGER));
      case 3:
        return new Operator(version, subpackets, values => values.reduce(max, -1 * Number.MAX_SAFE_INTEGER));
      case 5:
        return new Operator(version, subpackets, ([a, b]) => a > b ? 1 : 0);
      case 6:
        return new Operator(version, subpackets, ([a, b]) => a < b ? 1 : 0);
      case 7:
        return new Operator(version, subpackets, ([a, b]) => a === b ? 1 : 0);
    }
  }

  versionSum() {
    return this.version + this.subpackets.map(p => p.versionSum()).reduce(sum, 0);
  }

  value() {
    return this.operation(this.subpackets.map(p => p.value()));
  }
}
