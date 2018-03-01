var Observable = require("data/observable").Observable;
var observableArrayModule = require("data/observable-array");
var utils = require("utils/utils");
require("nativescript-dom");

var frames = require("ui/frame");
var http = require("http");

function createViewModel() {
    var viewModel = new Observable();

    viewModel.getFAQs = function () {
        var url = ServiceEndPoint + FAQServicePath;

        http.request({ url: url, method: "GET", }).then(function (response) {
            var items = response.content.toJSON().value;
            var faqDataSource = new observableArrayModule.ObservableArray(items);

            viewModel.set("faqDataSource", faqDataSource);

        }, function (e) {
            alert("Please review your endpoint. Error message: " + e);
            console.log(e);
        });
    };

    viewModel.listViewItemTap = function (args) {
        var index = args.index;    
        var page = args.object;
        var urlName = viewModel.get("faqDataSource").getItem(index).UrlName;
        page.runAgainstClasses('qContent', function(elem) {  
            elem.classList.remove('show');
        });

        page.getViewById(urlName).classList.toggle("show");

    };

    viewModel.set("faqDataSource", []);

    viewModel.getFAQs();

    return viewModel;
}

exports.createViewModel = createViewModel;