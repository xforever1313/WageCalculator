
//          Copyright Seth Hendrick 2017.
// Distributed under the Boost Software License, Version 1.0.
//    (See accompanying file LICENSE_1_0.txt or copy at
//          http://www.boost.org/LICENSE_1_0.txt)

enum State {
    Idle,
    Running
}

class WageTimer {

    // ---------------- Fields ----------------

    startButton: HTMLButtonElement;
    resetButton: HTMLButtonElement;
    amountText: HTMLSpanElement;
    wageText: HTMLTextAreaElement;
    errorText: HTMLSpanElement;

    currentWage: number; // The current wage the user gave us.

    amount: number;  // The total amount we've made so far.

    currentState: State;

    timerToken: number;

    // ---------------- Constructor ----------------

    constructor(
        startButton: HTMLButtonElement,
        resetButton: HTMLButtonElement,
        amountText: HTMLSpanElement,
        wageText: HTMLTextAreaElement,
        errorText: HTMLSpanElement
    ) {
        this.startButton = startButton;
        this.resetButton = resetButton;
        this.amountText = amountText;
        this.wageText = wageText;
        this.errorText = errorText;

        this.amount = 0.0;
        this.currentWage = 0.0;
        this.wageText.style.borderColor = "black";
        this.wageText.style.borderWidth = "2px";
        this.currentState = State.Idle;

        this.updateUi();
    }

    // ---------------- Functions ----------------

    startButtonClicked() {
        if (this.currentState === State.Idle) {

            if (this.validateWage()) {
                this.wageText.style.borderColor = "black";
                this.wageText.style.color = "black";
                this.errorText.innerHTML = "&nbsp;";
                this.timerToken = setInterval(() => this.timerTick(), 1000);
                this.currentState = State.Running;
            }
            else {
                this.wageText.style.borderColor = "red";
                this.wageText.style.color = "red";
                this.errorText.innerHTML = "Not a valid number";
            }
        }
        else if (this.currentState === State.Running) {
            clearTimeout(this.timerToken);
            this.currentState = State.Idle;
        }

        this.updateUi();
    }

    resetButtonClicked() {
        this.amount = 0.0;
        this.updateUi();
    }

    timerTick() {
        // Convert our wage per hour to seconds, then add it to our total amount.
        this.amount += ( this.currentWage / 60 / 60 );
        this.updateAmountText();
    }

    updateAmountText() {
        this.amountText.innerHTML = "$" + this.amount.toFixed(2);
    }

    updateUi() {
        if (this.currentState == State.Idle) {
            this.startButton.innerText = "Start";
            this.wageText.disabled = false;
        }
        else if (this.currentState == State.Running) {
            this.startButton.innerText = "Stop";
            this.wageText.disabled = true;
        }

        this.updateAmountText();
    }

    validateWage(): boolean {
        var wage = Number(this.wageText.value);
        if (isNaN(wage)) {
            return false;
        }

        this.currentWage = wage;
        return true;
    }
}

var timer;

window.onload = () => {
    var startButton = <HTMLButtonElement>document.getElementById("startbutton");
    var resetButton = <HTMLButtonElement>document.getElementById("resetbutton");
    var amountEarned = <HTMLSpanElement>document.getElementById("amountearned");
    var wageText = <HTMLTextAreaElement>document.getElementById("wageinput");
    var errorText = <HTMLSpanElement>document.getElementById("errormessage");

    timer = new WageTimer(startButton, resetButton, amountEarned, wageText, errorText);
};