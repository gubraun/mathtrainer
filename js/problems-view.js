let ProblemsView = function () {
    this.problemsCollection = new ProblemsCollection();
    this.Cookie = new Cookie();
}

ProblemsView.prototype.initEvents = function () {
    const self = this;

    $("#problemsForm").submit(function (e) {
        e.preventDefault();
    });

    $("#btnCheck").click(function () {
        self.checkResults();
        $('#btnCheck').attr('disabled', true);
        $('#btnRestart').attr('disabled', false);
    });

    $("#btnRestart").click(function () {
        self.render();
        $('#btnCheck').attr('disabled', false);
        $('#btnRestart').attr('disabled', true);
    });

    $("#btnSettings").click(function () {
        $("#problemsPage").hide();
        $("#settingsPage").show();
    });

    // Button from SettingsView!
    $("#btnStart").click(function () {
        if (($("#cbAdd").prop("checked") == false)
            && ($("#cbSub").prop("checked") == false)
            && ($("#cbMul").prop("checked") == false)
            && ($("#cbDiv").prop("checked") == false)) {
            console.log("Please check at least one")
            return;
        }
        if (!$("#numberProblems").val()) {
            return;
        }     
        
        $('#btnCheck').attr('disabled', false);
        $('#btnRestart').attr('disabled', true);

        $("#settingsPage").hide();

        $("#problemsPage").removeClass("hidden");
        $("#problemsPage").show();

        self.render();
    });

    $('#btnRestart').attr('disabled', true);

    self.render();
}

ProblemsView.prototype.generateMathProblems = function (num, operators) {
    this.problemsCollection.clear();

    for (let i = 0; i < num; i++) {
        let id = Math.floor(Math.random() * operators.length);
        this.problemsCollection.add(new MathProblem(operators[id]));
    }
}

ProblemsView.prototype.checkResults = function () {
    const self = this;
    let isCorrect = [];
    let i = 0;

    $('#problemsForm *').filter('.prob-input').each(function () {
        isCorrect[i] = ($(this).val() == self.problemsCollection.problems[i].result);
        
        $(this).attr('disabled', true);
        if (isCorrect[i]) {
            $(this).css("color", "#155724");
            $(this).css("background-color", "#d4edda");
            $(this).css("border-color", "#c3e6cb");
        }
        else {
            $(this).css("color", "#721c24");
            $(this).css("background-color", "#f8d7da");
            $(this).css("border-color", "#f5c6cb");

            $(this).css("color", "#721c24");
            $(this).css("background-color", "#f8d7da");
            $(this).css("border-color", "#f5c6cb");
        }
        i++;
    });

    i = 0;
    $('#problemsForm *').filter('.prob-check-label').each(function () {
        if (isCorrect[i]) {
            $(this).html('Richtig');
        }
        else {
            $(this).html('Falsch');
        }
        i++;
    });

    if (isCorrect.every(function (it) {
        return (it == true);
    })) {
        $("#soundWon").trigger("play");
    }
    else {
        $("#soundLost").trigger("play");
    }

    let score = isCorrect.filter(el => (el == true)).length;
    let highscore = $("#highscore").text();
    if (score > highscore) {
        $("#highscore").html(score);
        this.Cookie.setCookie("highscore",score,30);
    }
}

ProblemsView.prototype.render = function () {
    let num = $("#numberProblems").val();
    let operators = [];

    if ($("#cbAdd").prop("checked") == true) {
        operators.push('+');
    }
    if ($("#cbSub").prop("checked") == true) {
        operators.push('-');
    }
    if ($("#cbMul").prop("checked") == true) {
        operators.push('*');
    }
    if ($("#cbDiv").prop("checked") == true) {
        operators.push('/');
    }

    this.generateMathProblems(num, operators);

    // Delete previous list
    $(".problems-list").html('');

    this.problemsCollection.problems.forEach(function (el) {
        $(".problems-list").append(
            '<div class="form-group row">\
                <label class="col col-form-label prob-text-label">' + el.text + '</label>\
                <div class="col">\
                    <input type="number" class="form-control prob-input" placeholder="">\
                </div>\
                <label class="col col-form-label prob-check-label"></label>\
            </div>'
        )
    });

    $('#problemsForm *').filter('.prob-check-label').each(function () {
        $(this).html('');
    });

    $('#problemsForm *').filter('.prob-input').each(function () {
        $(this).val('');
        $(this).attr('disabled', false);

        $(this).css("color", "#495057");
        $(this).css("background-color", "#fff");
        $(this).css("border-color", "#ced4da");
    });
}