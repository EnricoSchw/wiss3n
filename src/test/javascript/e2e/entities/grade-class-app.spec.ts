import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Grade e2e test', () => {

    let navBarPage: NavBarPage;
    let gradeDialogPage: GradeDialogPage;
    let gradeComponentsPage: GradeComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Grades', () => {
        navBarPage.goToEntity('grade-class-app');
        gradeComponentsPage = new GradeComponentsPage();
        expect(gradeComponentsPage.getTitle())
            .toMatch(/klassenchatappApp.grade.home.title/);

    });

    it('should load create Grade dialog', () => {
        gradeComponentsPage.clickOnCreateButton();
        gradeDialogPage = new GradeDialogPage();
        expect(gradeDialogPage.getModalTitle())
            .toMatch(/klassenchatappApp.grade.home.createOrEditLabel/);
        gradeDialogPage.close();
    });

   /* it('should create and save Grades', () => {
        gradeComponentsPage.clickOnCreateButton();
        gradeDialogPage.setDateInput('2000-12-31');
        expect(gradeDialogPage.getDateInput()).toMatch('2000-12-31');
        gradeDialogPage.setValueInput('5');
        expect(gradeDialogPage.getValueInput()).toMatch('5');
        gradeDialogPage.additionalSelectLastOption();
        gradeDialogPage.setPointInput('5');
        expect(gradeDialogPage.getPointInput()).toMatch('5');
        gradeDialogPage.taskSelectLastOption();
        gradeDialogPage.userSelectLastOption();
        gradeDialogPage.save();
        expect(gradeDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });*/

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class GradeComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-grade-class-app div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class GradeDialogPage {
    modalTitle = element(by.css('h4#myGradeLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    dateInput = element(by.css('input#field_date'));
    valueInput = element(by.css('input#field_value'));
    additionalSelect = element(by.css('select#field_additional'));
    pointInput = element(by.css('input#field_point'));
    taskSelect = element(by.css('select#field_task'));
    userSelect = element(by.css('select#field_user'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setDateInput = function(date) {
        this.dateInput.sendKeys(date);
    }

    getDateInput = function() {
        return this.dateInput.getAttribute('value');
    }

    setValueInput = function(value) {
        this.valueInput.sendKeys(value);
    }

    getValueInput = function() {
        return this.valueInput.getAttribute('value');
    }

    setAdditionalSelect = function(additional) {
        this.additionalSelect.sendKeys(additional);
    }

    getAdditionalSelect = function() {
        return this.additionalSelect.element(by.css('option:checked')).getText();
    }

    additionalSelectLastOption = function() {
        this.additionalSelect.all(by.tagName('option')).last().click();
    }
    setPointInput = function(point) {
        this.pointInput.sendKeys(point);
    }

    getPointInput = function() {
        return this.pointInput.getAttribute('value');
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
