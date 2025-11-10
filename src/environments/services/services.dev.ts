export const Services = Object.freeze({
    gestorGrafo: {
        url: 'http://26.138.194.69:8090',
    },
    moduloAlumno: {
        cuestionarioUrl: 'http://localhost:8094/preguntas',
        insertCuestionarioIrl: 'http://localhost:8094/cuestionarios/respuestas?reemplazar=true',
        cuestionarioNivel: 'http://localhost:8094/api/placement/1',
        grafoEstudiante: 'http://localhost:8094/api/usuario-topic',
    }
})