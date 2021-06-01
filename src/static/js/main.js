document.addEventListener("DOMContentLoaded", () => {

    //  SEND FORM

    const forms = () => {
        const form = document.querySelector('form'),
            inputs = form.querySelectorAll('input.main-form__input');

        const postData = async (url, data) => {
            let res = await fetch(url, {
                method: 'POST',
                body: data
            });

            return await res.text();
        }

        const clearInputs = () => {
            inputs.forEach(el => {
                el.value = '';
            })
        }

        function validateEmail(email) {
            var re = /\S+@\S+\.\S+/;
            return re.test(email);
        }

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // inputs.forEach(input => {
            //     let val = input.value,
            //         valErr = input.nextElementSibling;
            //     if (val == '') {
            //         input.classList.add('error');
            //         valErr.textContent = 'This field is required';
            //         return false;
            //     } else if (input.type == 'email' && (validateEmail(input))) {
            //         input.classList.add('error');
            //         valErr.textContent = 'Enter a valid email';
            //         return false;
            //     } else {
            //         return true;
            //     }
            // })

            const formData = new FormData(form);

            const pass = formData.get('password');
            console.log(pass);


            postData('send.php', formData)
                .then(res => {
                    console.log(res);
                })
                .catch(() => { })
                .finally(() => {
                    clearInputs();
                })
        })
    }

    forms();

    //  END SEND FORM

});