var createViewModel = require("./faq-model").createViewModel;

function onNavigatingTo(args) {
    var page = args.object;

    var navContext = page.navigationContext;

    page.bindingContext = extendModelWithNatigation(createViewModel(), page);
}

exports.onNavigatingTo = onNavigatingTo; 