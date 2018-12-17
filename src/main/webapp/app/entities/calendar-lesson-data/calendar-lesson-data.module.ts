import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Wiss3NSharedModule } from 'app/shared';


@NgModule({
    imports: [Wiss3NSharedModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Wiss3NCalendarLessonDataModule {}
