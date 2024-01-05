function showOrgDetails(){
    var textpara=document.getElementById("showDetails");
    textpara.innerHTML = '<i class="bi bi-check-lg"></i>'+"   "+"Name of Level added";
    textpara.style.textAlign="left";
}
$(document).ready(function() {

    var $list = $('#menu');
    var $ddl  = $('#ddl');
    $list.click(function(){
      $ddl.toggleClass('active');
      console.log($ddl);
    });
});

$(document).ready(function() {

    var $chatList = $('#menu-chat');
    var $chatDdl  = $('#ddl-chat');
    $chatList.click(function(){
      $chatDdl.toggleClass('active');
    });
});

$(document).ready(function() {

  var $publicList = $('#menu-public');
  var $publicDdl  = $('#ddl-public');
  $publicList.click(function(){
    $publicDdl.toggleClass('active');
  });
});
$(document).ready(function() {

  var $uxList = $('#menu-ux');
  var $uxDdl  = $('#ddl-ux');
  $uxList.click(function(){
    $uxDdl.toggleClass('active');
  });
});

$(document).ready(function() {

  var $announceList = $('#menu-announce');
  var $announceDdl  = $('#ddl-announce');
  $announceList.click(function(){
    $announceDdl.toggleClass('active');
  });
});

$(document).ready(function() {

  var $guestList = $('#menu-guest');
  var $guestDdl  = $('#ddl-guest');
  $guestList.click(function(){
    $guestDdl.toggleClass('active');
  });
});

$(document).ready(function() {

  var $publicannounceList = $('#menu-public-announce');
  var $publicannounceDdl  = $('#ddl-public-announce');
  $publicannounceList.click(function(){
    $publicannounceDdl.toggleClass('active');
  });
});
$(document).ready(function() {

  var $uxannounceList = $('#menu-ux-announce');
  var $uxannounceDdl  = $('#ddl-ux-announce');
  $uxannounceList.click(function(){
    $uxannounceDdl.toggleClass('active');
  });
});

//myprofile
$(document).ready(function() {

  var $organisationList = $('#menu-organisation');
  var $organisationDdl  = $('#ddl-organisation');
  $organisationList.click(function(){
    $organisationDdl.toggleClass('active');
  });
});

$(document).ready(function() {

  var $editprofileList = $('#menu-edit-profile');
  var $editprofileDdl  = $('#ddl-edit-profile');
  $editprofileList.click(function(){
    $editprofileDdl.toggleClass('active');
  });
});

$(document).ready(function() {

  var $lastLoginsList = $('#menu-lastLogins');
  var $lastLoginsDdl  = $('#ddl-lastLogins');
  $lastLoginsList.click(function(){
    $lastLoginsDdl.toggleClass('active');
  });
});

// organoisation
$(document).ready(function() {

  var $productsList = $('#menu-products');
  var $productsDdl  = $('#ddl-products');
  $productsList.click(function(){
    $productsDdl.toggleClass('active');
  });
});

$(document).ready(function() {

  var $membersList = $('#menu-members');
  var $membersDdl  = $('#ddl-members');
  $membersList.click(function(){
    $membersDdl.toggleClass('active');
  });
});

$(document).ready(function() {

  var $guest00List = $('#menu-guest00');
  var $guest00Ddl  = $('#ddl-guest00');
  $guest00List.click(function(){
    $guest00Ddl.toggleClass('active');
  });
});

$(document).ready(function() {

  var $publicorgList = $('#menupublicorg');
  var $publicorgDdl  = $('#ddlpublicorg');
  $publicorgList.click(function(){
    $publicorgDdl.toggleClass('active');
  });
});





$(document).ready(function() {

  $(".top ol li:not(.current)").find("ol").hide().end() // Hide all other ULs
.click(function (e) {
    if (this == e.target) {
        $(this).children('ul').slideToggle();
    }
    $(this).children("li.line-content").text(this.toggle ? "+" : "-");
    return false;
});

  $(document).on("click",'.line-content', function(e){
    e.stopPropagation();
    console.log("hello hira")
    var clickedLi = $(this);
    $("> ol", clickedLi).slideToggle();
    clickedLi.toggleClass("current");
    $('.sub-menu').style.display='block'
  });
});










 function loadCountry() {
  const xhttp = new XMLHttpRequest();
  xhttp.onload = function() {
  output = this.responseText
var country_list =  JSON.parse(output)
console.log("country in own function", country_list);
   for(var i = 0; i < country_list.length; i++) {
  var country_radio = '<form><label class="radio-inline" style="margin-right:6px;"><input type="radio" name="'+country_list[i].country_short+'" checked> 1</label><label class="radio-inline" style="margin-right:6px;"><input type="radio" name="'+country_list[i].country_short+'"> 2</label><label class="radio-inline" style="margin-right:6px;"><input type="radio" name="'+country_list[i].country_short+'"> 3</label><label class="radio-inline" style="margin-right:6px;"><input type="radio" name="'+country_list[i].country_short+'"> 4</label><label class="radio-inline" style="margin-right:6px;"><input type="radio" name="'+country_list[i].country_short+'"> 5</label><label class="radio-inline"style="margin-right:6px;" ><input type="radio" name="'+country_list[i].country_short+'"> 6</label></form>';
  var country_checkbox = '<form><input type="checkbox" id="'+country_list[i].country_short+'" name="'+country_list[i].name+'" ><label for="'+country_list[i].country_short+'"></label></form>';
  let list = document.createElement('li');
    list.id = country_list[i].id;
    list.className ="line-content";
    let head_six = document.createElement('h6');
    head_six.id = country_list[i].name+country_list[i].country_short;
    let span_radio = document.createElement('span');
    span_radio.style.display = "inline-block";
    span_radio.innerHTML = country_radio;
    let span_checkbox = document.createElement('span');
    span_checkbox.style.display = "inline-block";
    span_checkbox.style.width = "20px"
    span_checkbox.innerHTML = country_checkbox;
    head_six.innerText=country_list[i].name+ " - Layer ";
    document.getElementById("first_page_button").click();
    document.querySelector('#setlocation').appendChild(list).appendChild(head_six).append(span_radio)
    ;

    document.getElementById(country_list[i].name+country_list[i].country_short).prepend(span_checkbox);

    loadCity(country_list[i].id, country_list[i].country_code);

  }
}
 xhttp.open("GET", "https://100074.pythonanywhere.com/countries/johnDoe123/haikalsb1234/100074/");
xhttp.send();
}
loadCountry();



async function loadCity(id, code) {
  const xhttp = new XMLHttpRequest();
  xhttp.onload =async function() {
  city = this.responseText;
  city_list = JSON.parse(city);
  console.log('City in own function',city_list)
  let order_list = document.createElement('ol');
  for(var i = 0; i < city_list.length; i++) {
    var city_radio = '<form><label class="radio-inline" style="margin-right:6px;"><input type="radio" name="'+city_list[i].country_short+'" checked> 1</label><label class="radio-inline" style="margin-right:6px;"><input type="radio" name="'+city_list[i].country_short+'"> 2</label><label class="radio-inline" style="margin-right:6px;"><input type="radio" name="'+city_list[i].country_short+'"> 3</label><label class="radio-inline" style="margin-right:6px;"><input type="radio" name="'+city_list[i].country_short+'"> 4</label><label class="radio-inline" style="margin-right:6px;"><input type="radio" name="'+city_list[i].country_short+'"> 5</label><label class="radio-inline" style="margin-right:6px;"><input type="radio" name="'+city_list[i].country_short+'"> 6</label></form>';
    var city_checkbox = '<form><input type="checkbox" id="'+city_list[i].country_short+'" name="'+city_list[i].name+'" ><label for="'+city_list[i].country_short+'"></label></form>';
    let nested_list = document.createElement('li');
      let nested_head_six = document.createElement('h6');
      nested_head_six.id = city_list[i].name+city_list[i].country_short+id;
      order_list.className = 'sub-menu';
      let span_city_radio = document.createElement('span');
      span_city_radio.style.display = "inline-block";
      span_city_radio.innerHTML = city_radio;
      nested_head_six.innerText=city_list[i].name+ " - Layer ";
      let span_checkbox_city = document.createElement('span');
    span_checkbox_city.style.display = "inline-block";
    span_checkbox_city.style.width = "20px"
    span_checkbox_city.innerHTML =city_checkbox;
      // main
      document.getElementById(id).appendChild(order_list).appendChild(nested_list).appendChild(nested_head_six).append(span_city_radio);
    document.getElementById(city_list[i].name+city_list[i].country_short+id).prepend(span_checkbox_city)
    }
  }
    xhttp.open("GET", "https://100074.pythonanywhere.com/region/code/"+code+"/johnDoe123/haikalsb1234/100074/");
  xhttp.send();
}



// language api
// function loadLanguages() {
//   const xhttp = new XMLHttpRequest();
//   xhttp.onload = function() {
//     lang_list = JSON.parse(this.response)
//     console.log("language response",lang_list);

//     for(var i=0;i<lang_list.length;i++){
//       for(var j=0;j<lang_list[i]['languages'].length;j++){
//         document.getElementById("language-list").append(lang_list[i]['languages'][j]['name'])
//       }
//       console.log('inside i', lang_list[i])
//     }
//   }


//  xhttp.open("GET", "https://restcountries.com/v2/lang/es");
// xhttp.send();
// }
// loadLanguages()



