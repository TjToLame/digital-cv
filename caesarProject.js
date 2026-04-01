// Caesar Cipher Project - Secret Party Edition
// Author: Thomas Wilford

const alphabet = "abcdefghijklmnopqrstuvwxyz";

// Normalize shift
function normalizeShift(shift) {
    return ((shift % 26) + 26) % 26;
}

// ======================
// ENCRYPT FUNCTION
// ======================
function encrypt(message, shiftValue) {
    let encrypted = "";
    let counter = 0;

    shiftValue = normalizeShift(shiftValue);

    for (let i = 0; i < message.length; i++) {
        let char = message[i];
        let lower = char.toLowerCase();
        let index = alphabet.indexOf(lower);

        // Keep non-letters unchanged
        if (index === -1) {
            encrypted += char;
            continue;
        }

        // Shift forward
        let newIndex = (index + shiftValue) % 26;
        let newChar = alphabet[newIndex];

        // Preserve uppercase
        if (char === char.toUpperCase()) {
            encrypted += newChar.toUpperCase();
        } else {
            encrypted += newChar;
        }

        // Count ONLY letters
        counter++;

        // Insert random letter every 2 letters
        if (counter % 2 === 0) {
            let randomLetter =
                alphabet[Math.floor(Math.random() * alphabet.length)];
            encrypted += randomLetter;
        }
    }

    return encrypted;
}

// ======================
// REMOVE RANDOM LETTERS
// ======================
function removeRandomLetters(message) {
    let filtered = "";
    let counter = 0;

    for (let i = 0; i < message.length; i++) {
        let char = message[i];

        if (/[a-zA-Z]/.test(char)) {
            counter++;

            // Skip every 3rd letter (random inserted ones)
            if (counter % 3 === 0) {
                continue;
            }
        }

        filtered += char;
    }

    return filtered;
}

// ======================
// DECRYPT FUNCTION
// ======================
function decrypt(encryptedMessage, shiftValue) {
    let filtered = removeRandomLetters(encryptedMessage);
    let decrypted = "";

    shiftValue = normalizeShift(shiftValue);

    for (let i = 0; i < filtered.length; i++) {
        let char = filtered[i];
        let lower = char.toLowerCase();
        let index = alphabet.indexOf(lower);

        if (index === -1) {
            decrypted += char;
            continue;
        }

        let newIndex = (index - shiftValue + 26) % 26;
        let newChar = alphabet[newIndex];

        if (char === char.toUpperCase()) {
            decrypted += newChar.toUpperCase();
        } else {
            decrypted += newChar;
        }
    }

    return decrypted;
}

// ======================
// TESTING
// ======================
console.log("ENCRYPTED TEST:");
let encrypted = encrypt("Hello World", 3);
console.log(encrypted);

console.log("DECRYPTED TEST:");
let decrypted = decrypt(encrypted, 3);
console.log(decrypted);