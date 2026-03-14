(function () {
  function getParam(applet, name) {
    var selector = 'param[name="' + name + '"]';
    var param = applet.querySelector(selector);
    return param ? (param.getAttribute('value') || '').trim() : '';
  }

  var applets = document.querySelectorAll('applet[code="fphover.class"]');
  applets.forEach(function (applet) {
    var text = getParam(applet, 'text');
    var href = getParam(applet, 'url');
    if (!text || !href) {
      return;
    }

    var link = document.createElement('a');
    link.className = 'legacy-menu-link';
    link.textContent = text;
    link.href = href;

    var target = getParam(applet, 'target');
    var isMobileMenu = window.matchMedia('(max-width: 900px)').matches;
    if (target && !(isMobileMenu && target === '_blank')) {
      link.target = target;
      if (target === '_blank') {
        link.rel = 'noopener noreferrer';
      }
    }

    applet.replaceWith(link);
  });
})();
