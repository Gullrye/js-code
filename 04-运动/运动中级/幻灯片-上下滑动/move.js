function getStyle(obj, name) {
    if (obj.currentStyle) {
        // IE...
        return obj.currentStyle[name];
    } else {
        // Chrome...
        return getComputedStyle(obj, false)[name];
    }
}

function startMove(obj, json, fnEnd) {
    clearInterval(obj.timer);

    obj.timer = setInterval(function () {
        var stop = true;

        for (var attr in json) {
            var cur = 0;

            if (attr == 'opacity') {
                cur = Math.round(parseFloat(getStyle(obj, 'opacity')) * 100);
            } else {
                cur = parseInt(getStyle(obj, attr));
            }

            var speed = 0;
            speed = (json[attr] - cur) / 6;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

            // 让每n个attr的微小变化作为一轮，然后定时器重复执行这一轮变化，直到各个json[attr]都达到目标值。
            if (cur != json[attr]) {
                stop = false;
            }

            if (attr == 'opacity') {
                obj.style.filter = 'alpha(opacity = ' + (cur + speed) + ')';
                obj.style.opacity = (cur + speed) / 100;
            } else {
                obj.style[attr] = cur + speed + 'px';
            }
        }

        // 等各个 json[attr] 都达到目标值后才清除定时器
        if(stop) {
            clearInterval(obj.timer);
            if (fnEnd) fnEnd();
        }

    }, 30);

}