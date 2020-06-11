// 获取样式
function getStyle (obj, attr) {
    if (obj.currentStyle) {
        return obj.currentStyle[attr];
    } else {
        return getComputedStyle(obj, false)[attr];
    }
}

function startMove (obj, json, fnEnd) {
    // 清除定时器
    clearInterval(obj.timer);

    // 设置定时器
    obj.timer = setInterval(function () {
        var stop = true;

        for(var attr in json) {
            var cur = 0;

            // 对没单位、小于 1 的 opacity 特殊对待
            if (attr == 'opacity') {
                cur = Math.round(parseFloat(getStyle(obj, attr)) * 100);
            } else {
                // 其他属性值为 px 单位，取值如下
                cur = parseInt(getStyle(obj, attr));
            }

            // 缓冲速度，速度与距离成正比，减速
            var speed = (json[attr] - cur) / 6;
            // 速度大于0时，到最后如果速度变成了0.几（小于1px），那么物体会在0.几到1之间回来跳动，需要向上取整；速度小于0时需向下取整
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

            // 有任何一个值未与目标值相等，都不会stop；即30毫秒后会继续进行下一个定时器
            if (cur != json[attr]) {
                stop = false;
            }
            
            // cur + speed
            if (attr == 'opacity') {
                obj.style.filter = 'alpha(opacity = ' + (cur + speed) + ')';
                obj.style.opacity = (cur + speed) / 100;
            } else {
                obj.style[attr] = cur + speed + 'px';
            }
        }
        
        // 最后一个定时器里的值都达到目标值，而 stop 会保持 true；前面的定时器得到的 stop 是 false
        if (stop) {
            clearInterval(obj.timer);
            if (fnEnd) fnEnd();
        }
        
    }, 30);
}