# WiSS3N

WiSS3N is a app for web-based content scharing. 

Check the [project website](http://substance.io) and the [example editor](https://github.com/substance/example-editor).

## Roadmap

- ✓ = ready for production use
- Beta = ready for beta user testing
- :construction: = feature in progress

Feature                                                                     | Ready
--------------------------------------------------------------------------- | :------------:
**Calendar**                                                                |
View for Week, Month, Day                                                   | ✓
Select and Display Classes                                                  | ✓
Select and Display Teaching Subjects                                        | ✓
Create Tasks                                                                | :construction:
**Data Security**                                                           |                                                                  | 
Local file system support                                                   | 
Share Data peer to peet between Devices                                     |                             
**Collaboration**                                                           | 
User Groups                                                                 | 
Find and Connect to Friend                                                  | 
Share Documents                                                             | 
Realtime Collaborative Editing                                              | 
**Platform support**                                                        |
Mozilla Firefox (>=49)                                                      | Beta
Apple Safari (>=10)                                                         | Beta
Google Chrome (>=53)                                                        | Beta
Microsoft Edge                                                              | Beta


## Development

Install the dev dependencies.

    npm install


Run the dev app.

    ./gradlew
    npm start


## Building for production

To optimize the wiss3n application for production, run:

    ./gradlew -Pprod clean bootWar

This will concatenate and minify the client CSS and JavaScript files. It will also modify `index.html` so it references these new files.
To ensure everything worked, run:

    java -jar build/libs/*.war

Then navigate to [http://localhost:8080](http://localhost:8080) in your browser.


## Testing

To launch your application's tests, run:

    ./gradlew test

### Client tests

Unit tests are run by [Jest][] and written with [Jasmine][]. They're located in [src/test/javascript/](src/test/javascript/) and can be run with:

    npm test

UI end-to-end tests are powered by [Protractor][], which is built on top of WebDriverJS. They're located in [src/test/javascript/e2e](src/test/javascript/e2e)
and can be run by starting Spring Boot in one terminal (`./gradlew bootRun`) and running the tests (`npm run e2e`) in a second one.

[JHipster Homepage and latest documentation]: https://www.jhipster.tech
[JHipster 5.0.1 archive]: https://www.jhipster.tech/documentation-archive/v5.0.1

[Using JHipster in development]: https://www.jhipster.tech/documentation-archive/v5.0.1/development/
[Using Docker and Docker-Compose]: https://www.jhipster.tech/documentation-archive/v5.0.1/docker-compose
[Using JHipster in production]: https://www.jhipster.tech/documentation-archive/v5.0.1/production/
[Running tests page]: https://www.jhipster.tech/documentation-archive/v5.0.1/running-tests/
[Setting up Continuous Integration]: https://www.jhipster.tech/documentation-archive/v5.0.1/setting-up-ci/


[Node.js]: https://nodejs.org/
[Yarn]: https://yarnpkg.org/
[Webpack]: https://webpack.github.io/
[Angular CLI]: https://cli.angular.io/
[BrowserSync]: http://www.browsersync.io/
[Jest]: https://facebook.github.io/jest/
[Jasmine]: http://jasmine.github.io/2.0/introduction.html
[Protractor]: https://angular.github.io/protractor/
[Leaflet]: http://leafletjs.com/
[DefinitelyTyped]: http://definitelytyped.org/
