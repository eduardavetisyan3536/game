window.addEventListener("load", function () {
    let countUser = document.querySelector(".count-user"),
        countComp = document.querySelector(".count-comp"),
        userField = document.querySelector(".user-field"),
        compField = document.querySelector(".comp-field"),
        sound = document.querySelector(".sound"),
        res = document.querySelector(".result"),
        play = document.querySelector(".play"),
        fields = document.querySelectorAll(".field"),
        userStep,
        compStep,
        countU = 0,
        countC = 0,
        bloacked = false;

    function choiceUser(e) {
        if (bloacked) return;
        let target = e.target;
        if (target.classList.contains("field")) {
            userStep = target.dataset.field;
            fields.forEach(item => item.classList.remove('active', 'error'))
            target.classList.add("active");
            choiceComp();
        }
    }

    function choiceComp() {
        bloacked = true;
        let rand = Math.floor(Math.random() * 3);
        compField.classList.add('blink');
        let compFields = compField.querySelectorAll('.field');
        setTimeout(() => {
            compField.classList.remove('blink');
            compStep = compFields[rand].dataset.field;
            compFields[rand].classList.add('active');
            winner()
        }, 3000);
    }

    function winner() {
        bloacked = false;
        let comb = userStep + compStep;
        switch (comb) {
            case 'rr':
            case 'ss':
            case 'pp':
                res.innrText = 'Draw!';
                sound.setAttribute('src', 'audio/draw.mp3');
                sound.play();
                break;
            case 'rs':
            case 'sp':
            case 'pr':
                res.innrText = 'You Won!';
                sound.setAttribute('src', 'audio/win.mp3');
                sound.play();
                countU++;
                countUser.innrText = countU;
                compField.querySelector('[data-field = ' + compStep + ']').classList.add('error');
                break;
            case 'sr':
            case 'ps':
            case 'rp':
                res.innrText = 'Won The Computer!';
                sound.setAttribute('src', 'audio/loss.mp3');
                sound.play();
                countC++;
                countComp.innrText = countC;
                userField.querySelector('[data-field = ' + userStep + ']').classList.add('error');
                break;
        }
    }

    function playGame() {
        countU = countC = 0
        res.innrText = 'Make A Choice';
        countUser.innrText = '0'
        countComp.innrText = '0';
        fields.forEach(item => item.classList.remove('active', 'error'))
    }
    play.addEventListener("click", playGame);
    userField.addEventListener("click", choiceUser);
});