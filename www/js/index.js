/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');

        FingerprintAuth.isAvailable(isAvailableSuccess, isAvailableError);
        
        /**
         * @return {
         *      isAvailable:boolean,
         *      isHardwareDetected:boolean,
         *      hasEnrolledFingerprints:boolean
         *   }
         */
        function isAvailableSuccess(result) {
            console.log("FingerprintAuth available: " + JSON.stringify(result));
            if (result.isAvailable) {
                var encryptConfig = {}; // See config object for required parameters

                var encryptConfig = {
                    clientId: "AgeCalculator",
                    username: "sa",
                    password: "sapassword"
                };

                function encryptSuccessCallback(result) {
                    console.log("successCallback(): " + JSON.stringify(result));
                    if (result.withFingerprint) {
                        console.log("Successfully encrypted credentials.");
                        console.log("Encrypted credentials: " + result.token);
                    } else if (result.withBackup) {
                        console.log("Authenticated with backup password");
                    }
                }

                function encryptErrorCallback(error) {
                    if (error === FingerprintAuth.ERRORS.FINGERPRINT_CANCELLED) {
                        console.log("FingerprintAuth Dialog Cancelled!");
                    } else {
                        console.log("FingerprintAuth Error: " + error);
                    }
                }

                FingerprintAuth.encrypt(encryptConfig, encryptSuccessCallback, encryptErrorCallback);
            }
        }

        function isAvailableError(message) {
            console.log("isAvailableError(): " + message);
        }
    },

    // Update DOM on a Received Event
    receivedEvent: function (id) {
        location.href = "_layout.html";
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();