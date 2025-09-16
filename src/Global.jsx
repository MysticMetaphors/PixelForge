// import { createRoot } from 'react-dom/client';
// import Toast from './Components/Toast';

export default function Global() {

}

// export function appendToast(containerId, theme, text) {
//     const container = document.getElementById(containerId);
//     if (!container) return;

//     const toastWrapper = document.createElement('div');
//     container.appendChild(toastWrapper);

//     const root = createRoot(toastWrapper);
//     root.render(<Toast theme={theme} text={text} />);

//     setTimeout(() => {
//         root.unmount();
//         container.removeChild(toastWrapper);
//     }, 5000);
// }

export function formatDate(dateStr) {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

export function formatTime(time) {
    console.log(time)
     if (!time) return '';

    const [hours, minutes] = time.split(':');
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(0);

    return (date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
}
