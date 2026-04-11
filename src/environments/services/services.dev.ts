export const Services = Object.freeze({
    gestorGrafo: {
        url: 'http://localhost:8083',
    },
    moduloAlumno: {
        cuestionarioUrl: 'http://localhost:8092/preguntas',
        insertCuestionarioIrl: 'http://localhost:8092/cuestionarios/respuestas?reemplazar=true',
        cuestionarioNivel: 'http://localhost:8092/api/placement/1',
        grafoEstudiante: 'http://localhost:8092/api/usuario-topic',
        evaluacion: 'http://localhost:8092/api/recommendation-evaluation'
    },
    auth: {
        login: 'http://localhost:1000/auth',
    }
})