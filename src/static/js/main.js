document.addEventListener("DOMContentLoaded", () => {

    //  SEND FORM

    let validateForms = (selector, rules) => {
        new window.JustValidate(selector, {
            rules: rules,
            submitHandler: (form) => {
                let formData = new FormData(form);

                let xhr = new XMLHttpRequest();

                xhr.onreadystatechange = () => {
                    if (xhr.readyState === 4) {
                        if (xhr.status === 200) {
                            for (let [name, value] of formData) {
                                console.log(`${name} = ${value}`);
                            }
                        }
                    }
                }

                xhr.open('POST', 'send.php', true);
                xhr.send(formData);

                form.reset();
            }
        })
    }

    validateForms('.main-form', { email: { required: true, email: true }, password: { required: true, minLength: 5 } });


    //  END SEND FORM


    fetch('https://api.openweathermap.org/data/2.5/weather?id=703448&lang=en&units=metric&appid=2341cdb94950ef399940a9aee51bcec0')
        .then(function (resp) { return resp.json() })
        .then(function (data) {
            document.querySelector('.weather__block.city').textContent = data.name;
            document.querySelector('.weather__block.temp span').innerHTML = Math.round(data.main.temp) + '&deg;';
            document.querySelector('.weather__block.desc').textContent = data.weather[0]['description'];
            document.querySelector('.weather__block.humidity span').textContent = data.main.humidity;
            document.querySelector('.weather__block.speed span').textContent = data.wind.speed;
            document.querySelector('.weather__block.icon').innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png">`;
        })
        .catch(function () {
            document.querySelector('.weather__block.error').textContent = 'Sorry. Request error.';
        });

});