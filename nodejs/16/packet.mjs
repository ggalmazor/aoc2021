import {pad} from "../lib/strings.mjs";
import {product, sum} from "../lib/numbers.mjs";

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

  constructor(version, subpackets) {
    super();
    this.version = version;
    this.subpackets = subpackets;
  }

  static fromBin(version, type, binaryString) {
    return binaryString[0] === '1'
      ? Operator.parseBySubpacketCount(version, type, binaryString.slice(1))
      : Operator.parseByTotalLength(version, type, binaryString.slice(1));
  }

  static parseSubpackets(binaryString) {
    if (binaryString[0] === '1') {
      const subpackets = [];
      let rest;
      const subpacketCount = parseInt(binaryString.substr(1, 11), 2)
      rest = binaryString.substr(12);
      do {
        const pair = Packet.fromBin(rest);
        subpackets.push(pair[0]);
        rest = pair[1];
      } while (subpackets.length < subpacketCount)
      return [subpackets, rest];
    } else {
      const subpackets = [];
      let rest;
      const totalLength = parseInt(binaryString.substr(1, 15), 2);
      rest = binaryString.substr(16, totalLength);
      do {
        const pair = Packet.fromBin(rest);
        subpackets.push(pair[0]);
        rest = pair[1];
      } while (rest.length > 0)
      return [subpackets, rest + binaryString.substr(16 + totalLength)];
    }
  }

  static of(version, type, subpackets) {
    switch (type) {
      case 0:
        return new Sum(version, subpackets);
      case 1:
        return new Product(version, subpackets);
      case 2:
        return new Min(version, subpackets);
      case 3:
        return new Max(version, subpackets);
      case 5:
        return new GreaterThan(version, subpackets);
      case 6:
        return new LessThan(version, subpackets);
      case 7:
        return new EqualTo(version, subpackets);
    }
  }

  static parseBySubpacketCount(version, type, binaryString) {
    const subpacketCount = parseInt(binaryString.substr(0, 11), 2);
    let rest = binaryString.substr(11);
    const subpackets = [];
    do {
      const pair = Packet.fromBin(rest);
      subpackets.push(pair[0]);
      rest = pair[1];
    } while (subpackets.length < subpacketCount)
    return [new Operator(version, subpackets), rest];
  }

  static parseByTotalLength(version, type, binaryString) {
    const totalLength = parseInt(binaryString.substr(0, 15), 2);
    let rest = binaryString.substr(15, totalLength);
    const subpackets = [];
    do {
      const pair = Packet.fromBin(rest);
      subpackets.push(pair[0]);
      rest = pair[1];
    } while (rest.length > 0)
    return [new Operator(version, subpackets), rest + binaryString.substr(15 + totalLength)];
  }

  versionSum() {
    return this.version + this.subpackets.map(p => p.versionSum()).reduce(sum, 0);
  }
}

export class Sum extends Operator {
  constructor(version, subpackets) {
    super(version, subpackets);
  }

  value() {
    return this.subpackets.map(e => e.value()).reduce(sum, 0);
  }
}

export class Product extends Operator {
  constructor(version, subpackets) {
    super(version, subpackets);
  }

  value() {
    return this.subpackets.map(e => e.value()).reduce(product, 1);
  }
}

export class Max extends Operator {
  constructor(version, subpackets) {
    super(version, subpackets);
  }

  value() {
    return this.subpackets.map(e => e.value()).reduce((a, b) => a > b ? a : b, -1 * Number.MAX_SAFE_INTEGER);
  }
}

export class Min extends Operator {
  constructor(version, subpackets) {
    super(version, subpackets);
  }

  value() {
    return this.subpackets.map(e => e.value()).reduce((a, b) => a < b ? a : b, Number.MAX_SAFE_INTEGER);
  }
}

export class GreaterThan extends Operator {
  constructor(version, subpackets) {
    super(version, subpackets);
  }

  value() {
    return this.subpackets[0].value() > this.subpackets[1].value() ? 1 : 0;
  }
}

export class LessThan extends Operator {
  constructor(version, subpackets) {
    super(version, subpackets);
  }

  value() {
    return this.subpackets[0].value() < this.subpackets[1].value() ? 1 : 0;
  }
}

export class EqualTo extends Operator {
  constructor(version, subpackets) {
    super(version, subpackets);
  }

  value() {
    return this.subpackets[0].value() === this.subpackets[1].value() ? 1 : 0;
  }
}
