(function () {
    angular.module('validator.rules', ['validator']).config(['$validatorProvider', function ($validatorProvider) {
        $validatorProvider.register('required', {
            invoke: 'watch',
            validator: /.+/,
            error: 'This field is required.'
        });
        $validatorProvider.register('requiredSelect', {
            invoke: 'blur',
            validator: function (value, scope, element, attrs, $injector) {
                return value !== undefined && value !== 0;
            },
            error: 'This field is required.'
        });

        //   
        $validatorProvider.register('codes', {
            invoke: 'watch',
            validator: /^[a-zA-Z0-9 _]*$/,
            error: 'This field should not contain special characters apart from space and underscore.'

        });
        $validatorProvider.register('code', {
            invoke: 'watch',
            validator: /^[a-zA-Z0-9_]*$/,
            error: 'This field should not contain special characters and space apart from underscore.'

        });
        $validatorProvider.register('minus', {
            invoke: 'watch',
            validator: /^\-?\d*\.?\d*$/,
            error: 'This field should not be the minus number.'

        });
        $validatorProvider.register('containerNumber', {
            invoke: 'watch',
            validator: /^[a-zA-Z0-9]{11}/,
            error: 'This field should be eleven digits only.'
        });
        $validatorProvider.register('number', {
            invoke: 'watch',
            validator: /^0*[+]?[0-9]*[\.]?[0-9]*$/,
            error: 'This field should be the number.'
        });

        $validatorProvider.register('anynumber', {
            invoke: 'watch',
            validator: /^[+-]?[0-9]*[\.]?[0-9]*$/,
            error: 'This field should be the number.'
        });
        $validatorProvider.register('nodot', {
            invoke: 'watch',
            validator: /^[^<>.]+$/,
            error: 'No dot sysmbol allowed.'
        });

        $validatorProvider.register('twentyFourHours', {
            invoke: 'watch',
            validator: /^([01]\d|2[0-3]):?([0-5]\d)$/,
            error: 'This field should be between 00:00 to 23:59'
        });

        $validatorProvider.register('Zeronumber', {
            invoke: 'watch',
            //validator: /^[1-9]\d{0,2}(\d*|(,\d{3})*)$/,
            validator: /^0*[1-9]\d{0,2}(\d*|(,\d{3})*)$/,
            error: 'This field should not be ZERO.'
        });
        $validatorProvider.register('Zerodecimal', {
            invoke: 'watch',
            //validator: /^[1-9]\d{0,2}(\d*|(,\d{3})*)$/,
            validator: /^\s*(?=.*[1-9])\d*(?:\.\d{1,3})?\s*$/,
            error: 'This field should not be ZERO.'
        });
        $validatorProvider.register('onlypositive', {
            invoke: 'watch',
            //validator: /^[1-9]\d{0,2}(\d*|(,\d{3})*)$/,
            validator: /^(?=.*[0-9])\d{1,5}(?:\.\d\d?)?$/,
            error: 'This field should not be ZERO or negative.'
        });
        //?:[1-9]\d*|0

        $validatorProvider.register('word', {
            invoke: 'watch',
            validator: /^(?!.*(^storage$|^handling$)).*$/i,
            error: 'Please do not enter "Storage" or "Handling"as code.'
            /* ^ = beginning of string , . = matches any character except newline, * = repeat token 0 to infinite times, ?! = doesnt followed particular word*/
            /* /^\s*(STORAGE|HANDLING)\s*$/i - By Mitan Sir*/
        });

        $validatorProvider.register('min', {
            invoke: 'watch',
            init: function (value, scope, element, attrs, $injector) {
                this.customError = function (attrs) { return "This field width should be minimum " + attrs["min"]; }
            },
            validator: function (value, scope, element, attrs, $injector) {
                if (attrs["min"] === undefined)
                    return true;
                return (value.toString().length >= eval(attrs["min"]));
            },
            error: 'This field width should be minimum x'
        });
        $validatorProvider.register('max', {
            invoke: 'watch',
            init: function (value, scope, element, attrs, $injector) {
                this.customError = function (attrs) { return "This field should be maximum " + attrs["max"]; }
            },
            validator: function (value, scope, element, attrs, $injector) {
                if (attrs["max"] === undefined || value === undefined)
                    return true;
                return (value.toString().length <= eval(attrs["max"]));
            },
            error: 'This field should be maximum x'
        });


        $validatorProvider.register('rangemax', {
            invoke: 'watch',
            init: function (value, scope, element, attrs, $injector) {
                this.customError = function (attrs) { return "This field should be range less than" + attrs["rangemax"]; }
            },
            validator: function (value, scope, element, attrs, $injector) {
                if (attrs["rangemax"] === undefined || value === undefined)
                    return true;
                return (value <= eval(attrs["rangemax"]));
            },
            error: 'This field should be maximum x'
        });

        $validatorProvider.register('rangemin', {
            invoke: 'watch',
            init: function (value, scope, element, attrs, $injector) {
                this.customError = function (attrs) { return "This field should be range greater than " + attrs["rangemin"]; }
            },
            validator: function (value, scope, element, attrs, $injector) {
                if (attrs["rangemin"] === undefined || value === undefined)
                    return true;
                return (value >= eval(attrs["rangemin"]));
            },
            error: 'This field should be maximum x'
        });

        //this will not allow past date
        $validatorProvider.register('pastDate', {
            invoke: 'watch',
            init: function (value, scope, element, attrs, $injector) {
                this.customError = function (attrs) { return attrs["validatorMessage"]; }
            },
            validator: function (value, scope, element, attrs, $injector) {
                if (attrs["pastvalue"] === undefined)
                    return true;
                var val = scope.$eval(attrs["pastvalue"]);
                var currDate = new Date(new Date());
                if (val === undefined)
                    return false;
                else if (val < currDate)
                    return false;
                else
                    return true;
            },
            error: 'This field should be greater than xxx.'
        });

        $validatorProvider.register('requiredEnable', {
            invoke: 'watch',
            //init: function (value, scope, element, attrs, $injector) {
            //    this.customError = function (attrs) { return attrs["validatorMessage"]; }
            //},
            validator: function (value, scope, element, attrs, $injector) {
                var result = attrs["disablevalue"];
                if (result === undefined || result === 'true')
                    return true;

                else if (value !== undefined && value !== 0 && value !== null && value !== "")
                    return true;
                else
                    return false;
            },
            error: 'This field is required.'
        });

        //this will not allow future date
        $validatorProvider.register('futureDate', {
            invoke: 'watch',
            init: function (value, scope, element, attrs, $injector) {
                this.customError = function (attrs) { return attrs["validatorMessage"]; }
            },
            validator: function (value, scope, element, attrs, $injector) {
                if (attrs["futurevalue"] === undefined)
                    return true;
                var val = scope.$eval(attrs["futurevalue"]);
                var currDate = new Date(new Date());
                if (val === undefined)
                    return false;
                else if (val > currDate)
                    return false;
                else
                    return true;
            },
            error: 'This field should be greater than xxx.'
        });

        $validatorProvider.register('gt', {
            invoke: 'watch',
            init: function (value, scope, element, attrs, $injector) {
                this.customError = function (attrs) { return attrs["validatorMessage"]; }
            },
            validator: function (value, scope, element, attrs, $injector) {
                if (attrs["gtvalue"] === undefined)
                    return true;
                var val = scope.$eval(attrs["gtvalue"]);
                if (value === undefined)
                    return false;
                else if (value > val)
                    return true;
                else
                    return false;

            },
            error: 'This field should be greater than xxx.'
        });

        $validatorProvider.register('gte', {
            invoke: 'watch',
            init: function (value, scope, element, attrs, $injector) {
                this.customError = function (attrs) { return attrs["validatorMessage"]; }
            },
            validator: function (value, scope, element, attrs, $injector) {
                if (attrs["gtevalue"] === undefined)
                    return true;
                var val = scope.$eval(attrs["gtevalue"]);
                if (value === undefined)
                    return false;
                else if (value >= val)
                    return true
                else
                    return false;

            },
            error: 'This field should be greater than or equal to xxx.'
        });

        $validatorProvider.register('gtezerotime', {
            invoke: 'watch',
            init: function (value, scope, element, attrs, $injector) {
                this.customError = function (attrs) { return attrs["validatorMessage"]; }
            },
            validator: function (value, scope, element, attrs, $injector) {
                if (attrs["gtevalue"] === undefined)
                    return true;
                var val = scope.$eval(attrs["gtevalue"]);
                if (val != undefined)
                    val = new Date(val).setHours(0, 0, 0, 0);
                if (value === undefined)
                    return false;
                else if (value >= val)
                    return true
                else
                    return false;

            },
            error: 'This field should be greater than or equal to xxx.'
        });

        $validatorProvider.register('eq', {
            invoke: 'watch',
            init: function (value, scope, element, attrs, $injector) {
                this.customError = function (attrs) { return attrs["validatorMessage"]; }
            },
            validator: function (value, scope, element, attrs, $injector) {
                if (attrs["eqvalue"] === undefined)
                    return true;
                var val = scope.$eval(attrs["eqvalue"]);
                if (value === undefined)
                    return false;
                else if (value == val)
                    return true
                else
                    return false;

            },
            error: 'This field should be equal to xxx.'
        });

        $validatorProvider.register('lt', {
            invoke: 'watch',
            init: function (value, scope, element, attrs, $injector) {
                this.customError = function (attrs) { return attrs["validatorMessage"]; }
            },
            validator: function (value, scope, element, attrs, $injector) {
                if (attrs["ltvalue"] === undefined)
                    return true;
                var val = scope.$eval(attrs["ltvalue"]);
                if (val === undefined)
                    return true;
                if (value === undefined)
                    return false;
                else if (value < val)
                    return true
                else
                    return false;

            },
            error: 'This field should be less than xxx.'
        });

        $validatorProvider.register('lte', {
            invoke: 'watch',
            init: function (value, scope, element, attrs, $injector) {
                this.customError = function (attrs) { return attrs["validatorMessage"]; }
            },
            validator: function (value, scope, element, attrs, $injector) {
                if (value == 0)
                    return true;

                if (attrs["ltevalue"] === undefined)
                    return true;
                var val = scope.$eval(attrs["ltevalue"]);
                if (value === undefined)
                    return false;
                else if (value <= val)
                    return true

                else
                    return false;

            },
            error: 'This field should be less than or equal to xxx.'
        });

        /*Under progress*/
        $validatorProvider.register('bt', {
            invoke: 'watch',
            init: function (value, scope, element, attrs, $injector) {
                this.customError = function (attrs) { return attrs["validatorMessage"]; }
            },
            validator: function (value, scope, element, attrs, $injector) {
                if (attrs["btvalue"] === undefined)
                    return true;
                var val = scope.$eval(attrs["btvalue"]);
                if (value === undefined)
                    return false;
                else if (value >= val && value <= val)
                    return true
                else
                    return false;

            },
            error: 'This field should be less than or equal to xxx.'
        });


        $validatorProvider.register('custom', {
            invoke: 'watch',
            init: function (value, scope, element, attrs, $injector) {
                this.customError = function (attrs) { return attrs["validatorMessage"]; }
            },
            validator: function (value, scope, element, attrs, $injector) {
                if (attrs["function"] === undefined || value === undefined)
                    return true;
                var err = scope.$eval(attrs["function"]);
                if (err === undefined || err === "")
                    return true;
                else {
                    element.attr("validator-message", err);
                    return false;
                }
            },
            error: 'This field should be less.'
        });

        $validatorProvider.register('customRotationNumber', {
            invoke: 'watch',
            init: function (value, scope, element, attrs, $injector) {
                this.customError = function (attrs) { return attrs["validatorMessage"]; }
            },
            validator: function (value, scope, element, attrs, $injector) {
                if (attrs["function"] === undefined)
                    return true;
                var err = scope.$eval(attrs["function"]);
                if (err === undefined || err === "")
                    return true;
                else {
                    element.attr("validator-message", err);
                    return false;
                }
            },
            error: 'This field is Required.'
        });

        $validatorProvider.register('customResource', {
            invoke: 'watch',
            init: function (value, scope, element, attrs, $injector) {
                this.customError = function (attrs) { return attrs["validatorMessage"]; };
            },
            validator: function (value, scope, element, attrs, $injector) {
                if (attrs["function"] === undefined)
                    return true;
                var err = scope.$eval(attrs["function"]);
                if (err === undefined || err === "")
                    return true;
                else {
                    element.attr("validator-message", err);
                    return false;
                }
            },
            error: 'This field is Required.'
        });

        $validatorProvider.register('customSP', {
            invoke: 'watch',
            validator: function (value, scope, element, attrs, $injector) {

                if (value === undefined || value === "")
                    return (scope.model.IsSelectable == false && scope.model.IsProcessable == false);
                return true;


            },
            error: 'This field is required'
        });
        $validatorProvider.register('alphanumeric', {
            invoke: 'watch',
            validator: /^([-]\[+])?\w*$/i,
            error: 'This field should not contain special character and spaces.'
        });

        $validatorProvider.register('NoNumber', {
            invoke: 'watch',
            validator: /^([^0-9]*)$/,
            error: 'This field should not allow number.'
        });
        $validatorProvider.register('Date', {
            invoke: 'watch',
            validator: /[D|d]{2}[-|\/][m|M]{2}[-|\/][y|Y]{4} [H | h]{2}:[M | m]{2}:[S | s]{2}$/,
            error: 'This field should only allow / or - for date format.'
        });
        $validatorProvider.register('UTCValidator', {
            invoke: 'watch',
            validator: /[\d]{2}:[\d]{2}$/,
            error: 'UTC Zone fromat according to city eg.(HH:mm)'
        });
        $validatorProvider.register('hashRegx', {
            invoke: 'watch',
            validator: /^[#]...+[#]/,
            error: 'This field should start and end with #.'
        });


        $validatorProvider.register('integer', {
            invoke: 'watch',
            validator: /^[0-9]+$/,
            error: 'This field should be the number.'
        });
        $validatorProvider.register('email', {
            invoke: 'blur',
            validator: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            error: 'This field should be an email.'
        });
        $validatorProvider.register('url', {
            invoke: 'blur',
            validator: /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/,
            error: 'This field should be the url.'
        });

        $validatorProvider.register('characters', {
            invoke: 'watch',
            validator: /^[a-zA-Z ]*$/,
            error: 'This field should be the characters only.'
        });

        $validatorProvider.register('special', {
            invoke: 'watch',
            validator: /^[a-zA-Z0-9,()-/ ]*$/,
            error: 'This field should not allow special characters except - or /.'
        });

        $validatorProvider.register('validatePAN', {
            invoke: 'watch',
            validator: function (value, scope, element, attrs, $injector, $filter) {
                var country = null;
                if (!(scope.model.CustCountry == null || scope.model.CustCountry == undefined))
                    country = scope.model.CustCountry.toUpperCase();
                if (scope.model.CountryID === scope.country.filter(function (obj) { return obj.Code === "IND" || obj.Code === "#IND#" || obj.Code === "IN" })[0].ID || country == "INDIA") {
                    var re = /^([A-Za-z]){5}([0-9]){4}([A-Za-z]){1}$/;
                    return re.test(String(value));
                }
                else {
                    return true;
                }
            },
            error: 'Invalid PAN Number eg.AAAAA1111A'
        });
        $validatorProvider.register('validateTAN', {
            invoke: 'watch',
            validator: function (value, scope, element, attrs, $injector, $filter) {
                if (value == "" || value == null)
                    return true;
                var country = null;
                if (!(scope.model.CustCountry == null || scope.model.CustCountry == undefined))
                    country = scope.model.CustCountry.toUpperCase();
                if (scope.country !== undefined) {
                    if (scope.model.CountryID === scope.country.filter(function (obj) { return obj.Code === "IND" || obj.Code === "#IND#" || obj.Code === "IN" })[0].ID || country == "INDIA") {
                        var re = /^([A-Za-z]){4}([0-9]){5}([A-Za-z]){1}$/;
                        return re.test(String(value));
                    }
                    else {
                        return true;
                    }
                }
                else {
                    var re1 = /^([A-Za-z]){4}([0-9]){5}([A-Za-z]){1}$/;
                    return re1.test(String(value));
                }
            },
            error: 'Invalid TAN Number eg.AAAA11111A'
        });
        $validatorProvider.register('validateUIN', {
            invoke: 'watch',
            validator: function (value, scope, element, attrs, $injector, $filter) {
                if (value == "" || value == undefined)
                    return true;
                var re = /([0-9]){4}([A-Z]){3}([0-9]){5}([UO]){1}([N])([A-Z0-9]){1}/;
                return re.test(String(value));
            },
            error: 'Invalid UIN number. Sample format: 1111AAA11111UNA'
        });
        $validatorProvider.register('validateTAX', {
            invoke: 'watch',
            validator: function (value, scope, element, attrs, $injector, $filter) {
                var country = null;
                if (!(scope.item.CustCountry == null || scope.item.CustCountry == undefined))
                    country = scope.item.CustCountry.toUpperCase();
                if ((!scope.item.IsTaxUnregistered || scope.item.IsSEZ) && (scope.item.UINNo == "" || scope.item.UINNo == undefined) && scope.item.CountryID === scope.country.filter(function (obj) { return obj.Code === "IND" || obj.Code === "#IND#" || obj.Code === "IN" })[0].ID || country == "INDIA") {
                    var pan = scope.$parent.model.PanNo;
                    if (scope.item.Ex.States == undefined)
                        return true;
                    var formulatedValue = "";
                    if (scope.item.StateID != null)
                        formulatedValue = scope.item.Ex.States.find(x => x.ID === scope.item.StateID).LongName + pan;
                    var re = /[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z1-9A-J]{1}[0-9A-Z]{1}/;
                    if (re.test(String(value)) && String(value).startsWith(formulatedValue))
                        return true;
                    else
                        return false;
                } else {
                    return true;
                }
            },
            error: 'Invalid GST number. Sample format: 22AAAAA0000A1Z5'
        });
        $validatorProvider.register('validateSiteTAX', {
            invoke: 'watch',
            validator: function (value, scope, element, attrs, $injector, $filter) {
                var country = null;
                if (scope.model.SystemCountryID === scope.systemcountry.filter(function (obj) { return obj.Name === "India" || obj.Name === "INDIA" })[0].ID || country == "INDIA") {
                    var re = /^([0-9]){2}([A-Za-z]){5}([0-9]){4}([A-Za-z]){1}[a-zA-Z0-9]{3}$/;
                    return re.test(String(value));
                } else {
                    return true;
                }
            },
            error: 'Invalid GST number. Sample format: 22AAAAA0000A1Z5'
        });
        $validatorProvider.register('validateIE', {
            invoke: 'watch',
            validator: function (value, scope, element, attrs, $injector, $filter) {
                if (value == "" || value == null)
                    return true;
                var country = null;
                if (!(scope.model.CustCountry == null || scope.model.CustCountry == undefined))
                    country = scope.model.CustCountry.toUpperCase();
                if (scope.model.CountryID === scope.country.filter(function (obj) { return obj.Code === "IND" || obj.Code === "#IND#" || obj.Code === "IN" })[0].ID || country == "INDIA") {
                    var re = /^[0-9]{10}$/;
                    return re.test(String(value));
                } else {
                    return true;
                }
            },
            error: 'Invalid IE number eg.1234567890'
        });
        $validatorProvider.register('isInValidDate', {
            invoke: 'watch',
            validator: function (value, scope, element, attrs, $injector) {
                var currDate = new Date(value);
                if (currDate === undefined)
                    return false;
                else if (value == undefined)
                    return false;
                else
                    return true;
            },
            error: 'Invalid date format.'
        });

        return $validatorProvider;
    }
    ]);

}).call(this);
