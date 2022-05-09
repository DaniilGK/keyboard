export function assignKeys() {
    let allKey = Array.from(document.querySelectorAll(".key"));
    let engLang = [
        "96", "49", "50", "51", "52", "53", "54", "55", "56", "57", "48", "45", "61", "8", 
        "9", "113", "119", "101", "114", "116", "121", "117", "105", "111", "112", "91", "93", "220", "46",
        "20", "97", "115", "100", "102", "103", "104", "106", "107", "108", "59", "39", "13",
        "16", "122", "120", "99", "118", "98", "110", "109", "44", "46", "47", "38", "16",
        "17", "", "18", "32", "18", "37", "40", "39"
    ];

    for(let i = 0; i < 64; i++) {
        allKey[i].children[0].innerHTML = String.fromCharCode(engLang[i]);
        if(i === 53) allKey[i].innerHTML = "🠕";
        if(i === 60) allKey[i].innerHTML = "🠔";
        if(i === 61) allKey[i].innerHTML = "🠗";
        if(i === 62) allKey[i].innerHTML = "🠖";
    }

    function bindKey() {
        window.addEventListener("keydown", function(event) {
            if(event.metaKey) console.log("aDDDD");
        
            console.log(event.key)
            console.log(event.code)
        })
    }
    bindKey()
}