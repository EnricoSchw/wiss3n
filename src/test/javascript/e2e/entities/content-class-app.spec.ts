import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Content e2e test', () => {

    let navBarPage: NavBarPage;
    let contentDialogPage: ContentDialogPage;
    let contentComponentsPage: ContentComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Contents', () => {
        navBarPage.goToEntity('content-class-app');
        contentComponentsPage = new ContentComponentsPage();
        expect(contentComponentsPage.getTitle())
            .toMatch(/klassenchatappApp.content.home.title/);

    });

    it('should load create Content dialog', () => {
        contentComponentsPage.clickOnCreateButton();
        contentDialogPage = new ContentDialogPage();
        expect(contentDialogPage.getModalTitle())
            .toMatch(/klassenchatappApp.content.home.createOrEditLabel/);
        contentDialogPage.close();
    });

   /* it('should create and save Contents', () => {
        contentComponentsPage.clickOnCreateButton();
        contentDialogPage.setTitelInput('titel');
        expect(contentDialogPage.getTitelInput()).toMatch('titel');
        contentDialogPage.setTextInput('text');
        expect(contentDialogPage.getTextInput()).toMatch('text');
        contentDialogPage.userSelectLastOption();
        contentDialogPage.taskSelectLastOption();
        // contentDialogPage.tagsSelectLastOption();
        contentDialogPage.save();
        expect(contentDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });*/

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class ContentComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-content-class-app div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class ContentDialogPage {
    modalTitle = element(by.css('h4#myContentLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    titelInput = element(by.css('input#field_titel'));
    textInput = element(by.css('textarea#field_text'));
    userSelect = element(by.css('select#field_user'));
    taskSelect = element(by.css('select#field_task'));
    tagsSelect = element(by.css('select#field_tags'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setTitelInput = function(titel) {
        this.titelInput.sendKeys(titel);
    }

    getTitelInput = function() {
        return this.titelInput.getAttribute('value');
    }

    setTextInput = function(text) {
        this.textInput.sendKeys(text);
    }

    getTextInput = function() {
        return this.textInput.getAttribute('value');
    }

    userSelectLastOption = function() {
        this.userSelect.all(by.tagName('option')).last().click();
    }

    userSelectOption = function(option) {
        this.userSelect.sendKeys(option);
    }

    getUserSelect = function() {
        return this.userSelect;
    }

    getUserSelectedOption = function() {
        return this.userSelect.element(by.css('option:checked')).getText();
    }

    taskSelectLastOption = function() {
        this.taskSelect.all(by.tagName('option')).last().click();
    }

    taskSelectOption = function(option) {
        this.taskSelect.sendKeys(option);
    }

    getTaskSelect = function() {
        return this.taskSelect;
    }

    getTaskSelectedOption = function() {
        return this.taskSelect.element(by.css('option:checked')).getText();
    }

    tagsSelectLastOption = function() {
        this.tagsSelect.all(by.tagName('option')).last().click();
    }

    tagsSelectOption = function(option) {
        this.tagsSelect.sendKeys(option);
    }

    getTagsSelect = function() {
        return this.tagsSelect;
    }

    getTagsSelectedOption = function() {
        return this.tagsSelect.element(by.css('option:checked')).getText();
    }

    save() {
        this.saveButton.click();
    }

    close() {
        this.closeButton.click();
    }

    getSaveButton() {
        return this.saveButton;
    }
}
