Flog
====
## Done Stuff ##
* Basic routing
* Formy-stuff - data validation, submission etc
* Modularization and scope isolation via favouring angular directives over controllers for the most part
* Inter-directive communication via directive scope
* Demonstration of encapsulated data services via angular factories
* Usage of $q to return promises from data services and make them nice to work with
* Stubbed authorization via $routeChangeStart registration and route data
* Some funky directive work such as autofocus and showerrors

## Not Done Stuff ##

* Real auth implemented with Jwt's issued via a federated service
* Real storage (not just a file system stub)
* A bunch of features
* A bunch of 'stricter' behaviours in data typing in submissions (not everything is a string y'know!) etc
* Figuring out how to get animations to actually work in Angular 1.3 (tried and failed)
* Testing! It is all feeling a little fragile at the moment due to the lack of static typing or tests to make up for the lack thereof

FRog
====

There is a React version of the application nestled within the /React route - created for fun and profit :) I gave a short presentation on the tconversion process, the slides for which can be found at https://speakerdeck.com/andrewabest/seven-year-itch
