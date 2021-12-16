import Packet, {LiteralNumber, Operator} from "./packet.mjs";

describe("Packet", () => {
  it("given a hexadecimal string with a literal number, it can decode it", () => {
    const [ln, rest] = Packet.fromHex("D2FE28");
    expect(ln.version).toBe(6);
    expect(ln.value()).toBe(2021);
    expect(rest).toBe("000");
  })

  it("given a hexadecimal string with an operator, it can decode it", () => {
    const [o, rest] = Packet.fromHex("38006F45291200");
    expect(o).toBeInstanceOf(Operator);
    expect(o.version).toBe(1);
    expect(o.subpackets.length).toBe(2);
    expect(o.subpackets[0]).toBeInstanceOf(LiteralNumber);
    expect(o.subpackets[0].version).toBe(6);
    expect(o.subpackets[0].value()).toBe(10);
    expect(o.subpackets[1]).toBeInstanceOf(LiteralNumber);
    expect(o.subpackets[1].version).toBe(2);
    expect(o.subpackets[1].value()).toBe(20);
    expect(rest).toBe('0000000');
  })
  it("given a hexadecimal string with an operator, it can decode it 2", () => {
    const [o, rest] = Packet.fromHex("EE00D40C823060");
    expect(o).toBeInstanceOf(Operator);
    expect(o.version).toBe(7);
    expect(o.subpackets.length).toBe(3);
    expect(o.subpackets[0]).toBeInstanceOf(LiteralNumber);
    expect(o.subpackets[0].version).toBe(2);
    expect(o.subpackets[0].value()).toBe(1);
    expect(o.subpackets[1]).toBeInstanceOf(LiteralNumber);
    expect(o.subpackets[1].version).toBe(4);
    expect(o.subpackets[1].value()).toBe(2);
    expect(o.subpackets[2]).toBeInstanceOf(LiteralNumber);
    expect(o.subpackets[2].version).toBe(1);
    expect(o.subpackets[2].value()).toBe(3);
    expect(rest).toBe('00000');
  })

  it("Gets the sum of all versions contained", () => {
    expect(Packet.fromHex("8A004A801A8002F478")[0].versionSum()).toBe(16);
    expect(Packet.fromHex("620080001611562C8802118E34")[0].versionSum()).toBe(12);
    expect(Packet.fromHex("C0015000016115A2E0802F182340")[0].versionSum()).toBe(23);
    expect(Packet.fromHex("A0016C880162017C3686B18A3D4780")[0].versionSum()).toBe(31);
  })

  it("Computes the values of encoded expressions", () => {
    expect(Packet.fromHex("C200B40A82")[0].value()).toBe(3);
    expect(Packet.fromHex("04005AC33890")[0].value()).toBe(54);
    expect(Packet.fromHex("880086C3E88112")[0].value()).toBe(7);
    expect(Packet.fromHex("CE00C43D881120")[0].value()).toBe(9);
    expect(Packet.fromHex("D8005AC2A8F0")[0].value()).toBe(1);
    expect(Packet.fromHex("F600BC2D8F")[0].value()).toBe(0);
    expect(Packet.fromHex("9C005AC2F8F0")[0].value()).toBe(0);
    expect(Packet.fromHex("9C0141080250320F1802104A08")[0].value()).toBe(1);
  })
})
