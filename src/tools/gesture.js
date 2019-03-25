export class gesture {
    constructor(dom) {
        this.startPoint = {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 0
        };
        this.currentPoint = {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 0
        };
        this.touchingPoint = 0;
        this.swipeThreshold = gesture.shortSide() * 0.1;
        this.longSwipeThreshold = gesture.shortSide() * 0.7;
        this.swipeLeft = null;
        this.swipeRight = null;
        this.swipeUp = null;
        this.swipeDown = null;
        this.isDoing = false;
        this.bind(dom);
    }
    /* bind events */
    bind(dom) {
        dom.addEventListener('touchstart', (e) => this.touchStart(e));
        dom.addEventListener('touchmove', (e) => this.touchMoving(e));
        dom.addEventListener('touchend', (e) => this.touchEnd(e));
    }
    /* Get the short side of the screen */
    static shortSide() {
        return Math.min(document.body.clientWidth, document.body.clientHeight);
    }
    /* Executed when the function exists
    Prevent null pointers*/
    doMethod(method) {
        if (method) {
            method();
        }
    }
    /* Comparison of horizontal displacement and vertical displacement */
    isHorizon() {
        return Math.abs(this.currentPoint.x1 - this.startPoint.x1) > Math.abs(this.currentPoint.y1 - this.startPoint.y1);
    }
    /* Long and short sliding unified calculation */
    swipeCalc() {
        if (this.isHorizon() && this.currentPoint.x1 - this.startPoint.x1 >= this.longSwipeThreshold) {
            return 'long-right';
        }
        if (this.isHorizon() && this.startPoint.x1 - this.currentPoint.x1 >= this.longSwipeThreshold) {
            return 'long-left';
        }
        if (this.currentPoint.y1 - this.startPoint.y1 >= this.longSwipeThreshold) {
            return 'long-down';
        }
        if (this.startPoint.y1 - this.currentPoint.y1 >= this.longSwipeThreshold) {
            return 'long-up';
        }
        if (this.isHorizon() && this.currentPoint.x1 - this.startPoint.x1 >= this.swipeThreshold && this.currentPoint.x1 - this.startPoint.x1 <= this.longSwipeThreshold) {
            return 'short-right';
        }
        if (this.isHorizon() && this.startPoint.x1 - this.currentPoint.x1 >= this.swipeThreshold && this.startPoint.x1 - this.currentPoint.x1 <= this.longSwipeThreshold) {
            return 'short-left';
        }
        if (this.currentPoint.y1 - this.startPoint.y1 >= this.swipeThreshold && this.currentPoint.y1 - this.startPoint.y1 <= this.longSwipeThreshold) {
            return 'short-down';
        }
        if (this.startPoint.y1 - this.currentPoint.y1 >= this.swipeThreshold && this.startPoint.y1 - this.currentPoint.y1 <= this.longSwipeThreshold) {
            return 'short-up';
        }
    }
    /* swipe */
    doSwipe() {
        switch (this.swipeCalc()) {
            case 'short-left':
                this.doMethod(this.swipeLeft);
                break;
            case 'short-right':
                this.doMethod(this.swipeRight);
                break;
            case 'short-down':
                this.doMethod(this.swipeDown);
                break;
            case 'short-up':
                this.doMethod(this.swipeUp);
                break;
            case 'long-left':
                this.doMethod(this.longSwipeLeft);
                break;
            case 'long-right':
                this.doMethod(this.longSwipeRight);
                break;
            case 'long-down':
                this.doMethod(this.longSwipeDown);
                break;
            case 'long-up':
                this.doMethod(this.longSwipeUp);
                break;
        }
    }
    /* init StartPoint */
    initFirstPoint(e) {
        this.startPoint.x1 = parseInt(e.touches[0].pageX);
        this.startPoint.y1 = parseInt(e.touches[0].pageY);
        this.currentPoint.x1 = parseInt(e.touches[0].pageX);
        this.currentPoint.y1 = parseInt(e.touches[0].pageY);
    }
    initSecondPoint(e) {
        this.startPoint.x1 = parseInt(e.touches[0].pageX);
        this.startPoint.y1 = parseInt(e.touches[0].pageY);
        this.currentPoint.x1 = parseInt(e.touches[0].pageX);
        this.currentPoint.y1 = parseInt(e.touches[0].pageY);
    }
    /* Basic actions */
    touchStart(e) {
        this.touchingPoint = e.touches.length;
        if (e.touches.length == 1) {
            this.initFirstPoint(e);
        }
        if (e.touches.length == 2) {
            this.initSecondPoint(e);
        }
    }
    touchMoving(e) {
        if (e.touches.length == 1) {
            this.currentPoint.x1 = parseInt(e.touches[0].pageX);
            this.currentPoint.y1 = parseInt(e.touches[0].pageY);
        }
    }
    touchEnd(e) {
        if (this.touchingPoint == 1) {
            this.doSwipe();
        }
        if (this.touchingPoint == 2) {
            /* scale */
        }
    }
}
/*
module.exports = {
  gesture: gesture
}
*/
//# sourceMappingURL=gesture.js.map