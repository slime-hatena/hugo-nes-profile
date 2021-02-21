const button = document.getElementById('button');
const modal = document.getElementById('modal');
const menu = document.getElementById('menu');
const labels = [...menu.querySelectorAll('label')];

async function addLinkOnclickEvents() {
    let links = [...document.querySelectorAll('a[href]')]
    links.forEach(link => {
        link.onclick = function (e) {
            if (this.href === window.location.href) {
                e.preventDefault();
                e.stopPropagation();
                return;
            }
        }
    })
}

async function init() {

    barba.use(barbaCss);
    barba.init({
        //
    })

    barba.hooks.enter(() => {
        window.scrollTo(0, 0);
        labels.forEach(label => {
            label.querySelector('input').checked = false;
            let l = label.querySelector('a[href]');
            if (l.href === window.location.href) {
                label.querySelector('input').checked = true;
            }
        })
    });

    barba.hooks.after((data) => {
        if (typeof gtag === 'function') {
            gtag('config', window.GA_MEASUREMENT_ID, {
                page_path: window.location.pathname
            });
        }
        addLinkOnclickEvents();
    });

    // ボタンを押したらモーダルを出す
    button.addEventListener('click', e => {
        menu.classList.remove('hide');
        modal.classList.remove('hide');
    }, false);

    // モーダルを押したらモーダルを消す
    modal.addEventListener('click', e => {
        menu.classList.add('hide');
        modal.classList.add('hide');
    }, false);

    // ラベルを押したらモーダルを消す
    labels.forEach(label => {
        let link = label.querySelector('a[href]');
        if (link.href === window.location.href) {
            label.querySelector('input').checked = true;
        }
        label.addEventListener('click', e => {
            label.querySelector('input').checked = true;
            menu.classList.add('hide');
            modal.classList.add('hide');
        }, false)
    })

    addLinkOnclickEvents();

    await document.fonts.load('10px "jf-dot-mplus10-subset"');
    document.getElementById('loading').classList.add('hide');
}

init();
