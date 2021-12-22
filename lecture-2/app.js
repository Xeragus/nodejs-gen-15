const people = require('./people');
const printer = require('./people-data-printer');

printer(people);

/**
 * Ima 3 tipa na modules:
 * 1. File-based modules
 *  - moduli koi nie samite gi definirame vo nasata app
 * 2. Core modules
 *  - moduli koi Node.js ni gi dava gotovi zaedno so instalacijata
 * 3. External modules
 *  - moduli koi treba da gi instalirame vo nasata app
 * 
 * Node Package Manager (NPM)
 * - repo kade sto se cuvaat eksternite moduli
 * - od tuka gi instalirame
 * 
 * Semanticko verzioniranje (Semantic Versioning)
 * 
 * X.Y.Z
 * 
 * X: major version (glavna verzija)
 * Y: minor version (minorna/sporedna verzija)
 * Z: patch version
 * 
 * 1.0.0
 * - patch verzii ne voveduvaat novi funkcionalnosti (features) tuku samo resavaat bugs
 * verzijata ide -> 1.0.1
 * 
 * - minor verzii voveduvaat novi features
 * verzijata ide -> 1.1.0
 * 
 * 1.17.4
 * - sekogas koga vo software-ot voveduvame promeni koi tekovnata verzija ja pravat
 * nekompatibilna so prethodnata verzija, menuvame major version
 * verzijata ide -> 2.0.0
 */ 