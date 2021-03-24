const form = document.getElementById('form');
const firstName = document.getElementById('firstname');
const lastName = document.getElementById('lastname');
const email = document.getElementById('email');
const password = document.getElementById('pass');
const emailRegex = /^(([^<>()\[\]\\.,:\s@"]+(\.[^<>()\[\]\\.,:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const inputs = document.getElementsByClassName('form__input')

const errorCollection = {firstNameError: false,
                        lastNameError: false,
                        emailError: false,
                        passwordError: false,
                        }


const addError = (input) =>
{
    input.classList.add('form__input--error');
    input.setAttribute('aria-invalid', 'true');
    input.parentElement.classList.add('form__input-field--error');
    input.nextElementSibling.classList.add('show-error');
}

const removeError = (input) =>
{
    input.classList.remove('form__input--error');
    input.removeAttribute('aria-invalid');
    input.parentElement.classList.remove('form__input-field--error');
    input.nextElementSibling.classList.remove('show-error');
}

const checkFirstName = () =>
{
    if (firstName.value.length === 0)
    {
        addError(firstName);
        errorCollection.firstNameError = true;
    }
}

const checkLastName = () =>
{
    if (lastName.value.length === 0)
    {
        addError(lastName);
        errorCollection.lastNameError = true;
    }
}

const checkEmail = () =>
{
    if(!emailRegex.test(email.value))
    {
        addError(email);
        errorCollection.emailError = true;
    }
}

const checkPassword = () =>
{
    if (password.value.length === 0)
    {
        addError(password);
        errorCollection.passwordError = true;
    }
}

for (i = 0; i < inputs.length; i++)
{
    inputs.item(i).addEventListener('focus', (e) =>
    {
        removeError(e.target);
        switch (e.target.id)
        {
            case 'firstname':   {
                                    errorCollection.firstNameError = false;
                                    break
                                }
            case 'lastname':    {
                                    errorCollection.lastNameError = false;
                                    break
                                }
            case 'email':       {
                                    errorCollection.emailError = false;
                                    break
                                }
            case 'pass':        {
                                    errorCollection.passwordError = false;
                                    break
                                }
        }
    })
}

form.addEventListener('submit', (e) =>
{
    let formError;

    checkFirstName();
    checkLastName();
    checkEmail();
    checkPassword();
    
    for (const key in errorCollection) 
    {
        if (errorCollection[key] === true)
        {
            formError = true;
            break;           
        }
        else
            formError = false;       
    }
    if (formError) e.preventDefault();
});