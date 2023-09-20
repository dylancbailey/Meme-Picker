import { catsData } from "./data.js"

const emotionRadios = document.getElementById("emotion-radios")
const getImageBtn = document.getElementById("get-image-btn")
const gifCheckbox = document.getElementById("gifs-only-option")
const memeModalInner = document.getElementById("meme-modal-inner")
const memeModal = document.getElementById("meme-modal")
const memeModalCloseBtn = document.getElementById("meme-modal-close-btn")

emotionRadios.addEventListener("change", highlightCheckedOption)
memeModalCloseBtn.addEventListener("click", closeModal)
getImageBtn.addEventListener("click", renderCat)

function highlightCheckedOption(e) {
    const target = document.getElementById(e.target.id)
    const radioArray = document.getElementsByClassName("radio")
    for (let radio of radioArray) {
        radio.classList.remove("highlight")
    }
    target.parentElement.classList.add("highlight")
}

function closeModal() {
    memeModal.style.display = "none"
}

function renderCat() {
    const catObject = getSingleCatObject()
    
    memeModalInner.innerHTML = `
        <img class="cat-img"
        src="./images/${catObject.image}"
        alt="${catObject.alt}">
    `
    memeModal.style.display = "flex"
}

function getSingleCatObject() {
    const catsArray = getMatchingCatsArray()

    if (catsArray.length === 1) {
        return catsArray[0]
    } else {
        const randomNumber = Math.floor(Math.random() * catsArray.length)
        return catsArray[randomNumber]
    }
}

function getMatchingCatsArray() {
    if (document.querySelector("input[type='radio']:checked")) {
        const selectedEmotion = document.querySelector("input[type='radio']:checked").value
        const isGif = gifCheckbox.checked
        
        const matchingCatsArray = catsData.filter(function(cat) {
            const emotionTag = cat.emotionTags

            if (isGif) {
                return cat.isGif && emotionTag.includes(selectedEmotion)
            } else {
                return emotionTag.includes(selectedEmotion)
            }
        })
        return matchingCatsArray
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