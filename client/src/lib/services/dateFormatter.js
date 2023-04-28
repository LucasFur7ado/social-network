export const formatDate = (d) => {
    let options = { month: 'short', day: 'numeric' }
    return new Date(d).toLocaleDateString('es-ES', options)
}