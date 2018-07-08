import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { ContentComponentsPage, ContentUpdatePage } from './content.page-object';

describe('Content e2e test', () => {
    let navBarPage: NavBarPage;
    let contentUpdatePage: ContentUpdatePage;
    let contentComponentsPage: ContentComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Contents', () => {
        navBarPage.goToEntity('content');
        contentComponentsPage = new ContentComponentsPage();
        expect(contentComponentsPage.getTitle()).toMatch(/wiss3NApp.content.home.title/);
    });

    it('should load create Content page', () => {
        contentComponentsPage.clickOnCreateButton();
        contentUpdatePage = new ContentUpdatePage();
        expect(contentUpdatePage.getPageTitle()).toMatch(/wiss3NApp.content.home.createOrEditLabel/);
        contentUpdatePage.cancel();
    });

    it('should create and save Contents', () => {
        contentComponentsPage.clickOnCreateButton();
        contentUpdatePage.setTitleInput('title');
        expect(contentUpdatePage.getTitleInput()).toMatch('title');
        contentUpdatePage.setDateInput('2000-12-31');
        expect(contentUpdatePage.getDateInput()).toMatch('2000-12-31');
        contentUpdatePage.setTextInput('text');
        expect(contentUpdatePage.getTextInput()).toMatch('text');
        contentUpdatePage.userSelectLastOption();
        contentUpdatePage.taskSelectLastOption();
        contentUpdatePage.save();
        expect(contentUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
