import { element, by, promise, ElementFinder } from 'protractor';

export class TeachingHourComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-teaching-hour div h2#page-heading span')).first();

    clickOnCreateButton(): promise.Promise<void> {
        return this.createButton.click();
    }

    getTitle(): any {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class TeachingHourUpdatePage {
    pageTitle = element(by.id('jhi-teaching-hour-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    nameInput = element(by.id('field_name'));
    weekdayInput = element(by.id('field_weekday'));
    hourInput = element(by.id('field_hour'));
    teachingSubjectSelect = element(by.id('field_teachingSubject'));
    schoolClassSelect = element(by.id('field_schoolClass'));

    getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    setNameInput(name): promise.Promise<void> {
        return this.nameInput.sendKeys(name);
    }

    getNameInput() {
        return this.nameInput.getAttribute('value');
    }

    setWeekdayInput(weekday): promise.Promise<void> {
        return this.weekdayInput.sendKeys(weekday);
    }

    getWeekdayInput() {
        return this.weekdayInput.getAttribute('value');
    }

    setHourInput(hour): promise.Promise<void> {
        return this.hourInput.sendKeys(hour);
    }

    getHourInput() {
        return this.hourInput.getAttribute('value');
    }

    teachingSubjectSelectLastOption(): promise.Promise<void> {
        return this.teachingSubjectSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    teachingSubjectSelectOption(option): promise.Promise<void> {
        return this.teachingSubjectSelect.sendKeys(option);
    }

    getTeachingSubjectSelect(): ElementFinder {
        return this.teachingSubjectSelect;
    }

    getTeachingSubjectSelectedOption() {
        return this.teachingSubjectSelect.element(by.css('option:checked')).getText();
    }

    schoolClassSelectLastOption(): promise.Promise<void> {
        return this.schoolClassSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    schoolClassSelectOption(option): promise.Promise<void> {
        return this.schoolClassSelect.sendKeys(option);
    }

    getSchoolClassSelect(): ElementFinder {
        return this.schoolClassSelect;
    }

    getSchoolClassSelectedOption() {
        return this.schoolClassSelect.element(by.css('option:checked')).getText();
    }

    save(): promise.Promise<void> {
        return this.saveButton.click();
    }

    cancel(): promise.Promise<void> {
        return this.cancelButton.click();
    }

    getSaveButton(): ElementFinder {
        return this.saveButton;
    }
}
