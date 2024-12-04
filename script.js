// Voice Recognition Setup
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = 'en-US';
recognition.interimResults = false;

const startRecognitionButton = document.getElementById('startRecognition');
const spokenTextElement = document.getElementById('spokenText');
const inputTextArea = document.getElementById('inputText');


startRecognitionButton.addEventListener('click', () => {
    recognition.start();
});

// Capture voice recognition result
recognition.addEventListener('result', (event) => {
    const spokenText = event.results[0][0].transcript;
    spokenTextElement.textContent = spokenText;
    inputTextArea.value = spokenText;
});


const translateButton = document.getElementById('translateButton');
const translationOutput = document.getElementById('translationOutput');
const languageSelector = document.getElementById('languageSelector');


translateButton.addEventListener('click', async () => {
    const textToTranslate = inputTextArea.value;
    const targetLanguage = languageSelector.value;

    if (!textToTranslate) {
        alert("Please enter or speak some text to translate!");
        return;
    }

    try {
        const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(textToTranslate)}&langpair=en|${targetLanguage}`);
        const data = await response.json();
        const translatedText = data.responseData.translatedText;
        translationOutput.textContent = translatedText;
    } catch (error) {
        console.error("Error during translation:", error);
        alert("Translation failed. Please try again.");
    }
});
