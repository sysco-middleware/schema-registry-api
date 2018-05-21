'use strict';

const Sway = require('sway');
const read = require('fs').readFileSync;
const load = require('js-yaml').load;
const yamls = ['./schema-registry.yaml'];

yamls.forEach(yaml => {
  const schemaRegistryApi = read(yaml).toString();

  Sway.create({definition: load(schemaRegistryApi)}).then(api => {
    const result = api.validate();

    if (result.errors.length) {
      console.error(`Validation failed for ${yaml}`)
      console.error(JSON.stringify(result.errors));
      return;
    }

    if (result.warnings.length) {
      console.warn(`Warnings in ${yaml}:`)
      console.warn(JSON.stringify(result.warnings));
    }

    console.log(`Validation of ${yaml} passed`);
  })
  .catch(error=> {
    console.error(`Error loading ${yaml}`);
    console.error(error);
  });
});
