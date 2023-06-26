import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

export interface DialogData {
    nuevoPeso: number;
    fecha: Date;
    ejercicio: string;
}

@Component({
    selector: 'edit-peso-dialog',
    templateUrl: 'edit-peso.dialog.html',
    styleUrls: ['./edit-peso.dialog.scss']
})
export class EditPesoDialog {
    constructor(
        public dialogRef: MatDialogRef<EditPesoDialog>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
    ) {}

    onNoClick(): void {
        this.dialogRef.close();
    }
}
