import './form.js';
import './map.js';
import {
  resetMap,
  STARTER_POINT,
  createMapMarkers
} from './map.js';
import {
  onFilterChange,
  QUANTITY_OF_RENDERED_BUBBLES
} from './filtring.js';
import {
  activateForm,
  deactivateForm,
  onFormSubmit,
  onResetButton
} from './form.js';
import './preview.js';

const dataSource = 'https://27.javascript.pages.academy/keksobooking/data';

deactivateForm();

fetch(dataSource)
  .then((response) => response.json())
  .then((packages) => {
    activateForm();
    resetMap(STARTER_POINT);
    createMapMarkers(packages.slice(0, QUANTITY_OF_RENDERED_BUBBLES));
    onFilterChange(packages, createMapMarkers);
    onFormSubmit(packages.slice(0, QUANTITY_OF_RENDERED_BUBBLES));
    onResetButton(packages.slice(0, QUANTITY_OF_RENDERED_BUBBLES));
  });
