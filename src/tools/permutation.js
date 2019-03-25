export class permutation {
    constructor() {
        this.touchingBtnList = [];
        this.timerCount = 0;
        this.initInterval();
    }
    /* Determine if the button is touching */
    isTouching(btnId) {
        return this.touchingBtnList.indexOf(btnId) > -1;
    }
    /* The processing to be done when the touch action starts */
    touchStart(btnId) {
        this.touchingBtnList.push(btnId);
    }
    /* The processing to be done at the end of the touch action */
    touchEnd(btnId) {
        let delIndex = this.touchingBtnList.indexOf(btnId);
        this.touchingBtnList.splice(delIndex, 1);
    }
    initInterval() {
        let self = this;
        setInterval(function () {
            self.timerCount++;
            if (self.touchingBtnList.length > 0) {
            }
        }, 100);
    }
}
//# sourceMappingURL=permutation.js.map