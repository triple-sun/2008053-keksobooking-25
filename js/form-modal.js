import { disableElement } from './util.js';

const offerForm = document.querySelector('.ad-form');

const mapFilterFormContainer = document.querySelector('.map__filters-container');
const mapFilterForm = mapFilterFormContainer.querySelector('.map__filters');
const mapBasicFilters = mapFilterForm.querySelectorAll('.map__filter');
const mapFeatureFilter = mapFilterForm.querySelector('.map__features');

const dataErrorTemplate = document.querySelector('#data-error').content.querySelector('.data__error');
const dataErrorFragment = document.createDocumentFragment();

const closeUserModal = () => {
  const modal = offerForm.lastChild;

  offerForm.removeChild(modal);
  document.removeEventListener('keydown', closeUserModal);
};

const openUserModal = (template) => {
  const modal = template.cloneNode(true);

  offerForm.appendChild(modal);
  modal.addEventListener('click', closeUserModal);
  document.addEventListener('keydown', closeUserModal);
};

const createDataErrorModal = (error) => {
  const dataErrorPopup = dataErrorTemplate.cloneNode(true);
  const dataErrorPopupTextElement = dataErrorPopup.querySelector('.data__error__message');
  const dataErrorTemplateText = dataErrorPopupTextElement.innerHTML;

  dataErrorPopupTextElement.innerHTML = dataErrorTemplateText + error;
  dataErrorFragment.appendChild(dataErrorPopup);
  mapFilterFormContainer.appendChild(dataErrorFragment);
  mapFilterForm.classList.add('map__filters--disabled');
  mapBasicFilters.forEach(disableElement);
  disableElement(mapFeatureFilter);
};

export { createDataErrorModal, openUserModal };
