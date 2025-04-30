import { Router } from 'express';
import { Op } from 'sequelize';
import db from '../models/index.js';

const { Student } = db;

const router = Router();

router.get('/', async (req, res) => {
  const { name, email } = req.query;

  try {
    let whereClause = {
      [Op.or]: []
    };

    if (name) {
      whereClause[Op.or].push({ name: { [Op.like]: `%${name}%` } });
    }
    if (email) {
      whereClause[Op.or].push({ email: { [Op.like]: `%${email}%` } });
    }

    if (whereClause[Op.or].length === 0) {
      whereClause = {};
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