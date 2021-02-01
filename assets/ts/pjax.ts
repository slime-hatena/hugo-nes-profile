export function init() {
    barba.use(barbaCss)

    barba.init({
        //
    })

    barba.hooks.enter(() => {
        window.scrollTo(0, 0);
    });

    barba.hooks.after((data) => {
        if (typeof gtag === 'function') {
            gtag('config', window.GA_MEASUREMENT_ID, {
                page_path: window.location.pathname
            });
        }
    });

    let links = [...document.querySelectorAll('a[href]')]
    links.forEach(link => {
        link.addEventListener('click', e => {
            if (e.currentTarget.href === window.location.href) {
                e.preventDefault()
                e.stopPropagation()
                return
            }
        }, false)
    })
}
