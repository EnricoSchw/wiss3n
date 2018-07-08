import { element, by, promise, ElementFinder } from 'protractor';

export class SchoolClassComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-school-class div h2#page-heading span')).first();

    clickOnCreateButton(): promise.Promise<void> {
        return this.createButton.click();
    }

    getTitle(): any {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class SchoolClassUpdatePage {
    pageTitle = element(by.id('jhi-school-class-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    startInput = element(by.id('field_start'));
    endInput = element(by.id('field_end'));
    nameInput = element(by.id('field_name'));
    userSelect = element(by.id('field_user'));

    getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    setStartInput(start): promise.Promise<void> {
        return this.startInput.sendKeys(start);
    }

    getStartInput() {
        return this.startInput.getAttribute('value');
    }

    setEndInput(end): promise.Promise<void> {
        return this.endInput.sendKeys(end);
    }

    getEndInput() {
        return this.endInput.getAttribute('value');
    }

    setNameInput(name): promise.Promise<void> {
        return this.nameInput.sendKeys(name);
    }

    getNameInput() {
        return this.nameInput.getAttribute('value');
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
