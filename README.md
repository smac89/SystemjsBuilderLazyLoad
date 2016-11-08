This illustrates lazy loading modules using the systemjs builder and gulp. The source code is taken directly from the official Angular.io routing tutorial plunker.

Workflow

1. clone the respository **git clone https://github.com/abidmix/SystemjsBuilderLazyLoad.git**

2. cd into project directory **cd c:\SystemjsBuilderLazyLoad**

3. run **npm install**

4. run **tsc** to transpile files into bundled folder

5. run **gulp appbundle** You will see an Error: Unable to import "@angular/platform-browser-dynamic". The incorrect instance of System is being used to System.import. The application will just bundle fine. Will report this issue to the authour on github.


6. run npm start
and application will be served at port 8900 .
