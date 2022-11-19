import './form.js';
import './map.js';
import {
  createMapMarkers
} from './map.js';

import {
  onFilterChange
} from './filtring.js';
import { activateForm, deactivateForm } from './form.js';

deactivateForm();

fetch('https://27.javascript.pages.academy/keksobooking/data')
  .then((response) => response.json())
  .then((packages) => {
    activateForm();
    createMapMarkers(packages.slice(0, 10));
    onFilterChange(packages, createMapMarkers);
  });
