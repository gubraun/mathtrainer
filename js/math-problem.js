let MathProblem = function (operator) {
    switch (operator) {
        case '+':
            this.op1 = Math.ceil(Math.random() * 100);
            this.op2 = Math.ceil(Math.random() * 100);
            this.result = this.op1 + this.op2;
            break;
        case '-':
            this.op1 = Math.ceil(Math.random() * 100);
            this.op2 = Math.ceil(Math.random() * 100);
            if (this.op1 < this.op2) {
                let tmp = this.op1;
                this.op1 = this.op2;
                this.op2 = tmp;
            }
            this.result = this.op1 - this.op2;
            break;
        case '*':
            this.op1 = Math.ceil(Math.random() * 20);
            this.op2 = Math.ceil(Math.random() * 20);
            this.result = this.op1 * this.op2;
            break;
        case '/':
            this.result = Math.ceil(Math.random() * 20);
            this.op2 = Math.ceil(Math.random() * 20);
            this.op1 = this.result * this.op2;
            break;
        default:
            console.log('Unknown operator: ' + operator);
            break;
    }
    this.text = this.op1 + ' ' + operator + ' ' + this.op2 + ' = ';
}
