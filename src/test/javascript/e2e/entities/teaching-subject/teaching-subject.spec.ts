import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { TeachingSubjectComponentsPage, TeachingSubjectUpdatePage } from './teaching-subject.page-object';

describe('TeachingSubject e2e test', () => {
    let navBarPage: NavBarPage;
    let teachingSubjectUpdatePage: TeachingSubjectUpdatePage;
    let teachingSubjectComponentsPage: TeachingSubjectComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load TeachingSubjects', () => {
        navBarPage.goToEntity('teaching-subject');
        teachingSubjectComponentsPage = new TeachingSubjectComponentsPage();
        expect(teachingSubjectComponentsPage.getTitle()).toMatch(/wiss3NApp.teachingSubject.home.title/);
    });

    it('should load create TeachingSubject page', () => {
        teachingSubjectComponentsPage.clickOnCreateButton();
        teachingSubjectUpdatePage = new TeachingSubjectUpdatePage();
        expect(teachingSubjectUpdatePage.getPageTitle()).toMatch(/wiss3NApp.teachingSubject.home.createOrEditLabel/);
        teachingSubjectUpdatePage.cancel();
    });

    it('should create and save TeachingSubjects', () => {
        teachingSubjectComponentsPage.clickOnCreateButton();
        teachingSubjectUpdatePage.setNameInput('name');
        expect(teachingSubjectUpdatePage.getNameInput()).toMatch('name');
        teachingSubjectUpdatePage.setPrefixInput('prefix');
        expect(teachingSubjectUpdatePage.getPrefixInput()).toMatch('prefix');
        teachingSubjectUpdatePage.typeSelectLastOption();
        teachingSubjectUpdatePage.userSelectLastOption();
        teachingSubjectUpdatePage.save();
        expect(teachingSubjectUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
