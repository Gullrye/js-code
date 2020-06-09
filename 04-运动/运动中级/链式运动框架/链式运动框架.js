function getStyle(obj, name) {
    if (obj.currentStyle) {
        // IE...
        return obj.currentStyle[name];
    } else {
        // Chrome...
        return getComputedStyle(obj, false)[name];
    }
}

function startMove(obj, attr, target, fnEnd) {
    clearInterval(obj.timer);

    obj.timer = setInterval(function () {
        var cur = 0;

        if (attr == 'opacity') {
            cur = Math.round(parseFloat(getStyle(obj, 'opacity')) * 100);
        } else {
            cur = parseInt(getStyle(obj, attr));
        }

        var speed = 0;
        speed = (target - cur) / 6;
        speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

        if (cur == target) {
            clearInterval(obj.timer);
            if (fnEnd) {
                fnEnd();
            }
        } else {
            if (attr == 'opacity') {
                obj.style.filter = 'alpha(opacity = ' + (cur + speed) + ')';
                obj.style.opacity = (cur + speed) / 100;
            } else {
                obj.style[attr] = cur + speed + 'px';
            }
        }
    }, 30);

}