var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var EasyPasswordGenerator = /** @class */ (function () {
    function EasyPasswordGenerator() {
        var _this = this;
        this.HTMLElements = {
            generatePasswordButton: document.getElementById('generate-password'),
            generatedPassword: document.getElementById('generated-password'),
            passwordLength: document.getElementById('password-length'),
            uppercaseChars: document.getElementById('uppercase-checkbox'),
            numbersCheckbox: document.getElementById('numbers-checkbox'),
            symbolsCheckbox: document.getElementById('symbols-checkbox')
        };
        this.passwordData = {
            lowerAlphabetArr: 'abcdefghijklmnopqrstuvwxyz'.split(''),
            upperAlphabetArr: 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split(''),
            numbers: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            symbolsArr: '!@#$%^&*()_+}{|":,.;[]/'.split('')
        };
        this.pushToPasswordArray = function (passwordsArray, arrayOfChars) {
            arrayOfChars.map(function (arr) {
                passwordsArray.push(arr);
            });
            return passwordsArray;
        };
        this.randomIntFromInterval = function (min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        };
        this.shuffleArray = function (array) {
            var _a;
            for (var i = array.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                _a = [array[j], array[i]], array[i] = _a[0], array[j] = _a[1];
            }
            return array;
        };
        this.generatePassword = function () {
            var passwordArr = [];
            var passwordLength = parseInt(_this.HTMLElements.passwordLength.value);
            var letter = _this.shuffleArray(_this.passwordData.lowerAlphabetArr).join('');
            var upperLetters = (_this.HTMLElements.uppercaseChars.checked === true) ? _this.shuffleArray(_this.passwordData.upperAlphabetArr).join('') : '';
            var number = (_this.HTMLElements.numbersCheckbox.checked === true) ? _this.shuffleArray(_this.passwordData.numbers).join('') : '';
            var symbol = (_this.HTMLElements.symbolsCheckbox.checked === true) ? _this.shuffleArray(_this.passwordData.symbolsArr).join('') : '';
            passwordArr = _this.pushToPasswordArray(passwordArr, __spreadArrays(letter, upperLetters, number, symbol));
            passwordArr = _this.shuffleArray(passwordArr);
            var randomNum = _this.randomIntFromInterval(0, passwordArr.length) - passwordLength;
            if (randomNum <= 0) {
                randomNum = randomNum + passwordLength;
            }
            else if (randomNum > passwordLength) {
                randomNum = randomNum - passwordLength;
            }
            else {
                randomNum = randomNum;
            }
            var finalPassord = __spreadArrays(passwordArr);
            finalPassord = finalPassord.splice(randomNum, passwordLength);
            var generatedPassword = finalPassord.join('');
            _this.HTMLElements.generatedPassword.innerHTML = generatedPassword;
        };
        this.HTMLElements.generatePasswordButton.addEventListener('click', this.generatePassword);
    }
    return EasyPasswordGenerator;
}());
new EasyPasswordGenerator();
