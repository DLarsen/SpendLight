// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/venue/new.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            // TODO: Initialize the page here.

            $('#name').focus();

            $('#btnSave').on('click', function () {

                var name = $('#name').val();
                var target = parseInt($('#targetAmount').val());
                var lastWeekAmount = parseInt($('#lastWeekAmount').val());

                var venue = world.currentAccount.createVenue(name, target, 'blank.png');
                venue.setLastWeekSpent(lastWeekAmount);
                
                // change this if you want it to be fast... don't save
                world.currentAccount.saveAccount(function () {
                    WinJS.Navigation.back(1);
                });
            });

        },

        unload: function () {
            // TODO: Respond to navigations away from this page.
        },

        updateLayout: function (element, viewState, lastViewState) {
            /// <param name="element" domElement="true" />

            // TODO: Respond to changes in viewState.
        }
    });
})();
