import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('TeachingSubject e2e test', () => {

    let navBarPage: NavBarPage;
    let teachingSubjectDialogPage: TeachingSubjectDialogPage;
    let teachingSubjectComponentsPage: TeachingSubjectComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load TeachingSubjects', () => {
        navBarPage.goToEntity('teaching-subject-class-app');
        teachingSubjectComponentsPage = new TeachingSubjectComponentsPage();
        expect(teachingSubjectComponentsPage.getTitle())
            .toMatch(/klassenchatappApp.teachingSubject.home.title/);

    });

    it('should load create TeachingSubject dialog', () => {
        teachingSubjectComponentsPage.clickOnCreateButton();
        teachingSubjectDialogPage = new TeachingSubjectDialogPage();
        expect(teachingSubjectDialogPage.getModalTitle())
            .toMatch(/klassenchatappApp.teachingSubject.home.createOrEditLabel/);
        teachingSubjectDialogPage.close();
    });

   /* it('should create and save TeachingSubjects', () => {
        teachingSubjectComponentsPage.clickOnCreateButton();
        teachingSubjectDialogPage.setYearInput('2000-12-31');
        expect(teachingSubjectDialogPage.getYearInput()).toMatch('2000-12-31');
        teachingSubjectDialogPage.setNameInput('name');
        expect(teachingSubjectDialogPage.getNameInput()).toMatch('name');
        teachingSubjectDialogPage.setGradeInput('5');
        expect(teachingSubjectDialogPage.getGradeInput()).toMatch('5');
        teachingSubjectDialogPage.userSelectLastOption();
        // teachingSubjectDialogPage.tagSelectLastOption();
        teachingSubjectDialogPage.schoolClassSelectLastOption();
        teachingSubjectDialogPage.save();
        expect(teachingSubjectDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });*/

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class TeachingSubjectComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-teaching-subject-class-app div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class TeachingSubjectDialogPage {
    modalTitle = element(by.css('h4#myTeachingSubjectLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    yearInput = element(by.css('input#field_year'));
    nameInput = element(by.css('input#field_name'));
    gradeInput = element(by.css('input#field_grade'));
    userSelect = element(by.css('select#field_user'));
    tagSelect = element(by.css('select#field_tag'));
    schoolClassSelect = element(by.css('select#field_schoolClass'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setYearInput = function(year) {
        this.yearInput.sendKeys(year);
    }

    getYearInput = function() {
        return this.yearInput.getAttribute('value');
    }

    setNameInput = function(name) {
        this.nameInput.sendKeys(name);
    }

    getNameInput = function() {
        return this.nameInput.getAttribute('value');
    }

    setGradeInput = function(grade) {
        this.gradeInput.sendKeys(grade);
    }

    getGradeInput = function() {
        return this.gradeInput.getAttribute('value');
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

    tagSelectLastOption = function() {
        this.tagSelect.all(by.tagName('option')).last().click();
    }

    tagSelectOption = function(option) {
        this.tagSelect.sendKeys(option);
    }

    getTagSelect = function() {
        return this.tagSelect;
    }

    getTagSelectedOption = function() {
        return this.tagSelect.element(by.css('option:checked')).getText();
    }

    schoolClassSelectLastOption = function() {
        this.schoolClassSelect.all(by.tagName('option')).last().click();
    }

    schoolClassSelectOption = function(option) {
        this.schoolClassSelect.sendKeys(option);
    }

    getSchoolClassSelect = function() {
        return this.schoolClassSelect;
    }

    getSchoolClassSelectedOption = function() {
        return this.schoolClassSelect.element(by.css('option:checked')).getText();
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
