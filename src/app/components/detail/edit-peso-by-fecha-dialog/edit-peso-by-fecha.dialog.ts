import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

export interface DialogData {
    pesoAnterior: number;
    nuevoPeso: number;
    fechaPesoAnterior: Date;
}

@Component({
    selector: 'edit-peso-by-fecha-dialog',
    templateUrl: 'edit-peso-by-fecha.dialog.html',
    styleUrls: ['./edit-peso-by-fecha.dialog.scss']
})
export class EditPasoByFechaDialog {

    constructor(
        public dialogRef: MatDialogRef<EditPasoByFechaDialog>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
    ) {}

    onNoClick(): void {
        this.dialogRef.close();
    }
}
