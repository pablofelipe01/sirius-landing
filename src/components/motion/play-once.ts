// Entradas que se reproducen una sola vez al llegar al viewport y no se revierten al volver a subir.
// Se usa en vez de `once: true`: con `once`, un trigger que ya pasó su inicio se destruye dentro de
// ScrollTrigger.refresh() mientras GSAP recorre su lista de triggers, y el bucle lee un hueco
// ("Cannot read properties of undefined (reading 'end')"). Ocurre al recargar con la página desplazada.
export const PLAY_ONCE = "play none none none";
