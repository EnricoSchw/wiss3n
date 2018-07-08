import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { TaskComponentsPage, TaskUpdatePage } from './task.page-object';

describe('Task e2e test', () => {
    let navBarPage: NavBarPage;
    let taskUpdatePage: TaskUpdatePage;
    let taskComponentsPage: TaskComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Tasks', () => {
        navBarPage.goToEntity('task');
        taskComponentsPage = new TaskComponentsPage();
        expect(taskComponentsPage.getTitle()).toMatch(/wiss3NApp.task.home.title/);
    });

    it('should load create Task page', () => {
        taskComponentsPage.clickOnCreateButton();
        taskUpdatePage = new TaskUpdatePage();
        expect(taskUpdatePage.getPageTitle()).toMatch(/wiss3NApp.task.home.createOrEditLabel/);
        taskUpdatePage.cancel();
    });

    it('should create and save Tasks', () => {
        taskComponentsPage.clickOnCreateButton();
        taskUpdatePage.setTitleInput('title');
        expect(taskUpdatePage.getTitleInput()).toMatch('title');
        taskUpdatePage.setDescriptionInput('description');
        expect(taskUpdatePage.getDescriptionInput()).toMatch('description');
        taskUpdatePage.typeSelectLastOption();
        taskUpdatePage.setDateInput('2000-12-31');
        expect(taskUpdatePage.getDateInput()).toMatch('2000-12-31');
        taskUpdatePage.setGradeInput('5');
        expect(taskUpdatePage.getGradeInput()).toMatch('5');
        taskUpdatePage.userSelectLastOption();
        taskUpdatePage.teachingHourSelectLastOption();
        taskUpdatePage.save();
        expect(taskUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
