export const accionesReseteables: any[] = [];

export function Reseteable(target: any) {
    accionesReseteables.push(Object.create(target));
}
