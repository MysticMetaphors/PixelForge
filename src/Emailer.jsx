import emailjs from '@emailjs/browser';

export default function sendEmail(e, formRef, onSuccess = () => {}, onError = () => {}) {
    e.preventDefault();

    emailjs
        .sendForm(import.meta.env.SERVICE_ID, import.meta.env.TEMPLATE_ID, formRef.current, {
            publicKey: import.meta.env.PUBLIC_KEY,
        })
        .then(
            () => {
                console.log('SUCCESS!');
                onSuccess();
            },
            (error) => {
                console.error('FAILED...', error.text);
                onError(error);
            }
        );

    console.log(formRef)
}
