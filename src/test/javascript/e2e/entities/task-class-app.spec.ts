import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Task e2e test', () => {

    let navBarPage: NavBarPage;
    let taskDialogPage: TaskDialogPage;
    let taskComponentsPage: TaskComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Tasks', () => {
        navBarPage.goToEntity('task-class-app');
        taskComponentsPage = new TaskComponentsPage();
        expect(taskComponentsPage.getTitle())
            .toMatch(/klassenchatappApp.task.home.title/);

    });

    it('should load create Task dialog', () => {
        taskComponentsPage.clickOnCreateButton();
        taskDialogPage = new TaskDialogPage();
        expect(taskDialogPage.getModalTitle())
            .toMatch(/klassenchatappApp.task.home.createOrEditLabel/);
        taskDialogPage.close();
    });

   /* it('should create and save Tasks', () => {
        taskComponentsPage.clickOnCreateButton();
        taskDialogPage.setTitelInput('titel');
        expect(taskDialogPage.getTitelInput()).toMatch('titel');
        taskDialogPage.setContentInput('content');
        expect(taskDialogPage.getContentInput()).toMatch('content');
        taskDialogPage.typeSelectLastOption();
        taskDialogPage.setStartInput('2000-12-31');
        expect(taskDialogPage.getStartInput()).toMatch('2000-12-31');
        taskDialogPage.setEndInput('2000-12-31');
        expect(taskDialogPage.getEndInput()).toMatch('2000-12-31');
        taskDialogPage.userSelectLastOption();
        taskDialogPage.teachingSubjectSelectLastOption();
        taskDialogPage.save();
        expect(taskDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });*/

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class TaskComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-task-class-app div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class TaskDialogPage {
    modalTitle = element(by.css('h4#myTaskLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    titelInput = element(by.css('input#field_titel'));
    contentInput = element(by.css('textarea#field_content'));
    typeSelect = element(by.css('select#field_type'));
    startInput = element(by.css('input#field_start'));
    endInput = element(by.css('input#field_end'));
    userSelect = element(by.css('select#field_user'));
    teachingSubjectSelect = element(by.css('select#field_teachingSubject'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setTitelInput = function(titel) {
        this.titelInput.sendKeys(titel);
    }

    getTitelInput = function() {
        return this.titelInput.getAttribute('value');
    }

    setContentInput = function(content) {
        this.contentInput.sendKeys(content);
    }

    getContentInput = function() {
        return this.contentInput.getAttribute('value');
    }

    setTypeSelect = function(type) {
        this.typeSelect.sendKeys(type);
    }

    getTypeSelect = function() {
        return this.typeSelect.element(by.css('option:checked')).getText();
    }

    typeSelectLastOption = function() {
        this.typeSelect.all(by.tagName('option')).last().click();
    }
    setStartInput = function(start) {
        this.startInput.sendKeys(start);
    }

    getStartInput = function() {
        return this.startInput.getAttribute('value');
    }

    setEndInput = function(end) {
        this.endInput.sendKeys(end);
    }

    getEndInput = function() {
        return this.endInput.getAttribute('value');
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

    teachingSubjectSelectLastOption = function() {
        this.teachingSubjectSelect.all(by.tagName('option')).last().click();
    }

    teachingSubjectSelectOption = function(option) {
        this.teachingSubjectSelect.sendKeys(option);
    }

    getTeachingSubjectSelect = function() {
        return this.teachingSubjectSelect;
    }

    getTeachingSubjectSelectedOption = function() {
        return this.teachingSubjectSelect.element(by.css('option:checked')).getText();
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
