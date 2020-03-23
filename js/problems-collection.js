let ProblemsCollection = function () {
    this.problems = [];
}

ProblemsCollection.prototype.add = function (problem) {
    this.problems.push(problem);
}

ProblemsCollection.prototype.clear = function () {
    while (this.problems.length) {
        this.problems.pop();
    }
}
