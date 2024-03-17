<!-- This program has been developed by students from the bachelor's Computer Science program at Utrecht University within the Software Project course. It is distributed under the GPL 3.0 open source license. -->

# Technical specifications

CognitiveMapr uses:

- <a href="https://nuxt.com/">Nuxt 3</a>
- <a href="https://vuejs.org/">Vue Composition API</a>
- <a href="https://pinia.vuejs.org/">Pinia</a>
- <a href="https://www.typescriptlang.org/"/>Typescript</a>
- <a href="https://pugjs.org/api/getting-started.html">Pug</a>
- <a href="https://www.sigmajs.org/">Sigma.js</a>

...and some more smaller packages and api's.

## Folder structure

- **Assets** contains fonts, images and other global assets.
- **Components** contains the Vue components, small building blocks used to build other components or pages.
- **Pages** contains the web pages that make up the CognitiveMapr-app.
- **Scripts** contains the data-processing algorithms written in Typescript. These are based on the R scripts the client provided.
- **Stores** contains the definitions of the Pinia-stores and functions that run in these stores.

## Program stucture

CognitiveMapr currently has 3 pages:

- Index, the home page.
- Upload, the page where users can upload their data to be processed in .csv format.
- Graph, the page where the generated graph is displayed. User can also explore, edit and export the graph here.

Then there are also some pop-up components:

- Settings, where the user can adjust different settings of the app.
- Help, where the user can go to read about the app and how to use it.
- Export, where the user can select different export options and save graphs to their own pc.

All these pages and pop-ups are built up of other components, which can be found in the "Front/Mappr/Components" folder.
