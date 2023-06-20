import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Peso } from 'src/app/models/Peso';
import { PesosState } from 'src/app/state/pesoSeleccionado.state';

export interface DialogData {
    pesoAnterior: number;
    nuevoPeso: number;
    fechaPesoAnterior: Date;
}

@Component({
    selector: 'confirm-eliminar-dialog',
    templateUrl: 'confirm-eliminar.dialog.html',
    styleUrls: ['./confirm-eliminar.dialog.scss']
})
export class ConfirmEliminarDialog {

  @Select(PesosState.getPesoSeleccionado) pesoSeleccionado$!: Observable<Peso>;

    constructor(
        public dialogRef: MatDialogRef<ConfirmEliminarDialog>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
    ) {}

    onNoClick(): void {
        this.dialogRef.close();
    }
}
