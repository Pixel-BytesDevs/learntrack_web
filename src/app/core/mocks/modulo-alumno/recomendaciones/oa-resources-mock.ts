import { OAResource } from "../../../domain/interfaces/gestor-oa/oa-resource.model";

export const OA_RESOURCES_MOCK: OAResource[] = [
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
    ];