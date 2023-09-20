import { catsData } from "./data.js"

const emotionRadios = document.getElementById("emotion-radios")

emotionRadios.addEventListener("change", highlightCheckedOption)

function highlightCheckedOption(e) {
    const target = document.getElementById(e.target.id)
    const radioArray = document.getElementsByClassName("radio")
    for (let radio of radioArray) {
        radio.classList.remove("highlight")
    }
    target.parentElement.classList.add("highlight")
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