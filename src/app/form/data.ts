import { DivColFildValue, Form, InputType } from './form';



export const data: Form = {
  action: {
    url: "https://localhost/test",
    method: "post"
  },
  noValidation: false,
  fields: [
    {
      label: 'name',
      name: 'fullname',
      input:{
        name: InputType.text,
        config: {}
      },
      col: {md: DivColFildValue.col12},
      rules: {required: {}, minLength: {value: 4}},
    },
    {
      label: 'province',
      name: 'province',
      input: {
        name: InputType.select,
        config: {
          bindLabel: 'name',
          bindItem: 'id',
          defaultValue: null,
          items: [
            {
              "id": null,
              "name": "selection",
              "location_id": null
            },
            {
                "id": 6,
                "name": "ایلام",
                "location_id": 52
            },
            {
                "id": 7,
                "name": "بوشهر",
                "location_id": 21
            },
            {
                "id": 8,
                "name": "تهران",
                "location_id": 1
            },
          ]
        }
      },
      col: {md: DivColFildValue.col6},
      rules: {
        required: {},
        minLength: {value: 3},
        maxLength: {value: 16},
      },
      events: {
        change: [
          {
            type:'API',
            config: {
              url: 'https://icioc.yarhis.ir/api/city',
              method: 'GET',
              queryParams: {
                'state_id': 'input:province:value'
              },
              response: {
                setItems: 'city'
              }
            }
          }
        ]
      }
    },
    {
      name: 'city',
      label: 'city',
      col: {md: DivColFildValue.col6},
      rules: {required: {}},
      input:{
        name: InputType.select,
        config: {
          bindLabel: 'title',
          bindItem: 'id',
          items: []
        }
      },

    },
    {
      name: 'description',
      label: 'description',
      col: {md: DivColFildValue.col12},
      rules: {required: {}, minLength: {value: 5}},
      input:{
        name: InputType.textarea
      }
    },
    {
      label: 'submit',
      name: 'submit',
      input: {
        name: InputType.submit,
        config: {
          label: 'submit'
        }
      },
      col: {
        md: DivColFildValue.col12,
      },
    }
  ]
}
