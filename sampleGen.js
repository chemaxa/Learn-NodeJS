var sampleGen = function*() {
    yield: 1;
    yield: 2;
}
var gen = sampleGen();

console.log(gen.next());
console.log(gen.next());
console.log(gen.next());
