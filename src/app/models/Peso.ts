import { Ejercicio } from "./Ejercicio";

export class Peso{
    idPeso!: number;
    ejercicio!: Ejercicio;
    peso!: number;
    borrado!: boolean;
    fecha!: Date;

    constructor(ejercicio: Ejercicio,peso: number, fecha: Date) {
      this.ejercicio = ejercicio;
      this.peso = peso;
      this.fecha = fecha;
    }
}
