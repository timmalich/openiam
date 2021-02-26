# openiam

**This is just a dummy application for job candidates.**
Fix a bug, implement a new feature, write a test, correct the documentation or build pipelines. Do whatever you prefer.
You can either choose an existing issue or even create a new one. When you are done just create a merge request.

**Important** We do not want you to waste a lot of your time just for the interview! Please do not spend more than AT MOST one work day! 
It is NOT important to create super complex but elegant solutions.
What we are most interested in, is:
- how you approached the subject,
- what you did,
- how you did it and
-  what problems you faced.  

Therefore, even 'failing' or partly working solutions are totally fine. 
In this case just create a merge request containing the flag 'WIP' (work in progress) within the request title.

Please try to create the merge request at latest 24 hours before the interview.

One last thing before we dig into the fake project: The real team and customers are all fluent in German. 
Therefore, the issues will be described in German and the interview will be in German too. 
The code and documentation language is English.


## Description of this FAKE project
Open IAM (Identity and Access Management) aims to be the world's most powerful IAM solution. We use FOSS and we love FOSS.
We used jhipster to create the project because the first 'fullstack lead architect' decided that it's great. 
A couple of month ago he left. Since that day the community is discussing and deciding all architectural questions.
Currently, the community (we) with all developers feel good and comfortable with the new setup.
Even though the community thinks that jhipster is cool and powerful we don't beleave that we must stick with it forever.
This means issues CAN be solved but don't have to be solved using jhipster. 

Community mindset:
- fail fast, fail often
- every opinion and idea is valuable
- every commit and line of code is valuable - only deleting deprecated code is even better
- KISS - keep it simple stupid
- readable code is even worth more than compiling code
- quality assurance:
  - try to use test driven development wherever possible
  - always use merge requests

Well known entities:
- Organization: e.g. a workplace of an employee, a supplier, a dealer, a business partner, ...
- Accessor: Accessors are basically users. They can be a member of an organization and have access to applications
- Country: all countries in the world. E.g. users and organizations can be located in countries
- Application: Applications can be used by Accessors. They manage their permissions with entitlements.
- Entitlement: Most fine granular permission element. An application can have multiple entitlements. It can use it to check if an accessor is allowed to trigger an action or not. 

## Development Setup

Build dependencies are: 
- node v6 (can and should be installed via gradle). Do not use v7 because it will lead you to tons of dependency issues.
- jdk11+
- docker
- docker-compose

Install node v6 particular for this project.
```
./gradlew -P nodeInstall
```

Setup the environment:
Hint: This docker-compose file contains quite a lot of services.
In case your hardware is limited you should know that the minimal required components for start-up and login are postgresql and keycloak.
```
docker-compose -f src/main/docker/dev.yml up -d
```

Run the application:
Hint: These exceptions on start-up are intended (see issues) and can be ignored.:
- `java.lang.IllegalStateException: handshake failed, mismatched cluster name`
- `liquibase.exception.MigrationFailedException: Migration failed for change set config/liquibase/changelog/20210206221023_added_entity_constraints_Organization.xml::20210206221023-2::jhipster`
- `java.lang.IllegalAccessException: class io.netty.util.internal.PlatformDependent0$6 cannot access class jdk.internal.misc.Unsafe (in module java.base) because module java.base does not export jdk.internal.misc to unnamed module`
- `java.lang.UnsupportedOperationException: Reflective setAccessible(true) disabled`
- `Hazelcast is starting in a Java modular environment (Java 9 and newer) but without proper access to required Java packages. Use additional Java arguments to provide Hazelcast access to Java internal API. The internal API access is used to get the best performance results. Arguments to be used:
  --add-modules java.se --add-exports java.base/jdk.internal.ref=ALL-UNNAMED --add-opens java.base/java.lang=ALL-UNNAMED --add-opens java.base/java.nio=ALL-UNNAMED --add-opens java.base/sun.nio.ch=ALL-UNNAMED --add-opens java.management/sun.management=ALL-UNNAMED --add-opens jdk.management/com.sun.management.internal=ALL-UNNAMED`
```
./gradlew
```

After the application is started, it should be accessible at http://localhost:8080/
You should be able to login the ui with the credentials: admin:admin
To verify it's working you can also check if the dummy data from `./utils/exampleCurls.sh` is shown.


## More jhipster generated documentation.
Since someone may or may not be interested in the generated documentation from jhipster we do not want to delete this yet. Someone from the community should check if the below content is valuable or can be deleted.
YOU (THE CANDIDATE) REALLY DON'T NEED TO READ THE BELOW PART YET! 

### Doing API-First development using openapi-generator

[OpenAPI-Generator]() is configured for this application. You can generate API code from the `src/main/resources/swagger/api.yml` definition file by running:

```bash
./gradlew openApiGenerate
```

Then implements the generated delegate classes with `@Service` classes.

To edit the `api.yml` definition file, you can use a tool such as [Swagger-Editor](). Start a local instance of the swagger-editor using docker by running: `docker-compose -f src/main/docker/swagger-editor.yml up -d`. The editor will then be reachable at [http://localhost:7742](http://localhost:7742).

Refer to [Doing API-First development][] for more details.

## Building for production

### Packaging as jar

To build the final jar and optimize the openiam application for production, run:

```
./gradlew -Pprod clean bootJar
```

This will concatenate and minify the client CSS and JavaScript files. It will also modify `index.html` so it references these new files.
To ensure everything worked, run:

```
java -jar build/libs/*.jar
```

Then navigate to [http://localhost:8080](http://localhost:8080) in your browser.

Refer to [Using JHipster in production][] for more details.

### Packaging as war

To package your application as a war in order to deploy it to an application server, run:

```
./gradlew -Pprod -Pwar clean bootWar
```

## Testing

To launch your application's tests, run:

```
./gradlew test integrationTest jacocoTestReport
```

### Client tests

Unit tests are run by [Jest][] and written with [Jasmine][]. They're located in [src/test/javascript/](src/test/javascript/) and can be run with:

```
npm test
```

For more information, refer to the [Running tests page][].

### Code quality

Sonar is used to analyse code quality. You can start a local Sonar server (accessible on http://localhost:9001) with:

```
docker-compose -f src/main/docker/sonar.yml up -d
```

You can run a Sonar analysis with using the [sonar-scanner](https://docs.sonarqube.org/display/SCAN/Analyzing+with+SonarQube+Scanner) or by using the gradle plugin.

Then, run a Sonar analysis:

```
./gradlew -Pprod clean check jacocoTestReport sonarqube
```

For more information, refer to the [Code quality page][].

## Using Docker to simplify development (optional)

You can use Docker to improve your JHipster development experience. A number of docker-compose configuration are available in the [src/main/docker](src/main/docker) folder to launch required third party services.

For example, to start a postgresql database in a docker container, run:

```
docker-compose -f src/main/docker/postgresql.yml up -d
```

To stop it and remove the container, run:

```
docker-compose -f src/main/docker/postgresql.yml down
```

You can also fully dockerize your application and all the services that it depends on.
To achieve this, first build a docker image of your app by running:

```
./gradlew bootJar -Pprod jibDockerBuild
```

Then run:

```
docker-compose -f src/main/docker/app.yml up -d
```

For more information refer to [Using Docker and Docker-Compose][], this page also contains information on the docker-compose sub-generator (`jhipster docker-compose`), which is able to generate docker configurations for one or several JHipster applications.

## Continuous Integration (optional)

To configure CI for your project, run the ci-cd sub-generator (`jhipster ci-cd`), this will let you generate configuration files for a number of Continuous Integration systems. Consult the [Setting up Continuous Integration][] page for more information.

[jhipster homepage and latest documentation]: https://www.jhipster.tech
[jhipster 6.10.5 archive]: https://www.jhipster.tech/documentation-archive/v6.10.5
[using jhipster in development]: https://www.jhipster.tech/documentation-archive/v6.10.5/development/
[using docker and docker-compose]: https://www.jhipster.tech/documentation-archive/v6.10.5/docker-compose
[using jhipster in production]: https://www.jhipster.tech/documentation-archive/v6.10.5/production/
[running tests page]: https://www.jhipster.tech/documentation-archive/v6.10.5/running-tests/
[code quality page]: https://www.jhipster.tech/documentation-archive/v6.10.5/code-quality/
[setting up continuous integration]: https://www.jhipster.tech/documentation-archive/v6.10.5/setting-up-ci/
[node.js]: https://nodejs.org/
[yarn]: https://yarnpkg.org/
[webpack]: https://webpack.github.io/
[angular cli]: https://cli.angular.io/
[browsersync]: https://www.browsersync.io/
[jest]: https://facebook.github.io/jest/
[jasmine]: https://jasmine.github.io/2.0/introduction.html
[protractor]: https://angular.github.io/protractor/
[leaflet]: https://leafletjs.com/
[definitelytyped]: https://definitelytyped.org/
[openapi-generator]: https://openapi-generator.tech
[swagger-editor]: https://editor.swagger.io
[doing api-first development]: https://www.jhipster.tech/documentation-archive/v6.10.5/doing-api-first-development/
