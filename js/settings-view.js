let SettingsView = function () {
    this.cookie = new Cookie();
}

SettingsView.prototype.initEvents = function () {
    const self = this;

    $("#settingsForm").submit(function (e) {
        e.preventDefault();
    });

    $("#numberProblems").on('input change', function () {
        $("#numberProblemsLabel").html(this.value);
    });

    let highscore = this.cookie.getCookie("highscore");
    if (highscore != "") {
        $("#highscore").html(highscore);
    }

    self.render();
}

SettingsView.prototype.render = function () {
}

