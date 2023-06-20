import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Peso } from 'src/app/models/Peso';
import { PesosState } from 'src/app/state/pesoSeleccionado.state';

export interface DialogData {
    nuevoPeso: number;
}

@Component({
    selector: 'new-peso-dialog',
    templateUrl: 'new-peso.dialog.html',
    styleUrls: ['./new-peso.dialog.scss']
})
export class NewPesoDialog {

  @Select(PesosState.getPesoSeleccionado) pesoSeleccionado$!: Observable<Peso>;

    constructor(
        public dialogRef: MatDialogRef<NewPesoDialog>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
    ) {}

    onNoClick(): void {
        this.dialogRef.close();
    }
}
