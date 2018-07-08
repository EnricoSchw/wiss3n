import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { TeachingHourComponentsPage, TeachingHourUpdatePage } from './teaching-hour.page-object';

describe('TeachingHour e2e test', () => {
    let navBarPage: NavBarPage;
    let teachingHourUpdatePage: TeachingHourUpdatePage;
    let teachingHourComponentsPage: TeachingHourComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load TeachingHours', () => {
        navBarPage.goToEntity('teaching-hour');
        teachingHourComponentsPage = new TeachingHourComponentsPage();
        expect(teachingHourComponentsPage.getTitle()).toMatch(/wiss3NApp.teachingHour.home.title/);
    });

    it('should load create TeachingHour page', () => {
        teachingHourComponentsPage.clickOnCreateButton();
        teachingHourUpdatePage = new TeachingHourUpdatePage();
        expect(teachingHourUpdatePage.getPageTitle()).toMatch(/wiss3NApp.teachingHour.home.createOrEditLabel/);
        teachingHourUpdatePage.cancel();
    });

    it('should create and save TeachingHours', () => {
        teachingHourComponentsPage.clickOnCreateButton();
        teachingHourUpdatePage.setNameInput('name');
        expect(teachingHourUpdatePage.getNameInput()).toMatch('name');
        teachingHourUpdatePage.setWeekdayInput('5');
        expect(teachingHourUpdatePage.getWeekdayInput()).toMatch('5');
        teachingHourUpdatePage.setHourInput('5');
        expect(teachingHourUpdatePage.getHourInput()).toMatch('5');
        teachingHourUpdatePage.teachingSubjectSelectLastOption();
        teachingHourUpdatePage.schoolClassSelectLastOption();
        teachingHourUpdatePage.save();
        expect(teachingHourUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
