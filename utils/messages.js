import Swal from 'sweetalert2'

const swalCustomer = Swal.mixin({
  customClass: {
    confirmButton: 'button is-primary px-4',
    cancelButton: 'button is-danger px-4 ml-4',
    title: 'is-size-6 has-text-weight-bold',
    content: 'has-text-grey-dark',
  },
  buttonsStyling: false
})


export function msgBoxError(msg) {
  swalCustomer.fire({
    title: 'Ops, ocorreu uma falha!',
    icon: 'error',
    html: msg,
    confirmButtonText: '<i class="fas fa-check px-2"></i> Continuar'
  })
}


export async function msgBoxConfirm(msg) {
  const result = await swalCustomer.fire({
    icon: 'question',
    html: msg,
    confirmButtonText: '<i class="far fa-thumbs-up mr-4"></i>Sim',
    cancelButtonText: '<i class="fas fa-times mr-4"></i>Não',
    showCancelButton: true
  })
  return !!result.value 
}