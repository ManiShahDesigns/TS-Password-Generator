class EasyPasswordGenerator {
    private HTMLElements: any = {
        generatePasswordButton: (document.getElementById('generate-password') as HTMLElement),
        generatedPassword: (document.getElementById('generated-password') as HTMLElement),
        passwordLength: (document.getElementById('password-length') as HTMLInputElement),
        uppercaseChars: (document.getElementById('uppercase-checkbox') as HTMLInputElement),
        numbersCheckbox: (document.getElementById('numbers-checkbox') as HTMLInputElement),
        symbolsCheckbox: (document.getElementById('symbols-checkbox') as HTMLInputElement)
    }

    private passwordData: any = {
        lowerAlphabetArr: 'abcdefghijklmnopqrstuvwxyz'.split(''),
        upperAlphabetArr: 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split(''),
        numbers: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        symbolsArr: '!@#$%^&*()_+}{|":,.;[]/'.split('')
    }

    private pushToPasswordArray = (passwordsArray, arrayOfChars) => {
        arrayOfChars.map((arr) => {
            passwordsArray.push(arr)
        })

        return passwordsArray
    }

    private randomIntFromInterval = (min: number, max: number) => {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    private shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    private generatePassword = () => {
        let passwordArr = [];
        const passwordLength = parseInt(this.HTMLElements.passwordLength.value);

        const letter = this.shuffleArray(this.passwordData.lowerAlphabetArr).join('')

        const upperLetters = (this.HTMLElements.uppercaseChars.checked === true) ? this.shuffleArray(this.passwordData.upperAlphabetArr).join('') : ''

        const number = (this.HTMLElements.numbersCheckbox.checked === true) ? this.shuffleArray(this.passwordData.numbers).join('') : ''

        const symbol = (this.HTMLElements.symbolsCheckbox.checked === true) ? this.shuffleArray(this.passwordData.symbolsArr).join('') : ''

        passwordArr = this.pushToPasswordArray(passwordArr, [...letter, ...upperLetters, ...number, ...symbol]);

        passwordArr = this.shuffleArray(passwordArr)

        let randomNum = this.randomIntFromInterval(0, passwordArr.length) - passwordLength;

        if (randomNum <= 0) {
            randomNum = randomNum + passwordLength
        } else if (randomNum > passwordLength) {
            randomNum = randomNum - passwordLength
        } else {
            randomNum = randomNum
        }

        let finalPassord = [...passwordArr]

        finalPassord = finalPassord.splice(randomNum, passwordLength)

        const generatedPassword: string = finalPassord.join('')

        this.HTMLElements.generatedPassword.innerHTML = generatedPassword;
    }

    public constructor() {
        this.HTMLElements.generatePasswordButton.addEventListener('click', this.generatePassword)
    }

}

new EasyPasswordGenerator()
