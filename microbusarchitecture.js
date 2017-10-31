process.stdin.resume();
process.stdin.setEncoding('utf8');
process.stdin.on('data', function (text) {

  if(text.indexOf('\n')) {
    const lines = text.split('\n');
    lines.forEach((line) => {
      const inputBinary = line.split('#')[0].trim();
      const inputDecimal = Number('0b' + inputBinary);
      if(!isNaN(inputDecimal)) {
        cpu.process(inputDecimal);
      }
    });
  }
});

const cpu = {
  register: [],
  address: 0,
  save: -1,
  mul: 0,
  process(input) {
    if (this.mul > 0) {
      this.register[this.address] *= this.register[input];
      return this.mul--;
    }
    if (this.address === -1) return this.address = input;
    if (this.save !== -1) {
      this.register[this.address] = input;
      return this.save = -1;
    }
    if (input === 2) return this.address = -1;
    if (input === 4) return this.save = -2;
    if (input === 5) {
      this.register[this.address] = 1;
      return this.mul = 2;
    }
    if (input === 1) return this.register = Array.from({ length: 32 }, () => null);
    if (input === 6) console.log(this.register[this.address]);
    if (input === 7) console.log(this.register.filter(v => v).map(v => String.fromCharCode(v)).join(''));
  }
}