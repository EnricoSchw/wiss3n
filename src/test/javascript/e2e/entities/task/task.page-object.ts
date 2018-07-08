import { element, by, promise, ElementFinder } from 'protractor';

export class TaskComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-task div h2#page-heading span')).first();

    clickOnCreateButton(): promise.Promise<void> {
        return this.createButton.click();
    }

    getTitle(): any {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class TaskUpdatePage {
    pageTitle = element(by.id('jhi-task-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    titleInput = element(by.id('field_title'));
    descriptionInput = element(by.id('field_description'));
    typeSelect = element(by.id('field_type'));
    dateInput = element(by.id('field_date'));
    gradeInput = element(by.id('field_grade'));
    userSelect = element(by.id('field_user'));
    teachingHourSelect = element(by.id('field_teachingHour'));

    getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    setTitleInput(title): promise.Promise<void> {
        return this.titleInput.sendKeys(title);
    }

    getTitleInput() {
        return this.titleInput.getAttribute('value');
    }

    setDescriptionInput(description): promise.Promise<void> {
        return this.descriptionInput.sendKeys(description);
    }

    getDescriptionInput() {
        return this.descriptionInput.getAttribute('value');
    }

    setTypeSelect(type): promise.Promise<void> {
        return this.typeSelect.sendKeys(type);
    }

    getTypeSelect() {
        return this.typeSelect.element(by.css('option:checked')).getText();
    }

    typeSelectLastOption(): promise.Promise<void> {
        return this.typeSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }
    setDateInput(date): promise.Promise<void> {
        return this.dateInput.sendKeys(date);
    }

    getDateInput() {
        return this.dateInput.getAttribute('value');
    }

    setGradeInput(grade): promise.Promise<void> {
        return this.gradeInput.sendKeys(grade);
    }

    getGradeInput() {
        return this.gradeInput.getAttribute('value');
    }

    userSelectLastOption(): promise.Promise<void> {
        return this.userSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    userSelectOption(option): promise.Promise<void> {
        return this.userSelect.sendKeys(option);
    }

    getUserSelect(): ElementFinder {
        return this.userSelect;
    }

    getUserSelectedOption() {
        return this.userSelect.element(by.css('option:checked')).getText();
    }

    teachingHourSelectLastOption(): promise.Promise<void> {
        return this.teachingHourSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    teachingHourSelectOption(option): promise.Promise<void> {
        return this.teachingHourSelect.sendKeys(option);
    }

    getTeachingHourSelect(): ElementFinder {
        return this.teachingHourSelect;
    }

    getTeachingHourSelectedOption() {
        return this.teachingHourSelect.element(by.css('option:checked')).getText();
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
