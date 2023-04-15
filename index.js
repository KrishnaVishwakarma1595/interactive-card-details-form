const ERROR_STATE_CLASS = {
    'cardholder_name': '.cardholder-name-error-msg',
    'card_number': '.card-number-error-msg',
    'exp_date_month': '.exp-error-msg',
    'exp_date_year': '.exp-error-msg',
    'card_cvc': '.cvc-error-msg',
};

try {

    const inputs = document.getElementsByTagName('input');
    const cardHoldersName = document.querySelector('.card-holders-name');
    const cardExpiryMonth = document.querySelector('.card-exp-month');
    const cardExpiryYear = document.querySelector('.card-exp-year');
    const cardNumber = document.querySelector('.card-number');

    // console.log(inputs);

    const onInputChange = (e) => {
        // console.log(e);
        const { target } = e;

        if(target.name === 'cardholder_name'){
            cardHoldersName.textContent = target.value ? target.value : 'Jane Appleseed';
        }
        if(target.name === 'card_number'){
            const value = target.value;
            // adds up space after each 4 letter
            target.value = value.length < 19 ? value.replace(/\W/gi, '').replace(/(.{4})/g, '$1 ') : value;
            if(e.type === 'change'){
                const number = value.split(' ');
                const childElements = cardNumber.children;
                childElements[0].textContent = number[0] ? number[0] : '0000';
                childElements[1].textContent = number[1] ? number[1] : '0000';
                childElements[2].textContent = number[2] ? number[2] : '0000';
                childElements[3].textContent = number[3] ? number[3] : '0000';
            }
        }
        
        if(target.name === 'exp_date_month'){                        
            cardExpiryMonth.textContent = target.value ? target.value : '00';
        }

        if(target.name === 'exp_date_year'){
            cardExpiryYear.textContent = target.value ? target.value : '00';
        }

        if(e.type === 'change' && target.value){
            if((target.name === 'card_number' && target.value.length === 19) || target.name !== 'card_number'){
                document.querySelector(ERROR_STATE_CLASS[target.name]).textContent = "";
                target.classList.remove('errorState')
            }
            if(target.name === 'card_number' && target.value && target.value.length < 19){
                document.querySelector(ERROR_STATE_CLASS[target.name]).textContent = "Must be atleast 12 digit";
                target.classList.add('errorState');
            }
        }
    }


    for (let index = 0; index < inputs.length; index++) {
        const element = inputs[index];
        element.addEventListener('change', onInputChange)
        if(element.name === 'card_number'){
            element.addEventListener('keypress', onInputChange)
        }        
    }

    const handleSubmit = () => {
        const form = document.getElementById('card-details-form');
        // handle form submit
        form.addEventListener('submit', (e) => {
            let isSubmited = true;
            e.preventDefault();
            // console.log(e, isSubmited)
            for (let index = 0; index < inputs.length; index++) {
                const element = inputs[index];
                if(element.value === ''){
                    document.querySelector(ERROR_STATE_CLASS[element.name]).textContent = "Can't be blank";
                    element.classList.add('errorState');
                    isSubmited = false;
                }

                if(element.name === 'cardholder_name' && element.value && !isNaN(element.value)){
                    document.querySelector(ERROR_STATE_CLASS[element.name]).textContent = "Wrong format, numbers only";
                    element.classList.add('errorState');
                    isSubmited = false;
                }

                if(element.name === 'card_number' && element.value && element.value.length < 19){
                    document.querySelector(ERROR_STATE_CLASS[element.name]).textContent = "Must be atleast 12 digit";
                    element.classList.add('errorState');
                    isSubmited = false;
                }

                if(element.name === 'card_number' && element.value){
                    const value = element.value.replaceAll(' ', '');                    
                    if(isNaN(value)){
                        document.querySelector(ERROR_STATE_CLASS[element.name]).textContent = "Wrong format, numbers only";
                        element.classList.add('errorState');
                        isSubmited = false;
                    }
                }

                if(['exp_date_month', 'exp_date_year'].includes(element.name) && element.value && element.value.length < 2){
                    document.querySelector(ERROR_STATE_CLASS[element.name]).textContent = "Must be atleast 3 digit";
                    element.classList.add('errorState');
                    isSubmited = false;
                }

                if(element.name === 'card_cvc' && element.value && element.value.length < 3){
                    document.querySelector(ERROR_STATE_CLASS[element.name]).textContent = "Must be atleast 3 digit";
                    element.classList.add('errorState');
                    isSubmited = false;
                }

                if(element.name === 'card_cvc' && element.value && isNaN(element.value)){                    
                    document.querySelector(ERROR_STATE_CLASS[element.name]).textContent = "Wrong format, numbers only";
                    element.classList.add('errorState');
                    isSubmited = false;                   
                }
            }
            // console.log('isSubmited', isSubmited)

            if(isSubmited){
                // alert('Thanks');
                const form = document.getElementById('card-details-form');
                const finalState = document.querySelector('.final-state');
                form.style.display = 'none';
                finalState.style.display = 'flex';
            }
            
        })
    }

    const init = () => {
        handleSubmit();
    }

    init();
} catch (error) {
    console.log("Error state", error);
}