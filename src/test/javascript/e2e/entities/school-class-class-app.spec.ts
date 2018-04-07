import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('SchoolClass e2e test', () => {

    let navBarPage: NavBarPage;
    let schoolClassDialogPage: SchoolClassDialogPage;
    let schoolClassComponentsPage: SchoolClassComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load SchoolClasses', () => {
        navBarPage.goToEntity('school-class-class-app');
        schoolClassComponentsPage = new SchoolClassComponentsPage();
        expect(schoolClassComponentsPage.getTitle())
            .toMatch(/klassenchatappApp.schoolClass.home.title/);

    });

    it('should load create SchoolClass dialog', () => {
        schoolClassComponentsPage.clickOnCreateButton();
        schoolClassDialogPage = new SchoolClassDialogPage();
        expect(schoolClassDialogPage.getModalTitle())
            .toMatch(/klassenchatappApp.schoolClass.home.createOrEditLabel/);
        schoolClassDialogPage.close();
    });

   /* it('should create and save SchoolClasses', () => {
        schoolClassComponentsPage.clickOnCreateButton();
        schoolClassDialogPage.setDateInput('2000-12-31');
        expect(schoolClassDialogPage.getDateInput()).toMatch('2000-12-31');
        schoolClassDialogPage.setNameInput('name');
        expect(schoolClassDialogPage.getNameInput()).toMatch('name');
        schoolClassDialogPage.userSelectLastOption();
        schoolClassDialogPage.save();
        expect(schoolClassDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });*/

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class SchoolClassComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-school-class-class-app div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class SchoolClassDialogPage {
    modalTitle = element(by.css('h4#mySchoolClassLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    dateInput = element(by.css('input#field_date'));
    nameInput = element(by.css('input#field_name'));
    userSelect = element(by.css('select#field_user'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setDateInput = function(date) {
        this.dateInput.sendKeys(date);
    };

    getDateInput = function() {
        return this.dateInput.getAttribute('value');
    };

    setNameInput = function(name) {
        this.nameInput.sendKeys(name);
    };

    getNameInput = function() {
        return this.nameInput.getAttribute('value');
    };

    userSelectLastOption = function() {
        this.userSelect.all(by.tagName('option')).last().click();
    };

    userSelectOption = function(option) {
        this.userSelect.sendKeys(option);
    };

    getUserSelect = function() {
        return this.userSelect;
    };

    getUserSelectedOption = function() {
        return this.userSelect.element(by.css('option:checked')).getText();
    };

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
