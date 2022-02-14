var wordlist = ["kyuusyuusuku-ruobubizinesu", "kyuusyuudezaina-gakuin", "kyuusyuubizyuarua-tu", "kyuusyuukankousenmongakkou", "getuyoubinokadaiyoudesu", "puroguraminguhamuzukasii"];
var wordlistJapanese = ["九州スクールオブビジネス", "九州デザイナー学院", "九州ビジュアルアーツ", "九州観光専門学校", "月曜日の課題用です", "プログラミングは難しい"];
var time_limit = 15;
var readytime = 3;
var score;
var correct;
var mistake;
var char_num = 0;
var word_char;
var random;

function ready() {
    var typing_time_l = document.getElementById("typing_time_l");
    var typing_time_i = document.getElementById("typing_time_i");
    time_limit = parseInt(typing_time_i.value);
    readytime = 3;
    scoredis.innerHTML = "";
    start_button.style.visibility = "hidden";
    typing_time_l.style.display = "none";
    var readytimer = setInterval(function () {
        count.innerHTML = readytime;
        readytime--;
        if (readytime < 0) {
            clearInterval(readytimer);
            gameStart();
        }
    }, 1000);
}
function gameStart() {
    score = 0.0;
    mistake = 0;
    correct = 0;
    wordDisplay();
    var time_remaining = time_limit;
    var gametimer = setInterval(function () {
        count.innerHTML = "残り時間：" + time_remaining;
        time_remaining--;
        if (time_remaining <= 0) {
            clearInterval(gametimer);
            finish();
        }
    }, 1000);
}
function wordDisplay() {
    random = Math.floor(Math.random() * wordlist.length);
    word.innerHTML = wordlist[random];
    japanese.innerHTML = wordlistJapanese[random];
    charInsort();
}
function charInsort() {
    word_char = wordlist[random].charAt(char_num);
}
function finish() {
    score = Math.floor(Math.pow(correct, 2) * Math.pow((correct / (correct + mistake)), 5));
    scoredis.innerHTML = "スコア:" + score + "点" + "<hr>正タイプ数:" + correct + "<br>ミスタイプ数:" + mistake + "<br>正答率" + (correct / (correct + mistake) * 100).toFixed(1) + "%";
    count.innerHTML = "";
    word.innerHTML = "";
    japanese.innerHTML = "";
    start_button.style.visibility = "visible";
    word_char = 0;
    random = 0;
    char_num = 0;
}
window.onload = function () {
    document.onkeydown = function (e) {
        var keyStr = e.key;
        keyStr = keyStr.toLowerCase();
        if (keyStr == word_char) {
            word.innerHTML = "<span style='color: red;'>" + wordlist[random].slice(0, char_num + 1) + "</span>" + wordlist[random].slice(char_num + 1, wordlist[random].length);
            char_num++;
            correct++;
            charInsort();
        } else {
            mistake++;
        }
        if (char_num == wordlist[random].length) {
            char_num = 0;
            wordDisplay();
        }
    };
}