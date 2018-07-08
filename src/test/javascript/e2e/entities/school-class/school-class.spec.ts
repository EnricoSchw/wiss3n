import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { SchoolClassComponentsPage, SchoolClassUpdatePage } from './school-class.page-object';

describe('SchoolClass e2e test', () => {
    let navBarPage: NavBarPage;
    let schoolClassUpdatePage: SchoolClassUpdatePage;
    let schoolClassComponentsPage: SchoolClassComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load SchoolClasses', () => {
        navBarPage.goToEntity('school-class');
        schoolClassComponentsPage = new SchoolClassComponentsPage();
        expect(schoolClassComponentsPage.getTitle()).toMatch(/wiss3NApp.schoolClass.home.title/);
    });

    it('should load create SchoolClass page', () => {
        schoolClassComponentsPage.clickOnCreateButton();
        schoolClassUpdatePage = new SchoolClassUpdatePage();
        expect(schoolClassUpdatePage.getPageTitle()).toMatch(/wiss3NApp.schoolClass.home.createOrEditLabel/);
        schoolClassUpdatePage.cancel();
    });

    it('should create and save SchoolClasses', () => {
        schoolClassComponentsPage.clickOnCreateButton();
        schoolClassUpdatePage.setStartInput('2000-12-31');
        expect(schoolClassUpdatePage.getStartInput()).toMatch('2000-12-31');
        schoolClassUpdatePage.setEndInput('2000-12-31');
        expect(schoolClassUpdatePage.getEndInput()).toMatch('2000-12-31');
        schoolClassUpdatePage.setNameInput('name');
        expect(schoolClassUpdatePage.getNameInput()).toMatch('name');
        schoolClassUpdatePage.userSelectLastOption();
        schoolClassUpdatePage.save();
        expect(schoolClassUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
