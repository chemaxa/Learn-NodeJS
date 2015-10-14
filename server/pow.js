function pow(x, n) {
    if (n != 1) { // пока n!=1 сводить вычисление pow(..n) к pow(..n-1)
        return x * pow(x, n - 1);
    } else {
        return x;
    }
}
console.log(pow(2, 3));
