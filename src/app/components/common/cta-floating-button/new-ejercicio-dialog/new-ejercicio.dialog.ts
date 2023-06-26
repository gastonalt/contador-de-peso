import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

export interface DialogData {
    descripcionEjercicio: string;
    peso: number;
    fecha: Date;
}

@Component({
    selector: 'new-ejercicio-dialog',
    templateUrl: 'new-ejercicio.dialog.html',
    styleUrls: ['./new-ejercicio.dialog.scss']
})
export class NewEjercicioDialog {
    constructor(
        public dialogRef: MatDialogRef<NewEjercicioDialog>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
    ) {}

    onNoClick(): void {
        this.dialogRef.close();
    }
}
