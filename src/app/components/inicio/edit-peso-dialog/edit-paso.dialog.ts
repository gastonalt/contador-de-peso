import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

export interface DialogData {
    nuevoPeso: number;
}

@Component({
    selector: 'edit-paso-dialog',
    templateUrl: 'edit-paso.dialog.html',
    styleUrls: ['./edit-paso.dialog.scss']
})
export class EditPasoDialog {
    constructor(
        public dialogRef: MatDialogRef<EditPasoDialog>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
    ) {}

    onNoClick(): void {
        this.dialogRef.close();
    }
}