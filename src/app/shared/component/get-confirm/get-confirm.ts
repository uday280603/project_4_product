import { Component, Inject, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  imports: [MatButtonModule],
  selector: 'app-get-confirm',
  styleUrl: './get-confirm.scss',
  templateUrl: './get-confirm.html',
})
export class GetConfirm {
   message!: string;
  constructor(
    private _matRef: MatDialogRef<GetConfirm>,
    @Inject(MAT_DIALOG_DATA) data: string,
  ) {
    this.message = data;
  }

  onClose(flag: boolean) {
    this._matRef.close(flag);
  }

}
