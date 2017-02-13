
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

    currentWage: Number;

    amount: Number;

    currentState: State;

    // ---------------- Constructor ----------------

    constructor(startButton: HTMLButtonElement, resetButton: HTMLButtonElement, amountText: HTMLSpanElement, wageText: HTMLTextAreaElement) {
        this.startButton = startButton;
        this.resetButton = resetButton;
        this.amountText = amountText;
        this.wageText = wageText;
        this.amount = 0.0;
        this.currentWage = 0.0;
        this.wageText.style.borderColor = "black";
        this.wageText.style.borderWidth = "5px";
        this.currentState = State.Idle;
    }

    // ---------------- Functions ----------------

    startButtonClicked() {
        if (this.currentState === State.Idle) {

            if (this.validateWage()) {
                this.wageText.style.borderColor = "black";
                this.currentState = State.Running;
            }
            else {
                this.wageText.style.borderColor = "red";
            }
        }
        else if (this.currentState === State.Running) {
            this.currentState = State.Idle;
        }

        this.updateUi();
    }

    resetButtonClicked() {
        this.amount = 0.0;
        this.updateUi();
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

    timer = new WageTimer(startButton, resetButton, amountEarned, wageText);
};