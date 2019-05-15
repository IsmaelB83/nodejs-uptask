import Axios from 'axios';
import { updateProgressBar } from '../funciones/progress';


const tasksList = document.querySelector('.listado-pendientes');

if (tasksList) {
    tasksList.addEventListener('click', (ev) => {
        let element = ev.srcElement.closest('.tarea');
        if (element) {
            // Task url
            let url = `${location.origin}/project/task/${element.dataset.taskId}`
            if (ev.srcElement.classList.contains('fa-check-circle')) {
                // Change task status
                Axios.patch(url)
                .then(result => {
                    if (result.status === 200) {
                        ev.srcElement.classList.toggle('completo');
                        updateProgressBar();
                    }
                })
                .catch(error => console.log(error))
            } else if (ev.srcElement.classList.contains('fa-trash')) {
                Axios.delete(url)
                .then(result => {
                    if (result.status === 200) {
                        element.parentElement.removeChild(element);
                        updateProgressBar();
                    }
                })
                .catch(error => console.log(error))
            }
        }
    });
}

export default tasksList;