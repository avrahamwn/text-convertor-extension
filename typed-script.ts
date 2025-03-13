function convertToEnglish(str: string): string {
    const mappings = new Map<string, string>([
        ["/", "q"], ["׳", "w"], ["ק", "e"], ["ר", "r"], ["א", "t"], ["ט", "y"], ["ו", "u"], ["ן", "i"], ["ם", "o"], ["פ", "p"],
        ["ש", "a"], ["ד", "s"], ["ג", "d"], ["כ", "f"], ["ע", "g"], ["י", "h"], ["ח", "j"], ["ל", "k"], ["ך", "l"], ["ף", ";"],
        ["ז", "z"], ["ס", "x"], ["ב", "c"], ["ה", "v"], ["נ", "b"], ["מ", "n"], ["צ", "m"], ["ת", ","], ["ץ", "."]
    ]);
    return str.replace(/./g, (char) => mappings.get(char) || char);
}

function convertToHebrew(str: string): string {
    const mappings = new Map<string, string>([
        ["q", "/"], ["w", "׳"], ["e", "ק"], ["r", "ר"], ["t", "א"], ["y", "ט"], ["u", "ו"], ["i", "ן"], ["o", "ם"], ["p", "פ"],
        ["a", "ש"], ["s", "ד"], ["d", "ג"], ["f", "כ"], ["g", "ע"], ["h", "י"], ["j", "ח"], ["k", "ל"], ["l", "ך"], [";", "ף"],
        ["z", "ז"], ["x", "ס"], ["c", "ב"], ["v", "ה"], ["b", "נ"], ["n", "מ"], ["m", "צ"], [",", "ת"], [".", "ץ"], ["/", "."], ["'", ","]
    ]);
    return str.replace(/./g, (char) => mappings.get(char) || char);
}

let toHebrew: boolean = false;
let textToConvert: string = '';

const toEnglishBtn = document.getElementById('toEnglish') as HTMLButtonElement;
const toHebrewBtn = document.getElementById('toHebrew') as HTMLButtonElement;
const input = document.getElementById('input') as HTMLInputElement;
const output = document.getElementById('output') as HTMLElement;
const copyBtn = document.getElementById('copy-btn') as HTMLButtonElement;
const replaceBtn = document.getElementById("replace-btn") as HTMLButtonElement;

input.focus();

window.addEventListener("load", async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab || !tab.id) return;

    let result: string | undefined;
    try {
        [{ result }] = await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: () => getSelection()?.toString() || "",
        });

        if (result) {
            textToConvert = result;
            input.value = result;
            output.innerHTML = convertToEnglish(result);
            copyBtn.textContent = "העתק";
            copyBtn.disabled = false;
            copyBtn.style.backgroundColor = 'green';
        }
    } catch (_) {}
});

toEnglishBtn.addEventListener('click', () => {
    toggleLanguage(false);
});

toHebrewBtn.addEventListener('click', () => {
    toggleLanguage(true);
});

function toggleLanguage(isHebrew: boolean): void {
    toEnglishBtn.classList.toggle('selected');
    toHebrewBtn.classList.toggle('selected');
    input.setAttribute('dir', isHebrew ? 'ltr' : 'rtl');
    output.setAttribute('dir', isHebrew ? 'rtl' : 'ltr');
    toHebrew = isHebrew;
    output.innerHTML = isHebrew ? convertToHebrew(textToConvert) : convertToEnglish(textToConvert);
    copyBtn.textContent = "העתק";
    copyBtn.style.backgroundColor = 'green';
    replaceBtn.textContent = "החלף טקסט";
    replaceBtn.style.backgroundColor = "#ffc107";
}

input.addEventListener('input', (e: Event) => {
    textToConvert = (e.target as HTMLInputElement).value || '';
    output.innerHTML = toHebrew ? convertToHebrew(textToConvert) : convertToEnglish(textToConvert);
    copyBtn.textContent = "העתק";
    copyBtn.disabled = false;
    copyBtn.style.backgroundColor = 'green';
    replaceBtn.textContent = "החלף טקסט";
    replaceBtn.style.backgroundColor = "#ffc107";
});

copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(output.innerHTML);
    copyBtn.textContent = "הועתק!";
    copyBtn.style.backgroundColor = 'darkgreen';
    copyBtn.style.color = "white";
    copyBtn.style.fontWeight = "bold";
});

replaceBtn.addEventListener("click", async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab || !tab.id) return;

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: replaceTextOnPage,
        args: [output.innerText]
    });
});

function replaceTextOnPage(newText: string): void {
    const activeElement = document.activeElement as HTMLInputElement | HTMLTextAreaElement;
    if (activeElement && (activeElement.tagName === "INPUT" || activeElement.tagName === "TEXTAREA")) {
        activeElement.value = newText;
    } else {
        const selection = window.getSelection();
        if (selection && selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            range.deleteContents();
            range.insertNode(document.createTextNode(newText));
        }
    }
    chrome.runtime.sendMessage({ action: "textReplaced" });
}

chrome.runtime.onMessage.addListener((message) => {
    if (message.action === "textReplaced") {
        replaceBtn.textContent = "הוחלף!";
        replaceBtn.style.backgroundColor = "darkgoldenrod";
        replaceBtn.style.color = "white";
        replaceBtn.style.fontWeight = "bold";
    }
});
