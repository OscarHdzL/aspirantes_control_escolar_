import { Component, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { MatFormField, MatFormFieldAppearance } from '@angular/material/form-field';
import { CuestionarioAspirante, OpcionesPreguntaModel, PreguntaModel, RespuestaModel } from 'src/app/modelos/Cuestionario';

@Component({
  selector: 'vex-formulario-dinamico',
  templateUrl: './formulario-dinamico.component.html',
  styleUrls: ['./formulario-dinamico.component.scss']
})
export class FormularioDinamicoComponent implements OnInit {
  layoutCtrl = new UntypedFormControl("boxed");
  public RADIOSelected;
  public pregunta_;
  public accion = 'Consulta';

  apariencia: MatFormFieldAppearance = 'outline'

  public objeto: Array<PreguntaModel> = [
    {
      "id": 2,
      "tbl_Formulario_id": 2,
      "tbl_Tipo_Respuesta_id": 3,
      "tipoRespuesta": "select",
      "tbl_Grupo_Opciones_id": 1,
      "pregunta": "¿Cuáles son tus ingresos mensualmente?",
      "respuestaObligatoria": true,
      "inclusion": "2022-04-26T00:00:00",
      "activo": true,
      "opciones": [
        {
          "id": 1,
          "tbl_Grupo_Opciones_id": 1,
          "opcion": "$1,000 - $2,000",
          "activo": true
        },
        {
          "id": 3,
          "tbl_Grupo_Opciones_id": 1,
          "opcion": "$2,000 - $3,000",
          "activo": true
        },
        {
          "id": 4,
          "tbl_Grupo_Opciones_id": 1,
          "opcion": "$3,000 - $4,000",
          "activo": true
        }
      ],
      "respuesta": {
        "tbl_Opciones_Pregunta_id": 1
      },
      "respuestas": [
        {
          "respuestaTexto": null,
          "id": null,
          "tbl_Pregunta_id": 2,
          "tbl_Opciones_Pregunta_id": 1,
          "respuestaComplemento": null,
          "respuestaNumero": null,
          "respuestaSiNo": null,
          "inclusion": "2022-04-29T18:00:43",
          "activo": true
        }
      ]
    },
    {
      "id": 3,
      "tbl_Formulario_id": 2,
      "tbl_Tipo_Respuesta_id": 1,
      "tipoRespuesta": "text",
      "pregunta": "¿Qué deportes practicas?",
      "respuestaObligatoria": true,
      "inclusion": "2022-04-26T00:00:00",
      "activo": true,
      "respuesta": {
        "respuestaTexto": "NINGUNO"
      },
      "respuestas": [
        {
          "id": null,
          "tbl_Pregunta_id": 3,
          "tbl_Opciones_Pregunta_id": null,
          "respuestaTexto": "NINGUNO",
          "respuestaComplemento": null,
          "respuestaNumero": null,
          "respuestaSiNo": null,
          "inclusion": "2022-04-29T18:01:04",
          "activo": true
        }
      ]
    },
    {
      "id": 4,
      "tbl_Formulario_id": 2,
      "tbl_Tipo_Respuesta_id": 1,
      "tipoRespuesta": "text",
      "pregunta": "¿Practicas deporte?",
      "respuestaObligatoria": true,
      "respuestaComplementoObligatoria": true,
      "preguntaComplemento": "¿Cuál?",
      "inclusion": "2022-04-26T00:00:00",
      "activo": true,
      "respuesta": {
        "respuestaTexto": "SI",
        "respuestaComplemento": "D"
      },
      "respuestas": [
        {
          "id": null,
          "tbl_Pregunta_id": 4,
          "tbl_Opciones_Pregunta_id": null,
          "respuestaTexto": "SI",
          "respuestaComplemento": "D",
          "respuestaNumero": null,
          "respuestaSiNo": null,
          "inclusion": "2022-04-29T18:01:28",
          "activo": true
        }
      ]
    },
    {
      "id": 5,
      "tbl_Formulario_id": 2,
      "tbl_Tipo_Respuesta_id": 2,
      "tipoRespuesta": "checkbox",
      "tbl_Grupo_Opciones_id": 2,
      "pregunta": "¿Qué deportes prefieres?",
      "respuestaObligatoria": true,
      "inclusion": "2022-04-26T00:00:00",
      "activo": true,
      "opciones": [
        {
          "id": 5,
          "tbl_Grupo_Opciones_id": 2,
          "opcion": "Fútbol",
          "activo": true,
          "respuestaObligatoria": true,
          "checked": true
        },
        {
          "id": 6,
          "tbl_Grupo_Opciones_id": 2,
          "opcion": "Box",
          "activo": true,
          "respuestaObligatoria": true,
          "checked": true
        },
        {
          "id": 7,
          "tbl_Grupo_Opciones_id": 2,
          "opcion": "Natación",
          "activo": true,
          "respuestaObligatoria": true,
          "checked": true
        },
        {
          "id": 8,
          "tbl_Grupo_Opciones_id": 2,
          "opcion": "Voleibol",
          "activo": true,
          "respuestaObligatoria": true
        },
        {
          "id": 14,
          "tbl_Grupo_Opciones_id": 2,
          "opcion": "Squash",
          "activo": true,
          "respuestaObligatoria": true
        },
        {
          "id": 15,
          "tbl_Grupo_Opciones_id": 2,
          "opcion": "Hockey",
          "activo": true,
          "respuestaObligatoria": true
        }
      ],
      "respuesta": {

      },
      "respuestas": [
        {
          "respuestaTexto": null,
          "id": null,
          "tbl_Pregunta_id": 5,
          "tbl_Opciones_Pregunta_id": 5,
          "respuestaComplemento": null,
          "respuestaNumero": null,
          "respuestaSiNo": null,
          "inclusion": "2022-04-29T18:06:10",
          "activo": true
        },
        {
          "respuestaTexto": null,
          "id": null,
          "tbl_Pregunta_id": 5,
          "tbl_Opciones_Pregunta_id": 6,
          "respuestaComplemento": null,
          "respuestaNumero": null,
          "respuestaSiNo": null,
          "inclusion": "2022-04-29T18:06:10",
          "activo": true
        },
        {
          "respuestaTexto": null,
          "id": null,
          "tbl_Pregunta_id": 5,
          "tbl_Opciones_Pregunta_id": 7,
          "respuestaComplemento": null,
          "respuestaNumero": null,
          "respuestaSiNo": null,
          "inclusion": "2022-04-29T18:06:10",
          "activo": true
        }
      ]
    },
    {
      "id": 6,
      "tbl_Formulario_id": 2,
      "tbl_Tipo_Respuesta_id": 5,
      "tipoRespuesta": "radio",
      "tbl_Grupo_Opciones_id": 3,
      "pregunta": "¿Cuales son tus egresos, aproximadamente?",
      "respuestaObligatoria": true,
      "inclusion": "2022-04-26T00:00:00",
      "activo": true,
      "opciones": [
        {
          "id": 16,
          "tbl_Grupo_Opciones_id": 3,
          "opcion": "$1,000 - $2,000",
          "activo": true,
          "checked": false
        },
        {
          "id": 17,
          "tbl_Grupo_Opciones_id": 3,
          "opcion": "$2,000 - $3,000",
          "activo": true,
          "checked": true
        },
        {
          "id": 18,
          "tbl_Grupo_Opciones_id": 3,
          "opcion": "$3,000 - $4,000",
          "activo": true,
          "checked": false
        }
      ],
      "respuesta": {
        "tbl_Opciones_Pregunta_id": 17
      },
      "respuestas": [
        {
          "respuestaTexto": null,
          "id": null,
          "tbl_Pregunta_id": 6,
          "tbl_Opciones_Pregunta_id": 17,
          "respuestaComplemento": null,
          "respuestaNumero": null,
          "respuestaSiNo": null,
          "inclusion": "2022-04-29T18:06:13",
          "activo": true
        }
      ]
    },
    {
      "id": 7,
      "tbl_Formulario_id": 2,
      "tbl_Tipo_Respuesta_id": 1,
      "tipoRespuesta": "text",
      "pregunta": "¿Qué unidad de aprendizaje te gusta más?",
      "respuestaObligatoria": true,
      "respuestaComplementoObligatoria": false,
      "preguntaComplemento": "¿Por qué?",
      "inclusion": "2022-04-28T00:00:00",
      "activo": true,
      "respuesta": {
        "respuestaTexto": "MATHS",
        "respuestaComplemento": "NOMAS"
      },
      "respuestas": [
        {
          "id": null,
          "tbl_Pregunta_id": 7,
          "tbl_Opciones_Pregunta_id": null,
          "respuestaTexto": "MATHS",
          "respuestaComplemento": "NOMAS",
          "respuestaNumero": null,
          "respuestaSiNo": null,
          "inclusion": "2022-04-29T18:01:38",
          "activo": true
        }
      ]
    },
    {
      "id": 8,
      "tbl_Formulario_id": 2,
      "tbl_Tipo_Respuesta_id": 4,
      "tipoRespuesta": "textarea",
      "pregunta": "Describe tus razones para entrar",
      "respuestaObligatoria": true,
      "respuestaComplementoObligatoria": true,
      "preguntaComplemento": "Complemento..",
      "inclusion": "2022-04-29T00:00:00",
      "activo": true,
      "respuesta": {
        "respuestaTexto": "HGJHM",
        "respuestaComplemento": "VBNM,"
      },
      "respuestas": [
        {
          "id": null,
          "tbl_Pregunta_id": 8,
          "tbl_Opciones_Pregunta_id": null,
          "respuestaTexto": "HGJHM",
          "respuestaComplemento": "VBNM,",
          "respuestaNumero": null,
          "respuestaSiNo": null,
          "inclusion": "2022-04-29T18:06:02",
          "activo": true
        }
      ]
    },
    {
      "id": 9,
      "tbl_Formulario_id": 2,
      "tbl_Tipo_Respuesta_id": 3,
      "tipoRespuesta": "select",
      "tbl_Grupo_Opciones_id": 1,
      "pregunta": "¿Cuáles son tus ingresos mensualmente?",
      "respuestaObligatoria": true,
      "inclusion": "2022-04-26T00:00:00",
      "activo": true,
      "opciones": [
        {
          "id": 1,
          "tbl_Grupo_Opciones_id": 1,
          "opcion": "$1,000 - $2,000",
          "activo": true
        },
        {
          "id": 3,
          "tbl_Grupo_Opciones_id": 1,
          "opcion": "$2,000 - $3,000",
          "activo": true
        },
        {
          "id": 4,
          "tbl_Grupo_Opciones_id": 1,
          "opcion": "$3,000 - $4,000",
          "activo": true
        }
      ],
      "respuesta": {
        "tbl_Opciones_Pregunta_id": 3
      },
      "respuestas": [
        {
          "respuestaTexto": null,
          "id": null,
          "tbl_Pregunta_id": 9,
          "tbl_Opciones_Pregunta_id": 3,
          "respuestaComplemento": null,
          "respuestaNumero": null,
          "respuestaSiNo": null,
          "inclusion": "2022-04-29T18:06:29",
          "activo": true
        }
      ]
    },
    {
      "id": 10,
      "tbl_Formulario_id": 2,
      "tbl_Tipo_Respuesta_id": 1,
      "tipoRespuesta": "text",
      "pregunta": "¿Qué deportes practicas?",
      "respuestaObligatoria": true,
      "inclusion": "2022-04-26T00:00:00",
      "activo": true,
      "respuesta": {
        "respuestaTexto": "SOCCER"
      },
      "respuestas": [
        {
          "id": null,
          "tbl_Pregunta_id": 10,
          "tbl_Opciones_Pregunta_id": null,
          "respuestaTexto": "SOCCER",
          "respuestaComplemento": null,
          "respuestaNumero": null,
          "respuestaSiNo": null,
          "inclusion": "2022-04-29T18:07:01",
          "activo": true
        }
      ]
    },
    {
      "id": 11,
      "tbl_Formulario_id": 2,
      "tbl_Tipo_Respuesta_id": 1,
      "tipoRespuesta": "text",
      "pregunta": "¿Practicas deporte?",
      "respuestaObligatoria": true,
      "respuestaComplementoObligatoria": true,
      "preguntaComplemento": "¿Cuál?",
      "inclusion": "2022-04-26T00:00:00",
      "activo": true,
      "respuesta": {
        "respuestaTexto": "SI",
        "respuestaComplemento": "BOX"
      },
      "respuestas": [
        {
          "id": null,
          "tbl_Pregunta_id": 11,
          "tbl_Opciones_Pregunta_id": null,
          "respuestaTexto": "SI",
          "respuestaComplemento": "BOX",
          "respuestaNumero": null,
          "respuestaSiNo": null,
          "inclusion": "2022-04-29T18:07:11",
          "activo": true
        }
      ]
    },
    {
      "id": 12,
      "tbl_Formulario_id": 2,
      "tbl_Tipo_Respuesta_id": 2,
      "tipoRespuesta": "checkbox",
      "tbl_Grupo_Opciones_id": 2,
      "pregunta": "¿Qué deportes prefieres?",
      "respuestaObligatoria": true,
      "inclusion": "2022-04-26T00:00:00",
      "activo": true,
      "opciones": [
        {
          "id": 5,
          "tbl_Grupo_Opciones_id": 2,
          "opcion": "Fútbol",
          "activo": true,
          "respuestaObligatoria": true
        },
        {
          "id": 6,
          "tbl_Grupo_Opciones_id": 2,
          "opcion": "Box",
          "activo": true,
          "respuestaObligatoria": true
        },
        {
          "id": 7,
          "tbl_Grupo_Opciones_id": 2,
          "opcion": "Natación",
          "activo": true,
          "respuestaObligatoria": true
        },
        {
          "id": 8,
          "tbl_Grupo_Opciones_id": 2,
          "opcion": "Voleibol",
          "activo": true,
          "respuestaObligatoria": true
        },
        {
          "id": 14,
          "tbl_Grupo_Opciones_id": 2,
          "opcion": "Squash",
          "activo": true,
          "respuestaObligatoria": true
        },
        {
          "id": 15,
          "tbl_Grupo_Opciones_id": 2,
          "opcion": "Hockey",
          "activo": true,
          "respuestaObligatoria": true,
          "checked": true
        }
      ],
      "respuesta": {

      },
      "respuestas": [
        {
          "respuestaTexto": null,
          "id": null,
          "tbl_Pregunta_id": 12,
          "tbl_Opciones_Pregunta_id": 15,
          "respuestaComplemento": null,
          "respuestaNumero": null,
          "respuestaSiNo": null,
          "inclusion": "2022-04-29T18:07:56",
          "activo": true
        }
      ]
    },
    {
      "id": 13,
      "tbl_Formulario_id": 2,
      "tbl_Tipo_Respuesta_id": 5,
      "tipoRespuesta": "radio",
      "tbl_Grupo_Opciones_id": 3,
      "pregunta": "¿Cuales son tus egresos, aproximadamente?",
      "respuestaObligatoria": true,
      "inclusion": "2022-04-26T00:00:00",
      "activo": true,
      "opciones": [
        {
          "id": 16,
          "tbl_Grupo_Opciones_id": 3,
          "opcion": "$1,000 - $2,000",
          "activo": true,
          "checked": true
        },
        {
          "id": 17,
          "tbl_Grupo_Opciones_id": 3,
          "opcion": "$2,000 - $3,000",
          "activo": true,
          "checked": false
        },
        {
          "id": 18,
          "tbl_Grupo_Opciones_id": 3,
          "opcion": "$3,000 - $4,000",
          "activo": true,
          "checked": false
        }
      ],
      "respuesta": {
        "tbl_Opciones_Pregunta_id": 16
      },
      "respuestas": [
        {
          "respuestaTexto": null,
          "id": null,
          "tbl_Pregunta_id": 13,
          "tbl_Opciones_Pregunta_id": 16,
          "respuestaComplemento": null,
          "respuestaNumero": null,
          "respuestaSiNo": null,
          "inclusion": "2022-04-29T18:07:52",
          "activo": true
        }
      ]
    },
    {
      "id": 14,
      "tbl_Formulario_id": 2,
      "tbl_Tipo_Respuesta_id": 1,
      "tipoRespuesta": "text",
      "pregunta": "¿Qué unidad de aprendizaje te gusta más?",
      "respuestaObligatoria": true,
      "respuestaComplementoObligatoria": false,
      "preguntaComplemento": "¿Por qué?",
      "inclusion": "2022-04-28T00:00:00",
      "activo": true,
      "respuesta": {
        "respuestaTexto": "ESP",
        "respuestaComplemento": ""
      },
      "respuestas": [
        {
          "id": null,
          "tbl_Pregunta_id": 14,
          "tbl_Opciones_Pregunta_id": null,
          "respuestaTexto": "ESP",
          "respuestaComplemento": "",
          "respuestaNumero": null,
          "respuestaSiNo": null,
          "inclusion": "2022-04-29T18:20:09",
          "activo": true
        }
      ]
    },
    {
      "id": 15,
      "tbl_Formulario_id": 2,
      "tbl_Tipo_Respuesta_id": 4,
      "tipoRespuesta": "textarea",
      "pregunta": "Describe tus razones para entrar",
      "respuestaObligatoria": true,
      "respuestaComplementoObligatoria": true,
      "preguntaComplemento": "Complemento..",
      "inclusion": "2022-04-29T00:00:00",
      "activo": true,
      "respuesta": {
        "respuestaTexto": "NINGUNO",
        "respuestaComplemento": "VNBMN"
      },
      "respuestas": [
        {
          "id": null,
          "tbl_Pregunta_id": 15,
          "tbl_Opciones_Pregunta_id": null,
          "respuestaTexto": "NINGUNO",
          "respuestaComplemento": "VNBMN",
          "respuestaNumero": null,
          "respuestaSiNo": null,
          "inclusion": "2022-04-29T18:20:03",
          "activo": true
        }
      ]
    }
  ]

  public cuestionarioAspirante: CuestionarioAspirante = {
    "aspirante": "ohl",
    "respuestas": [{"respuestaTexto":null,"id":null,"tbl_Pregunta_id":2,"tbl_Opciones_Pregunta_id":1,"respuestaComplemento":null,"respuestaNumero":null,"respuestaSiNo":null,"inclusion":"2022-04-29T18:00:43","activo":true},{"id":null,"tbl_Pregunta_id":3,"tbl_Opciones_Pregunta_id":null,"respuestaTexto":"NINGUNO","respuestaComplemento":null,"respuestaNumero":null,"respuestaSiNo":null,"inclusion":"2022-04-29T18:01:04","activo":true},{"id":null,"tbl_Pregunta_id":4,"tbl_Opciones_Pregunta_id":null,"respuestaTexto":"SI","respuestaComplemento":"D","respuestaNumero":null,"respuestaSiNo":null,"inclusion":"2022-04-29T18:01:28","activo":true},{"respuestaTexto":null,"id":null,"tbl_Pregunta_id":5,"tbl_Opciones_Pregunta_id":5,"respuestaComplemento":null,"respuestaNumero":null,"respuestaSiNo":null,"inclusion":"2022-04-29T18:06:10","activo":true},{"respuestaTexto":null,"id":null,"tbl_Pregunta_id":5,"tbl_Opciones_Pregunta_id":6,"respuestaComplemento":null,"respuestaNumero":null,"respuestaSiNo":null,"inclusion":"2022-04-29T18:06:10","activo":true},{"respuestaTexto":null,"id":null,"tbl_Pregunta_id":5,"tbl_Opciones_Pregunta_id":7,"respuestaComplemento":null,"respuestaNumero":null,"respuestaSiNo":null,"inclusion":"2022-04-29T18:06:10","activo":true},{"respuestaTexto":null,"id":null,"tbl_Pregunta_id":6,"tbl_Opciones_Pregunta_id":17,"respuestaComplemento":null,"respuestaNumero":null,"respuestaSiNo":null,"inclusion":"2022-04-29T18:06:13","activo":true},{"id":null,"tbl_Pregunta_id":7,"tbl_Opciones_Pregunta_id":null,"respuestaTexto":"MATHS","respuestaComplemento":"NOMAS","respuestaNumero":null,"respuestaSiNo":null,"inclusion":"2022-04-29T18:01:38","activo":true},{"id":null,"tbl_Pregunta_id":8,"tbl_Opciones_Pregunta_id":null,"respuestaTexto":"HGJHM","respuestaComplemento":"VBNM,","respuestaNumero":null,"respuestaSiNo":null,"inclusion":"2022-04-29T18:06:02","activo":true},{"respuestaTexto":null,"id":null,"tbl_Pregunta_id":9,"tbl_Opciones_Pregunta_id":3,"respuestaComplemento":null,"respuestaNumero":null,"respuestaSiNo":null,"inclusion":"2022-04-29T18:06:29","activo":true},{"id":null,"tbl_Pregunta_id":10,"tbl_Opciones_Pregunta_id":null,"respuestaTexto":"SOCCER","respuestaComplemento":null,"respuestaNumero":null,"respuestaSiNo":null,"inclusion":"2022-04-29T18:07:01","activo":true},{"id":null,"tbl_Pregunta_id":11,"tbl_Opciones_Pregunta_id":null,"respuestaTexto":"SI","respuestaComplemento":"BOX","respuestaNumero":null,"respuestaSiNo":null,"inclusion":"2022-04-29T18:07:11","activo":true},{"respuestaTexto":null,"id":null,"tbl_Pregunta_id":12,"tbl_Opciones_Pregunta_id":15,"respuestaComplemento":null,"respuestaNumero":null,"respuestaSiNo":null,"inclusion":"2022-04-29T18:07:56","activo":true},{"respuestaTexto":null,"id":null,"tbl_Pregunta_id":13,"tbl_Opciones_Pregunta_id":16,"respuestaComplemento":null,"respuestaNumero":null,"respuestaSiNo":null,"inclusion":"2022-04-29T18:07:52","activo":true},{"id":null,"tbl_Pregunta_id":14,"tbl_Opciones_Pregunta_id":null,"respuestaTexto":"ESP","respuestaComplemento":"","respuestaNumero":null,"respuestaSiNo":null,"inclusion":"2022-04-29T18:20:09","activo":true},{"id":null,"tbl_Pregunta_id":15,"tbl_Opciones_Pregunta_id":null,"respuestaTexto":"NINGUNO","respuestaComplemento":"VNBMN","respuestaNumero":null,"respuestaSiNo":null,"inclusion":"2022-04-29T18:20:03","activo":true}]
  }

  preguntas: Array<PreguntaModel> = [{"id":2,"tbl_Formulario_id":2,"tbl_Tipo_Respuesta_id":3,"tipoRespuesta":"select","tbl_Grupo_Opciones_id":1,"pregunta":"¿Cuáles son tus ingresos mensualmente?","respuestaObligatoria":true,"inclusion":"2022-04-26T00:00:00","activo":true,"opciones":[{"id":1,"tbl_Grupo_Opciones_id":1,"opcion":"$1,000 - $2,000","activo":true},{"id":3,"tbl_Grupo_Opciones_id":1,"opcion":"$2,000 - $3,000","activo":true},{"id":4,"tbl_Grupo_Opciones_id":1,"opcion":"$3,000 - $4,000","activo":true}]},{"id":3,"tbl_Formulario_id":2,"tbl_Tipo_Respuesta_id":1,"tipoRespuesta":"text","pregunta":"¿Qué deportes practicas?","respuestaObligatoria":true,"inclusion":"2022-04-26T00:00:00","activo":true},{"id":4,"tbl_Formulario_id":2,"tbl_Tipo_Respuesta_id":1,"tipoRespuesta":"text","pregunta":"¿Practicas deporte?","respuestaObligatoria":true,"respuestaComplementoObligatoria":true,"preguntaComplemento":"¿Cuál?","inclusion":"2022-04-26T00:00:00","activo":true},{"id":5,"tbl_Formulario_id":2,"tbl_Tipo_Respuesta_id":2,"tipoRespuesta":"checkbox","tbl_Grupo_Opciones_id":2,"pregunta":"¿Qué deportes prefieres?","respuestaObligatoria":true,"inclusion":"2022-04-26T00:00:00","activo":true,"opciones":[{"id":5,"tbl_Grupo_Opciones_id":2,"opcion":"Fútbol","activo":true},{"id":6,"tbl_Grupo_Opciones_id":2,"opcion":"Box","activo":true},{"id":7,"tbl_Grupo_Opciones_id":2,"opcion":"Natación","activo":true},{"id":8,"tbl_Grupo_Opciones_id":2,"opcion":"Voleibol","activo":true},{"id":14,"tbl_Grupo_Opciones_id":2,"opcion":"Squash","activo":true},{"id":15,"tbl_Grupo_Opciones_id":2,"opcion":"Hockey","activo":true}]},{"id":6,"tbl_Formulario_id":2,"tbl_Tipo_Respuesta_id":5,"tipoRespuesta":"radio","tbl_Grupo_Opciones_id":3,"pregunta":"¿Cuales son tus egresos, aproximadamente?","respuestaObligatoria":true,"inclusion":"2022-04-26T00:00:00","activo":true,"opciones":[{"id":16,"tbl_Grupo_Opciones_id":3,"opcion":"$1,000 - $2,000","activo":true},{"id":17,"tbl_Grupo_Opciones_id":3,"opcion":"$2,000 - $3,000","activo":true},{"id":18,"tbl_Grupo_Opciones_id":3,"opcion":"$3,000 - $4,000","activo":true}]},{"id":7,"tbl_Formulario_id":2,"tbl_Tipo_Respuesta_id":1,"tipoRespuesta":"text","pregunta":"¿Qué unidad de aprendizaje te gusta más?","respuestaObligatoria":true,"respuestaComplementoObligatoria":false,"preguntaComplemento":"¿Por qué?","inclusion":"2022-04-28T00:00:00","activo":true},{"id":8,"tbl_Formulario_id":2,"tbl_Tipo_Respuesta_id":4,"tipoRespuesta":"textarea","pregunta":"Describe tus razones para entrar","respuestaObligatoria":true,"respuestaComplementoObligatoria":true,"preguntaComplemento":"Complemento..","inclusion":"2022-04-29T00:00:00","activo":true}]

 /*  public preguntas: Array<PreguntaModel> = [
    {
      "id": 2,
      "tbl_Formulario_id": 2,
      "tbl_Tipo_Respuesta_id": 3,
      "tipoRespuesta": "select",
      "tbl_Grupo_Opciones_id": 1,
      "pregunta": "¿Cuáles son tus ingresos mensualmente?",
      "respuestaObligatoria": true,
      "inclusion": "2022-04-26T00:00:00",
      "activo": true,
      "opciones": [
        {
          "id": 1,
          "tbl_Grupo_Opciones_id": 1,
          "opcion": "$1,000 - $2,000",
          "activo": true
        },
        {
          "id": 3,
          "tbl_Grupo_Opciones_id": 1,
          "opcion": "$2,000 - $3,000",
          "activo": true
        },
        {
          "id": 4,
          "tbl_Grupo_Opciones_id": 1,
          "opcion": "$3,000 - $4,000",
          "activo": true
        }
      ]
    },
    {
      "id": 3,
      "tbl_Formulario_id": 2,
      "tbl_Tipo_Respuesta_id": 1,
      "tipoRespuesta": "text",
      "pregunta": "¿Qué deportes practicas?",
      "respuestaObligatoria": true,
      "inclusion": "2022-04-26T00:00:00",
      "activo": true
    },
    {
      "id": 4,
      "tbl_Formulario_id": 2,
      "tbl_Tipo_Respuesta_id": 1,
      "tipoRespuesta": "text",
      "pregunta": "¿Practicas deporte?",
      "respuestaObligatoria": true,
      "respuestaComplementoObligatoria": true,
      "preguntaComplemento": "¿Cuál?",
      "inclusion": "2022-04-26T00:00:00",
      "activo": true
    },
    {
      "id": 5,
      "tbl_Formulario_id": 2,
      "tbl_Tipo_Respuesta_id": 2,
      "tipoRespuesta": "checkbox",
      "tbl_Grupo_Opciones_id": 2,
      "pregunta": "¿Qué deportes prefieres?",
      "respuestaObligatoria": true,
      "inclusion": "2022-04-26T00:00:00",
      "activo": true,
      "opciones": [
        {
          "id": 5,
          "tbl_Grupo_Opciones_id": 2,
          "opcion": "Fútbol",
          "activo": true
        },
        {
          "id": 6,
          "tbl_Grupo_Opciones_id": 2,
          "opcion": "Box",
          "activo": true
        },
        {
          "id": 7,
          "tbl_Grupo_Opciones_id": 2,
          "opcion": "Natación",
          "activo": true
        },
        {
          "id": 8,
          "tbl_Grupo_Opciones_id": 2,
          "opcion": "Voleibol",
          "activo": true
        },
        {
          "id": 14,
          "tbl_Grupo_Opciones_id": 2,
          "opcion": "Squash",
          "activo": true
        },
        {
          "id": 15,
          "tbl_Grupo_Opciones_id": 2,
          "opcion": "Hockey",
          "activo": true
        }
      ]
    },
    {
      "id": 6,
      "tbl_Formulario_id": 2,
      "tbl_Tipo_Respuesta_id": 5,
      "tipoRespuesta": "radio",
      "tbl_Grupo_Opciones_id": 3,
      "pregunta": "¿Cuales son tus egresos, aproximadamente?",
      "respuestaObligatoria": true,
      "inclusion": "2022-04-26T00:00:00",
      "activo": true,
      "opciones": [
        {
          "id": 16,
          "tbl_Grupo_Opciones_id": 3,
          "opcion": "$1,000 - $2,000",
          "activo": true
        },
        {
          "id": 17,
          "tbl_Grupo_Opciones_id": 3,
          "opcion": "$2,000 - $3,000",
          "activo": true
        },
        {
          "id": 18,
          "tbl_Grupo_Opciones_id": 3,
          "opcion": "$3,000 - $4,000",
          "activo": true
        }
      ]
    },
    {
      "id": 7,
      "tbl_Formulario_id": 2,
      "tbl_Tipo_Respuesta_id": 1,
      "tipoRespuesta": "text",
      "pregunta": "¿Qué unidad de aprendizaje te gusta más?",
      "respuestaObligatoria": true,
      "respuestaComplementoObligatoria": false,
      "preguntaComplemento": "¿Por qué?",
      "inclusion": "2022-04-28T00:00:00",
      "activo": true
    },
    {
      "id": 8,
      "tbl_Formulario_id": 2,
      "tbl_Tipo_Respuesta_id": 4,
      "tipoRespuesta": "textarea",
      "pregunta": "Describe tus razones para entrar",
      "respuestaObligatoria": true,
      "respuestaComplementoObligatoria": true,
      "preguntaComplemento": "Complemento..",
      "inclusion": "2022-04-29T00:00:00",
      "activo": true
    }
  ,
    {
      "id": 9,
      "tbl_Formulario_id": 2,
      "tbl_Tipo_Respuesta_id": 3,
      "tipoRespuesta": "select",
      "tbl_Grupo_Opciones_id": 1,
      "pregunta": "¿Cuáles son tus ingresos mensualmente?",
      "respuestaObligatoria": true,
      "inclusion": "2022-04-26T00:00:00",
      "activo": true,
      "opciones": [
        {
          "id": 1,
          "tbl_Grupo_Opciones_id": 1,
          "opcion": "$1,000 - $2,000",
          "activo": true
        },
        {
          "id": 3,
          "tbl_Grupo_Opciones_id": 1,
          "opcion": "$2,000 - $3,000",
          "activo": true
        },
        {
          "id": 4,
          "tbl_Grupo_Opciones_id": 1,
          "opcion": "$3,000 - $4,000",
          "activo": true
        }
      ]
    },
    {
      "id": 10,
      "tbl_Formulario_id": 2,
      "tbl_Tipo_Respuesta_id": 1,
      "tipoRespuesta": "text",
      "pregunta": "¿Qué deportes practicas?",
      "respuestaObligatoria": true,
      "inclusion": "2022-04-26T00:00:00",
      "activo": true
    },
    {
      "id": 11,
      "tbl_Formulario_id": 2,
      "tbl_Tipo_Respuesta_id": 1,
      "tipoRespuesta": "text",
      "pregunta": "¿Practicas deporte?",
      "respuestaObligatoria": true,
      "respuestaComplementoObligatoria": true,
      "preguntaComplemento": "¿Cuál?",
      "inclusion": "2022-04-26T00:00:00",
      "activo": true
    },
    {
      "id": 12,
      "tbl_Formulario_id": 2,
      "tbl_Tipo_Respuesta_id": 2,
      "tipoRespuesta": "checkbox",
      "tbl_Grupo_Opciones_id": 2,
      "pregunta": "¿Qué deportes prefieres?",
      "respuestaObligatoria": true,
      "inclusion": "2022-04-26T00:00:00",
      "activo": true,
      "opciones": [
        {
          "id": 5,
          "tbl_Grupo_Opciones_id": 2,
          "opcion": "Fútbol",
          "activo": true
        },
        {
          "id": 6,
          "tbl_Grupo_Opciones_id": 2,
          "opcion": "Box",
          "activo": true
        },
        {
          "id": 7,
          "tbl_Grupo_Opciones_id": 2,
          "opcion": "Natación",
          "activo": true
        },
        {
          "id": 8,
          "tbl_Grupo_Opciones_id": 2,
          "opcion": "Voleibol",
          "activo": true
        },
        {
          "id": 14,
          "tbl_Grupo_Opciones_id": 2,
          "opcion": "Squash",
          "activo": true
        },
        {
          "id": 15,
          "tbl_Grupo_Opciones_id": 2,
          "opcion": "Hockey",
          "activo": true
        }
      ]
    },
    {
      "id": 13,
      "tbl_Formulario_id": 2,
      "tbl_Tipo_Respuesta_id": 5,
      "tipoRespuesta": "radio",
      "tbl_Grupo_Opciones_id": 3,
      "pregunta": "¿Cuales son tus egresos, aproximadamente?",
      "respuestaObligatoria": true,
      "inclusion": "2022-04-26T00:00:00",
      "activo": true,
      "opciones": [
        {
          "id": 16,
          "tbl_Grupo_Opciones_id": 3,
          "opcion": "$1,000 - $2,000",
          "activo": true
        },
        {
          "id": 17,
          "tbl_Grupo_Opciones_id": 3,
          "opcion": "$2,000 - $3,000",
          "activo": true
        },
        {
          "id": 18,
          "tbl_Grupo_Opciones_id": 3,
          "opcion": "$3,000 - $4,000",
          "activo": true
        }
      ]
    },
    {
      "id": 14,
      "tbl_Formulario_id": 2,
      "tbl_Tipo_Respuesta_id": 1,
      "tipoRespuesta": "text",
      "pregunta": "¿Qué unidad de aprendizaje te gusta más?",
      "respuestaObligatoria": true,
      "respuestaComplementoObligatoria": false,
      "preguntaComplemento": "¿Por qué?",
      "inclusion": "2022-04-28T00:00:00",
      "activo": true
    },
    {
      "id": 15,
      "tbl_Formulario_id": 2,
      "tbl_Tipo_Respuesta_id": 4,
      "tipoRespuesta": "textarea",
      "pregunta": "Describe tus razones para entrar",
      "respuestaObligatoria": true,
      "respuestaComplementoObligatoria": true,
      "preguntaComplemento": "Complemento..",
      "inclusion": "2022-04-29T00:00:00",
      "activo": true
    }
  ] */

  constructor() { }

  ngOnInit(): void {

    let resps = new Array<RespuestaModel>();

    this.objeto.forEach((x)=>{
      x.respuestas.forEach((y)=> {
        resps.push(y);
      })
    });

    console.log(JSON.stringify(resps));

    this.preguntas.forEach((x)=>{
      x.respuesta = new RespuestaModel();
      x.respuestas = [];

      if(x.tipoRespuesta == 'checkbox' && x.respuestaObligatoria && x.opciones){
        x.opciones.forEach((y)=>{
          y.respuestaObligatoria = true;
        })
      }
    })
    console.log(this.preguntas);

    switch(this.accion){
      case 'Consulta':
        this.llenarFormulario();
        break;

      case 'Agregar':
        break;

    }



  }


  public llenarFormulario(){
    this.preguntas.forEach((pregunta) => {
      switch(pregunta.tipoRespuesta){
        case 'text':

          let respuestasTexto = this.cuestionarioAspirante.respuestas.filter((resp=> resp.tbl_Pregunta_id == pregunta.id));
            this.llenarTexto(pregunta, respuestasTexto);
          break;


        case 'checkbox':
          let respuestasCheckBox = this.cuestionarioAspirante.respuestas.filter((resp=> resp.tbl_Pregunta_id == pregunta.id));
          this.llenarCheckbox(pregunta, respuestasCheckBox);
          break;

        case 'select':
          let respuestasSelect = this.cuestionarioAspirante.respuestas.filter((resp=> resp.tbl_Pregunta_id == pregunta.id));
          this.llenarSelect(pregunta, respuestasSelect);
          break;

        case 'textarea':
          let respuestasTextarea = this.cuestionarioAspirante.respuestas.filter((resp=> resp.tbl_Pregunta_id == pregunta.id));
          this.llenarTexto(pregunta, respuestasTextarea);
          break;


        case 'radio':
          let respuestasRadio = this.cuestionarioAspirante.respuestas.filter((resp=> resp.tbl_Pregunta_id == pregunta.id));
          this.llenarRadio(pregunta, respuestasRadio);
        break;

      }
    })
  }


  public async  llenarTexto(pregunta: PreguntaModel, respuestas: Array<RespuestaModel>){

    let resp = new RespuestaModel();
    resp.respuestaTexto = (respuestas) ? respuestas[0].respuestaTexto : null;
    resp.respuestaComplemento = (respuestas) ? respuestas[0].respuestaComplemento : null;
    pregunta.respuesta = resp;
    return pregunta;
  }

/*   public llenarTextoComplemento(pregunta: PreguntaModel, respuestas: Array<RespuestaModel>){

    let resp = new RespuestaModel();
    resp.respuestaTexto = (respuestas) ? respuestas[0].respuestaTexto : null;
    resp.respuestaComplemento = (respuestas) ? respuestas[0].respuestaComplemento : null;
    pregunta.respuesta = resp;
    return pregunta;
  } */

  public async llenarCheckbox(pregunta: PreguntaModel, respuestas: Array<RespuestaModel>){

   await pregunta.opciones.forEach((opcion) =>{

    let result = respuestas.find((respuesta)=> respuesta.tbl_Opciones_Pregunta_id == opcion.id );

      if(respuestas.find((respuesta)=> respuesta.tbl_Opciones_Pregunta_id == opcion.id )){

        opcion.checked = true;
      }else{
        opcion.checked = false;
      }
    });

    /* let resp = new RespuestaModel();
    resp.respuestaTexto = (respuestas) ? respuestas[0].respuestaTexto : null;
    resp.respuestaComplemento = (respuestas) ? respuestas[0].respuestaComplemento : null;
    pregunta.respuesta = resp; */
    pregunta.respuestas = respuestas;
    return pregunta;
  }

  public async  llenarRadio(pregunta: PreguntaModel, respuestas: Array<RespuestaModel>){

    let resp = new RespuestaModel();
    resp.tbl_Opciones_Pregunta_id = (respuestas) ? respuestas[0].tbl_Opciones_Pregunta_id : null;

    pregunta.respuesta = resp;
    pregunta.respuestas = respuestas;
    return pregunta;
  }

  public async  llenarSelect(pregunta: PreguntaModel, respuestas: Array<RespuestaModel>){

    let resp = new RespuestaModel();
    resp.tbl_Opciones_Pregunta_id = (respuestas) ? respuestas[0].tbl_Opciones_Pregunta_id : null;

    pregunta.respuesta = resp;
    return pregunta;
  }

  /* public llenarRadio(){

  } */

  public  formularioValido(){

    this.preguntas.forEach((pregunta)=>{

    })

     return (this.preguntas.filter((pregunta) => pregunta.respuestaObligatoria && pregunta.respuestaComplementoObligatoria && pregunta.respuestas.length === 0).length > 0) ? false : true;
  }

  onChangeTexto(pregunta,evento){


    let respuestas: Array<RespuestaModel> = [];
    let respuesta = new RespuestaModel();

    if(evento){
      respuesta.id = null;
    respuesta.tbl_Pregunta_id = pregunta.id;
    respuesta.tbl_Opciones_Pregunta_id = null;
    respuesta.respuestaTexto = evento;
    respuesta.respuestaComplemento = pregunta.respuestas.length > 0 ? pregunta.respuestas[0].respuestaComplemento : null;
    respuesta.respuestaNumero = null;
    respuesta.respuestaSiNo = null;
    respuesta.inclusion = this.obtenerFechaActual();
    respuesta.activo = true;

    respuestas.push(respuesta);
    pregunta.respuestas = respuestas;
    }
    //this.respuesta.emit(respuestas);
    //this.respuesta.emit(respuesta);
  }

  onChangeTextoComplemento(pregunta,evento){

    let respuestas: Array<RespuestaModel> = [];
    let respuesta = new RespuestaModel();

    respuesta.id = null;
    respuesta.tbl_Pregunta_id = pregunta.id;
    respuesta.tbl_Opciones_Pregunta_id = null;
    respuesta.respuestaTexto = pregunta.respuestas.length > 0  ? pregunta.respuestas[0].respuestaTexto : null;
    respuesta.respuestaComplemento = evento != "" ? evento : null;
    respuesta.respuestaNumero = null;
    respuesta.respuestaSiNo = null;
    respuesta.inclusion = this.obtenerFechaActual();
    respuesta.activo = true;
    respuestas.push(respuesta);
    pregunta.respuestas = respuestas;
    //this.respuesta.emit(respuestas);
    //this.respuesta.emit(respuesta);
  }

  onChangeDropDown(pregunta,evento){

    let respuestas: Array<RespuestaModel> = [];
    let respuesta = new RespuestaModel();
    respuesta.respuestaTexto = null;
    respuesta.id = null;
    respuesta.tbl_Pregunta_id = pregunta.id;
    respuesta.tbl_Opciones_Pregunta_id = evento;
    respuesta.respuestaTexto = null;
    respuesta.respuestaComplemento = null;
    respuesta.respuestaNumero = null;
    respuesta.respuestaSiNo = null;
    respuesta.inclusion = this.obtenerFechaActual();
    respuesta.activo = true;
    respuestas.push(respuesta);
    pregunta.respuestas = respuestas;
    //this.respuesta.emit(respuestas);
    //this.respuesta.emit(respuesta);
  }

 async onCheckCheckbox(pregunta: PreguntaModel, opcion: OpcionesPreguntaModel,  evento){

    //alert(evento.target.value + ' ' + evento.target.checked);

    // SE RESETEA EL VALOR  respuestaObligatoria
    /* pregunta.opciones.forEach((x)=>{
      x.respuestaObligatoria = false;
    }) */

    opcion.respuestaObligatoria = evento.checked?true:false;
    opcion.checked = evento.checked;

     //SI HAY AL MENOS UNO CHECKEADO, SE DESACTIVA EL REQUIRED
   /*  if(pregunta.opciones.filter((y)=>y.checked).length > 0){
      pregunta.opciones.forEach((x)=>{
        x.respuestaObligatoria = false;
      })
    }else{
      pregunta.opciones.forEach((x)=>{
        x.respuestaObligatoria = true;
      })
    }
 */


    /* if(!evento.target.checked){

      //HAY AL MENOS UNO CHECKEADO
      if(pregunta.opciones.filter((y)=>y.checked).length > 0){
        pregunta.opciones.forEach((x)=>{
          x.respuestaObligatoria = false;
        })
      }else{
        pregunta.opciones.forEach((x)=>{
          x.respuestaObligatoria = true;
        })
      }


    }else{


      if(pregunta.opciones.filter((y)=>y.checked).length > 0){
        pregunta.opciones.forEach((x)=>{
          x.respuestaObligatoria = false;
        })
      }else{
        pregunta.opciones.forEach((x)=>{
          x.respuestaObligatoria = true;
        })
      }
    } */


    //opcion.respuestaObligatoria = evento.target.checked?true:false;

    let respuestas: Array<RespuestaModel> = [];
    await pregunta.opciones.filter((x) => x.checked).forEach((y)=>{
      let respuesta = new RespuestaModel();
      respuesta.respuestaTexto = null;
      respuesta.id = null;
      respuesta.tbl_Pregunta_id = pregunta.id;
      respuesta.tbl_Opciones_Pregunta_id = y.id;
      respuesta.respuestaTexto = null;
      respuesta.respuestaComplemento = null;
      respuesta.respuestaNumero = null;
      respuesta.respuestaSiNo = null;
      respuesta.inclusion = this.obtenerFechaActual();
      respuesta.activo = true;
      respuestas.push(respuesta);
    });

    pregunta.respuestas = respuestas;
    //this.respuesta.emit(respuestas);
    //this.respuesta.emit(respuesta);
  }

  public checkboxesValidos(){

    let invalid = this.preguntas.filter((pregunta)=> pregunta.tipoRespuesta == 'checkbox' && pregunta.respuestaObligatoria && pregunta.respuestas.length == 0).length;

    //invalid > 0 ? alert('invalido') : alert('valido')
    return invalid > 0 ? false : true;

  }


  async onCheckRadio(pregunta, opcion: OpcionesPreguntaModel,  evento){


    //Se reinician los checked
    pregunta.opciones.forEach((x)=>{
      x.checked = false;
    });
    //alert(evento.target.value + ' ' + evento.target.checked);
    opcion.checked = evento.source.checked;


    let respuestas: Array<RespuestaModel> = [];
    await pregunta.opciones.filter((x) => x.checked).forEach((y)=>{
      let respuesta = new RespuestaModel();
      respuesta.respuestaTexto = null;
      respuesta.id = null;
      respuesta.tbl_Pregunta_id = pregunta.id;
      respuesta.tbl_Opciones_Pregunta_id = y.id;
      respuesta.respuestaTexto = null;
      respuesta.respuestaComplemento = null;
      respuesta.respuestaNumero = null;
      respuesta.respuestaSiNo = null;
      respuesta.inclusion = this.obtenerFechaActual();
      respuesta.activo = true;
      respuestas.push(respuesta);
    });

    pregunta.respuestas = respuestas;
    //this.respuesta.emit(respuestas);

  }

  public obtenerFechaActual(){
    return (new Date()).toISOString().slice(0, 19);
  }


}
