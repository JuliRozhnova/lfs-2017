(function () {

    var $iframe,
        $header,
        $footer,

        $langSelected,
        $langOverlay,
        $langList,
        $langLinks,

        $elements,

        ACTIVE_CLASS = 'active',

        langInitial = 'en',
        langFromUrl = langFromString(location.href),
        langFromNavigator = navigator.language.split('-').shift(),
        translations = window.translations;


    function updateVars() {
        $iframe = $('iframe');
        $header = $('header');
        $main = $('.main');
        $footer = $('footer');

        $langSelected = $('.js-lang-selected');
        $langOverlay = $('.js-lang-overlay');
        $langList = $('.js-lang-list');
        $langLinks = $langList.find('a');

        $elements = $('[data-label]')
    }
    
    function bindEvents() {
        $langSelected.on('click', openLangList);
        $langLinks.each(function () {
            $(this).on('click', langUpdate);
        });
        $(window).on('resize', resizeApp);
    }

    function init(locale) {
        updateVars();
        reloadIframe(locale);
        bindEvents();
        setDir(locale);
        updateData(translations[locale]);
        initialLangSelect(locale);
    }

    function langUpdate(e) {
        e.stopPropagation();
        e.preventDefault();

        var $link = $(this),
            lang = $link.attr('href').split('=').pop();

        $link.siblings('a').filter('.' + ACTIVE_CLASS).removeClass(ACTIVE_CLASS);
        $link.addClass(ACTIVE_CLASS);

        $langSelected.attr('href', $link.attr('href')).text($link.text());
        history.pushState(null, null, location.origin + location.pathname + '?lang=' + lang);

        closeLangList();
        reloadIframe(lang);

        setDir(lang);
        updateData(translations[lang])
    }

    function openLangList(e) {
        e.preventDefault();
        e.stopPropagation();
        $langList.addClass(ACTIVE_CLASS);
        $langOverlay.addClass(ACTIVE_CLASS);
        $langOverlay.on('click', hideLangList)
    }

    function closeLangList() {
        $langList.removeClass(ACTIVE_CLASS);
        $langOverlay.removeClass(ACTIVE_CLASS);
    }

    function hideLangList(e) {
        closeLangList();
        $langOverlay.off('click', hideLangList)
    }

    function langFromString(url) {
        var parts = url.split('?'), base = parts[0], params = {}, paramsArr, locale;
        if (parts[1] && parts[1].length !== 0) {
            paramsArr = parts[1].split('&');
            paramsArr.forEach(function (param) {
                var paramArr = param.split('=');
                if (paramArr[0] === 'lang') {
                    locale = paramArr[1];
                }
            });
        }
        return locale;
    }

    function reloadIframe(locale) {
        $iframe.attr('src', $iframe.data('src') + locale);
        resizeApp();
    }

    function resizeApp() {
        $iframe.css('height', ($(window).height() - ($header.height() + $footer.height())))
    }

    function updateData(translations) {
        $elements.each(function () {
            updateLabels(this, translations);
        })
    }

    function updateLabels(el, translations) {
        var $el = $(el) || $(this),
            label = $el.data('label'),
            href, title;
        if (label) {
            href = translations[label]['href'];
            title = translations[label]['title'];
            if (href) {
                $el.attr('href', href);
            }
            if (title) {
                $el.html(title);
            }
        }
    }

    function setDir(locale) {
        $('html').attr('lang', locale);
    }

    function initialLangSelect(locale) {
        var $active = $langLinks.filter('[href="?lang=' + locale + '"]').addClass(ACTIVE_CLASS)
        $langSelected.attr('href', $active.attr('href')).text($active.text());
    }

    $(function () {
        init(langFromUrl ? langFromUrl : (langFromNavigator ? langFromNavigator : langInitial))
    })

}())


//Button animation
var button = document.querySelectorAll('.button');
for (var i = 0; i < button.length; i++) {
  button[i].onmousedown = function(e) {

    var x = (e.offsetX == undefined) ? e.layerX : e.offsetX;
    var y = (e.offsetY == undefined) ? e.layerY : e.offsetY;
    var effect = document.createElement('div');
    effect.className = 'effect';
    effect.style.top = y + 'px';
    effect.style.left = x + 'px';
    e.srcElement.appendChild(effect);
    setTimeout(function() {
      e.srcElement.removeChild(effect);
    }, 1100);
  }
}[]