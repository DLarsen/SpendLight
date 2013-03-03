// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509
(function () {
    "use strict";

    WinJS.Binding.optimizeBindingReferences = true;

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;

    app.onactivated = function (args) {
        if (args.detail.kind === activation.ActivationKind.launch) {
            if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
                // TODO: This application has been newly launched. Initialize
                // your application here.
            } else {
                // TODO: This application has been reactivated from suspension.
                // Restore application state here.
            }
            args.setPromise(WinJS.UI.processAll());

            document.getElementById('debug').innerHTML = 'beginning asynch...';

            //////Create a new account
            //dataCommands.createAccount(1, 'manual-number', function () {
            //    document.getElementById('debug').innerHTML = 'Create completed';
            //});


            //Load and display venues for an account
            var selectedAccountId = 1;
            var selectedAccount;

            dataCommands.load(selectedAccountId, function (data) {
                var output = '';

                selectedAccount = new Account(data);
                //selectedAccount.set('totalRedeemed', 11);
               
                //selectedAccount.createVenue('Starbucks', 20);
                //selectedAccount.createVenue('Safeway', 150);

                var venue = selectedAccount.get('venues');
                var selectedVenue = venue.first();
                //selectedVenue.createWeek('newest week', 100, 0, Date.now());

                var selectedWeek = selectedVenue.get('weeks').last();
                //selectedWeek.createTransaction('Trans 2', 12, Date.now());
                //selectedWeek.createTransaction('Trans 2', 1, Date.now());

                //var newReward = new Reward({
                //    id: 1,
                //    name: 'A Cool but moderately priced prize!',
                //    cost: 15
                //});
                //selectedAccount.set('reward', newReward);

                //selectedAccount.redeemReward();

                //selectedAccount.saveAccount();

                var spent = selectedWeek.getSpent();
                var savings = selectedWeek.getSavings();
                document.getElementById('debug').innerHTML = 'Week: ' + selectedWeek.get('name') + ' spent: ' + spent + ' Savings: '  + savings;

                var venueSavings = selectedVenue.getSavings();
                document.getElementById('debug').innerHTML += '<br />Venue: ' + selectedVenue.get('name') + ' Savings: ' + venueSavings;

                var totalSaved = selectedAccount.getSavings();
                var totalRedeemed = selectedAccount.get('totalRedeemed');
                document.getElementById('debug').innerHTML += '<br />Account: ' + selectedAccount.get('name') + ' Total saved: ' + totalSaved + ' Total Redeemed: ' + totalRedeemed;

                var availableForPrize = selectedAccount.getTotalAvailable();
                document.getElementById('debug').innerHTML += '<br />Prize Savings: ' + availableForPrize;

                var nextWeek = selectedVenue.nextWeek();
                document.getElementById('debug').innerHTML += '<br />Week: ' + nextWeek.get('name') + ' Target: ' + nextWeek.get('target') + ' Spent: ' + nextWeek.getSpent() + ' Savings: ' + nextWeek.getSavings();

                var thisWeek = selectedVenue.thisWeek();
                document.getElementById('debug').innerHTML += '<br />Week: ' + thisWeek.get('name') + ' Target: ' + thisWeek.get('target') + ' Spent: ' + thisWeek.getSpent() + ' Savings: ' + thisWeek.getSavings();;

                var lastWeek = selectedVenue.pastWeek();
                document.getElementById('debug').innerHTML += '<br />Week: ' + lastWeek.get('name') + ' Target: ' + lastWeek.get('target') + ' Spent: ' + lastWeek.getSpent() + ' Savings: ' + lastWeek.getSavings();;




            });
            

            ////Create a new venue
            //dataCommands.createVenue(123, 'Starbucks', 25, function () {
            //    document.getElementById('debug').innerHTML = 'Create completed';
            //});


            ////Load and display venues for an account
            //var selectedAccountId = 123;
            //dataCommands.load(function (data) {
            //    var output = '';

            //    var account = _.first(data, function (item) {
            //        return item.id == selectedAccountId;
            //    });

            //    _.forEach(account.venue, function (item) {
            //        output += item.name + ' ' + item.id + ' ' + item.target + '<br/>';
            //    });
            //    document.getElementById('debug').innerHTML = output;
            //});


            
            //WinJS.Utilities.query("#someId li")
            //    .listen("click", function (result)



        }
    };

    app.oncheckpoint = function (args) {
        // TODO: This application is about to be suspended. Save any state
        // that needs to persist across suspensions here. You might use the
        // WinJS.Application.sessionState object, which is automatically
        // saved and restored across suspension. If you need to complete an
        // asynchronous operation before your application is suspended, call
        // args.setPromise().
    };

    function displayChatMessage(name, text) {
        $('<div/>').text(text).prepend($('<em/>').text(name + ': ')).appendTo($('#messagesDiv'));
        $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
    };


    app.start();
})();
