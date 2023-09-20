import { catsData } from "./data.js"

const emotionRadios = document.getElementById("emotion-radios")
const getImageBtn = document.getElementById("get-image-btn")

emotionRadios.addEventListener("change", highlightCheckedOption)
getImageBtn.addEventListener("click", getMatchingCatsArray)

function highlightCheckedOption(e) {
    const target = document.getElementById(e.target.id)
    const radioArray = document.getElementsByClassName("radio")
    for (let radio of radioArray) {
        radio.classList.remove("highlight")
    }
    target.parentElement.classList.add("highlight")
}

function getMatchingCatsArray() {
    const selectedEmotion = document.querySelector("input[type='radio']:checked")
    if (selectedEmotion) {
        console.log(selectedEmotion.value)
    }
}

function getEmotionsArray(cats){
    const emotionsArray = []
    for (let cat of cats) {
        for (let emotion of cat.emotionTags) {
            if (!emotionsArray.includes(emotion)) {
                emotionsArray.push(emotion)
            }
        }
    }
    return emotionsArray
}

function renderEmotionsRadios(cats) {
    const emotions = getEmotionsArray(cats)
    let radioItems = ""
    
    for (let emotion of emotions) {
        radioItems += `
            <div class="radio">
                <label for="${emotion}">${emotion}</label>
                <input type="radio" id="${emotion}" value="${emotion}" name="emotions">
            </div>
        `
    }

    emotionRadios.innerHTML = radioItems
}

renderEmotionsRadios(catsData)