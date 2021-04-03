//Controller
app.controller('homeController', ['$scope', '$http', function ($scope, $http) {
    $(document).ready(function () {
        $scope.hideData();

        $('.js-tooltip').tooltip();

        // Copy to clipboard
        // Grab any text in the attribute 'data-copy' and pass it to the 
        // copy function
        $('.js-copy').click(function () {
            var text = $(this).attr('data-copy');
            var el = $(this);
            copyToClipboard(text, el);
        });
    });
    $scope.showData = function () {
        $scope.hideButton = true;
        $scope.showButton = false;
        $("#showDataPanelID").show(1000);
    };
    $scope.hideData = function () {
        $scope.showButton = true;
        $scope.hideButton = false;
        $("#showDataPanelID").hide(1000);
    };
    $scope.showScannedData = false;
    $scope.barCodeQRScan = function () {
        //alert("Scanning is comming soon!!!");
        cordova.plugins.barcodeScanner.scan(function (result) {
            $scope.scannedData = JSON.stringify(result);// result;
            $scope.scannedText = result.text;
            $scope.scannedFormat = result.format;
            if (result.cancelled == false) {
                $scope.showScannedData = true;
                $scope.$apply();
            }
            //alert("Text: " + result.text + "\n"
            //    + "Formar: " + result.format
            //);
        },
            function (error) {
                $scope.hideData();
                alert("Scanning failed: " + error);
            },
            {
                preferFrontCamera: false, // iOS and Android
                showFlipCameraButton: false, // iOS and Android
                showTorchButton: true, // iOS and Android
                torchOn: false, // Android, launch with the torch switched on (if available)
                saveHistory: false, // Android, save scan history (default false)
                prompt: "Place a barcode inside the scan area", // Android
                resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
                formats: "all",//"QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
                //orientation: "landscape", // Android only (portrait|landscape), default unset so it rotates with the device
                disableAnimations: true, // iOS
                disableSuccessBeep: false // iOS and Android
            });
    };
    $scope.openNav = function () {
        document.getElementById("mySidebar").style.width = "250px";
        document.getElementById("main").style.marginLeft = "250px";
    };

    $scope.closeNav - function () {
        document.getElementById("mySidebar").style.width = "0";
        document.getElementById("main").style.marginLeft = "0";
    };

    // COPY TO CLIPBOARD
    // Attempts to use .execCommand('copy') on a created text field
    // Falls back to a selectable alert if not supported
    // Attempts to display status in Bootstrap tooltip
    // ------------------------------------------------------------------------------

    function copyToClipboard(text, el) {
        var copyTest = document.queryCommandSupported('copy');
        var elOriginalText = el.attr('data-original-title');

        if (copyTest === true) {
            var copyTextArea = document.createElement("textarea");
            copyTextArea.value = text;
            document.body.appendChild(copyTextArea);
            copyTextArea.select();
            try {
                var successful = document.execCommand('copy');
                var msg = successful ? 'Copied!' : 'Whoops, not copied!';
                el.attr('data-original-title', msg).tooltip('show');
            } catch (err) {
                console.log('Oops, unable to copy');
            }
            document.body.removeChild(copyTextArea);
            el.attr('data-original-title', elOriginalText);
        } else {
            // Fallback if browser doesn't support .execCommand('copy')
            window.prompt("Copy to clipboard: Ctrl+C or Command+C, Enter", text);
        }
    }
}]);