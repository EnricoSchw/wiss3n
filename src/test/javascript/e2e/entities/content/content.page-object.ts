import { element, by, promise, ElementFinder } from 'protractor';

export class ContentComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-content div h2#page-heading span')).first();

    clickOnCreateButton(): promise.Promise<void> {
        return this.createButton.click();
    }

    getTitle(): any {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class ContentUpdatePage {
    pageTitle = element(by.id('jhi-content-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    titleInput = element(by.id('field_title'));
    dateInput = element(by.id('field_date'));
    textInput = element(by.id('field_text'));
    userSelect = element(by.id('field_user'));
    taskSelect = element(by.id('field_task'));

    getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    setTitleInput(title): promise.Promise<void> {
        return this.titleInput.sendKeys(title);
    }

    getTitleInput() {
        return this.titleInput.getAttribute('value');
    }

    setDateInput(date): promise.Promise<void> {
        return this.dateInput.sendKeys(date);
    }

    getDateInput() {
        return this.dateInput.getAttribute('value');
    }

    setTextInput(text): promise.Promise<void> {
        return this.textInput.sendKeys(text);
    }

    getTextInput() {
        return this.textInput.getAttribute('value');
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

    taskSelectLastOption(): promise.Promise<void> {
        return this.taskSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    taskSelectOption(option): promise.Promise<void> {
        return this.taskSelect.sendKeys(option);
    }

    getTaskSelect(): ElementFinder {
        return this.taskSelect;
    }

    getTaskSelectedOption() {
        return this.taskSelect.element(by.css('option:checked')).getText();
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
