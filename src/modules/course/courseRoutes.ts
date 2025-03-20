import { Router } from 'express';
import CourseController from './Controller/courseController';
import CourseGetController from './Controller/courseGetController';
import { validateCourse } from './courseValidation';

// importar midleware de permisos y autenticación
import { permissionsMiddleware } from '../../shared/middleware/permissionsMiddleware';
import { authMiddleware } from '../../shared/middleware/authMiddleware';


const router = Router();

// Rutas de cursos sin validación de permisos (para pruebas/desarrollo)

// Ruta para obtener todos los cursos 
router.get('/courses', CourseGetController.getAll);

// Obtener todos los cursos activos
router.get('/courses/actives', CourseGetController.getActiveCourses);

// Obtener todos los cursos en desarrollo
router.get('/courses/development', CourseGetController.getInDevelopmentCourses);

// Obtener conteo de todos los cursos
router.get('/courses/count', CourseGetController.getTotalCount);

// Obtener todos los cursos por categoría
router.get('/courses/category/actives/:categoryId', CourseGetController.getByCategory);

// Obtener todos los cursos por tipo de carrera
router.get('/courses/careerType', CourseGetController.getByCareerType);

// Obtener los cursos por admin
router.get('/courses/admin/:id', CourseGetController.getByAdminId);

// Ruta para obtener un curso por ID
router.get('/courses/:id', CourseGetController.getById);

// Ruta para crear un curso
router.post('/courses', validateCourse, authMiddleware, permissionsMiddleware(['create:courses']), CourseController.create);

// Ruta para actualizar un curso
router.put('/courses/:id', validateCourse, authMiddleware, permissionsMiddleware(['edit:courses']), CourseController.update);

// Ruta para eliminar un curso
router.delete('/courses/:id', authMiddleware, permissionsMiddleware(['delete:courses']), CourseController.delete);

export default router;