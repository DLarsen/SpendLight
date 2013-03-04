(function () {
    "use strict";

    var spendlightApp = null;

    WinJS.UI.Pages.define("/pages/home/home.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            // TODO: Initialize the page here.



            spendlightApp = new SpendlightAppView();

            // app bar commands
            document.getElementById("cmdSave")
                .addEventListener("click", saveAll, false);
            
            $('.box-box-add').on('click', function () {
                var location = "/pages/venue/new.html";
                WinJS.Navigation.navigate(location);
            });

            $('#account-indicator').on('click', function () {
                showAccountFlyout();
            });

            // yes, it's hard-coded
            $('.select-account-1').on('click', function () {
                pickAccountFlyout.winControl.hide();
                spendlightApp.swapAccounts(1);
                
                $('#account-indicator .ac2').hide();
                $('#account-indicator .ac3').hide();
                $('#account-indicator .ac1').show();
            });

            $('.select-account-2').on('click', function () {
                pickAccountFlyout.winControl.hide();
                spendlightApp.swapAccounts(2);
                
                $('#account-indicator .ac1').hide();
                $('#account-indicator .ac3').hide();
                $('#account-indicator .ac2').show();
            });

            $('.select-account-3').on('click', function () {
                pickAccountFlyout.winControl.hide();
                spendlightApp.swapAccounts(3);
                
                $('#account-indicator .ac2').hide();
                $('#account-indicator .ac1').hide();
                $('#account-indicator .ac3').show();
            });



        }
    });

    function saveAll() {
        spendlightApp.saveAll();
        document.getElementById('account-indicator').winControl.hide();
    }

    function showAccountFlyout() {
        var anchor = document.getElementById('account-indicator');
        pickAccountFlyout.winControl.show(anchor, "bottom");
    }

})();
