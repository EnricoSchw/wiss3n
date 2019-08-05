import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Wiss3NSharedModule } from '../shared/shared.module';
import { SchoolClassActiveComponent } from 'app/global-component/school-class-active.component';

@NgModule({
    imports: [
        CommonModule,
        Wiss3NSharedModule
    ],
    declarations: [ SchoolClassActiveComponent],
    entryComponents: [SchoolClassActiveComponent],
    exports: [SchoolClassActiveComponent]
})
export class Wiss3NGlobalComponentModule {
}
