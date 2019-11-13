export function convertFormioComponentsType(type) {
  switch (type) {
    case 'textfield':
      return 'TextInput';
    case 'selectboxes':
      return 'Checkboxes';
    case 'select':
      return 'Dropdown';
    case 'number':
      return 'NumberInput';
    case 'radio':
      return 'RadioButtons';
    case 'textarea':
      return 'TextArea';
    default:
      return null;
  }
}

export function convertFormioComponentsToData(result) {
  return (
    result.components &&
    result.components
      .filter(e => e.key !== 'submit' && convertFormioComponentsType(e.type))
      .map(c => {
        const d = {
          canHaveAlternateForm: true,
          canHaveAnswer: true,
          canHaveDisplayHorizontal: true,
          canHaveOptionCorrect: true,
          canHaveOptionValue: true,
          canHavePageBreakBefore: true,
          element: convertFormioComponentsType(c.type),
          field_name: c.key,
          id: c.id,
          label: c.label,
          required: c.validate.required,
          static: undefined,
          text: '文本输入'
        };
        if (c.values) {
          Object.assign(d, {
            options: c.values.map(e => ({
              value: e.value,
              text: e.label,
              key: e.value,
            }))
          });
        }
        if (c.data && c.data.values) {
          Object.assign(d, {
            options: c.data.values.map(e => ({
              value: e.value,
              text: e.label,
              key: e.value,
            }))
          });
        }
        return d;
      })
  );
}

export function getFormioWidgetParams(element) {
  let params = {};
  switch (element.element) {
    case 'TextInput':
      params = {
        allowCalculateOverride: false,
        allowMultipleMasks: false,
        alwaysEnabled: false,
        autofocus: false,
        calculateValue: '',
        clearOnHide: true,
        conditional: { show: null, when: null, eq: '' },
        customClass: '',
        customDefaultValue: '',
        dbIndex: false,
        defaultValue: '',
        description: '',
        disabled: false,
        encrypted: false,
        errorLabel: '',
        hidden: false,
        hideLabel: false,
        id: element.id,
        input: true,
        inputFormat: 'plain',
        inputMask: '',
        inputType: 'text',
        key: element.key,
        label: element.label,
        labelPosition: 'top',
        mask: false,
        multiple: false,
        overlay: {
          style: '',
          left: '',
          top: '',
          width: '',
          height: '',
        },
        persistent: true,
        placeholder: '',
        prefix: '',
        properties: {},
        protected: false,
        refreshOn: '',
        showCharCount: false,
        showWordCount: false,
        suffix: '',
        tabindex: '',
        tableView: true,
        tooltip: '',
        type: 'textfield',
        unique: false,
        validate: {
          custom: '',
          customMessage: '',
          customPrivate: false,
          json: '',
          maxLength: '',
          minLength: '',
          pattern: '',
          required: element.required,
        },
        validateOn: 'change',
        widget: { type: 'input' },
      };
      break;
    case 'Checkboxes':
      params = {
        label: element.label,
        labelPosition: 'top',
        optionsLabelPosition: 'right',
        description: '',
        tooltip: '',
        customClass: '',
        tabindex: '',
        inline: false,
        hidden: false,
        hideLabel: false,
        autofocus: false,
        disabled: false,
        values: element.options.map(e => {
          return { label: e.text, value: e.value, shortcut: '' };
        }),
        defaultValue: '',
        persistent: true,
        protected: false,
        dbIndex: false,
        encrypted: false,
        clearOnHide: true,
        allowCalculateOverride: false,
        validate: {
          required: element.required,
          customMessage: '',
          custom: '',
          customPrivate: false,
          json: ''
        },
        errorLabel: '',
        minSelectedCountMessage: '',
        maxSelectedCountMessage: '',
        type: 'selectboxes',
        input: true,
        key: element.key,
        placeholder: '',
        prefix: '',
        suffix: '',
        multiple: false,
        unique: false,
        refreshOn: '',
        tableView: false,
        customDefaultValue: '',
        calculateValue: '',
        widget: null,
        validateOn: 'change',
        conditional: { show: null, when: null, eq: '' },
        overlay: { style: '', left: '', top: '', width: '', height: '' },
        alwaysEnabled: false,
        showCharCount: false,
        showWordCount: false,
        properties: {},
        allowMultipleMasks: false,
        inputType: 'checkbox',
        fieldSet: false,
        id: element.id
      };
      break;
    case 'Dropdown':
      params = {
        label: element.label,
        labelPosition: 'top',
        widget: 'choicesjs',
        placeholder: '',
        description: '',
        tooltip: '',
        customClass: '',
        tabindex: '',
        hidden: false,
        hideLabel: false,
        autofocus: false,
        disabled: false,
        multiple: false,
        dataSrc: 'values',
        indexeddb: {},
        data: {
          values: element.options.map(o => {
            return { label: o.text, value: o.value };
          }),
          resource: '',
          json: '',
          url: '',
          custom: '',
        },
        值属性: '',
        valueProperty: '',
        template: '<span>{{ item.label }}</span>',
        defaultValue: '',
        searchEnabled: true,
        selectThreshold: 0.3,
        readOnlyValue: false,
        customOptions: {},
        persistent: true,
        protected: false,
        dbIndex: false,
        encrypted: false,
        clearOnHide: true,
        allowCalculateOverride: false,
        validateOn: 'change',
        validate: {
          required: element.required,
          customMessage: '',
          custom: '',
          customPrivate: false,
          json: '',
        },
        unique: false,
        errorLabel: '',
        type: 'select',
        input: true,
        key: element.key,
        prefix: '',
        suffix: '',
        tableView: true,
        customDefaultValue: '',
        calculateValue: '',
        conditional: { show: null, when: null, eq: '' },
        overlay: { style: '', left: '', top: '', width: '', height: '' },
        alwaysEnabled: false,
        showCharCount: false,
        showWordCount: false,
        properties: {},
        allowMultipleMasks: false,
        searchThreshold: 0.3,
        fuseOptions: { include: 'score', threshold: 0.3 },
        refreshOn: '',
        clearOnRefresh: false,
        limit: 100,
        lazyLoad: true,
        filter: '',
        searchField: '',
        minSearch: 0,
        authenticate: false,
        selectFields: '',
        id: 'eo64s6',
      };
      break;
    case 'NumberInput':
      params = {
        label: element.label,
        labelPosition: 'top',
        placeholder: '',
        description: '',
        tooltip: '',
        prefix: '',
        suffix: '',
        widget: {},
        customClass: '',
        tabindex: '',
        hidden: false,
        hideLabel: false,
        mask: false,
        autofocus: false,
        disabled: false,
        multiple: false,
        defaultValue: '',
        persistent: true,
        protected: false,
        delimiter: false,
        requireDecimal: false,
        inputFormat: 'plain',
        dbIndex: false,
        encrypted: false,
        clearOnHide: true,
        allowCalculateOverride: false,
        validateOn: 'change',
        validate: {
          required: element.required,
          customMessage: '',
          custom: '',
          customPrivate: false,
          json: '',
          step: 'any',
          integer: '',
          min: '',
          max: ''
        },
        errorLabel: '',
        type: 'number',
        input: true,
        key: element.key,
        unique: false,
        refreshOn: '',
        tableView: false,
        customDefaultValue: '',
        calculateValue: '',
        conditional: { show: null, when: null, eq: '' },
        overlay: { style: '', left: '', top: '', width: '', height: '' },
        alwaysEnabled: false,
        showCharCount: false,
        showWordCount: false,
        properties: {},
        allowMultipleMasks: false,
        id: element.id
      };
      break;
    case 'RadioButtons':
      params = {
        label: element.label,
        labelPosition: 'top',
        optionsLabelPosition: 'right',
        description: '',
        tooltip: '',
        customClass: '',
        tabindex: '',
        inline: false,
        hidden: false,
        hideLabel: false,
        autofocus: false,
        disabled: false,
        values: element.options.map(e => {
          return { label: e.text, value: e.value, shortcut: '' };
        }),
        defaultValue: '',
        persistent: true,
        protected: false,
        dbIndex: false,
        encrypted: false,
        clearOnHide: true,
        allowCalculateOverride: false,
        validate: {
          required: element.required,
          customMessage: '',
          custom: '',
          customPrivate: false,
          json: ''
        },
        errorLabel: '',
        type: 'radio',
        input: true,
        key: element.key,
        placeholder: '',
        prefix: '',
        suffix: '',
        multiple: false,
        unique: false,
        refreshOn: '',
        tableView: false,
        customDefaultValue: '',
        calculateValue: '',
        widget: null,
        validateOn: 'change',
        conditional: { show: null, when: null, eq: '' },
        overlay: { style: '', left: '', top: '', width: '', height: '' },
        alwaysEnabled: false,
        showCharCount: false,
        showWordCount: false,
        properties: {},
        allowMultipleMasks: false,
        inputType: 'radio',
        fieldSet: false,
        id: element.id
      };
      break;
    case 'TextArea':
      params = {
        label: element.label,
        labelPosition: 'top',
        placeholder: '',
        description: '',
        tooltip: '',
        prefix: '',
        suffix: '',
        widget: { type: 'input' },
        editor: '',
        autoExpand: false,
        customClass: '',
        tabindex: '',
        hidden: false,
        hideLabel: false,
        autofocus: false,
        disabled: false,
        multiple: false,
        defaultValue: '',
        persistent: true,
        protected: false,
        inputFormat: 'html',
        dbIndex: false,
        encrypted: false,
        clearOnHide: true,
        allowCalculateOverride: false,
        validateOn: 'change',
        validate: {
          required: element.required,
          customMessage: '',
          custom: '',
          customPrivate: false,
          json: '',
          minLength: '',
          maxLength: '',
          pattern: '',
          minWords: '',
          maxWords: ''
        },
        unique: false,
        errorLabel: '',
        type: 'textarea',
        rows: 3,
        input: true,
        key: element.key,
        refreshOn: '',
        tableView: true,
        customDefaultValue: '',
        calculateValue: '',
        conditional: { show: null, when: null, eq: '' },
        overlay: { style: '', left: '', top: '', width: '', height: '' },
        alwaysEnabled: false,
        showCharCount: false,
        showWordCount: false,
        properties: {},
        allowMultipleMasks: false,
        mask: false,
        inputType: 'text',
        inputMask: '',
        id: element.id
      };
      break;
    default:
      return null;
  }
  return { ...element, ...params };
}

export function getWrapper(components) {
  return {
    _id: '5dca957572c31134e223958f',
    type: 'form',
    components,
    tags: ['common'],
    owner: '5d3bf78171d3c759985e6f0f',
    display: 'form',
    title: 'refactorNull',
    name: 'refactorNull',
    path: 'refactornull',
    access: [
      {
        roles: [
          '5d3bf77771d3c759985e6f00',
          '5d3bf77771d3c759985e6f01',
          '5d3bf77771d3c759985e6f02'
        ],
        type: 'read_all'
      }
    ],
    submissionAccess: [],
    // created: '2019-11-12T11:20:21.573Z',
    // modified: '2019-11-12T11:22:40.985Z',
    machineName: 'refactorNull'
  };
}
