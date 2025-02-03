// Task 1: Obtaining API Key and Configuration
const timeStamp = new Date().getTime();
const privateKey = "your_private_key_here";
const publicKey = "65f6c3c02d551d550b145f091228b25c";
const hash = md5(timeStamp + privateKey + publicKey);
const limit = 20;
let offset = 0;
let characterList = [];

const apiUrl = (offset) => `https://gateway.marvel.com/v1/public/characters?ts=${timeStamp}&apikey=${publicKey}&hash=${hash}&limit=${limit}&offset=${offset}`;

// Task 2: Fetching Characters Using Fetch API
let characterCount = 0;

async function fetchCharacter() {
    try {
        if (characterList.length === 0 || characterCount >= characterList.length) {
            const response = await fetch(apiUrl(offset));
            const data = await response.json();

            if (!data.data.results.length) {
                console.error("No more characters found.");
                return null;
            }

            characterList = data.data.results;
            characterCount = 0;
            offset += limit;
        }

        const character = characterList[characterCount];
        console.log(`ID: ${character.id}, Name: ${character.name}, Description: ${character.description}`);
        
        characterCount++;
        return character;
    } catch (error) {
        console.error("Error fetching character:", error);
        return null;
    }
}

// Task 3: Updating User Interface Dynamically
// Remove private key from frontend
async function displayCharacter() {
    const characterContainer = document.getElementById("characters");

    const character = await fetchCharacter();
    
    if (character) {
        const img = new Image();
        img.src = `${character.thumbnail.path}/standard_amazing.${character.thumbnail.extension}`;
        img.alt = `Thumbnail of ${character.name}`;

        img.onload = () => {
            characterContainer.innerHTML = `
                <img src="${img.src}" alt="${img.alt}">
                <h1>${character.id} - ${character.name}</h1>
                <p>${character.description || "No description available."}</p>
            `;
        };
    } else {
        characterContainer.innerHTML = `<p>Error fetching character.</p>`;
    }
}

displayCharacter();
setInterval(displayCharacter, 3000);