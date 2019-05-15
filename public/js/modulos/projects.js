import Swal from 'sweetalert2';
import Axios from 'axios';

const btnEliminar = document.querySelector('#eliminar-proyecto');

if (btnEliminar) {
    btnEliminar.addEventListener('click', (ev) => {
        // Proyecto a eliminar
        const projectUrl = ev.currentTarget.dataset.projectUrl;
        // Muestro popup de confirmación
        Swal.fire({
            title: "¿Estás seguro?",
            text: "Una vez borrado, el proyecto no podrá ser recuperado!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si. Borrar',
            cancelButtonText: 'Cancelar'    
        }).then((result) => {
            if (result.value) {
                let url = `${location.origin}/project/${projectUrl}`
                Axios.delete(url, {params: projectUrl})
                .then(respuesta => {
                    if (respuesta.status === 200) {
                        Swal.fire(
                            'Borrado!',
                            'Registro borrado con exito',
                            'success'
                        )
                        setTimeout(() => {
                            window.location.href = '/'
                        }, 1000);
                    } 
                })
                .catch((error) => {
                    Swal.fire(
                        'Error!',
                        `Error incontrolado: ${error.toString()}`,
                        'error'
                    )
                })
            }
        })
    });
}

export default btnEliminar;