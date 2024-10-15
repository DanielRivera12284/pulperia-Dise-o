  // Mostrar el modal cuando se hace clic en la imagen
  function openModal(event, src) {
    event.preventDefault(); // Evita que el enlace se siga
    const modal = document.getElementById("modal");
    const modalImg = document.getElementById("modal-img");

    modal.style.display = "flex"; // Mostrar el modal
    modalImg.src = src; // Cambia la imagen del modal
}

// Cerrar el modal
function closeModal() {
    const modal = document.getElementById("modal");
    modal.style.display = "none"; // Ocultar el modal
}

// Cerrar el modal si se hace clic fuera del contenido
window.onclick = function(event) {
    const modal = document.getElementById("modal");
    if (event.target === modal) {
        closeModal();
    }
}