import Swal from 'sweetalert2';


export const updateProgressBar = () => {
    const tasks = document.querySelectorAll('li.tarea');
    const progressBar = document.querySelector('#porcentaje');
    if (tasks && tasks.length) {
        const tasksCompleted = document.querySelectorAll('.fa-check-circle.completo');
        const progress = Math.round(( tasksCompleted.length / tasks.length ) * 100);
        progressBar.style.width = `${progress}%`;

        if (progress === 100) {
            Swal.fire(
                'Completaste el proyecto',
                'Felicidades has terminado tus tareas',
                'success'
            );
        }
    }
}