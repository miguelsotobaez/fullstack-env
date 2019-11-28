import {NgModule} from '@angular/core';

import {
  MatSidenavModule,
  MatToolbarModule,
  MatIconModule,
  MatListModule,
  MatTableModule
} from '@angular/material';

@NgModule({
  imports: [
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatTableModule
  ],
  exports: [
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatTableModule
  ]
})
export class MaterialModule {}