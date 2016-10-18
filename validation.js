(function(){

  var form = document.querySelector('#main_form');
  var inputs = form.querySelectorAll('input');
  var btn = document.querySelector('button');

  //add handler for each input
  for (var i = 0; i < inputs.length;  i++) {
    //denie entering cirilic symbols and secial symbols
    if (inputs[i].name == "mail") {
      inputs[i].addEventListener('keypress', function(event){
        if(/[а-яА-ЯёЁ]/g.test(event.key) || /[|&;$%#!*`~=_?'"\\\/<>()^\[\]+,]/g.test(event.key)){
          event.preventDefault();
        }
      });
    }
    else if ( inputs[i].name == "phone") {
      inputs[i].addEventListener('keypress', function(event){
        if(/[^0-9]/.test(event.key) || /[а-яА-ЯёЁ]/g.test(event.key) || /[|&;$%#!*`@~=№:_?'"\-\\\/<>()^\[\]+,.]/g.test(event.key)){
          event.preventDefault();
        }
      });
    }
    else {
      inputs[i].addEventListener('keypress', function(e){
        if(/[|&;$%#!*_?'"\-\\\/<>()^№:=\[\].@+, 0-9]/g.test(e.key)) {
          event.preventDefault();
        }
      });
    }
    
    //validation input on focusout
    inputs[i].addEventListener('focusout', function(){
      checkValiditi(this);
    });
  }

  // add handler for send-button
  btn.addEventListener('click', function(e){
    e.preventDefault();
    if (checkValiditi(inputs)) {

      var data = getData(inputs);
      var xhr = new XMLHttpRequest();
      xhr.open('POST', pass_to_file+'register_mail.php', true );
      xhr.setRequestHeader("Content-type", "application/json");
      xhr.send(JSON.stringify(data) );
      xhr.onreadystatechange = function() { // (3)
        if (xhr.readyState != 4) return;

        
        btn.disabled = true;
        btn.classList.add('disabled');

        if (xhr.status != 200) {
            btn.innerHTML = 'Ошибка!';
        } else {
            btn.innerHTML = 'Готово!';
        }

      };
    }
  });

  //return data from fields
  function getData(inpts){
    var data = {};
    for (var i = 0; i < inpts.length; i++) {
      data[inpts[i].name] = inpts[i].value;
    }
    return data;
  };

  // validation function
  function checkValiditi(inpts) {
    var result = true;
    var inputs = [];
    if (inpts.length) {
      inputs = inpts;
    }
    else {
      inputs.push(inpts);
    }
    for (var i = 0; i < inputs.length; i++) {

      var input = inputs[i];
      var val = input.value;
      var tooltip = input.parentElement.querySelector('.field__tooltip');

      input.parentElement.classList.remove('field-error');
      tooltip.innerHTML ="";
      //валидация имени
      if (input.dataset.validation == 'fname') {

        var regn = /[|&;$%@#!*'"<>()\[\]+,.]/g;

        if (val.length < 2 || regn.test(val) || /\d/.test(val)) {
          result = false;
          input.parentElement.classList.add('field-error');
          if (val.length < 1) {
            tooltip.innerHTML = "Обязательное поле";
          }
          else if (val.length < 2) {
            tooltip.innerHTML = "Минимум 2 буквы";
          }
          else  {
            tooltip.innerHTML = "Неправильное имя";
          }

        }
      }

      //валидация фамилии
      if (input.dataset.validation == 'lname') {

        var regn = /[|&;$%@#!*'"<>()\[\]+,.]/g;

        if (val.length < 2 || regn.test(val) || /\d/.test(val)) {
          result = false;
          input.parentElement.classList.add('field-error');
          if (val.length < 1) {
            tooltip.innerHTML = "Обязательное поле";
          }
          else if (val.length < 2) {
            tooltip.innerHTML = "Минимум 2 буквы";
          }
          else  {
            tooltip.innerHTML = "Неправильная фамилия";
          }

        }
      }

      //валидация email
      if (input.dataset.validation == 'mail') {

        var regm = /^(([^<>()\[\]\\.,;&%=*!:#'$^\s@"]+(\.[^<!=>()\[\]\\.,;*&:%'#$^\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!regm.test(val)) {
          result = false;
          input.parentElement.classList.add('field-error');
          if (val.length < 1) {
            tooltip.innerHTML = "Обязательное поле";
          }
          else  {
            tooltip.innerHTML = "Пример: your-name@somedomain.com";
          }
        }
      }

      //валидация телефона
      if (input.dataset.validation == 'phone') {

        var regp = /^\d[\d\(\)\ -]{5,14}\d$/;
        var regs = /[<>()\[\]\\.,;:\-#'$()^\s@"]/;
        if (!regp.test(val) || regs.test(val)) {
          result = false;
          input.parentElement.classList.add('field-error');
          if (val.length < 1) {
            tooltip.innerHTML = "Обязательное поле";
          }
          else  {
            tooltip.innerHTML = "Минимум 7 цифр";
          }
        }
      }
    }

    return result;
  };
})();