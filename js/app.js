"use strict";

let clickedPage = "page-1";
let HornesArr = [];

function dataValue() {
    $.ajax(`../data/${clickedPage}.json`).then((data) => {

        data.forEach((val, idx) => {
            let newHornes = new Hornes(
                val.image_url,
                val.title,
                val.description,
                val.keyword,
                val.horns
            );
            newHornes.render();
            // console.log(val.horns);
        });
    });
}

dataValue();


let keyWords = [];

function Hornes(image_url, title, description, keyword, horns) {
    this.image_url = image_url;
    this.title = title;
    this.description = description;
    this.keyword = keyword;
    this.horns = horns;

    HornesArr.push(this);
}

Hornes.prototype.render = function () {
    let template = $('#gallery-template').html();
    let html = Mustache.render(template, this);
    $('main').append(html);

    let checkKeyword = keyWords.includes(this.keyword);

    if (checkKeyword == false) {
        keyWords.push(this.keyword);
        $('#select').append(`<option value="${this.keyword}"> 
    ${this.keyword} 
  </option>`);
    } else {
    }

};

$("#select").change(function () {
    let selectedE = $(this).children("option:selected").val();
    console.log(selectedE);
    $('section').addClass('off');
    $('.' + selectedE).removeClass('off');

    if (selectedE == "default") {
        $('section').removeClass('off');
    }
});

$("#page1").click(function () {
    clickedPage = "page-1";
    $("#select").html("<option value='default'>Filter by Keyword</option>");
    keyWords = [];
    $("main").html("");
    HornesArr = [];
    dataValue();
})

$("#page2").click(function () {
    clickedPage = "page-2";
    $("#select").html("<option value='default'>Filter by Keyword</option>");
    keyWords = [];
    $("main").html("");
    HornesArr = [];
    dataValue();
})

$("#sort").change(function () {
    let selectedC = $(this).children("option:selected").val();
    // console.log(selectedC);

    if (selectedC == "title") {
        HornesArr.sort((a, b) => {
            if (a.title.toUpperCase() < b.title.toUpperCase()) return -1;
            else if (a.title.toUpperCase() > b.title.toUpperCase()) return 1;
            else return 0;
        });
        $("main").html("");
        render(HornesArr);
    }

    if (selectedC == "horns") {
        HornesArr.sort((a, b) => {
            if (a.horns < b.horns) return -1;
            else if (a.horns > b.horns) return 1;
            else return 0;
        });
        $("main").html("");
        render(HornesArr);
    }

});

function render(objArr) {
    objArr.forEach(element => {
        let musTemplate = $('#gallery-template').html();
        let newObj = Mustache.render(musTemplate, element);
        $('main').append(newObj);
    });
}