import { NgModule } from '@angular/core';
import {MatInputModule,
        MatCardModule,
        MatButtonModule,
        MatToolbarModule,
        MatExpansionModule,
        MatDialogModule,
        MatProgressSpinnerModule,
        MatPaginatorModule} from '@angular/material';
@NgModule({
    exports : [
        MatInputModule,
        MatCardModule,
        MatButtonModule,
        MatToolbarModule,
        MatExpansionModule,
        MatDialogModule,
        MatProgressSpinnerModule,
        MatPaginatorModule
    ]
})
export class AngularMaterialModule{}