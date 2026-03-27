import { OAViewerData } from "../../../domain/interfaces/gestor-oa/oa-resource.model";

export const OA_DATA: OAViewerData = {
      mainResource: {
        id: 1,
        title: 'Resolución de ecuaciones lineales paso a paso',
        type: 'video',
        duration: 15,
        description: 'Recurso audiovisual que guía, con ejemplos y ejercicios, el procedimiento para resolver ecuaciones lineales de primer grado',
        s3Key: 'learning-objects/1/original/ecuaciones-lineales.mp4',
        url: '',
        fileExtension: '.mp4',
        fileSize: 157286400,
        estimatedDuration: 15
      },
      complementaryResources: [
        {
          id: 2,
          title: 'Guía de ejercicios prácticos',
          type: 'exercise',
          description: 'Ejercicios progresivos para practicar la resolución de ecuaciones lineales',
          s3Key: 'learning-objects/1/components/ejercicios.pdf',
        url: '',
          fileExtension: '.pdf',
          fileSize: 2097152,
          estimatedDuration: 20
        },
        {
          id: 3,
          title: 'Resumen teórico en PDF',
          type: 'summary',
          description: 'Resumen conciso de los conceptos principales de ecuaciones lineales',
          s3Key: 'learning-objects/1/components/resumen.pdf',
        url: '',
          fileExtension: '.pdf',
          fileSize: 1048576,
          estimatedDuration: 10
        },
        {
          id: 4,
          title: 'Infografía visual',
          type: 'image',
          description: 'Diagrama visual con los pasos para resolver ecuaciones lineales',
          s3Key: 'learning-objects/1/components/infografia.png',
        url: '',
          fileExtension: '.png',
          fileSize: 524288,
        },
        {
          id: 5,
          title: 'Lectura complementaria',
          type: 'reading',
          description: 'Artículo ampliado sobre aplicaciones de ecuaciones lineales',
          s3Key: 'learning-objects/1/components/lectura.pdf',
        url: '',
          fileExtension: '.pdf',
          fileSize: 1572864,
          estimatedDuration: 15
        },
        {
          id: 6,
          title: 'Enlace a Khan Academy',
          type: 'link',
          description: 'Recursos adicionales y ejercicios interactivos',
          s3Key: 'https://es.khanacademy.org/math/algebra',
        url: '',
          fileExtension: '',
        },
        {
          id: 7,
          title: 'Hoja de fórmulas',
          type: 'pdf',
          description: 'Fórmulas y propiedades esenciales de ecuaciones lineales',
          s3Key: 'learning-objects/1/components/formulas.pdf',
        url: '',
          fileExtension: '.pdf',
          fileSize: 524288,
          estimatedDuration: 5
        }
      ],
      learningObjectives: [
        'Comprender el concepto de ecuación lineal',
        'Resolver ecuaciones de primer grado con una variable',
        'Aplicar propiedades de igualdad en la resolución',
        'Identificar y corregir errores comunes'
      ],
      prerequisites: [
        'Propiedades básicas de la igualdad',
        'Operaciones con números enteros',
        'Simplificación de expresiones algebraicas',
        'Conceptos básicos de álgebra'
      ],
      competency: 'Ecuaciones Lineales - Nivel Básico',
      nivel: 'Básico',
      progress: 68
    };