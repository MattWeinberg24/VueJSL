/**
 * Converts Nippon romazi to JSL romazi
 * @param {string} nippon Nippon romazi to convert
 * @returns {string} The resulting JSL romazi
 */
export function nipponToJSL(nippon) {
    return nippon.replace("î","ii").replace("ô","oo").replace("ê","ee").replace("â","aa").replace("ou","oo").replace("ei","ee"); 
}

/**
 * Finds the highest lesson of any kanji within a single word
 * @param {string} word The kanji word to process
 * @param {Map} kanjiMap A map of kanji to their respective JWL lesson
 * @returns {string} The maximum lesson of all the kanji in the word (1A if all Kana, 100A if Kanji not in data)
 */
export function maxLesson(word, kanjiMap){
    let max = "1A";
    for (let c of word){
        if (Kuroshiro.Util.isKanji(c)){ //skip if not kanji
            let l = kanjiMap.get(c);
            if (l == undefined){ //kanji is not learned if not in data
                return "100A"; //simulates a kanji being "too hard"
            }
            else if (compareLesson(l,max)){ //replace max if l > max
                max = l;
            }
        }
    }
    return max;
}

/**
  * @param {string} a The first lesson string 
  * @param {string} b The second lesson string
  * @returns {boolean} True if a is higher than b, false otherwise
  */
export function compareLesson(a,b){
    let aSplit = a.split(/(\d+)/); //splits between letters and numbers
    let bSplit = b.split(/(\d+)/);
    if (aSplit[1] == bSplit[1]){ //if both rows have the same number lesson, sort by letter
        return aSplit[2] > bSplit[2];
    }
    else { //otherwise sort by number
        return Number(aSplit[1]) > Number(bSplit[1]);
    }
}

/**
 * @param {string} l The lesson to increment
 * @returns One lesson above the parameter
 */
export function incrementLesson(l){
    let split = l.split(/(\d+)/);
    if (split[2] == "A"){ //if parameter is an A Lesson
        return split[1] + "B"; //replace A with B
    }
    else {
        let num = Number(split[1]) + 1; //add 1 to the lesson number
        return num.toString() + "A";  //replace B with A
    }
}