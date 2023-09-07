function convertToEnglish(str) {
    str = str.replace(new RegExp("/", "g"), "q");
    str = str.replace(new RegExp("'", "g"), "w");
    str = str.replace(new RegExp("ק", "g"), "e");
    str = str.replace(new RegExp("ר", "g"), "r");
    str = str.replace(new RegExp("א", "g"), "t");
    str = str.replace(new RegExp("ט", "g"), "y");
    str = str.replace(new RegExp("ו", "g"), "u");
    str = str.replace(new RegExp("ן", "g"), "i");
    str = str.replace(new RegExp("ם", "g"), "o");
    str = str.replace(new RegExp("פ", "g"), "p");

    str = str.replace(new RegExp("ש", "g"), "a");
    str = str.replace(new RegExp("ד", "g"), "s");
    str = str.replace(new RegExp("ג", "g"), "d");
    str = str.replace(new RegExp("כ", "g"), "f");
    str = str.replace(new RegExp("ע", "g"), "g");
    str = str.replace(new RegExp("י", "g"), "h");
    str = str.replace(new RegExp("ח", "g"), "j");
    str = str.replace(new RegExp("ל", "g"), "k");
    str = str.replace(new RegExp("ך", "g"), "l");
    str = str.replace(new RegExp("ף", "g"), ";");

    str = str.replace(new RegExp("ז", "g"), "z");
    str = str.replace(new RegExp("ס", "g"), "x");
    str = str.replace(new RegExp("ב", "g"), "c");
    str = str.replace(new RegExp("ה", "g"), "v");
    str = str.replace(new RegExp("נ", "g"), "b");
    str = str.replace(new RegExp("מ", "g"), "n");
    str = str.replace(new RegExp("צ", "g"), "m");
    str = str.replace(new RegExp("ת", "g"), ",");
    str = str.replace(new RegExp("ץ", "g"), ".");
    return str;
}

function convertToHebrew(str) {
    str = str.replace(new RegExp("q", "g"), "/");
    str = str.replace(new RegExp("w", "g"), "'");
    str = str.replace(new RegExp("e", "g"), "ק");
    str = str.replace(new RegExp("r", "g"), "ר");
    str = str.replace(new RegExp("t", "g"), "א");
    str = str.replace(new RegExp("y", "g"), "ט");
    str = str.replace(new RegExp("u", "g"), "ו");
    str = str.replace(new RegExp("i", "g"), "ן");
    str = str.replace(new RegExp("o", "g"), "ם");
    str = str.replace(new RegExp("p", "g"), "פ");

    str = str.replace(new RegExp("a", "g"), "ש");
    str = str.replace(new RegExp("s", "g"), "ד");
    str = str.replace(new RegExp("d", "g"), "ג");
    str = str.replace(new RegExp("f", "g"), "כ");
    str = str.replace(new RegExp("g", "g"), "ע");
    str = str.replace(new RegExp("h", "g"), "י");
    str = str.replace(new RegExp("j", "g"), "ח");
    str = str.replace(new RegExp("k", "g"), "ל");
    str = str.replace(new RegExp("l", "g"), "ך");
    str = str.replace(new RegExp(";", "g"), "ף");

    str = str.replace(new RegExp("z", "g"), "ז");
    str = str.replace(new RegExp("x", "g"), "ס");
    str = str.replace(new RegExp("c", "g"), "ב");
    str = str.replace(new RegExp("v", "g"), "ה");
    str = str.replace(new RegExp("b", "g"), "נ");
    str = str.replace(new RegExp("n", "g"), "מ");
    str = str.replace(new RegExp("m", "g"), "צ");
    str = str.replace(new RegExp(",", "g"), "ת");
    str = str.replace(new RegExp("\\.", "g"), "ץ");
    return str;
}


let toHebrew = false
let textToConvert = '';
const toEnglishBtn = document.getElementById('toEnglish');
const toHebrewBtn = document.getElementById('toHebrew');
const input = document.getElementById('input');
const output = document.getElementById('output');

toEnglishBtn.addEventListener('click', e => {
    toEnglishBtn.classList.toggle('selected');
    toHebrewBtn.classList.toggle('selected');
    input.setAttribute('dir', 'rtl');
    output.setAttribute('dir', 'ltr');
    toHebrew = false;
    output.innerHTML = convertToEnglish(textToConvert);
});
toHebrewBtn.addEventListener('click', e => {
    toEnglishBtn.classList.toggle('selected');
    toHebrewBtn.classList.toggle('selected');
    input.setAttribute('dir', 'ltr');
    output.setAttribute('dir', 'rtl');
    toHebrew = true;
    output.innerHTML = convertToHebrew(textToConvert);
})

input.addEventListener('input', e => {
    textToConvert = e.target.value || '';
    if (toHebrew) {
        output.innerHTML = convertToHebrew(textToConvert);
    } else {
        output.innerHTML = convertToEnglish(textToConvert);
    }
})
