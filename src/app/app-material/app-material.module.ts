import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkTableModule } from '@angular/cdk/table';
import { 
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatMenuModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatOptionModule,
  MatCheckboxModule,
  MatSelectModule,
  MatListModule,
  MatDividerModule,
  MatPaginatorModule  
} from '@angular/material';

import { MatTableModule } from '@angular/material/table';

@NgModule({
  imports: [
    CommonModule
  ],
  exports:[
    CdkTableModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatCardModule ,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatCheckboxModule,
    MatSelectModule,
    MatListModule,
    MatDividerModule,
    MatTableModule,
    MatPaginatorModule
  ],
  declarations: []
})
export class AppMaterialModule { }
