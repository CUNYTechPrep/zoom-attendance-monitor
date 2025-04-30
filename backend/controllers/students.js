import { Router } from 'express';
import Student from '../models/Student.js';

const router = Router();

router.get('/', async (req, res) => {
  const { name, email } = req.query;

  try {
    let whereClause = {};

    if (name) {
      whereClause.name = { [Op.iLike]: `%${name}%` };
    }
    if (email) {
      whereClause.email = { [Op.iLike]: `%${email}%` };
    }

    // If both name and email are provided, we can combine them in the where clause.
    // If neither of them are provided, it should return all the students in the database.
    const students = await Student.findAll({ where: whereClause });
    return res.status(200).json(students);
  } catch (error) {
    console.error('Error fetching students:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router