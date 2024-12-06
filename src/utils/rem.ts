(function flexible(window, document) {
    var docEl = document.documentElement;
    var dpr = window.devicePixelRatio || 1; // 显示设备的物理像素分辨率与CSS像素分辨率

    // adjust body font size
    function setBodyFontSize() {
        if (document.body) {
            document.body.style.fontSize = (12 * dpr) + 'px';
        } else {
            document.addEventListener('DOMContentLoaded', setBodyFontSize);
        }
    }
    setBodyFontSize();

    // set 1rem = 16px at 375px width
    function setRemUnit() {
        let width = docEl.clientWidth;
        // 最小 375px，最大 1920px（可以根据需要调整最大宽度）
        //   if (width / dpr < 375) {
        //     width = 375 * dpr;
        //   } else if (width / dpr > 1920) {
        //     width = 1920 * dpr;
        //   }

        if (width / dpr > 400) {
          dpr = window.devicePixelRatio || 1; // 显示设备的物理像素分辨率与CSS像素分辨率
            width = 400 * dpr; // 最大 540px
        }
        // 根字体大小：当设备宽度为 375px 时，设置为 16px
        var rem = (width / 375) * 16;
        docEl.style.fontSize = rem + 'px';
    }

    setRemUnit();

    // reset rem unit on page resize
    window.addEventListener('resize', setRemUnit);
    window.addEventListener('pageshow', function (e) {
        if (e.persisted) {
            setRemUnit();
        }
    });

    // detect 0.5px supports
    if (dpr >= 2) {
        var fakeBody = document.createElement('body');
        var testElement = document.createElement('div');
        testElement.style.border = '.5px solid transparent';
        fakeBody.appendChild(testElement);
        docEl.appendChild(fakeBody);
        if (testElement.offsetHeight === 1) {
            docEl.classList.add('hairlines');
        }
        docEl.removeChild(fakeBody);
    }
})(window, document);
