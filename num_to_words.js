class NumberToWords {
  constructor() {
    this.NumberValue = '';
    this.WordsValue = '';
  }

  set NumberValue(value) {
    if (value >= 0 && value <= 999999999) {
      this._numberValue = value;
    } else {
      throw new Error('Please enter a number between 0 - 999,999,999');
    }
  }

  get NumberValue() {
    return this._numberValue;
  }

  ConvertToWords() {
    const ones = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
    const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
    const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

    let num = parseInt(this.NumberValue, 10);

    if (num === 0) {
      this.WordsValue = 'Zero';
      return;
    }

    let words = '';

    if (num >= 1000000) {
      let millions = Math.floor(num / 1000000);
      words += this.ConvertThreeDigitNumber(millions, ones, teens, tens) + ' Million ';
      num %= 1000000;
    }

    if (num >= 1000) {
      let thousands = Math.floor(num / 1000);
      words += this.ConvertThreeDigitNumber(thousands, ones, teens, tens) + ' Thousand ';
      num %= 1000;
    }

    words += this.ConvertThreeDigitNumber(num, ones, teens, tens);

    this.WordsValue = words.trim();
  }

  ConvertThreeDigitNumber(num, ones, teens, tens) {
    let words = '';

    if (num >= 100) {
      words += ones[Math.floor(num / 100)] + ' Hundred ';
      num %= 100;
    }

    if (num >= 10 && num < 20) {
      words += teens[num - 10] + ' ';
      num = 0;
    }

    if (num >= 20) {
      words += tens[Math.floor(num / 10)] + ' ';
      num %= 10;
    }

    if (num > 0) {
      words += ones[num];
    }

    return words;
  }
}

function convertNumber() {
  const numberInput = document.getElementById('numberInput').value;
  const numberToWords = new NumberToWords();

  try {
    numberToWords.NumberValue = numberInput;
    numberToWords.ConvertToWords();
    document.getElementById('result').textContent = numberToWords.WordsValue;
  } catch (error) {
    document.getElementById('result').textContent = error.message;
  }
}
